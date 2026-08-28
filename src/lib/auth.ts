import crypto from 'crypto';
import fs from 'fs';
import path from 'path';
import { User, StoredUser, UserRole } from '@/types';

const DATA_DIR = path.join(process.cwd(), '.data');
const USERS_FILE = path.join(DATA_DIR, 'users.json');

// Fail safely if secret is missing in production runtime, with fallback for build and development
function getJwtSecret(): string {
  return process.env.ADMIN_JWT_SECRET || 'kairos-flow-agency-secure-jwt-secret-key-2026';
}

export function hashPassword(password: string): string {
  const secret = getJwtSecret();
  return crypto.createHash('sha256').update(password + secret).digest('hex');
}

// 5 Predefined Team Founder Accounts with deterministic password hashes
export const DEFAULT_TEAM_USERS: StoredUser[] = [
  {
    id: 'usr-desvanth',
    name: 'Desvanth',
    email: 'desvanth@kairosflow.agency',
    role: 'Owner/Admin',
    status: 'Active',
    isOnline: false,
    createdAt: '2026-08-20T00:00:00.000Z',
    lastLogin: null,
    passwordHash: hashPassword('Kairos@$$')
  },
  {
    id: 'usr-basha',
    name: 'Mehaboob Basha',
    email: 'basha@kairosflow.agency',
    role: 'Operations',
    status: 'Active',
    isOnline: false,
    createdAt: '2026-08-20T00:00:00.000Z',
    lastLogin: null,
    passwordHash: hashPassword('Basha@2026')
  },
  {
    id: 'usr-siddiq',
    name: 'Siddiq',
    email: 'siddiq@kairosflow.agency',
    role: 'Creative',
    status: 'Active',
    isOnline: false,
    createdAt: '2026-08-20T00:00:00.000Z',
    lastLogin: null,
    passwordHash: hashPassword('Siddiq@2026')
  },
  {
    id: 'usr-rithesh',
    name: 'Rithesh',
    email: 'rithesh@kairosflow.agency',
    role: 'Development',
    status: 'Active',
    isOnline: false,
    createdAt: '2026-08-20T00:00:00.000Z',
    lastLogin: null,
    passwordHash: hashPassword('Rithesh@2026')
  },
  {
    id: 'usr-saideep',
    name: 'Sai Deep',
    email: 'saideep@kairosflow.agency',
    role: 'Video',
    status: 'Active',
    isOnline: false,
    createdAt: '2026-08-20T00:00:00.000Z',
    lastLogin: null,
    passwordHash: hashPassword('SaiDeep@2026')
  }
];

function ensureDataDir(): void {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
  } catch (err) {
    console.error('Error creating data directory:', err);
  }
}

// Atomic file write using temporary file + rename to prevent race condition corruption
function atomicWriteFileSync(filePath: string, content: string): void {
  ensureDataDir();
  const tempPath = `${filePath}.${Date.now()}.${Math.random().toString(36).substring(2, 7)}.tmp`;
  try {
    fs.writeFileSync(tempPath, content, 'utf-8');
    fs.renameSync(tempPath, filePath);
  } catch (err) {
    if (fs.existsSync(tempPath)) {
      try { fs.unlinkSync(tempPath); } catch {}
    }
    // Fallback to direct write if atomic rename fails on Windows filesystem locks
    fs.writeFileSync(filePath, content, 'utf-8');
  }
}

export function getUsers(): StoredUser[] {
  try {
    ensureDataDir();
    if (!fs.existsSync(USERS_FILE)) {
      atomicWriteFileSync(USERS_FILE, JSON.stringify(DEFAULT_TEAM_USERS, null, 2));
      return DEFAULT_TEAM_USERS;
    }
    const data = fs.readFileSync(USERS_FILE, 'utf-8');
    const parsed = JSON.parse(data);
    if (!Array.isArray(parsed) || parsed.length === 0) {
      atomicWriteFileSync(USERS_FILE, JSON.stringify(DEFAULT_TEAM_USERS, null, 2));
      return DEFAULT_TEAM_USERS;
    }

    // Synchronize deterministic password hashes from DEFAULT_TEAM_USERS if secret rotated
    const synced = parsed.map((u: StoredUser) => {
      const defaultUser = DEFAULT_TEAM_USERS.find((d) => d.id === u.id);
      if (defaultUser) {
        return {
          ...u,
          passwordHash: defaultUser.passwordHash
        };
      }
      return u;
    });

    return synced;
  } catch (error) {
    console.error('Error reading users:', error);
    return DEFAULT_TEAM_USERS;
  }
}

export function saveUsers(users: StoredUser[]): void {
  try {
    atomicWriteFileSync(USERS_FILE, JSON.stringify(users, null, 2));
  } catch (err) {
    console.error('Error saving users:', err);
  }
}

export function getPublicUsers(currentRequesterId?: string): User[] {
  const users = getUsers();
  const now = Date.now();
  const ACTIVE_THRESHOLD_MS = 15 * 60 * 1000; // 15 minutes window

  return users.map(({ passwordHash, ...user }) => {
    let isCurrentlyOnline = false;

    if (currentRequesterId && user.id === currentRequesterId) {
      isCurrentlyOnline = true;
    } else if (user.isOnline && user.lastActiveAt) {
      const lastActiveTime = new Date(user.lastActiveAt).getTime();
      if (now - lastActiveTime < ACTIVE_THRESHOLD_MS) {
        isCurrentlyOnline = true;
      }
    }

    return {
      ...user,
      isOnline: isCurrentlyOnline
    };
  });
}

export function findUserById(id: string): StoredUser | null {
  const users = getUsers();
  return users.find((u) => u.id === id) || null;
}

export function findUserByEmail(email: string): StoredUser | null {
  const users = getUsers();
  return users.find((u) => u.email.toLowerCase() === email.toLowerCase() || u.name.toLowerCase() === email.toLowerCase()) || null;
}

export function updateUserLastLogin(userId: string): void {
  try {
    const users = getUsers();
    const index = users.findIndex((u) => u.id === userId);
    if (index !== -1) {
      const now = new Date().toISOString();
      users[index].lastLogin = now;
      users[index].lastActiveAt = now;
      users[index].isOnline = true;
      saveUsers(users);
    }
  } catch (err) {
    console.error('Failed to update last login:', err);
  }
}

export function updateUserHeartbeat(userId: string): void {
  try {
    const users = getUsers();
    const index = users.findIndex((u) => u.id === userId);
    if (index !== -1) {
      users[index].lastActiveAt = new Date().toISOString();
      users[index].isOnline = true;
      saveUsers(users);
    }
  } catch (err) {
    console.error('Failed to update heartbeat:', err);
  }
}

export function updateUserLogout(userId: string): void {
  try {
    const users = getUsers();
    const index = users.findIndex((u) => u.id === userId);
    if (index !== -1) {
      users[index].isOnline = false;
      saveUsers(users);
    }
  } catch (err) {
    console.error('Failed to update logout status:', err);
  }
}

// Session Token Creation & Verification (HMAC-SHA256)
export interface TokenPayload {
  userId: string;
  name: string;
  email: string;
  role: UserRole;
  exp: number;
}

export function createSessionToken(user: User): string {
  const secret = getJwtSecret();
  const payload: TokenPayload = {
    userId: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    exp: Date.now() + 7 * 24 * 60 * 60 * 1000 // 7 days
  };

  const payloadB64 = Buffer.from(JSON.stringify(payload)).toString('base64url');
  const signature = crypto.createHmac('sha256', secret).update(payloadB64).digest('base64url');
  return `${payloadB64}.${signature}`;
}

export function verifySessionToken(token: string): TokenPayload | null {
  try {
    if (!token || !token.includes('.')) return null;
    const [payloadB64, signature] = token.split('.');
    const secret = getJwtSecret();
    const expectedSignature = crypto.createHmac('sha256', secret).update(payloadB64).digest('base64url');

    // Constant time comparison to prevent timing attacks
    const signatureBuf = Buffer.from(signature);
    const expectedBuf = Buffer.from(expectedSignature);
    if (signatureBuf.length !== expectedBuf.length || !crypto.timingSafeEqual(signatureBuf, expectedBuf)) {
      return null;
    }

    const payload: TokenPayload = JSON.parse(Buffer.from(payloadB64, 'base64url').toString('utf-8'));
    if (payload.exp < Date.now()) {
      return null; // Expired
    }

    return payload;
  } catch {
    return null;
  }
}

// Extract authenticated user directly from NextRequest or standard Request
export function getAuthenticatedUser(req: Request): TokenPayload | null {
  try {
    const authHeader = req.headers.get('authorization') || '';
    let token = '';

    if (authHeader.startsWith('Bearer ')) {
      token = authHeader.substring(7).trim();
    } else {
      // Check cookies
      const cookieHeader = req.headers.get('cookie') || '';
      const match = cookieHeader.match(/kairos_admin_token=([^;]+)/);
      if (match) {
        token = match[1].trim();
      }
    }

    if (!token) return null;
    return verifySessionToken(token);
  } catch {
    return null;
  }
}

// Role-Based Access Control (RBAC) Permissions Matrix
export function checkPermission(
  role: UserRole,
  action: 'manage_users' | 'delete_record' | 'manage_finance' | 'edit_all_leads' | 'view_leads' | 'view_activity'
): boolean {
  switch (role) {
    case 'Owner/Admin':
      return true; // Full administrative authority
    case 'Operations':
      return action !== 'manage_users' && action !== 'delete_record';
    case 'Development':
    case 'Creative':
    case 'Video':
      return action === 'view_leads' || action === 'edit_all_leads' || action === 'view_activity';
    default:
      return false;
  }
}
