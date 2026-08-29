import { NextRequest, NextResponse } from 'next/server';
import {
  getUsers,
  getPublicUsers,
  verifyPassword,
  createSessionToken,
  updateUserLastLogin,
  updateUserHeartbeat,
  updateUserLogout,
  findUserById,
  findUserByEmail,
  getAuthenticatedUser
} from '@/lib/auth';
import { logActivity } from '@/lib/audit';
import { checkRateLimit, rateLimitExceededResponse, getClientIp } from '@/lib/ratelimit';

// GET — returns public user list (online presence for the team dashboard)
export async function GET(request: NextRequest) {
  try {
    const authUser = getAuthenticatedUser(request);
    if (authUser) {
      updateUserHeartbeat(authUser.userId);
    }
    const users = getPublicUsers(authUser?.userId);
    return NextResponse.json({ success: true, users });
  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json({ success: false, message: 'Failed to fetch users' }, { status: 500 });
  }
}

// POST — login
export async function POST(request: NextRequest) {
  try {
    // 1. Rate limiting (20 attempts per minute per IP, Redis-backed in production)
    const rateLimit = await checkRateLimit(request, 'auth', 20, 60000);
    if (!rateLimit.success) {
      return rateLimitExceededResponse(rateLimit);
    }

    const body = await request.json();
    const { email, userId, password } = body;

    if (!password || typeof password !== 'string') {
      return NextResponse.json(
        { success: false, message: 'Invalid credentials' },
        { status: 401 }
      );
    }

    const identifier = (email || userId || '').trim();
    if (!identifier || typeof identifier !== 'string') {
      return NextResponse.json(
        { success: false, message: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // 2. Find user by email, userId, or name
    const users = getUsers();
    let targetUser = users.find(
      (u) =>
        u.id === identifier ||
        u.email.toLowerCase() === identifier.toLowerCase() ||
        u.name.toLowerCase() === identifier.toLowerCase()
    ) || null;

    // Also allow lookup by internal id only if email matches exact format 'usr-*'
    // This is intentionally removed: client should not submit internal IDs

    if (!targetUser) {
      // Generic message — do not reveal whether user exists
      return NextResponse.json(
        { success: false, message: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // 3. Check account status BEFORE password verification (prevents info leak)
    if (targetUser.status === 'Inactive') {
      return NextResponse.json(
        { success: false, message: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // 4. Verify password with bcrypt
    if (!targetUser.passwordHash) {
      // Account has no password set yet — cannot log in
      return NextResponse.json(
        { success: false, message: 'Invalid credentials' },
        { status: 401 }
      );
    }

    const isPasswordValid = await verifyPassword(password, targetUser.passwordHash);

    if (!isPasswordValid) {
      // Generic message — do not reveal username validity
      return NextResponse.json(
        { success: false, message: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // 5. Update session & generate signed token
    updateUserLastLogin(targetUser.id);
    const token = createSessionToken(targetUser);

    const clientIp = getClientIp(request);

    try {
      logActivity({
        userId: targetUser.id,
        userName: targetUser.name,
        userRole: targetUser.role,
        action: 'User Logged In',
        category: 'auth',
        entityType: 'auth',
        entityId: targetUser.id,
        entityTitle: `${targetUser.name} (${targetUser.role})`,
        ipAddress: clientIp,
        summary: `${targetUser.name} authenticated into Operations OS`
      });
    } catch (logErr) {
      console.error('Non-critical: Audit logging on login failed:', logErr);
    }

    return NextResponse.json({
      success: true,
      token,
      user: {
        id: targetUser.id,
        name: targetUser.name,
        email: targetUser.email,
        role: targetUser.role,
        status: targetUser.status,
        isOnline: true,
        createdAt: targetUser.createdAt,
        lastLogin: new Date().toISOString()
      }
    });
  } catch (error) {
    console.error('Authentication error:', error);
    return NextResponse.json(
      { success: false, message: 'Server error during authentication' },
      { status: 500 }
    );
  }
}

// DELETE — logout
export async function DELETE(request: NextRequest) {
  try {
    const authUser = getAuthenticatedUser(request);
    if (authUser) {
      updateUserLogout(authUser.userId);
      try {
        logActivity({
          userId: authUser.userId,
          userName: authUser.name,
          userRole: authUser.role,
          action: 'User Logged Out',
          category: 'auth',
          entityType: 'auth',
          entityId: authUser.userId,
          entityTitle: `${authUser.name} (${authUser.role})`,
          ipAddress: getClientIp(request),
          summary: `${authUser.name} signed out of Operations OS`
        });
      } catch (logErr) {
        console.error('Non-critical: Audit logging on logout failed:', logErr);
      }
    }
    return NextResponse.json({ success: true, message: 'Signed out successfully' });
  } catch (error) {
    console.error('Logout error:', error);
    return NextResponse.json({ success: false, message: 'Failed to sign out' }, { status: 500 });
  }
}
