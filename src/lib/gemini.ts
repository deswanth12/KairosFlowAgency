/**
 * src/lib/gemini.ts
 * Thin Gemini API client — no SDK dependency, plain fetch.
 * Uses gemini-2.0-flash for fast, low-cost responses.
 */

const GEMINI_API_KEY = process.env.GEMINI_API_KEY || '';
const GEMINI_ENDPOINT = `https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent`;

interface GeminiPart {
  text: string;
}

interface GeminiContent {
  parts: GeminiPart[];
  role?: string;
}

interface GeminiResponse {
  candidates?: Array<{
    content: {
      parts: GeminiPart[];
    };
    finishReason?: string;
  }>;
  error?: {
    code: number;
    message: string;
  };
}

/**
 * Call Gemini with a plain text prompt and return the text response.
 * Returns null on any failure (safe to use in non-critical paths).
 */
/**
 * Robust JSON extraction from LLM response: finds the outermost JSON object or array.
 */
function extractJson<T>(raw: string): T | null {
  try {
    // 1. Try direct parse first
    const trimmed = raw.trim();
    if ((trimmed.startsWith('{') && trimmed.endsWith('}')) || (trimmed.startsWith('[') && trimmed.endsWith(']'))) {
      return JSON.parse(trimmed) as T;
    }

    // 2. Remove markdown code blocks
    const stripped = raw.replace(/```(?:json)?([\s\S]*?)```/gi, '$1').trim();
    if ((stripped.startsWith('{') && stripped.endsWith('}')) || (stripped.startsWith('[') && stripped.endsWith(']'))) {
      return JSON.parse(stripped) as T;
    }

    // 3. Find outermost JSON object {...}
    const objStart = raw.indexOf('{');
    const objEnd = raw.lastIndexOf('}');
    if (objStart !== -1 && objEnd > objStart) {
      return JSON.parse(raw.substring(objStart, objEnd + 1)) as T;
    }

    // 4. Find outermost JSON array [...]
    const arrStart = raw.indexOf('[');
    const arrEnd = raw.lastIndexOf(']');
    if (arrStart !== -1 && arrEnd > arrStart) {
      return JSON.parse(raw.substring(arrStart, arrEnd + 1)) as T;
    }

    return null;
  } catch {
    return null;
  }
}

/**
 * Call Gemini with a plain text prompt and return the text response.
 * Returns null on any failure (safe to use in non-critical paths).
 */
export async function callGemini(prompt: string, maxTokens = 2048): Promise<string | null> {
  if (!GEMINI_API_KEY) {
    console.warn('[Gemini] GEMINI_API_KEY not set — skipping AI call');
    return null;
  }

  try {
    const body: { contents: GeminiContent[]; generationConfig: Record<string, unknown> } = {
      contents: [{ parts: [{ text: prompt }], role: 'user' }],
      generationConfig: {
        maxOutputTokens: maxTokens,
        temperature: 0.3,
        topP: 0.95
      }
    };

    const res = await fetch(`${GEMINI_ENDPOINT}?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
      signal: AbortSignal.timeout(15000) // 15s max
    });

    const json: GeminiResponse = await res.json();

    if (json.error) {
      console.error('[Gemini] API error:', json.error.message);
      return null;
    }

    return json.candidates?.[0]?.content?.parts?.[0]?.text?.trim() ?? null;
  } catch (err) {
    console.error('[Gemini] Request failed:', err);
    return null;
  }
}

// ─── Lead Scoring ────────────────────────────────────────────────────────────

export interface LeadScore {
  score: number;           // 1–10
  intent: 'Hot 🔥' | 'Warm 🌤' | 'Exploring 🔍';
  summary: string;         // one-line AI summary for kanban card
  confidence: 'high' | 'medium' | 'low';
}

export async function scoreLeadWithAI(lead: {
  name: string;
  company: string;
  description: string;
  budget?: string;
  timeline?: string;
  services: string[];
}): Promise<LeadScore | null> {
  const prompt = `You are a business development analyst for Kairos Flow Agency (a digital product studio in Tirupati, India).

Analyze this inbound client lead and return a JSON object ONLY — no explanation, no markdown, just raw JSON.

Lead Details:
- Name: ${lead.name}
- Company: ${lead.company || 'Not specified'}
- Services Requested: ${lead.services.join(', ')}
- Budget: ${lead.budget || 'Not specified'}
- Timeline: ${lead.timeline || 'Not specified'}
- Project Description: "${lead.description}"

Return this exact JSON structure:
{
  "score": <integer 1-10 where 10 = highest priority, ideal client>,
  "intent": <one of exactly: "Hot 🔥" | "Warm 🌤" | "Exploring 🔍">,
  "summary": <one sharp sentence, max 16 words, describing the lead value>,
  "confidence": <one of: "high" | "medium" | "low">
}

Scoring criteria:
- 8-10 (Hot): Clear scope, realistic budget, defined timeline, serious buyer signals
- 5-7 (Warm): Some clarity, budget mentioned, wants to learn more
- 1-4 (Exploring): Vague, no budget, student/hobby project signals

Only return raw JSON.`;

  const raw = await callGemini(prompt, 2048);
  if (!raw) return null;

  const parsed = extractJson<LeadScore>(raw);
  if (
    parsed &&
    typeof parsed.score === 'number' &&
    typeof parsed.summary === 'string' &&
    ['Hot 🔥', 'Warm 🌤', 'Exploring 🔍'].includes(parsed.intent)
  ) {
    parsed.score = Math.min(10, Math.max(1, Math.round(parsed.score)));
    return parsed;
  }

  return null;
}

// ─── WhatsApp Draft Generator ─────────────────────────────────────────────────

export async function generateWhatsAppDrafts(lead: {
  name: string;
  company: string;
  services: string[];
  budget?: string;
  description: string;
  assignedTo?: string;
}): Promise<string[] | null> {
  const founder = lead.assignedTo || 'Desvanth';

  const prompt = `You are ${founder}, founder of Kairos Flow Agency — a premium digital product studio in Tirupati, India. You build web apps, mobile apps, AI pipelines, and brand design.

Write exactly 3 different WhatsApp opening messages for this inbound client lead. Each message should feel genuine, personal, and professional — not salesy. Keep each under 60 words.

Lead:
- Name: ${lead.name}
- Company: ${lead.company || 'their venture'}
- Services: ${lead.services.join(', ')}
- Budget: ${lead.budget || 'not specified'}
- Description: "${lead.description}"

Return a JSON array of exactly 3 strings (the 3 messages). No code fences. No extra text. Just the raw JSON array.

Vary tone: [1] Direct & professional, [2] Warm & curious, [3] Value-led with a question`;

  const raw = await callGemini(prompt, 2048);
  if (!raw) return null;

  const parsed = extractJson<string[]>(raw);
  if (Array.isArray(parsed) && parsed.length >= 1) {
    return parsed.slice(0, 3).map((d) => String(d).trim());
  }

  return null;
}
