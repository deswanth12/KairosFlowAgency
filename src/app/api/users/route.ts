import { NextRequest, NextResponse } from 'next/server';
import { getMinimalPublicUsers } from '@/lib/auth';

/**
 * GET /api/users
 *
 * Public endpoint for the team page presence widget.
 * Returns ONLY: id, name, role, isOnline.
 * Does NOT expose: email, lastLogin, lastActiveAt, passwordHash, status.
 */
export async function GET() {
  try {
    const users = getMinimalPublicUsers();
    return NextResponse.json({ success: true, users });
  } catch (error) {
    console.error('Failed to fetch team users:', error);
    return NextResponse.json({ success: false, message: 'Failed to fetch users' }, { status: 500 });
  }
}
