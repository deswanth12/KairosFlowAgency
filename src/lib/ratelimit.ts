import { NextRequest, NextResponse } from 'next/server';

interface RateLimitRecord {
  count: number;
  resetAt: number;
}

// In-memory sliding window store with automatic garbage collection
const store = new Map<string, RateLimitRecord>();

// Prune expired entries every 5 minutes to prevent memory leak
if (typeof setInterval !== 'undefined') {
  setInterval(() => {
    const now = Date.now();
    for (const [key, record] of store.entries()) {
      if (now > record.resetAt) {
        store.delete(key);
      }
    }
  }, 5 * 60 * 1000);
}

export function getClientIp(request: Request | NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }
  const realIp = request.headers.get('x-real-ip');
  if (realIp) {
    return realIp.trim();
  }
  return '127.0.0.1';
}

export interface RateLimitResult {
  success: boolean;
  limit: number;
  remaining: number;
  resetInMs: number;
}

/**
 * Check and enforce rate limits on incoming API requests.
 * @param request NextRequest or standard Request
 * @param keyPrefix Unique bucket identifier (e.g. 'auth', 'contact', 'consultant')
 * @param maxRequests Max requests allowed within windowMs
 * @param windowMs Window duration in milliseconds (default: 60,000ms = 1 minute)
 */
export function checkRateLimit(
  request: Request | NextRequest,
  keyPrefix: string,
  maxRequests: number,
  windowMs: number = 60000
): RateLimitResult {
  const ip = getClientIp(request);
  const key = `${keyPrefix}:${ip}`;
  const now = Date.now();

  const record = store.get(key);

  if (!record || now > record.resetAt) {
    // New or expired window
    store.set(key, {
      count: 1,
      resetAt: now + windowMs
    });
    return {
      success: true,
      limit: maxRequests,
      remaining: maxRequests - 1,
      resetInMs: windowMs
    };
  }

  if (record.count >= maxRequests) {
    // Rate limit exceeded
    return {
      success: false,
      limit: maxRequests,
      remaining: 0,
      resetInMs: Math.max(0, record.resetAt - now)
    };
  }

  record.count += 1;
  return {
    success: true,
    limit: maxRequests,
    remaining: maxRequests - record.count,
    resetInMs: Math.max(0, record.resetAt - now)
  };
}

/**
 * Generates standard 429 Too Many Requests response with Retry-After header.
 */
export function rateLimitExceededResponse(result: RateLimitResult): NextResponse {
  const retryAfterSec = Math.ceil(result.resetInMs / 1000);
  return NextResponse.json(
    {
      success: false,
      message: `Too many requests. Please try again in ${retryAfterSec} seconds.`
    },
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
