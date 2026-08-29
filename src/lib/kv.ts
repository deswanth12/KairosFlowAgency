/**
 * Unified KV Storage Adapter
 *
 * Production: Upstash Redis (requires KV_REST_API_URL + KV_REST_API_TOKEN)
 * Development: Local JSON filesystem (when KV env vars are absent)
 *
 * API routes must import storage operations from storage.ts / auth.ts / audit.ts
 * which internally delegate here. Never import kv.ts directly from API routes.
 */

import fs from 'fs';
import path from 'path';

// ---------------------------------------------------------------------------
// Keys
// ---------------------------------------------------------------------------
export const KV_KEYS = {
  LEADS: 'kf:leads',
  USERS: 'kf:users',
  ACTIVITY_LOGS: 'kf:activity_logs',
} as const;

// ---------------------------------------------------------------------------
// Detect environment
// ---------------------------------------------------------------------------
function isProduction(): boolean {
  return !!(process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN);
}

// ---------------------------------------------------------------------------
// Upstash Redis HTTP client (lazy-loaded so it doesn't break dev builds)
// ---------------------------------------------------------------------------
async function getRedis() {
  const { Redis } = await import('@upstash/redis');
  return new Redis({
    url: process.env.KV_REST_API_URL!,
    token: process.env.KV_REST_API_TOKEN!,
  });
}

// ---------------------------------------------------------------------------
// Local JSON fallback (development only)
// ---------------------------------------------------------------------------
const LOCAL_DATA_DIR = path.join(process.cwd(), '.data');

function ensureLocalDir(): void {
  try {
    if (!fs.existsSync(LOCAL_DATA_DIR)) {
      fs.mkdirSync(LOCAL_DATA_DIR, { recursive: true });
    }
  } catch {}
}

function localKeyToFile(key: string): string {
  const safeName = key.replace(/[^a-z0-9_\-]/gi, '_');
  return path.join(LOCAL_DATA_DIR, `${safeName}.json`);
}

function atomicLocalWrite(filePath: string, content: string): void {
  ensureLocalDir();
  const tmp = `${filePath}.${Date.now()}.${Math.random().toString(36).substring(2, 7)}.tmp`;
  try {
    fs.writeFileSync(tmp, content, 'utf-8');
    fs.renameSync(tmp, filePath);
  } catch {
    if (fs.existsSync(tmp)) try { fs.unlinkSync(tmp); } catch {}
    fs.writeFileSync(filePath, content, 'utf-8');
  }
}

function localGet<T>(key: string): T | null {
  const file = localKeyToFile(key);
  try {
    if (!fs.existsSync(file)) return null;
    return JSON.parse(fs.readFileSync(file, 'utf-8')) as T;
  } catch {
    return null;
  }
}

function localSet(key: string, value: unknown): void {
  const file = localKeyToFile(key);
  atomicLocalWrite(file, JSON.stringify(value, null, 2));
}

// ---------------------------------------------------------------------------
// Public interface — used by storage.ts / auth.ts / audit.ts
// ---------------------------------------------------------------------------

export async function kvGet<T>(key: string): Promise<T | null> {
  if (isProduction()) {
    try {
      const redis = await getRedis();
      const raw = await redis.get<string>(key);
      if (!raw) return null;
      try {
        return (typeof raw === 'string' ? JSON.parse(raw) : raw) as T;
      } catch {
        return raw as unknown as T;
      }
    } catch (err) {
      console.error(`[KV Error] Failed to get key "${key}" from Redis (falling back to local):`, err);
      return localGet<T>(key);
    }
  }
  return localGet<T>(key);
}

export async function kvSet(key: string, value: unknown): Promise<void> {
  if (isProduction()) {
    try {
      const redis = await getRedis();
      await redis.set(key, JSON.stringify(value));
      return;
    } catch (err) {
      console.error(`[KV Error] Failed to set key "${key}" in Redis (falling back to local):`, err);
      localSet(key, value);
      return;
    }
  }
  localSet(key, value);
}

export function kvGetSync<T>(key: string): T | null {
  return localGet<T>(key);
}

export function kvSetSync(key: string, value: unknown): void {
  localSet(key, value);
}

export { isProduction };
