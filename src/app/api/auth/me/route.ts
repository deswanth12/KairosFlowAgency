import { NextRequest, NextResponse } from 'next/server';
import { getAuthenticatedUser } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    const user = getAuthenticatedUser(request);
    if (!user) {
      return NextResponse.json({ success: false, message: 'Unauthenticated' }, { status: 401 });
    }

    return NextResponse.json({
      success: true,
      user: {
        id: user.userId,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch {
    return NextResponse.json({ success: false, message: 'Server error' }, { status: 500 });
  }
}
