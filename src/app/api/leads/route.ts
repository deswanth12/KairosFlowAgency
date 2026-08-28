import { NextRequest, NextResponse } from 'next/server';
import { getLeads, saveLead, updateLeadWithAudit, deleteLead } from '@/lib/storage';
import { getAuthenticatedUser, checkPermission } from '@/lib/auth';
import { logActivity, computeFieldDiffs } from '@/lib/audit';
import { ActivityAction, UserAuditRef } from '@/types';

// 1. GET: Retrieve all CRM leads (Requires Authentication)
export async function GET(request: NextRequest) {
  try {
    const authUser = getAuthenticatedUser(request);
    if (!authUser) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized: Authentication required to view CRM leads.' },
        { status: 401 }
      );
    }

    const leads = getLeads();
    return NextResponse.json({ success: true, leads });
  } catch (error) {
    console.error('Error fetching leads:', error);
    return NextResponse.json({ success: false, message: 'Failed to fetch leads' }, { status: 500 });
  }
}

// 2. POST: Manually create a CRM lead from Admin portal (Requires Authentication)
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

    const creator: UserAuditRef = {
      id: authUser.userId,
      name: authUser.name,
      role: authUser.role
    };

    const lead = saveLead({
      ...body,
      createdBy: creator
    });

    // Record Audit Log on Server with authentic user identity
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
        summary: `${creator.name} created new lead record for ${lead.name} at ${lead.company || 'Direct'}`,
        after: {
          status: lead.status,
          priority: lead.priority,
          assignedTo: lead.assignedTo,
          estimatedValue: lead.estimatedValue
        }
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

// 3. PATCH: Update CRM lead stage, details, or notes (Requires Authentication)
export async function PATCH(request: NextRequest) {
  try {
    const authUser = getAuthenticatedUser(request);
    if (!authUser) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized: Authentication required to modify CRM leads.' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { id, ...updates } = body;

    if (!id) {
      return NextResponse.json({ success: false, message: 'Lead ID is required' }, { status: 400 });
    }

    const updater: UserAuditRef = {
      id: authUser.userId,
      name: authUser.name,
      role: authUser.role
    };

    const result = updateLeadWithAudit(id, updates, updater);

    if (!result) {
      return NextResponse.json({ success: false, message: 'Lead not found' }, { status: 404 });
    }

    const { before, updated } = result;

    // Compute Exact Field-Level Diffs
    const fieldChanges = computeFieldDiffs(before, updated);

    // Determine Specific Action Type
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
    } else if (updates.notes && (!before.notes || updates.notes.length > before.notes.length)) {
      actionType = 'Added Note';
      summary = `${updater.name} added internal note to ${updated.name}`;
    }

    // Record Audit Log on Server with authenticated user identity
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
        summary,
        changes: fieldChanges,
        before: {
          status: before.status,
          priority: before.priority,
          assignedTo: before.assignedTo,
          estimatedValue: before.estimatedValue
        },
        after: {
          status: updated.status,
          priority: updated.priority,
          assignedTo: updated.assignedTo,
          estimatedValue: updated.estimatedValue
        }
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

// 4. DELETE: Delete a lead record (Strictly Requires Owner/Admin Role)
export async function DELETE(request: NextRequest) {
  try {
    const authUser = getAuthenticatedUser(request);
    if (!authUser) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized: Authentication required to delete records.' },
        { status: 401 }
      );
    }

    // Server-side role permission check
    if (!checkPermission(authUser.role, 'delete_record')) {
      return NextResponse.json(
        { success: false, message: 'Permission denied: Only Owner/Admin can delete records.' },
        { status: 403 }
      );
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ success: false, message: 'Lead ID is required' }, { status: 400 });
    }

    const deleted = deleteLead(id);

    if (!deleted) {
      return NextResponse.json({ success: false, message: 'Lead not found' }, { status: 404 });
    }

    // Record Deletion in Audit Trail
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
        summary: `${authUser.name} permanently deleted lead record for ${deleted.name} (${deleted.company || 'Direct'})`,
        before: {
          name: deleted.name,
          company: deleted.company,
          status: deleted.status,
          estimatedValue: deleted.estimatedValue
        }
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
