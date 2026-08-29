import { NextRequest, NextResponse } from 'next/server';
import { queryConsultant } from '@/lib/rag';
import { checkRateLimit, rateLimitExceededResponse } from '@/lib/ratelimit';

const MAX_QUERY_LENGTH = 2000;

export async function POST(request: NextRequest) {
  try {
    // 1. Rate limiting (20 AI queries per minute per IP — Redis in production)
    const rateLimit = await checkRateLimit(request, 'consultant', 20, 60000);
    if (!rateLimit.success) {
      return rateLimitExceededResponse(rateLimit);
    }

    const body = await request.json();
    const { query } = body;

    if (!query || typeof query !== 'string' || !query.trim()) {
      return NextResponse.json(
        { success: false, message: 'A valid query string is required.' },
        { status: 400 }
      );
    }

    // 2. Enforce maximum query length
    if (query.length > MAX_QUERY_LENGTH) {
      return NextResponse.json(
        { success: false, message: `Query is too long. Maximum ${MAX_QUERY_LENGTH} characters allowed.` },
        { status: 400 }
      );
    }

    const response = queryConsultant(query.trim());

    return NextResponse.json({ success: true, data: response });
  } catch (error) {
    console.error('AI Consultant API error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to process inquiry with AI Consultant.' },
      { status: 500 }
    );
  }
}
