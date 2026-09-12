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
import os from 'os';

// ---------------------------------------------------------------------------
// Keys
// ---------------------------------------------------------------------------
export const KV_KEYS = {
  LEADS: 'kf:leads',
  USERS: 'kf:users',
  ACTIVITY_LOGS: 'kf:activity_logs',
} as const;

// ---------------------------------------------------------------------------
// Global In-Memory Store (persists across warm serverless invocations)
// ---------------------------------------------------------------------------
const memoryStore: Record<string, unknown> =
  (globalThis as any).__kf_memory_store || ((globalThis as any).__kf_memory_store = {});

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
// Local / Serverless Storage Resolution
// On Vercel / AWS Lambda, process.cwd() is strictly read-only (EROFS).
// os.tmpdir() (/tmp) is the only writable directory on serverless runtimes.
// ---------------------------------------------------------------------------
function getStorageDir(): string {
  if (process.env.VERCEL || process.env.AWS_LAMBDA_FUNCTION_NAME) {
    return path.join(os.tmpdir(), 'kairos_data');
  }
  return path.join(process.cwd(), '.data');
}

function ensureLocalDir(): string {
  const primaryDir = getStorageDir();
  try {
    if (!fs.existsSync(primaryDir)) {
      fs.mkdirSync(primaryDir, { recursive: true });
    }
    return primaryDir;
  } catch {
    // If primary directory fails (e.g. EROFS on Vercel), fall back to os.tmpdir()
    const tmpDir = path.join(os.tmpdir(), 'kairos_data');
    try {
      if (!fs.existsSync(tmpDir)) {
        fs.mkdirSync(tmpDir, { recursive: true });
      }
      return tmpDir;
    } catch {
      return primaryDir;
    }
  }
}

function localKeyToFile(key: string): string {
  const dir = ensureLocalDir();
  const safeName = key.replace(/[^a-z0-9_\-]/gi, '_');
  return path.join(dir, `${safeName}.json`);
}

function atomicLocalWrite(filePath: string, content: string): void {
  try {
    const tmp = `${filePath}.${Date.now()}.${Math.random().toString(36).substring(2, 7)}.tmp`;
    try {
      fs.writeFileSync(tmp, content, 'utf-8');
      fs.renameSync(tmp, filePath);
    } catch {
      if (fs.existsSync(tmp)) {
        try { fs.unlinkSync(tmp); } catch {}
      }
      fs.writeFileSync(filePath, content, 'utf-8');
    }
  } catch (err) {
    // Graceful degradation: log warning but never throw out of the adapter
    console.warn('[KV Storage] Disk write unavailable (using in-memory store):', err);
  }
}

function localGet<T>(key: string): T | null {
  // 1. Check in-memory store first
  if (key in memoryStore && memoryStore[key] !== undefined) {
    return memoryStore[key] as T;
  }

  // 2. Check active storage directory (e.g. /tmp/kairos_data or .data)
  try {
    const file = localKeyToFile(key);
    if (fs.existsSync(file)) {
      const parsed = JSON.parse(fs.readFileSync(file, 'utf-8')) as T;
      memoryStore[key] = parsed;
      return parsed;
    }
  } catch {}

  // 3. Fall back to local .data folder if available (e.g. seeded records)
  try {
    const fallbackFile = path.join(process.cwd(), '.data', `${key.replace(/[^a-z0-9_\-]/gi, '_')}.json`);
    if (fs.existsSync(fallbackFile)) {
      const parsed = JSON.parse(fs.readFileSync(fallbackFile, 'utf-8')) as T;
      memoryStore[key] = parsed;
      return parsed;
    }
  } catch {}

  return null;
}

function localSet(key: string, value: unknown): void {
  // Always update in-memory store immediately
  memoryStore[key] = value;

  // Persist to disk asynchronously/safely without throwing
  try {
    const file = localKeyToFile(key);
    atomicLocalWrite(file, JSON.stringify(value, null, 2));
  } catch (err) {
    console.warn('[KV Storage] localSet write skipped:', err);
  }
}

// ---------------------------------------------------------------------------
// Public interface — used by storage.ts / auth.ts / audit.ts
// ---------------------------------------------------------------------------

export async function kvGet<T>(key: string): Promise<T | null> {
  if (isProduction()) {
    try {
      const redis = await getRedis();
      const raw = await redis.get<string>(key);
      if (!raw) return localGet<T>(key);
      try {
        const parsed = (typeof raw === 'string' ? JSON.parse(raw) : raw) as T;
        memoryStore[key] = parsed;
        return parsed;
      } catch {
        memoryStore[key] = raw;
        return raw as unknown as T;
      }
    } catch (err) {
      console.error(`[KV Error] Failed to get key "${key}" from Redis (falling back to local/memory):`, err);
      return localGet<T>(key);
    }
  }
  return localGet<T>(key);
}

export async function kvSet(key: string, value: unknown): Promise<void> {
  // Always update memory store
  memoryStore[key] = value;

  if (isProduction()) {
    try {
      const redis = await getRedis();
      await redis.set(key, JSON.stringify(value));
      return;
    } catch (err) {
      console.error(`[KV Error] Failed to set key "${key}" in Redis (falling back to local/memory):`, err);
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
