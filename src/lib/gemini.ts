import fs from 'fs';
import path from 'path';

/**
 * src/lib/gemini.ts
 * Resilient Gemini AI client with multi-model cascading and offline heuristic copilot.
 * Supported primary models: gemini-2.0-flash, gemini-1.5-flash, gemini-flash-latest.
 */

function getGeminiApiKey(): string {
  let key = process.env.GEMINI_API_KEY;
  if (!key) {
    try {
      for (const filename of ['.env.local', '.env.production', '.env']) {
        const filePath = path.join(process.cwd(), filename);
        if (fs.existsSync(filePath)) {
          const content = fs.readFileSync(filePath, 'utf-8');
          const lines = content.split(/\r?\n/);
          for (const line of lines) {
            const trimmed = line.trim();
            if (trimmed.startsWith('GEMINI_API_KEY=')) {
              key = trimmed.substring('GEMINI_API_KEY='.length).trim();
              break;
            }
          }
        }
        if (key) break;
      }
    } catch {}
  }
  return key?.replace(/^['"]|['"]$/g, '').trim() || '';
}

const GEMINI_MODELS = [
  'gemini-2.0-flash',
  'gemini-1.5-flash',
  'gemini-flash-latest'
] as const;

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
 * Call Gemini API across available models with graceful fallback.
 */
export async function callGemini(prompt: string, maxTokens = 2048): Promise<string | null> {
  const apiKey = getGeminiApiKey();
  if (!apiKey) {
    console.warn('[Gemini] GEMINI_API_KEY not found in environment or local files');
    return null;
  }

  for (const model of GEMINI_MODELS) {
    try {
      const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }], role: 'user' }],
          generationConfig: {
            maxOutputTokens: maxTokens,
            temperature: 0.3,
            topP: 0.95
          }
        }),
        signal: AbortSignal.timeout(12000)
      });

      if (!res.ok) {
        const errJson = await res.json().catch(() => null);
        console.warn(`[Gemini] Model ${model} returned status ${res.status}:`, errJson?.error?.message || res.statusText);
        continue;
      }

      const json: GeminiResponse = await res.json();
      if (json.error) {
        console.warn(`[Gemini] Model ${model} returned error:`, json.error.message);
        continue;
      }

      const text = json.candidates?.[0]?.content?.parts?.[0]?.text?.trim();
      if (text) {
        return text;
      }
    } catch (err) {
      console.warn(`[Gemini] Request to ${model} failed:`, err);
      continue;
    }
  }

  return null;
}

// ─── Offline Heuristic Engines (100% Reliability Guarantee) ──────────────────

export interface LeadScore {
  score: number;           // 1–10
  intent: 'Hot 🔥' | 'Warm 🌤' | 'Exploring 🔍';
  summary: string;         // one-line AI summary for kanban card
  confidence: 'high' | 'medium' | 'low';
}

export function generateFallbackDrafts(lead: {
  name: string;
  company?: string;
  services?: string[];
  budget?: string;
  description?: string;
  assignedTo?: string;
}): string[] {
  const founder = (lead.assignedTo || 'Desvanth').split(' ')[0];
  const clientName = lead.name && !['test', 'client', 'admin'].includes(lead.name.toLowerCase())
    ? lead.name
    : 'there';
  const companyContext = lead.company && lead.company !== 'Not specified' && lead.company.trim()
    ? `for ${lead.company}`
    : 'for your venture';
  const serviceText = lead.services && lead.services.length > 0
    ? lead.services.slice(0, 2).join(' & ')
    : 'digital product development';
  const budgetText = lead.budget && lead.budget !== 'Flexible' && lead.budget.trim()
    ? ` within your ${lead.budget} budget`
    : '';
  const rawBrief = (lead.description || '').replace(/\(test\)/gi, '').trim();
  const briefSummary = rawBrief.length > 5 ? rawBrief.substring(0, 60) : '';

  // 1. Direct & Scope-focused
  const pitch1 = `Hi ${clientName}, ${founder} here from Kairos Flow Agency. Thanks for reaching out regarding ${serviceText} ${companyContext}. We specialize in high-performance digital products${budgetText}. Are you free for a quick 10-minute discovery call this week to map out the scope?`;

  // 2. Consultative & Vision-focused
  const pitch2 = briefSummary
    ? `Hey ${clientName}! ${founder} from Kairos Flow here. Saw your note regarding "${briefSummary}". We love crafting clean, impactful digital experiences and I'd be glad to help bring this to life${budgetText}. Do you have any reference designs or an ideal timeline?`
    : `Hey ${clientName}! ${founder} from Kairos Flow here. Saw your inquiry regarding ${serviceText}. We love crafting clean, high-impact digital experiences and I'd be glad to help bring this to life. Do you have reference designs or an ideal launch timeline?`;

  // 3. Value & ROI-focused
  const pitch3 = `Hi ${clientName}, ${founder} from Kairos Flow. To ensure you get the highest ROI on your ${serviceText}${budgetText}, we can structure a phased delivery focusing on your core deliverables first. Would you like me to share our relevant case studies and a quick scope outline?`;

  return [pitch1, pitch2, pitch3];
}

export function scoreLeadFallback(lead: {
  name: string;
  company?: string;
  description?: string;
  budget?: string;
  timeline?: string;
  services?: string[];
}): LeadScore {
  const hasBudget = Boolean(lead.budget && lead.budget !== 'Flexible' && lead.budget !== 'Not specified' && lead.budget.trim());
  const descLen = (lead.description || '').trim().length;
  const hasServices = Boolean(lead.services && lead.services.length > 0);

  let score = 7;
  let intent: 'Hot 🔥' | 'Warm 🌤' | 'Exploring 🔍' = 'Warm 🌤';
  let summary = 'Active inbound inquiry; qualified for discovery call and scope consultation.';

  if (hasBudget && descLen >= 15) {
    score = 9;
    intent = 'Hot 🔥';
    summary = `High priority lead with defined scope and budget (${lead.budget}); recommend immediate outreach.`;
  } else if (hasBudget || descLen >= 25) {
    score = 8;
    intent = 'Hot 🔥';
    summary = `Strong buyer signals with clear ${hasServices ? lead.services?.[0] : 'service'} requirements.`;
  } else if (!hasBudget && descLen < 12) {
    score = 5;
    intent = 'Exploring 🔍';
    summary = 'Early discovery stage with brief requirements; qualification call recommended.';
  } else {
    score = 7;
    intent = 'Warm 🌤';
    summary = `Prospective client interested in ${lead.services?.join(', ') || 'digital services'}; high conversion potential.`;
  }

  return {
    score,
    intent,
    summary,
    confidence: 'high'
  };
}

// ─── Lead Scoring ────────────────────────────────────────────────────────────

export async function scoreLeadWithAI(lead: {
  name: string;
  company?: string;
  description?: string;
  budget?: string;
  timeline?: string;
  services?: string[];
}): Promise<{ score: LeadScore; source: 'gemini' | 'offline_copilot' }> {
  const servicesStr = (lead.services || []).join(', ') || 'Digital Products';
  const desc = lead.description || `Inquiry for ${servicesStr}`;

  const prompt = `You are a business development analyst for Kairos Flow Agency (a digital product studio in Tirupati, India).

Analyze this inbound client lead and return a JSON object ONLY — no explanation, no markdown, just raw JSON.

Lead Details:
- Name: ${lead.name}
- Company: ${lead.company || 'Not specified'}
- Services Requested: ${servicesStr}
- Budget: ${lead.budget || 'Not specified'}
- Timeline: ${lead.timeline || 'Not specified'}
- Project Description: "${desc}"

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

  try {
    const raw = await callGemini(prompt, 1024);
    if (raw) {
      const parsed = extractJson<LeadScore>(raw);
      if (
        parsed &&
        typeof parsed.score === 'number' &&
        typeof parsed.summary === 'string' &&
        ['Hot 🔥', 'Warm 🌤', 'Exploring 🔍'].includes(parsed.intent)
      ) {
        parsed.score = Math.min(10, Math.max(1, Math.round(parsed.score)));
        return { score: parsed, source: 'gemini' };
      }
    }
  } catch (err) {
    console.warn('[Gemini] scoreLeadWithAI API call failed, using offline copilot fallback:', err);
  }

  return {
    score: scoreLeadFallback(lead),
    source: 'offline_copilot'
  };
}

// ─── WhatsApp Draft Generator ─────────────────────────────────────────────────

export async function generateWhatsAppDrafts(lead: {
  name: string;
  company?: string;
  services?: string[];
  budget?: string;
  description?: string;
  assignedTo?: string;
}): Promise<{ drafts: string[]; source: 'gemini' | 'offline_copilot' }> {
  const founder = (lead.assignedTo || 'Desvanth').split(' ')[0];
  const servicesStr = (lead.services || []).join(', ') || 'digital product design & development';
  const desc = lead.description || `Inquiry for ${servicesStr}`;

  const prompt = `You are ${founder}, founder of Kairos Flow Agency — a premium digital product studio in Tirupati, India. You build web apps, mobile apps, AI pipelines, and brand design.

Write exactly 3 different WhatsApp opening messages for this inbound client lead. Each message should feel genuine, personal, and professional — not salesy. Keep each under 60 words.

Lead:
- Name: ${lead.name}
- Company: ${lead.company || 'their venture'}
- Services: ${servicesStr}
- Budget: ${lead.budget || 'not specified'}
- Description: "${desc}"

Return a JSON array of exactly 3 strings (the 3 messages). No code fences. No extra text. Just the raw JSON array.

Vary tone: [1] Direct & professional, [2] Warm & curious, [3] Value-led with a question`;

  try {
    const raw = await callGemini(prompt, 1024);
    if (raw) {
      const parsed = extractJson<string[]>(raw);
      if (Array.isArray(parsed) && parsed.length >= 1) {
        const cleaned = parsed.slice(0, 3).map((d) => String(d).trim()).filter(Boolean);
        if (cleaned.length >= 1) {
          return { drafts: cleaned, source: 'gemini' };
        }
      }
    }
  } catch (err) {
    console.warn('[Gemini] generateWhatsAppDrafts API call failed, using offline copilot fallback:', err);
  }

  return {
    drafts: generateFallbackDrafts(lead),
    source: 'offline_copilot'
  };
}

