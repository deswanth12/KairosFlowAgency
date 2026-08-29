import { NextRequest, NextResponse } from 'next/server';
import { filterActivityLogs, getAllActivityLogs } from '@/lib/audit';
import { getAuthenticatedUser } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    const authUser = getAuthenticatedUser(request);
    if (!authUser) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized: Authentication required to view audit logs.' },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category') || undefined;
    const userId = searchParams.get('userId') || undefined;
    const entityId = searchParams.get('entityId') || undefined;
    const search = searchParams.get('search') || undefined;

    // Server enforces max limit of 500 regardless of client request
    const limitParam = searchParams.get('limit');
    const requestedLimit = limitParam ? parseInt(limitParam, 10) : 100;
    const limit = isNaN(requestedLimit) ? 100 : Math.min(Math.max(1, requestedLimit), 500);

    const logs = filterActivityLogs({ category, userId, entityId, search, limit });

    return NextResponse.json({
      success: true,
      logs,
      totalCount: getAllActivityLogs().length
    });
  } catch (error) {
    console.error('Failed to query activity logs:', error);
    return NextResponse.json({ success: false, message: 'Failed to query activity logs' }, { status: 500 });
  }
}
