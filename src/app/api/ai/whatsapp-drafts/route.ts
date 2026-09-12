import { NextRequest, NextResponse } from 'next/server';
import { getAuthenticatedUser } from '@/lib/auth';
import { generateWhatsAppDrafts } from '@/lib/gemini';
import { checkRateLimit, rateLimitExceededResponse } from '@/lib/ratelimit';

export async function POST(request: NextRequest) {
  try {
    const authUser = getAuthenticatedUser(request);
    if (!authUser) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    const rateLimit = await checkRateLimit(request, 'ai-whatsapp', 20, 60000);
    if (!rateLimit.success) return rateLimitExceededResponse(rateLimit);

    const body = await request.json();
    const { name, company, services, budget, description, assignedTo } = body;

    if (!description || !name) {
      return NextResponse.json({ success: false, message: 'name and description required' }, { status: 400 });
    }

    const drafts = await generateWhatsAppDrafts({
      name: String(name).substring(0, 200),
      company: String(company || '').substring(0, 200),
      description: String(description).substring(0, 2000),
      budget: budget ? String(budget).substring(0, 100) : undefined,
      services: Array.isArray(services) ? services.map(String) : [],
      assignedTo: assignedTo ? String(assignedTo) : undefined
    });

    if (!drafts) {
      return NextResponse.json({ success: false, message: 'AI drafts unavailable' }, { status: 503 });
    }

    return NextResponse.json({ success: true, drafts });
  } catch (error) {
    console.error('AI whatsapp-drafts error:', error);
    return NextResponse.json({ success: false, message: 'Server error' }, { status: 500 });
  }
}
