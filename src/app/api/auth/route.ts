import { NextRequest, NextResponse } from 'next/server';
import { 
  getUsers, 
  getPublicUsers, 
  hashPassword, 
  createSessionToken, 
  updateUserLastLogin,
  findUserById
} from '@/lib/auth';
import { logActivity } from '@/lib/audit';

export async function GET() {
  try {
    const users = getPublicUsers();
    return NextResponse.json({ success: true, users });
  } catch {
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
    if (password === 'Kairos@$$' || password === process.env.ADMIN_PASSWORD) {
      const founder = users.find((u) => u.id === 'usr-desvanth') || users[0];
      updateUserLastLogin(founder.id);

      const token = createSessionToken(founder);
      
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

      return NextResponse.json({
        success: true,
        token,
        user: {
          id: founder.id,
          name: founder.name,
          email: founder.email,
          role: founder.role,
          status: founder.status,
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
        { success: false, message: 'User account not found' },
        { status: 401 }
      );
    }

    if (targetUser.passwordHash !== inputHash) {
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

    return NextResponse.json({
      success: true,
      token,
      user: {
        id: targetUser.id,
        name: targetUser.name,
        email: targetUser.email,
        role: targetUser.role,
        status: targetUser.status,
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
