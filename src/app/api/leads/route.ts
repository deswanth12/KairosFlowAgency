import { NextResponse } from 'next/server';
import { getLeads, saveLead, updateLead, deleteLead } from '@/lib/storage';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const service = searchParams.get('service');
    const search = searchParams.get('search');

    let leads = getLeads();

    if (status && status !== 'All') {
      leads = leads.filter((l) => l.status === status);
    }

    if (service && service !== 'All') {
      leads = leads.filter((l) => l.services.includes(service));
    }

    if (search) {
      const q = search.toLowerCase();
      leads = leads.filter(
        (l) =>
          l.name.toLowerCase().includes(q) ||
          l.company.toLowerCase().includes(q) ||
          l.email.toLowerCase().includes(q) ||
          l.phone.toLowerCase().includes(q)
      );
    }

    return NextResponse.json({ success: true, count: leads.length, leads });
  } catch (error) {
    return NextResponse.json({ success: false, message: 'Failed to fetch leads' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, company, email, phone, services, description, budget, timeline, referenceLinks, hearAbout } = body;

    if (!name || !email || !phone || !services || !description) {
      return NextResponse.json(
        { success: false, message: 'Please fill in all required fields (Name, Email, Phone, Services, Description)' },
        { status: 400 }
      );
    }

    const newLead = saveLead({
      name,
      company: company || 'Individual / Founder',
      email,
      phone,
      services: Array.isArray(services) ? services : [services],
      description,
      budget,
      timeline,
      referenceLinks,
      hearAbout
    });

    return NextResponse.json({ success: true, message: 'Lead created successfully', lead: newLead }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, message: 'Failed to create lead' }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const { id, ...updates } = body;

    if (!id) {
      return NextResponse.json({ success: false, message: 'Lead ID is required' }, { status: 400 });
    }

    const updated = updateLead(id, updates);
    if (!updated) {
      return NextResponse.json({ success: false, message: 'Lead not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: 'Lead updated successfully', lead: updated });
  } catch (error) {
    return NextResponse.json({ success: false, message: 'Failed to update lead' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ success: false, message: 'Lead ID is required' }, { status: 400 });
    }

    const success = deleteLead(id);
    if (!success) {
      return NextResponse.json({ success: false, message: 'Lead not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: 'Lead deleted successfully' });
  } catch (error) {
    return NextResponse.json({ success: false, message: 'Failed to delete lead' }, { status: 500 });
  }
}
