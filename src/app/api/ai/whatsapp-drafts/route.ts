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

    const rateLimit = await checkRateLimit(request, 'ai-whatsapp', 60, 60000);
    if (!rateLimit.success) return rateLimitExceededResponse(rateLimit);

    const body = await request.json();
    const { name, company, services, budget, description, assignedTo } = body;

    const leadName = String(name || 'Client').trim();
    const cleanServices = Array.isArray(services) ? services.map(String) : [];
    const cleanDescription = String(description || `Exploring ${cleanServices.join(', ') || 'digital services'}`).trim();

    const result = await generateWhatsAppDrafts({
      name: leadName.substring(0, 200),
      company: String(company || '').substring(0, 200),
      description: cleanDescription.substring(0, 2000),
      budget: budget ? String(budget).substring(0, 100) : undefined,
      services: cleanServices,
      assignedTo: assignedTo ? String(assignedTo) : undefined
    });

    return NextResponse.json({
      success: true,
      drafts: result.drafts,
      source: result.source
    });
  } catch (error) {
    console.error('AI whatsapp-drafts error:', error);
    return NextResponse.json({ success: false, message: 'Server error generating drafts' }, { status: 500 });
  }
}

