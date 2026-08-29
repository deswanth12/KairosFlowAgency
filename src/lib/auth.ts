import crypto from 'crypto';
import bcrypt from 'bcryptjs';
import { User, StoredUser, UserRole } from '@/types';
import { kvGet, kvSet, kvGetSync, kvSetSync, KV_KEYS } from './kv';

import fs from 'fs';
import path from 'path';

function readEnvVarFromFile(varName: string): string | undefined {
  try {
    for (const filename of ['.env.local', '.env.production', '.env']) {
      const filePath = path.join(process.cwd(), filename);
      if (fs.existsSync(filePath)) {
        const content = fs.readFileSync(filePath, 'utf-8');
        const lines = content.split(/\r?\n/);
        for (const line of lines) {
          const trimmed = line.trim();
          if (trimmed.startsWith(`${varName}=`)) {
            return trimmed.substring(varName.length + 1).trim();
          }
        }
      }
    }
  } catch {}
  return undefined;
}

// ---------------------------------------------------------------------------
// JWT Secret — MUST be set via environment variable.
// Fails closed: throws if missing. No hardcoded fallback.
// ---------------------------------------------------------------------------
export function getJwtSecret(): string {
  let secret = process.env.ADMIN_JWT_SECRET || readEnvVarFromFile('ADMIN_JWT_SECRET');
  if (secret) {
    secret = secret.trim().replace(/^['"]|['"]$/g, '');
  }
  if (!secret || secret.length < 32) {
    throw new Error(
      '[KAIROS CONFIG ERROR] ADMIN_JWT_SECRET environment variable is not set or is too short (< 32 chars). ' +
      'Set a strong random secret in your deployment environment. The application cannot start without it.'
    );
  }
  return secret;
}

// ---------------------------------------------------------------------------
// Password Hashing — bcrypt (cost 12), secure random salt per hash
// No JWT secret used as salt. No SHA-256 shortcuts.
// ---------------------------------------------------------------------------
const BCRYPT_COST = 12;

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, BCRYPT_COST);
}

export async function verifyPassword(
  password: string,
  storedHash: string
): Promise<boolean> {
  if (!password || !storedHash) return false;
  // Support bcrypt hashes ($2b$)
  if (storedHash.startsWith('$2b$') || storedHash.startsWith('$2a$')) {
    return bcrypt.compare(password, storedHash);
  }
  // Reject all other formats (old SHA-256 hashes are no longer accepted)
  return false;
}

// ---------------------------------------------------------------------------
// Default team user accounts — NO passwords in source code.
// Passwords MUST be set via TEAM_PASSWORD_HASHES environment variable.
//
// Format (JSON string):
//   {"usr-desvanth":"$2b$12$...","usr-basha":"$2b$12$...",...}
//
// Generate a hash with:  node -e "require('bcryptjs').hash('YourNewPass',12).then(console.log)"
// ---------------------------------------------------------------------------
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
    passwordHash: '' // Set via TEAM_PASSWORD_HASHES env var
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
    passwordHash: '' // Set via TEAM_PASSWORD_HASHES env var
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
    passwordHash: '' // Set via TEAM_PASSWORD_HASHES env var
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
    passwordHash: '' // Set via TEAM_PASSWORD_HASHES env var
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
    passwordHash: '' // Set via TEAM_PASSWORD_HASHES env var
  }
];

// ---------------------------------------------------------------------------
// Merge env-supplied bcrypt hashes into user records.
// TEAM_PASSWORD_HASHES = '{"usr-desvanth":"$2b$12$...","usr-basha":"$2b$12$..."}'
// ---------------------------------------------------------------------------
function applyEnvPasswordHashes(users: StoredUser[]): StoredUser[] {
  let raw = process.env.TEAM_PASSWORD_HASHES || readEnvVarFromFile('TEAM_PASSWORD_HASHES');
  if (!raw) return users;
  try {
    raw = raw.trim();
    while ((raw.startsWith("'") && raw.endsWith("'")) || (raw.startsWith('"') && raw.endsWith('"'))) {
      raw = raw.slice(1, -1).trim();
    }
    if (raw.includes('\\"')) {
      raw = raw.replace(/\\"/g, '"');
    }
    let parsed: any = JSON.parse(raw);
    if (typeof parsed === 'string') {
      parsed = JSON.parse(parsed);
    }
    const map: Record<string, string> = parsed;
    return users.map((u) => {
      if (map && map[u.id] && (map[u.id].startsWith('$2b$') || map[u.id].startsWith('$2a$'))) {
        return { ...u, passwordHash: map[u.id] };
      }
      return u;
    });
  } catch (err) {
    console.error('[KAIROS AUTH] Failed to parse TEAM_PASSWORD_HASHES:', err);
    return users;
  }
}

// ---------------------------------------------------------------------------
// User persistence — async (production KV) + sync (local dev)
// ---------------------------------------------------------------------------
export async function getUsersAsync(): Promise<StoredUser[]> {
  try {
    const stored = await kvGet<StoredUser[]>(KV_KEYS.USERS);
    if (!stored || !Array.isArray(stored) || stored.length === 0) {
      const defaults = applyEnvPasswordHashes(DEFAULT_TEAM_USERS);
      await kvSet(KV_KEYS.USERS, defaults);
      return defaults;
    }
    return applyEnvPasswordHashes(stored);
  } catch {
    return applyEnvPasswordHashes(DEFAULT_TEAM_USERS);
  }
}

export function getUsers(): StoredUser[] {
  try {
    const stored = kvGetSync<StoredUser[]>(KV_KEYS.USERS);
    if (!stored || !Array.isArray(stored) || stored.length === 0) {
      const defaults = applyEnvPasswordHashes(DEFAULT_TEAM_USERS);
      kvSetSync(KV_KEYS.USERS, defaults);
      return defaults;
    }
    return applyEnvPasswordHashes(stored);
  } catch {
    return applyEnvPasswordHashes(DEFAULT_TEAM_USERS);
  }
}

export async function saveUsersAsync(users: StoredUser[]): Promise<void> {
  await kvSet(KV_KEYS.USERS, users);
}

export function saveUsers(users: StoredUser[]): void {
  kvSetSync(KV_KEYS.USERS, users);
}

// ---------------------------------------------------------------------------
// Public user view — strips passwordHash and limits field exposure
// ---------------------------------------------------------------------------
export function getPublicUsers(currentRequesterId?: string): User[] {
  const users = getUsers();
  const now = Date.now();
  const ACTIVE_THRESHOLD_MS = 15 * 60 * 1000;

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
    return { ...user, isOnline: isCurrentlyOnline };
  });
}

/**
 * Minimal public team data for unauthenticated /api/users.
 * Only exposes: id, name, role, isOnline.
 * Does NOT expose email, lastLogin, lastActiveAt, status.
 */
export function getMinimalPublicUsers(): Pick<User, 'id' | 'name' | 'role' | 'isOnline'>[] {
  const users = getUsers();
  const now = Date.now();
  const ACTIVE_THRESHOLD_MS = 15 * 60 * 1000;

  return users.map((user) => {
    let isCurrentlyOnline = false;
    if (user.isOnline && user.lastActiveAt) {
      const lastActiveTime = new Date(user.lastActiveAt).getTime();
      if (now - lastActiveTime < ACTIVE_THRESHOLD_MS) {
        isCurrentlyOnline = true;
      }
    }
    return {
      id: user.id,
      name: user.name,
      role: user.role,
      isOnline: isCurrentlyOnline
    };
  });
}

export function findUserById(id: string): StoredUser | null {
  return getUsers().find((u) => u.id === id) || null;
}

export function findUserByEmail(email: string): StoredUser | null {
  return getUsers().find(
    (u) =>
      u.email.toLowerCase() === email.toLowerCase() ||
      u.name.toLowerCase() === email.toLowerCase()
  ) || null;
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
    console.error('Failed to update logout:', err);
  }
}

// ---------------------------------------------------------------------------
// Session Token (HMAC-SHA256 custom format)
// ---------------------------------------------------------------------------
export interface TokenPayload {
  userId: string;
  name: string;
  email: string;
  role: UserRole;
  exp: number;
}

export function createSessionToken(user: User): string {
  const secret = getJwtSecret(); // throws if missing
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
    const dotIndex = token.lastIndexOf('.');
    const payloadB64 = token.substring(0, dotIndex);
    const signature = token.substring(dotIndex + 1);

    const secret = getJwtSecret(); // throws if missing
    const expectedSignature = crypto
      .createHmac('sha256', secret)
      .update(payloadB64)
      .digest('base64url');

    // Constant-time comparison
    const sigBuf = Buffer.from(signature);
    const expBuf = Buffer.from(expectedSignature);
    if (sigBuf.length !== expBuf.length || !crypto.timingSafeEqual(sigBuf, expBuf)) {
      return null;
    }

    const payload: TokenPayload = JSON.parse(
      Buffer.from(payloadB64, 'base64url').toString('utf-8')
    );
    if (payload.exp < Date.now()) return null;
    return payload;
  } catch {
    return null;
  }
}

export function getAuthenticatedUser(req: Request): TokenPayload | null {
  try {
    const authHeader = req.headers.get('authorization') || '';
    let token = '';
    if (authHeader.startsWith('Bearer ')) {
      token = authHeader.substring(7).trim();
    } else {
      const cookieHeader = req.headers.get('cookie') || '';
      const match = cookieHeader.match(/kairos_admin_token=([^;]+)/);
      if (match) token = match[1].trim();
    }
    if (!token) return null;
    return verifySessionToken(token);
  } catch {
    return null;
  }
}

// ---------------------------------------------------------------------------
// RBAC Permissions Matrix
// ---------------------------------------------------------------------------
export function checkPermission(
  role: UserRole,
  action: 'manage_users' | 'delete_record' | 'manage_finance' | 'edit_all_leads' | 'view_leads' | 'view_activity'
): boolean {
  switch (role) {
    case 'Owner/Admin':
      return true;
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
