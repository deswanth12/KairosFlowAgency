import { NextResponse } from 'next/server';
import { queryConsultant } from '@/lib/rag';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { query } = body;

    if (!query || typeof query !== 'string' || !query.trim()) {
      return NextResponse.json({
        success: false,
        message: 'A valid query string is required.'
      }, { status: 400 });
    }

    const response = queryConsultant(query);

    return NextResponse.json({
      success: true,
      data: response
    });
  } catch (error) {
    console.error('AI Consultant API error:', error);
    return NextResponse.json({
      success: false,
      message: 'Failed to process inquiry with AI Consultant.'
    }, { status: 500 });
  }
}
