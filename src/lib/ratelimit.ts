import { NextRequest, NextResponse } from 'next/server';

// ---------------------------------------------------------------------------
// IP Resolution — Vercel-safe, not blindly trusting client headers
// ---------------------------------------------------------------------------
/**
 * Resolves the real client IP address in a Vercel/serverless environment.
 *
 * Priority:
 *  1. x-vercel-forwarded-for  — set by Vercel edge, cannot be spoofed
 *  2. x-real-ip               — set by Vercel/nginx, cannot be spoofed
 *  3. x-forwarded-for last entry — Vercel appends the real IP last
 *     (first entries are client-controlled and MUST NOT be trusted alone)
 *  4. Fallback '127.0.0.1'   — only for local dev
 *
 * IMPORTANT: Never use the FIRST x-forwarded-for entry alone — attackers
 * control it and can rotate it to bypass per-IP rate limits.
 */
export function getClientIp(request: Request | NextRequest): string {
  // Vercel-specific header — authoritative and cannot be spoofed by clients
  const vercelIp = request.headers.get('x-vercel-forwarded-for');
  if (vercelIp) return vercelIp.split(',')[0].trim();

  // nginx/load-balancer x-real-ip — set server-side
  const realIp = request.headers.get('x-real-ip');
  if (realIp) return realIp.trim();

  // x-forwarded-for: take the LAST entry (appended by trusted proxy), not first
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) {
    const parts = forwarded.split(',');
    return parts[parts.length - 1].trim();
  }

  return '127.0.0.1';
}

// ---------------------------------------------------------------------------
// In-memory rate limit store (local development only)
// Production uses Upstash Redis via the async limiter below.
// ---------------------------------------------------------------------------
interface RateLimitRecord {
  count: number;
  resetAt: number;
}

const localStore = new Map<string, RateLimitRecord>();

// Prune expired local entries every 5 minutes
if (typeof setInterval !== 'undefined') {
  setInterval(() => {
    const now = Date.now();
    for (const [key, record] of localStore.entries()) {
      if (now > record.resetAt) localStore.delete(key);
    }
  }, 5 * 60 * 1000);
}

// ---------------------------------------------------------------------------
// Result type
// ---------------------------------------------------------------------------
export interface RateLimitResult {
  success: boolean;
  limit: number;
  remaining: number;
  resetInMs: number;
}

// ---------------------------------------------------------------------------
// Production rate limiter — Upstash Redis atomic sliding window
// ---------------------------------------------------------------------------
async function checkRateLimitRedis(
  key: string,
  maxRequests: number,
  windowMs: number
): Promise<RateLimitResult> {
  const { Redis } = await import('@upstash/redis');
  const redis = new Redis({
    url: process.env.KV_REST_API_URL!,
    token: process.env.KV_REST_API_TOKEN!
  });

  const now = Date.now();
  const windowKey = `rl:${key}:${Math.floor(now / windowMs)}`;

  // Atomic increment + set expiry
  const count = await redis.incr(windowKey);
  if (count === 1) {
    await redis.pexpire(windowKey, windowMs);
  }

  const resetInMs = windowMs - (now % windowMs);

  if (count > maxRequests) {
    return { success: false, limit: maxRequests, remaining: 0, resetInMs };
  }
  return { success: true, limit: maxRequests, remaining: maxRequests - count, resetInMs };
}

// ---------------------------------------------------------------------------
// Local in-memory rate limiter (development)
// ---------------------------------------------------------------------------
function checkRateLimitLocal(
  key: string,
  maxRequests: number,
  windowMs: number
): RateLimitResult {
  const now = Date.now();
  const record = localStore.get(key);

  if (!record || now > record.resetAt) {
    localStore.set(key, { count: 1, resetAt: now + windowMs });
    return { success: true, limit: maxRequests, remaining: maxRequests - 1, resetInMs: windowMs };
  }

  if (record.count >= maxRequests) {
    return { success: false, limit: maxRequests, remaining: 0, resetInMs: Math.max(0, record.resetAt - now) };
  }

  record.count += 1;
  return { success: true, limit: maxRequests, remaining: maxRequests - record.count, resetInMs: Math.max(0, record.resetAt - now) };
}

// ---------------------------------------------------------------------------
// Public API — used by route handlers
// ---------------------------------------------------------------------------
export async function checkRateLimit(
  request: Request | NextRequest,
  keyPrefix: string,
  maxRequests: number,
  windowMs = 60000
): Promise<RateLimitResult> {
  const ip = getClientIp(request);
  const key = `${keyPrefix}:${ip}`;

  if (process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN) {
    try {
      return await checkRateLimitRedis(key, maxRequests, windowMs);
    } catch (err) {
      // Fail open on Redis error in dev — log but don't block
      console.error('Redis rate limit error (falling back to local):', err);
    }
  }
  return checkRateLimitLocal(key, maxRequests, windowMs);
}

export function rateLimitExceededResponse(result: RateLimitResult): NextResponse {
  const retryAfterSec = Math.ceil(result.resetInMs / 1000);
  return NextResponse.json(
    { success: false, message: `Too many requests. Please try again in ${retryAfterSec} seconds.` },
    {
      status: 429,
      headers: {
        'Retry-After': String(retryAfterSec),
        'X-RateLimit-Limit': String(result.limit),
        'X-RateLimit-Remaining': String(result.remaining),
        'X-RateLimit-Reset': String(Math.ceil((Date.now() + result.resetInMs) / 1000))
      }
    }
  );
}
