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

    const rateLimit = await checkRateLimit(request, 'ai-score', 60, 60000);
    if (!rateLimit.success) return rateLimitExceededResponse(rateLimit);

    const body = await request.json();
    const { name, company, description, budget, timeline, services } = body;

    const leadName = String(name || 'Client').trim();
    const cleanServices = Array.isArray(services) ? services.map(String) : [];
    const cleanDescription = String(description || `Exploring ${cleanServices.join(', ') || 'digital services'}`).trim();

    const result = await scoreLeadWithAI({
      name: leadName.substring(0, 200),
      company: String(company || '').substring(0, 200),
      description: cleanDescription.substring(0, 2000),
      budget: budget ? String(budget).substring(0, 100) : undefined,
      timeline: timeline ? String(timeline).substring(0, 100) : undefined,
      services: cleanServices
    });

    return NextResponse.json({
      success: true,
      score: result.score,
      source: result.source
    });
  } catch (error) {
    console.error('AI score-lead error:', error);
    return NextResponse.json({ success: false, message: 'Server error scoring lead' }, { status: 500 });
  }
}

