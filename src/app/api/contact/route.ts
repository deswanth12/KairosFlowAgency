import { NextRequest, NextResponse } from 'next/server';
import { checkRateLimit, rateLimitExceededResponse } from '@/lib/ratelimit';
import { saveLeadAsync } from '@/lib/storage';

// Server-side input length limits
const MAX = {
  name: 200,
  company: 200,
  email: 320,
  phone: 30,
  description: 5000,
  budget: 100,
  timeline: 200,
  referenceLinks: 2000,
  hearAbout: 200,
};

function trim(value: unknown, max: number): string {
  return String(value ?? '').trim().substring(0, max);
}

export async function POST(request: NextRequest) {
  try {
    // 1. Rate limiting (10 contact submissions per minute per IP — Redis in production)
    const rateLimit = await checkRateLimit(request, 'contact', 10, 60000);
    if (!rateLimit.success) {
      return rateLimitExceededResponse(rateLimit);
    }

    const body = await request.json();
    const { name, company, email, phone, services, description, budget, timeline, referenceLinks, hearAbout } = body;

    // 2. Required field validation
    if (!name || !email || !phone || !services || !description) {
      return NextResponse.json(
        { success: false, message: 'Please complete all required fields: Name, Email, Phone, Services, and Project Description.' },
        { status: 400 }
      );
    }

    // 3. Length limits
    if (String(name).length > MAX.name) {
      return NextResponse.json({ success: false, message: 'Name is too long (max 200 characters).' }, { status: 400 });
    }
    if (String(description).length > MAX.description) {
      return NextResponse.json({ success: false, message: 'Description is too long (max 5000 characters).' }, { status: 400 });
    }
    if (String(phone).length > MAX.phone) {
      return NextResponse.json({ success: false, message: 'Phone number is too long.' }, { status: 400 });
    }

    // 4. Email format validation
    if (typeof email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { success: false, message: 'Please provide a valid email address.' },
        { status: 400 }
      );
    }

    // 5. Save lead with only whitelisted, sanitized fields
    const lead = await saveLeadAsync({
      name: trim(name, MAX.name),
      company: company ? trim(company, MAX.company) : 'Not specified',
      email: trim(email, MAX.email).toLowerCase(),
      phone: trim(phone, MAX.phone),
      services: Array.isArray(services) ? services.map((s: unknown) => String(s).substring(0, 100)).slice(0, 10) : [String(services).substring(0, 100)],
      description: trim(description, MAX.description),
      budget: budget ? trim(budget, MAX.budget) : 'Flexible',
      timeline: timeline ? trim(timeline, MAX.timeline) : 'Flexible',
      referenceLinks: referenceLinks ? trim(referenceLinks, MAX.referenceLinks) : '',
      hearAbout: hearAbout ? trim(hearAbout, MAX.hearAbout) : 'Direct Website'
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Thank you! Your project enquiry has been received. Our team will review and reply within 4 hours.',
        leadId: lead.id
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Contact API error:', error);
    return NextResponse.json({ success: false, message: 'Server error processing enquiry.' }, { status: 500 });
  }
}
