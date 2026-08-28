import { NextRequest, NextResponse } from 'next/server';
import { saveLead } from '@/lib/storage';
import { checkRateLimit, rateLimitExceededResponse } from '@/lib/ratelimit';

export async function POST(request: NextRequest) {
  try {
    // 1. Rate Limiting (10 contact submissions per minute per IP to prevent bot spam)
    const rateLimit = checkRateLimit(request, 'contact', 10, 60000);
    if (!rateLimit.success) {
      return rateLimitExceededResponse(rateLimit);
    }

    const body = await request.json();
    const { name, company, email, phone, services, description, budget, timeline, referenceLinks, hearAbout } = body;

    if (!name || !email || !phone || !services || !description) {
      return NextResponse.json(
        {
          success: false,
          message: 'Please complete all required fields: Name, Email, Phone, Services, and Project Description.'
        },
        { status: 400 }
      );
    }

    // Basic email format check
    if (typeof email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        {
          success: false,
          message: 'Please provide a valid email address.'
        },
        { status: 400 }
      );
    }

    const lead = saveLead({
      name: String(name).trim(),
      company: company ? String(company).trim() : 'Not specified',
      email: String(email).trim().toLowerCase(),
      phone: String(phone).trim(),
      services: Array.isArray(services) ? services : [services],
      description: String(description).trim(),
      budget: budget ? String(budget).trim() : 'Flexible',
      timeline: timeline ? String(timeline).trim() : 'Flexible',
      referenceLinks: referenceLinks ? String(referenceLinks).trim() : '',
      hearAbout: hearAbout ? String(hearAbout).trim() : 'Direct Website'
    });

    return NextResponse.json({
      success: true,
      message: 'Thank you! Your project enquiry has been received. Our team will review and reply within 4 hours.',
      leadId: lead.id
    }, { status: 201 });
  } catch (error) {
    console.error('Contact API error:', error);
    return NextResponse.json({ success: false, message: 'Server error processing enquiry.' }, { status: 500 });
  }
}
