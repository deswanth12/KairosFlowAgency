import { NextRequest, NextResponse } from 'next/server';
import { getAuthenticatedUser } from '@/lib/auth';
import { scoreLeadWithAI } from '@/lib/gemini';
import { checkRateLimit, rateLimitExceededResponse } from '@/lib/ratelimit';

export async function POST(request: NextRequest) {
  try {
    const authUser = getAuthenticatedUser(request);
    if (!authUser) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    const rateLimit = await checkRateLimit(request, 'ai-score', 30, 60000);
    if (!rateLimit.success) return rateLimitExceededResponse(rateLimit);

    const body = await request.json();
    const { name, company, description, budget, timeline, services } = body;

    if (!description || !name) {
      return NextResponse.json({ success: false, message: 'name and description required' }, { status: 400 });
    }

    const score = await scoreLeadWithAI({
      name: String(name).substring(0, 200),
      company: String(company || '').substring(0, 200),
      description: String(description).substring(0, 2000),
      budget: budget ? String(budget).substring(0, 100) : undefined,
      timeline: timeline ? String(timeline).substring(0, 100) : undefined,
      services: Array.isArray(services) ? services.map(String) : []
    });

    if (!score) {
      return NextResponse.json({ success: false, message: 'AI scoring unavailable' }, { status: 503 });
    }

    return NextResponse.json({ success: true, score });
  } catch (error) {
    console.error('AI score-lead error:', error);
    return NextResponse.json({ success: false, message: 'Server error' }, { status: 500 });
  }
}
