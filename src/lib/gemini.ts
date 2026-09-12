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

export function normalizeInrBudget(budgetInput?: string): string {
  if (!budgetInput) return '';
  let str = budgetInput.trim();
  if (!str || str === 'Flexible' || str === 'Not specified') return '';

  // If old hardcoded USD range was present: '$5,000 – $10,000' or similar
  if (str.includes('$5,000') || str.includes('$10,000') || str.includes('$2,500')) {
    return '₹50,000';
  }

  // If any other '$' exists, convert '$' to '₹'
  if (str.includes('$')) {
    str = str.replace(/\$/g, '₹');
  }

  // Ensure '₹' prefix for numbers
  if (/^\d[\d,]*(k|lakh|cr)?$/i.test(str)) {
    return `₹${str}`;
  }

  return str.startsWith('₹') ? str : `₹${str}`;
}

export function detectServiceFromBrief(description: string, existingServices: string[] = []): {
  serviceTitle: string;
  isVideo: boolean;
  isApp: boolean;
  isAi: boolean;
  isDesign: boolean;
  isWeb: boolean;
} {
  const text = (description || '').toLowerCase();

  // Video & Editing keywords
  if (/\b(editor|editing|video|reels?|vlog|youtube|cinematography|post-production|colour grading|color grading|motion graphics|clip|shorts?)\b/i.test(text)) {
    return {
      serviceTitle: 'Video Editing & Content Production',
      isVideo: true,
      isApp: false,
      isAi: false,
      isDesign: false,
      isWeb: false
    };
  }

  // Mobile App keywords
  if (/\b(mobile app|ios app|android app|flutter|react native|app store|play store)\b/i.test(text)) {
    return {
      serviceTitle: 'Mobile App Development',
      isVideo: false,
      isApp: true,
      isAi: false,
      isDesign: false,
      isWeb: false
    };
  }

  // AI & Automation keywords
  if (/\b(ai|automation|agent|bot|rag|llm|workflow|chatgpt|claude|gemini|scraper|pipeline)\b/i.test(text)) {
    return {
      serviceTitle: 'AI & Automation Pipelines',
      isVideo: false,
      isApp: false,
      isAi: true,
      isDesign: false,
      isWeb: false
    };
  }

  // Design & Branding keywords
  if (/\b(logo|branding|brand identity|ui\/ux|figma|graphic design|redesign|typography)\b/i.test(text)) {
    return {
      serviceTitle: 'UI/UX & Brand Identity',
      isVideo: false,
      isApp: false,
      isAi: false,
      isDesign: true,
      isWeb: false
    };
  }

  // Web Development keywords
  if (/\b(website|web app|landing page|ecommerce|shopify|nextjs|react|frontend|backend)\b/i.test(text)) {
    return {
      serviceTitle: 'Web Development',
      isVideo: false,
      isApp: false,
      isAi: false,
      isDesign: false,
      isWeb: true
    };
  }

  // Fall back to existing services or default
  if (existingServices && existingServices.length > 0) {
    const first = existingServices[0];
    if (first === 'Video & Content') {
      return {
        serviceTitle: 'Video Editing & Content Production',
        isVideo: true,
        isApp: false,
        isAi: false,
        isDesign: false,
        isWeb: false
      };
    }
    return {
      serviceTitle: first,
      isVideo: false,
      isApp: first === 'App Development',
      isAi: first === 'AI & Automation',
      isDesign: first === 'UI/UX & Branding',
      isWeb: first === 'Web Development'
    };
  }

  return {
    serviceTitle: 'Digital Solutions',
    isVideo: false,
    isApp: false,
    isAi: false,
    isDesign: false,
    isWeb: false
  };
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

  const inrBudget = normalizeInrBudget(lead.budget);
  const budgetText = inrBudget ? ` within your ${inrBudget} budget` : '';

  const rawBrief = (lead.description || '').replace(/\(test\)/gi, '').trim();
  const detection = detectServiceFromBrief(rawBrief, lead.services);

  if (detection.isVideo) {
    const pitch1 = `Hi ${clientName}, ${founder} here from Kairos Flow Agency. Thanks for reaching out regarding video editing & post-production ${companyContext}. We edit high-retention social content, YouTube productions, and brand commercials${budgetText}. Are you free for a quick 10-minute discovery call this week to review your raw footage and style requirements?`;

    const pitch2 = `Hey ${clientName}! ${founder} from Kairos Flow here. Saw your note that you're looking for a video editor ${companyContext}. We craft sharp, engaging video edits with cinematic color grading and fast turnaround${budgetText}. Do you have reference links or sample edits in mind?`;

    const pitch3 = `Hi ${clientName}, ${founder} from Kairos Flow. To ensure maximum retention and visual polish for your video content${budgetText}, we can set up a dedicated editing sprint or ongoing monthly package. Would you like me to share our recent editing portfolio and turnaround timeline?`;

    return [pitch1, pitch2, pitch3];
  }

  // Non-video fallback with detected service & INR budget
  const serviceText = detection.serviceTitle;
  const briefSummary = rawBrief.length > 5 ? rawBrief.substring(0, 60) : '';

  // 1. Direct & Scope-focused
  const pitch1 = `Hi ${clientName}, ${founder} here from Kairos Flow Agency. Thanks for reaching out regarding ${serviceText} ${companyContext}. We specialize in high-performance digital products${budgetText}. Are you free for a quick 10-minute discovery call this week to map out the scope?`;

  // 2. Consultative & Vision-focused
  const pitch2 = briefSummary
    ? `Hey ${clientName}! ${founder} from Kairos Flow here. Saw your note regarding "${briefSummary}". We love crafting clean, impactful digital experiences and I'd be glad to help bring this to life${budgetText}. Do you have any reference designs or an ideal timeline?`
    : `Hey ${clientName}! ${founder} from Kairos Flow here. Saw your inquiry regarding ${serviceText}. We love crafting clean, high-impact digital experiences and I'd be glad to help bring this to life${budgetText}. Do you have reference designs or an ideal launch timeline?`;

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
  const inrBudget = normalizeInrBudget(lead.budget);
  const hasBudget = Boolean(inrBudget);
  const descLen = (lead.description || '').trim().length;
  const detection = detectServiceFromBrief(lead.description || '', lead.services);

  let score = 7;
  let intent: 'Hot 🔥' | 'Warm 🌤' | 'Exploring 🔍' = 'Warm 🌤';
  let summary = `Active inquiry for ${detection.serviceTitle}; qualified for discovery call.`;

  if (hasBudget && descLen >= 10) {
    score = 9;
    intent = 'Hot 🔥';
    summary = `High priority ${detection.serviceTitle} lead with defined scope and budget (${inrBudget}); recommend immediate outreach.`;
  } else if (hasBudget || descLen >= 20) {
    score = 8;
    intent = 'Hot 🔥';
    summary = `Strong buyer signals for ${detection.serviceTitle}; ready for scope review.`;
  } else if (!hasBudget && descLen < 10) {
    score = 5;
    intent = 'Exploring 🔍';
    summary = 'Initial inquiry with brief scope; qualification call recommended.';
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
  const desc = lead.description || '';
  const detection = detectServiceFromBrief(desc, lead.services);
  const inrBudget = normalizeInrBudget(lead.budget) || '₹50,000';

  const prompt = `You are a business development analyst for Kairos Flow Agency (a digital product studio in Tirupati, India).

Analyze this inbound client lead and return a JSON object ONLY — no explanation, no markdown, just raw JSON.

Lead Details:
- Name: ${lead.name}
- Company: ${lead.company || 'Not specified'}
- Detected Service: ${detection.serviceTitle}
- Budget: ${inrBudget} (Indian Rupees)
- Timeline: ${lead.timeline || 'Not specified'}
- Project Description: "${desc}"

CRITICAL: All monetary references must be in Indian Rupees (INR / ₹) — NEVER USD ($).

Return this exact JSON structure:
{
  "score": <integer 1-10 where 10 = highest priority, ideal client>,
  "intent": <one of exactly: "Hot 🔥" | "Warm 🌤" | "Exploring 🔍">,
  "summary": <one sharp sentence, max 16 words, describing the lead value in INR>,
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
  const brief = lead.description || '';
  const detection = detectServiceFromBrief(brief, lead.services);
  const inrBudget = normalizeInrBudget(lead.budget) || '₹50,000';

  const prompt = `You are ${founder}, founder of Kairos Flow Agency — a premium digital product and creative studio in Tirupati, India. You build web apps, mobile apps, AI pipelines, brand design, and commercial video editing & production.

Write exactly 3 different WhatsApp opening messages for this inbound client lead. Each message should feel genuine, personal, and professional — not salesy. Keep each under 60 words.

Lead:
- Name: ${lead.name}
- Company: ${lead.company || 'their venture'}
- Detected Service: ${detection.serviceTitle}
- Budget: ${inrBudget} (Indian Rupees)
- Description: "${brief}"

CRITICAL INSTRUCTIONS:
1. SERVICE ACCURACY: If the client asks for an "editor", "video editing", or "reels", tailor the pitch specifically to VIDEO EDITING & POST-PRODUCTION (DO NOT pitch web development if they need an editor).
2. CURRENCY IN INR: ALL currency amounts MUST be in Indian Rupees (INR / ₹) — NEVER mention USD or '$'. If mentioning budget, write in ₹ (e.g. ${inrBudget}).
3. FOUNDER TONE: Sound natural, direct, and professional. Offer a quick 10-minute discovery call or portfolio review.

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


