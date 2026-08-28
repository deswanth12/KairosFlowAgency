import { NextRequest, NextResponse } from 'next/server';
import { 
  getUsers, 
  getPublicUsers, 
  hashPassword, 
  createSessionToken, 
  updateUserLastLogin,
  updateUserHeartbeat,
  updateUserLogout,
  findUserById,
  getAuthenticatedUser
} from '@/lib/auth';
import { logActivity } from '@/lib/audit';

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

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password, userId } = body;

    if (!password) {
      return NextResponse.json(
        { success: false, message: 'Password is required' },
        { status: 400 }
      );
    }

    const users = getUsers();
    const inputHash = hashPassword(password);

    // 1. Direct Master Pass Support (Authenticates as Desvanth)
    if (
      password === 'Kairos@$$' || 
      password === 'Desvanth@2026' || 
      (process.env.ADMIN_PASSWORD && password === process.env.ADMIN_PASSWORD)
    ) {
      const founder = users.find((u) => u.id === 'usr-desvanth') || users[0];
      updateUserLastLogin(founder.id);

      const token = createSessionToken(founder);
      
      try {
        logActivity({
          userId: founder.id,
          userName: founder.name,
          userRole: founder.role,
          action: 'User Logged In',
          category: 'auth',
          entityType: 'auth',
          entityId: founder.id,
          entityTitle: `${founder.name} (${founder.role})`,
          summary: `${founder.name} logged into Operations OS via Master Key`
        });
      } catch (logErr) {
        console.error('Non-critical: Audit logging on login failed:', logErr);
      }

      return NextResponse.json({
        success: true,
        token,
        user: {
          id: founder.id,
          name: founder.name,
          email: founder.email,
          role: founder.role,
          status: founder.status,
          isOnline: true,
          createdAt: founder.createdAt,
          lastLogin: new Date().toISOString()
        }
      });
    }

    // 2. Individual User Login by userId, name, or email
    let targetUser = null;
    if (userId) {
      targetUser = findUserById(userId);
    } else if (email) {
      targetUser = users.find(
        (u) =>
          u.email.toLowerCase() === email.toLowerCase() ||
          u.name.toLowerCase() === email.toLowerCase() ||
          u.id.toLowerCase() === email.toLowerCase()
      );
    }

    if (!targetUser) {
      return NextResponse.json(
        { success: false, message: 'User account not found. Please select your name.' },
        { status: 401 }
      );
    }

    // Check password match (allow individual password or Desvanth fallback)
    const isDesvanthMatch = targetUser.id === 'usr-desvanth' && (password === 'Kairos@$$' || password === 'Desvanth@2026');
    if (!isDesvanthMatch && targetUser.passwordHash !== inputHash) {
      return NextResponse.json(
        { success: false, message: 'Incorrect password for ' + targetUser.name },
        { status: 401 }
      );
    }

    if (targetUser.status === 'Inactive') {
      return NextResponse.json(
        { success: false, message: 'This account is currently inactive' },
        { status: 403 }
      );
    }

    updateUserLastLogin(targetUser.id);
    const token = createSessionToken(targetUser);

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
      { success: false, message: 'Server error during authentication: ' + (error instanceof Error ? error.message : String(error)) },
      { status: 500 }
    );
  }
}

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
