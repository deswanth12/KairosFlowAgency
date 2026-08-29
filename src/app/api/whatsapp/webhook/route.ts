import { NextRequest, NextResponse } from 'next/server';
import { queryConsultant } from '@/lib/rag';
import crypto from 'crypto';

// ---------------------------------------------------------------------------
// WhatsApp Verify Token — MUST be set via environment variable
// Fails closed: 403 if not configured.
// ---------------------------------------------------------------------------
function getVerifyToken(): string {
  const token = process.env.WHATSAPP_VERIFY_TOKEN;
  if (!token || token.trim().length < 8) {
    throw new Error('[KAIROS CONFIG ERROR] WHATSAPP_VERIFY_TOKEN is not set or is too short.');
  }
  return token.trim();
}

// ---------------------------------------------------------------------------
// Meta Webhook Signature Verification (X-Hub-Signature-256)
// Verifies HMAC-SHA256 of the raw request body against the App Secret.
// ---------------------------------------------------------------------------
async function verifyMetaSignature(request: NextRequest, rawBody: string): Promise<boolean> {
  const appSecret = process.env.WHATSAPP_APP_SECRET;
  if (!appSecret) {
    // If app secret is not configured, skip signature verification
    // (acceptable for development; in production always set WHATSAPP_APP_SECRET)
    console.warn('[WhatsApp] WHATSAPP_APP_SECRET not set — skipping signature verification (not recommended in production)');
    return true;
  }

  const signature = request.headers.get('x-hub-signature-256');
  if (!signature || !signature.startsWith('sha256=')) {
    console.warn('[WhatsApp] Missing X-Hub-Signature-256 header');
    return false;
  }

  const expectedSig = 'sha256=' + crypto
    .createHmac('sha256', appSecret)
    .update(rawBody, 'utf-8')
    .digest('hex');

  // Constant-time comparison
  const sigBuf = Buffer.from(signature);
  const expBuf = Buffer.from(expectedSig);
  if (sigBuf.length !== expBuf.length) return false;
  return crypto.timingSafeEqual(sigBuf, expBuf);
}

// ---------------------------------------------------------------------------
// GET — Meta Webhook Verification Challenge
// ---------------------------------------------------------------------------
export async function GET(request: NextRequest) {
  try {
    let verifyToken: string;
    try {
      verifyToken = getVerifyToken();
    } catch {
      return NextResponse.json({ error: 'Webhook not configured' }, { status: 503 });
    }

    const { searchParams } = new URL(request.url);
    const mode = searchParams.get('hub.mode');
    const token = searchParams.get('hub.verify_token');
    const challenge = searchParams.get('hub.challenge');

    if (mode === 'subscribe' && token === verifyToken) {
      console.log('WhatsApp Webhook verified successfully.');
      return new Response(challenge, { status: 200 });
    }

    return NextResponse.json({ error: 'Verification failed' }, { status: 403 });
  } catch (error) {
    console.error('WhatsApp Webhook verification error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// ---------------------------------------------------------------------------
// POST — Incoming WhatsApp Messages (Meta Cloud API format only)
// The development convenience path (body.message / body.query) has been
// removed. Only verified Meta webhook payloads are processed.
// ---------------------------------------------------------------------------
export async function POST(request: NextRequest) {
  try {
    // Read raw body for signature verification
    const rawBody = await request.text();

    // Verify Meta signature
    const isValid = await verifyMetaSignature(request, rawBody);
    if (!isValid) {
      console.warn('[WhatsApp] Signature verification failed — rejecting request');
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    let body: unknown;
    try {
      body = JSON.parse(rawBody);
    } catch {
      return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
    }

    if (typeof body !== 'object' || body === null) {
      return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
    }

    const payload = body as Record<string, unknown>;

    // Only process legitimate Meta WhatsApp Business Account webhook payloads
    if (payload.object === 'whatsapp_business_account') {
      const entries = (payload.entry as unknown[]) || [];

      for (const entry of entries) {
        const changes = ((entry as Record<string, unknown>).changes as unknown[]) || [];
        for (const change of changes) {
          const value = (change as Record<string, unknown>).value as Record<string, unknown>;
          const messages = (value?.messages as unknown[]) || [];

          for (const msg of messages) {
            const msgObj = msg as Record<string, unknown>;
            if (msgObj.type === 'text') {
              const senderNumber = msgObj.from as string;
              const incomingText = (msgObj.text as Record<string, unknown>)?.body as string || '';

              if (!incomingText.trim()) continue;

              const ragResult = queryConsultant(incomingText);

              // Dispatch automatic WhatsApp reply if credentials are configured
              if (process.env.WHATSAPP_ACCESS_TOKEN && process.env.WHATSAPP_PHONE_NUMBER_ID) {
                const replyText = `${ragResult.answer}\n\n*Recommendation:*\n${ragResult.recommendation || 'Let us know your project requirements.'}\n\n_— Kairos Flow AI Consultant_`;
                await fetch(`https://graph.facebook.com/v19.0/${process.env.WHATSAPP_PHONE_NUMBER_ID}/messages`, {
                  method: 'POST',
                  headers: {
                    Authorization: `Bearer ${process.env.WHATSAPP_ACCESS_TOKEN}`,
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify({
                    messaging_product: 'whatsapp',
                    to: senderNumber,
                    text: { body: replyText }
                  })
                }).catch((err) => console.error('Failed to send WhatsApp reply:', err));
              }
            }
          }
        }
      }

      return NextResponse.json({ success: true, status: 'processed' }, { status: 200 });
    }

    // Unknown payload type — acknowledge receipt without processing
    return NextResponse.json({ success: true, received: true }, { status: 200 });
  } catch (error) {
    console.error('WhatsApp Webhook error:', error);
    return NextResponse.json({ success: false, message: 'Webhook processing error' }, { status: 500 });
  }
}
