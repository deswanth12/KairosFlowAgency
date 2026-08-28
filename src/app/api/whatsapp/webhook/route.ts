import { NextResponse } from 'next/server';
import { queryConsultant } from '@/lib/rag';

// Verify token for Meta WhatsApp Business Webhooks
const WHATSAPP_VERIFY_TOKEN = process.env.WHATSAPP_VERIFY_TOKEN || 'KairosWhatsAppToken2026';

// 1. GET Handler: Meta Webhook Verification Challenge
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const mode = searchParams.get('hub.mode');
    const token = searchParams.get('hub.verify_token');
    const challenge = searchParams.get('hub.challenge');

    if (mode === 'subscribe' && token === WHATSAPP_VERIFY_TOKEN) {
      console.log('WhatsApp Webhook verified successfully.');
      return new Response(challenge, { status: 200 });
    }

    return NextResponse.json({ error: 'Verification failed' }, { status: 403 });
  } catch (error) {
    console.error('WhatsApp Webhook verification error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// 2. POST Handler: Incoming WhatsApp Messages Processed by RAG Engine
export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Check for Meta WhatsApp Cloud API payload format
    if (body.object === 'whatsapp_business_account') {
      const entries = body.entry || [];

      for (const entry of entries) {
        const changes = entry.changes || [];

        for (const change of changes) {
          const value = change.value;
          const messages = value.messages || [];

          for (const msg of messages) {
            if (msg.type === 'text') {
              const senderNumber = msg.from; // e.g. "917702256073"
              const incomingText = msg.text?.body || '';

              // Query RAG Knowledge Base
              const ragResult = queryConsultant(incomingText);

              console.log(`[WhatsApp RAG] Received from ${senderNumber}: "${incomingText}"`);
              console.log(`[WhatsApp RAG Answer]: ${ragResult.answer}`);

              // If Meta Access Token is present in environment, dispatch automatic WhatsApp reply
              if (process.env.WHATSAPP_ACCESS_TOKEN && process.env.WHATSAPP_PHONE_NUMBER_ID) {
                const replyText = `${ragResult.answer}\n\n*Recommendation:*\n${ragResult.recommendation || 'Let us know your project requirements.'}\n\n_— Kairos Flow AI Consultant_`;
                
                await fetch(`https://graph.facebook.com/v19.0/${process.env.WHATSAPP_PHONE_NUMBER_ID}/messages`, {
                  method: 'POST',
                  headers: {
                    'Authorization': `Bearer ${process.env.WHATSAPP_ACCESS_TOKEN}`,
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify({
                    messaging_product: 'whatsapp',
                    to: senderNumber,
                    text: { body: replyText }
                  })
                }).catch((err) => console.error('Failed to send WhatsApp message:', err));
              }
            }
          }
        }
      }

      return NextResponse.json({ success: true, status: 'processed' }, { status: 200 });
    }

    // Direct JSON test query payload support
    if (body.message || body.query) {
      const incomingText = body.message || body.query;
      const ragResult = queryConsultant(incomingText);

      return NextResponse.json({
        success: true,
        source: 'Kairos Flow RAG WhatsApp Webhook',
        query: incomingText,
        response: ragResult
      }, { status: 200 });
    }

    return NextResponse.json({ success: true, received: true }, { status: 200 });
  } catch (error) {
    console.error('WhatsApp Webhook error:', error);
    return NextResponse.json({ success: false, message: 'Webhook processing error' }, { status: 500 });
  }
}
