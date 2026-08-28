import { NextResponse } from 'next/server';
import { saveLead } from '@/lib/storage';

export async function POST(request: Request) {
  try {
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

    const lead = saveLead({
      name,
      company: company || 'Not specified',
      email,
      phone,
      services: Array.isArray(services) ? services : [services],
      description,
      budget: budget || 'Flexible',
      timeline: timeline || 'Flexible',
      referenceLinks: referenceLinks || '',
      hearAbout: hearAbout || 'Direct'
    });

    return NextResponse.json({
      success: true,
      message: 'Thank you! Your project enquiry has been received. Our team will review and reply within 4 hours.',
      leadId: lead.id
    });
  } catch (error) {
    return NextResponse.json({ success: false, message: 'Server error processing enquiry.' }, { status: 500 });
  }
}
