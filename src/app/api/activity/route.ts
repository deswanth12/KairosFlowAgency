import { NextRequest, NextResponse } from 'next/server';
import { filterActivityLogs, getAllActivityLogs } from '@/lib/audit';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category') || undefined;
    const userId = searchParams.get('userId') || undefined;
    const entityId = searchParams.get('entityId') || undefined;
    const search = searchParams.get('search') || undefined;
    const limitParam = searchParams.get('limit');
    const limit = limitParam ? parseInt(limitParam, 10) : 100;

    const logs = filterActivityLogs({
      category,
      userId,
      entityId,
      search,
      limit
    });

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
