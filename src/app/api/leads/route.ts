import { NextRequest, NextResponse } from 'next/server';
import { getLeads, saveLead, updateLeadWithAudit, deleteLead } from '@/lib/storage';
import { getAuthenticatedUser, checkPermission } from '@/lib/auth';
import { logActivity, computeFieldDiffs } from '@/lib/audit';
import { ActivityAction, UserAuditRef } from '@/types';

export async function GET(request: NextRequest) {
  try {
    const leads = getLeads();
    return NextResponse.json({ success: true, leads });
  } catch (error) {
    console.error('Error fetching leads:', error);
    return NextResponse.json({ success: false, message: 'Failed to fetch leads' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const authUser = getAuthenticatedUser(request);

    const creator: UserAuditRef = authUser
      ? { id: authUser.userId, name: authUser.name, role: authUser.role }
      : { id: 'usr-website', name: 'Website Client Brief', role: 'Operations' };

    const lead = saveLead({
      ...body,
      createdBy: creator
    });

    // Record Audit Log on Server
    logActivity({
      userId: creator.id,
      userName: creator.name,
      userRole: creator.role,
      action: 'Created Lead',
      category: 'leads',
      entityType: 'lead',
      entityId: lead.id,
      entityTitle: `${lead.name} (${lead.company})`,
      summary: `${creator.name} created new lead record for ${lead.name} at ${lead.company}`,
      after: {
        status: lead.status,
        priority: lead.priority,
        assignedTo: lead.assignedTo,
        estimatedValue: lead.estimatedValue
      }
    });

    return NextResponse.json({ success: true, lead });
  } catch (error) {
    console.error('Error creating lead:', error);
    return NextResponse.json({ success: false, message: 'Failed to create lead' }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const authUser = getAuthenticatedUser(request);
    const body = await request.json();
    const { id, ...updates } = body;

    if (!id) {
      return NextResponse.json({ success: false, message: 'Lead ID is required' }, { status: 400 });
    }

    // Default to Desvanth if session token not supplied in basic mode, or use authenticated user
    const updater: UserAuditRef = authUser
      ? { id: authUser.userId, name: authUser.name, role: authUser.role }
      : { id: 'usr-desvanth', name: 'Desvanth', role: 'Owner/Admin' };

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

    // Record Audit Log on Server
    logActivity({
      userId: updater.id,
      userName: updater.name,
      userRole: updater.role,
      action: actionType,
      category: 'leads',
      entityType: 'lead',
      entityId: updated.id,
      entityTitle: `${updated.name} (${updated.company})`,
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

    return NextResponse.json({ success: true, lead: updated, changes: fieldChanges });
  } catch (error) {
    console.error('Error updating lead:', error);
    return NextResponse.json({ success: false, message: 'Failed to update lead' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const authUser = getAuthenticatedUser(request);
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ success: false, message: 'Lead ID is required' }, { status: 400 });
    }

    // Check permissions
    if (authUser && !checkPermission(authUser.role, 'delete_record')) {
      return NextResponse.json(
        { success: false, message: 'Permission denied: Only Owner/Admin can delete records' },
        { status: 403 }
      );
    }

    const deleted = deleteLead(id);

    if (!deleted) {
      return NextResponse.json({ success: false, message: 'Lead not found' }, { status: 404 });
    }

    const operatorName = authUser?.name || 'Desvanth';
    const operatorRole = authUser?.role || 'Owner/Admin';
    const operatorId = authUser?.userId || 'usr-desvanth';

    // Record Deletion in Audit Trail
    logActivity({
      userId: operatorId,
      userName: operatorName,
      userRole: operatorRole,
      action: 'Deleted Lead',
      category: 'leads',
      entityType: 'lead',
      entityId: id,
      entityTitle: `${deleted.name} (${deleted.company})`,
      summary: `${operatorName} permanently deleted lead record for ${deleted.name} (${deleted.company})`,
      before: {
        name: deleted.name,
        company: deleted.company,
        status: deleted.status,
        estimatedValue: deleted.estimatedValue
      }
    });

    return NextResponse.json({ success: true, message: 'Lead deleted successfully' });
  } catch (error) {
    console.error('Error deleting lead:', error);
    return NextResponse.json({ success: false, message: 'Failed to delete lead' }, { status: 500 });
  }
}
