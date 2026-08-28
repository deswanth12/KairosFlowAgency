import { NextRequest, NextResponse } from 'next/server';
import { getPublicUsers } from '@/lib/auth';

export async function GET() {
  try {
    const users = getPublicUsers();
    return NextResponse.json({ success: true, users });
  } catch (error) {
    console.error('Failed to fetch team users:', error);
    return NextResponse.json({ success: false, message: 'Failed to fetch users' }, { status: 500 });
  }
}
