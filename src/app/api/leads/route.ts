import { NextRequest, NextResponse } from 'next/server';
import { getLeadsAsync, saveLeadAsync, updateLeadWithAuditAsync, deleteLeadAsync } from '@/lib/storage';
import { getAuthenticatedUser, checkPermission } from '@/lib/auth';
import { logActivity, computeFieldDiffs } from '@/lib/audit';
import { getClientIp } from '@/lib/ratelimit';
import { ActivityAction, UserAuditRef } from '@/types';

// Input length limits
const LIMITS = {
  name: 200,
  company: 200,
  email: 320,
  phone: 30,
  description: 5000,
  budget: 100,
  timeline: 200,
  referenceLinks: 2000,
  hearAbout: 200,
  services: 500,
};

function truncateField(value: unknown, max: number): string {
  return String(value ?? '').trim().substring(0, max);
}

// 1. GET — all CRM leads (requires authentication)
export async function GET(request: NextRequest) {
  try {
    const authUser = getAuthenticatedUser(request);
    if (!authUser) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized: Authentication required to view CRM leads.' },
        { status: 401 }
      );
    }
    const leads = await getLeadsAsync();
    return NextResponse.json({ success: true, leads });
  } catch (error) {
    console.error('Error fetching leads:', error);
    return NextResponse.json({ success: false, message: 'Failed to fetch leads' }, { status: 500 });
  }
}

// 2. POST — create a CRM lead (requires authentication)
export async function POST(request: NextRequest) {
  try {
    const authUser = getAuthenticatedUser(request);
    if (!authUser) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized: Authentication required to log CRM leads.' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { name, company, email, phone, description } = body;

    if (!name || !email || !phone || !description) {
      return NextResponse.json(
        { success: false, message: 'Name, email, phone, and project description are required.' },
        { status: 400 }
      );
    }

    // Validate email format
    if (typeof email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ success: false, message: 'Invalid email address.' }, { status: 400 });
    }

    // Length validation
    if (String(name).length > LIMITS.name || String(description).length > LIMITS.description) {
      return NextResponse.json({ success: false, message: 'Input exceeds maximum allowed length.' }, { status: 400 });
    }

    const creator: UserAuditRef = {
      id: authUser.userId,
      name: authUser.name,
      role: authUser.role
    };

    // Only pass whitelisted fields to saveLead — not the whole body
    const lead = await saveLeadAsync({
      name: truncateField(name, LIMITS.name),
      company: company ? truncateField(company, LIMITS.company) : 'Not specified',
      email: truncateField(email, LIMITS.email).toLowerCase(),
      phone: truncateField(phone, LIMITS.phone),
      description: truncateField(description, LIMITS.description),
      budget: body.budget ? truncateField(body.budget, LIMITS.budget) : 'Flexible',
      timeline: body.timeline ? truncateField(body.timeline, LIMITS.timeline) : 'Flexible',
      services: Array.isArray(body.services) ? body.services.map((s: unknown) => String(s)).slice(0, 10) : [],
      referenceLinks: body.referenceLinks ? truncateField(body.referenceLinks, LIMITS.referenceLinks) : '',
      hearAbout: body.hearAbout ? truncateField(body.hearAbout, LIMITS.hearAbout) : 'Admin Entry',
      priority: body.priority || 'Medium',
      assignedTo: body.assignedTo || 'Unassigned',
      createdBy: creator
    });

    try {
      logActivity({
        userId: creator.id,
        userName: creator.name,
        userRole: creator.role,
        action: 'Created Lead',
        category: 'leads',
        entityType: 'lead',
        entityId: lead.id,
        entityTitle: `${lead.name} (${lead.company || 'Direct'})`,
        ipAddress: getClientIp(request),
        summary: `${creator.name} created CRM lead for ${lead.name} (${lead.company || 'Direct'})`,
        after: { name: lead.name, company: lead.company, status: lead.status, priority: lead.priority }
      });
    } catch (logErr) {
      console.error('Non-critical: Failed to log activity for lead creation:', logErr);
    }

    return NextResponse.json({ success: true, lead }, { status: 201 });
  } catch (error) {
    console.error('Error creating lead:', error);
    return NextResponse.json({ success: false, message: 'Failed to create lead' }, { status: 500 });
  }
}

// 3. PATCH — update lead (authenticated, requires edit permission)
export async function PATCH(request: NextRequest) {
  try {
    const authUser = getAuthenticatedUser(request);
    if (!authUser) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized: Authentication required to update leads.' },
        { status: 401 }
      );
    }

    if (!checkPermission(authUser.role, 'edit_all_leads')) {
      return NextResponse.json(
        { success: false, message: 'Permission denied: Your role cannot modify CRM leads.' },
        { status: 403 }
      );
    }

    const body = await request.json();
    const { id, ...updates } = body;

    if (!id || typeof id !== 'string') {
      return NextResponse.json({ success: false, message: 'Lead ID is required' }, { status: 400 });
    }

    // Sanitize string inputs if present in updates
    if (updates.name) updates.name = truncateField(updates.name, LIMITS.name);
    if (updates.company) updates.company = truncateField(updates.company, LIMITS.company);
    if (updates.email) updates.email = truncateField(updates.email, LIMITS.email).toLowerCase();
    if (updates.phone) updates.phone = truncateField(updates.phone, LIMITS.phone);
    if (updates.description) updates.description = truncateField(updates.description, LIMITS.description);
    if (updates.budget) updates.budget = truncateField(updates.budget, LIMITS.budget);
    if (updates.timeline) updates.timeline = truncateField(updates.timeline, LIMITS.timeline);

    const updater: UserAuditRef = {
      id: authUser.userId,
      name: authUser.name,
      role: authUser.role
    };

    const result = await updateLeadWithAuditAsync(id, updates, updater);
    if (!result) {
      return NextResponse.json({ success: false, message: 'Lead not found' }, { status: 404 });
    }

    const { before, updated } = result;
    const fieldChanges = computeFieldDiffs(
      before as unknown as Record<string, unknown>,
      updated as unknown as Record<string, unknown>
    );

    let actionType: ActivityAction = 'Updated Lead';
    let summary = `${updater.name} updated lead record for ${updated.name}`;

    if (updates.status && updates.status !== before.status) {
      actionType = 'Changed Lead Status';
      summary = `${updater.name} changed status of ${updated.name} (${before.status} → ${updates.status})`;
    } else if (updates.assignedTo && updates.assignedTo !== before.assignedTo) {
      actionType = 'Assigned Lead';
      summary = `${updater.name} reassigned ${updated.name} to ${updates.assignedTo}`;
    } else if (updates.paymentStatus && updates.paymentStatus !== before.paymentStatus) {
      actionType = 'Updated Payment';
      summary = `${updater.name} updated payment status for ${updated.name} to ${updates.paymentStatus}`;
    } else if (updates.notes && (!before.notes || (updates.notes as unknown[]).length > (before.notes as unknown[]).length)) {
      actionType = 'Added Note';
      summary = `${updater.name} added internal note to ${updated.name}`;
    }

    try {
      logActivity({
        userId: updater.id,
        userName: updater.name,
        userRole: updater.role,
        action: actionType,
        category: 'leads',
        entityType: 'lead',
        entityId: updated.id,
        entityTitle: `${updated.name} (${updated.company || 'Direct'})`,
        ipAddress: getClientIp(request),
        summary,
        changes: fieldChanges,
        before: { status: before.status, priority: before.priority, assignedTo: before.assignedTo, estimatedValue: before.estimatedValue },
        after: { status: updated.status, priority: updated.priority, assignedTo: updated.assignedTo, estimatedValue: updated.estimatedValue }
      });
    } catch (logErr) {
      console.error('Non-critical: Failed to log activity for lead update:', logErr);
    }

    return NextResponse.json({ success: true, lead: updated, changes: fieldChanges });
  } catch (error) {
    console.error('Error updating lead:', error);
    return NextResponse.json({ success: false, message: 'Failed to update lead' }, { status: 500 });
  }
}

// 4. DELETE — delete lead (Owner/Admin only)
export async function DELETE(request: NextRequest) {
  try {
    const authUser = getAuthenticatedUser(request);
    if (!authUser) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized: Authentication required to delete records.' },
        { status: 401 }
      );
    }

    if (!checkPermission(authUser.role, 'delete_record')) {
      return NextResponse.json(
        { success: false, message: 'Permission denied: Only Owner/Admin can delete records.' },
        { status: 403 }
      );
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id || typeof id !== 'string') {
      return NextResponse.json({ success: false, message: 'Lead ID is required' }, { status: 400 });
    }

    const deleted = await deleteLeadAsync(id);
    if (!deleted) {
      return NextResponse.json({ success: false, message: 'Lead not found' }, { status: 404 });
    }

    try {
      logActivity({
        userId: authUser.userId,
        userName: authUser.name,
        userRole: authUser.role,
        action: 'Deleted Lead',
        category: 'leads',
        entityType: 'lead',
        entityId: id,
        entityTitle: `${deleted.name} (${deleted.company || 'Direct'})`,
        ipAddress: getClientIp(request),
        summary: `${authUser.name} permanently deleted lead record for ${deleted.name} (${deleted.company || 'Direct'})`,
        before: { name: deleted.name, company: deleted.company, status: deleted.status, estimatedValue: deleted.estimatedValue }
      });
    } catch (logErr) {
      console.error('Non-critical: Failed to log activity for lead deletion:', logErr);
    }

    return NextResponse.json({ success: true, message: 'Lead deleted successfully' });
  } catch (error) {
    console.error('Error deleting lead:', error);
    return NextResponse.json({ success: false, message: 'Failed to delete lead' }, { status: 500 });
  }
}
