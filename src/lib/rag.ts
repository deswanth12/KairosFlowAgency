import fs from 'fs';
import path from 'path';

export interface RAGChunk {
  id: string;
  category: string;
  documentTitle: string;
  sectionTitle: string;
  content: string;
  tags: string[];
}

export interface ConsultantAction {
  label: string;
  href: string;
  isExternal?: boolean;
}

export interface ConsultantResponse {
  answer: string;
  recommendation?: string;
  nextActionPrompt?: string;
  suggestedFollowUps?: string[];
  confidence: 'high' | 'medium' | 'low';
  sources: Array<{
    title: string;
    section: string;
    file: string;
  }>;
  actionButtons: ConsultantAction[];
  qualification?: {
    detectedService?: string;
    detectedIndustry?: string;
    estimatedScope?: 'Small' | 'Medium' | 'Large';
    suggestedBudget?: string;
    suggestedTimeline?: string;
  };
}

const KNOWLEDGE_DIR = path.join(process.cwd(), 'knowledge');
let cachedChunks: RAGChunk[] | null = null;

// Stopwords for cleaner semantic tokenization
const STOPWORDS = new Set([
  'a', 'about', 'above', 'after', 'again', 'against', 'all', 'am', 'an', 'and', 'any', 'are', 'aren\'t', 'as', 'at',
  'be', 'because', 'been', 'before', 'being', 'below', 'between', 'both', 'but', 'by',
  'can', 'can\'t', 'cannot', 'could', 'couldn\'t', 'did', 'didn\'t', 'do', 'does', 'doesn\'t', 'doing', 'don\'t', 'down', 'during',
  'each', 'few', 'for', 'from', 'further', 'had', 'hadn\'t', 'has', 'hasn\'t', 'have', 'haven\'t', 'having', 'he', 'he\'d', 'he\'ll', 'he\'s', 'her', 'here', 'here\'s', 'hers', 'herself', 'him', 'himself', 'his', 'how', 'how\'s',
  'i', 'i\'d', 'i\'ll', 'i\'m', 'i\'ve', 'if', 'in', 'into', 'is', 'isn\'t', 'it', 'it\'s', 'its', 'itself',
  'let\'s', 'me', 'more', 'most', 'mustn\'t', 'my', 'myself',
  'no', 'nor', 'not', 'of', 'off', 'on', 'once', 'only', 'or', 'other', 'ought', 'our', 'ours', 'ourselves', 'out', 'over', 'own',
  'same', 'shan\'t', 'she', 'she\'d', 'she\'ll', 'she\'s', 'should', 'shouldn\'t', 'so', 'some', 'such',
  'than', 'that', 'that\'s', 'the', 'their', 'theirs', 'them', 'themselves', 'then', 'there', 'there\'s', 'these', 'they', 'they\'d', 'they\'ll', 'they\'re', 'they\'ve', 'this', 'those', 'through', 'to', 'too',
  'under', 'until', 'up', 'very',
  'was', 'wasn\'t', 'we', 'we\'d', 'we\'ll', 'we\'re', 'we\'ve', 'were', 'weren\'t', 'what', 'what\'s', 'when', 'when\'s', 'where', 'where\'s', 'which', 'while', 'who', 'who\'s', 'whom', 'why', 'why\'s', 'with', 'won\'t', 'would', 'wouldn\'t',
  'you', 'you\'d', 'you\'ll', 'you\'re', 'you\'ve', 'your', 'yours', 'yourself', 'yourselves'
]);

// Semantic Synonym Map to bridge natural user queries with technical knowledge
const SYNONYM_MAP: Record<string, string[]> = {
  // Services
  'website': ['web', 'nextjs', 'development', 'frontend', 'landing', 'fullstack'],
  'site': ['web', 'nextjs', 'development', 'landing'],
  'shop': ['ecommerce', 'web', 'store', 'checkout', 'stripe'],
  'ecommerce': ['web', 'shop', 'store', 'products', 'stripe'],
  'app': ['mobile', 'ios', 'android', 'reactnative', 'flutter', 'application'],
  'mobile': ['app', 'ios', 'android', 'reactnative', 'flutter'],
  'ios': ['app', 'mobile', 'apple', 'swift', 'reactnative'],
  'android': ['app', 'mobile', 'playstore', 'flutter', 'reactnative'],
  'ai': ['automation', 'rag', 'llm', 'pipeline', 'agent', 'bot', 'evalmesh'],
  'bot': ['ai', 'consultant', 'automation', 'rag', 'agent'],
  'automation': ['ai', 'workflows', 'n8n', 'pipeline', 'integrations'],
  'design': ['ui', 'ux', 'branding', 'figma', 'identity', 'logo'],
  'branding': ['logo', 'identity', 'design', 'guidelines', 'typography'],
  'logo': ['branding', 'design', 'identity', 'vector'],
  'video': ['cinematography', 'film', 'shoot', 'camera', 'editing', 'commercial'],
  'film': ['video', 'cinematography', 'commercial', 'production'],
  'seo': ['marketing', 'growth', 'traffic', 'ranking', 'organic'],
  'marketing': ['seo', 'growth', 'ads', 'performance', 'conversion'],

  // Commercial / Pricing
  'cost': ['price', 'pricing', 'budget', 'rate', 'fees', 'quote', 'how much'],
  'price': ['cost', 'pricing', 'budget', 'rate', 'fees', 'quote'],
  'pricing': ['cost', 'price', 'budget', 'rate', 'fees', 'milestones'],
  'budget': ['pricing', 'cost', 'quote', 'estimate', 'tier'],
  'quote': ['pricing', 'estimate', 'cost', 'proposal'],
  'rate': ['pricing', 'cost', 'fees'],

  // Delivery & Process
  'time': ['timeline', 'duration', 'weeks', 'delivery', 'sprint', 'schedule'],
  'timeline': ['duration', 'time', 'weeks', 'schedule', 'sprint', 'roadmap'],
  'duration': ['timeline', 'time', 'weeks', 'delivery'],
  'process': ['methodology', 'framework', 'steps', 'stages', 'roadmap', 'workflow'],
  'steps': ['process', 'stages', 'framework', 'milestones'],
  'stages': ['process', 'steps', 'framework', 'milestones'],

  // Team & Leadership
  'founder': ['desvanth', 'leadership', 'team', 'owners', 'leads'],
  'team': ['leadership', 'founders', 'desvanth', 'basha', 'siddiq', 'rithesh', 'saideep'],
  'who': ['team', 'founder', 'leadership', 'leads', 'desvanth'],
  'desvanth': ['founder', 'architect', 'lead', 'technology'],
  'basha': ['operations', 'marketing', 'lead', 'mehaboob'],
  'siddiq': ['creative', 'design', 'lead', 'art'],
  'rithesh': ['development', 'engineering', 'lead', 'support'],
  'saideep': ['video', 'cinematography', 'lead', 'production'],

  // Governance & Policies
  'ownership': ['ip', 'code', 'license', 'copyright', 'contract'],
  'code': ['ownership', 'source', 'github', 'repository', 'ip'],
  'nda': ['confidentiality', 'privacy', 'agreement', 'security'],
  'sla': ['turnaround', 'response', 'guarantee', 'support']
};

/**
 * Parses markdown documents into semantic section chunks.
 */
export function loadKnowledgeBase(): RAGChunk[] {
  if (cachedChunks && cachedChunks.length > 0) return cachedChunks;

  const chunks: RAGChunk[] = [];

  function processDirectory(dir: string, category: string) {
    if (!fs.existsSync(dir)) return;
    const entries = fs.readdirSync(dir, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        processDirectory(fullPath, entry.name);
      } else if (entry.isFile() && entry.name.endsWith('.md')) {
        try {
          const rawContent = fs.readFileSync(fullPath, 'utf-8');
          const docTitleMatch = rawContent.match(/^#\s+(.+)$/m);
          const docTitle = docTitleMatch ? docTitleMatch[1].trim() : entry.name.replace('.md', '');
          const relativeFile = path.relative(KNOWLEDGE_DIR, fullPath).replace(/\\/g, '/');

          // Split document by Markdown headers (## or ###)
          const sections = rawContent.split(/\n(?=##+\s+)/);

          sections.forEach((sec, idx) => {
            const trimmed = sec.trim();
            if (!trimmed) return;

            const headerMatch = trimmed.match(/^##+\s+(.+)$/m);
            const sectionTitle = headerMatch ? headerMatch[1].trim() : (idx === 0 ? docTitle : `Section ${idx + 1}`);

            // Generate fine-grained tags
            const tags = new Set<string>([
              category.toLowerCase(),
              entry.name.replace('.md', '').toLowerCase(),
              ...docTitle.toLowerCase().split(/[\s—–-]+/),
              ...sectionTitle.toLowerCase().split(/[\s—–-]+/)
            ]);

            chunks.push({
              id: `${relativeFile}#${sectionTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
              category,
              documentTitle: docTitle,
              sectionTitle,
              content: trimmed,
              tags: Array.from(tags).filter((t) => t.length > 1 && !STOPWORDS.has(t))
            });
          });
        } catch (err) {
          console.error(`Error loading knowledge chunk from ${fullPath}:`, err);
        }
      }
    }
  }

  try {
    processDirectory(KNOWLEDGE_DIR, 'general');
    cachedChunks = chunks;
  } catch (error) {
    console.error('Failed to index knowledge base:', error);
    return [];
  }

  return chunks;
}

/**
 * Tokenizes text with normalization and synonym expansion.
 */
function tokenizeQuery(query: string): string[] {
  const normalized = query.toLowerCase().replace(/[^\w\s]/g, ' ');
  const rawTokens = normalized.split(/\s+/).filter((t) => t.length > 1 && !STOPWORDS.has(t));
  const expanded = new Set<string>(rawTokens);

  // Expand with synonyms
  rawTokens.forEach((token) => {
    if (SYNONYM_MAP[token]) {
      SYNONYM_MAP[token].forEach((syn) => expanded.add(syn));
    }
  });

  return Array.from(expanded);
}

/**
 * Advanced Hybrid BM25 + Section-aware relevance scoring.
 */
function scoreChunk(chunk: RAGChunk, query: string, queryTokens: string[]): number {
  let score = 0;
  const chunkText = (chunk.documentTitle + ' ' + chunk.sectionTitle + ' ' + chunk.content).toLowerCase();
  const titleText = (chunk.documentTitle + ' ' + chunk.sectionTitle).toLowerCase();

  // 1. Exact Full Query Phrase Match in Section Title / Content
  if (chunkText.includes(query)) {
    score += 25;
  }

  // 2. Exact Title Match
  if (titleText.includes(query)) {
    score += 35;
  }

  // 3. Token-level BM25 & Term Frequency Scoring
  queryTokens.forEach((token) => {
    // Title matching gets heavy boost
    if (chunk.sectionTitle.toLowerCase().includes(token)) {
      score += 15;
    }
    if (chunk.documentTitle.toLowerCase().includes(token)) {
      score += 10;
    }

    // Tag matching
    if (chunk.tags.some((t) => t.includes(token))) {
      score += 8;
    }

    // Content frequency
    const regex = new RegExp(`\\b${token}\\b`, 'gi');
    const matches = chunk.content.match(regex);
    if (matches) {
      score += Math.min(matches.length * 3, 15);
    }
  });

  return score;
}

/**
 * Normalizes text to defeat unicode homoglyphs, zero-width characters,
 * character separation/spacing, and casing tricks.
 */
function normalizeForSafetyCheck(text: string): string {
  return text
    // Normalize unicode (NFKD decomposes ligatures and accented characters)
    .normalize('NFKD')
    // Remove diacritics / combining marks
    .replace(/[\u0300-\u036f]/g, '')
    // Normalize common homoglyphs / lookalikes
    .replace(/[ıìíîïīį]/gi, 'i')
    .replace(/[àáâãäåā]/gi, 'a')
    .replace(/[èéêëēę]/gi, 'e')
    .replace(/[òóôõöō]/gi, 'o')
    .replace(/[ùúûüū]/gi, 'u')
    .replace(/[0]/g, 'o')
    .replace(/[1!|]/g, 'i')
    .replace(/[@]/g, 'a')
    .replace(/[$5]/g, 's')
    .replace(/[3]/g, 'e')
    .toLowerCase()
    // Remove all non-alphanumeric characters for compressed check
    .replace(/[^a-z0-9]/g, '');
}

function isSecuritySensitiveQuery(rawQuery: string): boolean {
  const qLower = rawQuery.toLowerCase();
  const compressed = normalizeForSafetyCheck(rawQuery);

  const sensitivePatterns = [
    'adminpassword',
    'masterpassword',
    'masterkey',
    'secretkey',
    'jwtsecret',
    'jwttoken',
    'jwt',
    'systemprompt',
    'ignorepreviousinstructions',
    'revealprompt',
    'environmentvariable',
    'processenv',
    'crmleads',
    'crmdata',
    'getleads',
    'deleteleads',
    'privaterevenue',
    'internalprofit',
    'databasepassword',
    'dbpassword',
    'apisecret',
    'apikey',
    'privatekey',
    'accesskey',
    'authsecret',
    'passwordhash',
    'bcrypt',
    'leakdata',
    'dumpleads',
  ];

  // 1. Direct compressed pattern matching
  for (const pattern of sensitivePatterns) {
    if (compressed.includes(pattern)) return true;
  }

  // 2. Phrase matching in lowercased string
  const sensitivePhrases = [
    'admin password',
    'master password',
    'master key',
    'secret key',
    'jwt secret',
    'system prompt',
    'ignore previous',
    'ignore all previous',
    'reveal your prompt',
    'show me your prompt',
    'environment variables',
    'env vars',
    'process.env',
    'crm lead',
    'crm data',
    'show all leads',
    'give me all leads',
    'dump leads',
    'private revenue',
    'internal profit',
    'api key',
    'api secret',
    'database credentials',
  ];

  for (const phrase of sensitivePhrases) {
    if (qLower.includes(phrase)) return true;
  }

  return false;
}

/**
 * Query Consultant Engine with contextual reasoning and actionable handover.
 */
export function queryConsultant(userQuery: string, conversationHistory?: Array<{ sender: string; text: string }>): ConsultantResponse {
  const query = userQuery.toLowerCase().trim();
  const chunks = loadKnowledgeBase();

  // Safety & Privacy Guardrails — Unicode, spacing & homoglyph-resistant
  if (isSecuritySensitiveQuery(userQuery)) {
    return {
      answer: "I do not have access to private administrative credentials, server secrets, internal CRM records, or system configuration. If you have questions about our agency capabilities, services, or project scoping, I am happy to help.",
      confidence: 'high',
      sources: [{ title: 'AI & Data Privacy Policy', section: 'Data Protection & Boundary', file: 'policies/ai-policy.md' }],
      actionButtons: [
        { label: 'View Our Capabilities', href: '/services' },
        { label: 'Chat with Founder on WhatsApp', href: 'https://wa.me/917702256073', isExternal: true }
      ]
    };
  }

  const queryTokens = tokenizeQuery(query);

  // Score all fine-grained chunks
  const scoredChunks = chunks.map((chunk) => ({
    chunk,
    score: scoreChunk(chunk, query, queryTokens)
  }));

  scoredChunks.sort((a, b) => b.score - a.score);
  const topMatches = scoredChunks.filter((s) => s.score > 8).slice(0, 3);

  // 1. SPECIFIC SCENARIO: PRICING & COST ESTIMATES
  if (query.includes('cost') || query.includes('price') || query.includes('pricing') || query.includes('how much') || query.includes('rate') || query.includes('budget') || query.includes('quote')) {
    if (query.includes('app') || query.includes('mobile') || query.includes('ios') || query.includes('android')) {
      return {
        answer: "Our native and cross-platform Mobile App Development starts at **₹75,000 / $1,000**, with typical production scopes ranging from **₹75,000 – ₹3,50,000 ($1,000 – $4,500)**.\n\n• **Includes**: Bespoke Figma UI/UX prototype, cross-platform React Native / Flutter architecture, backend API sync, App Store & Google Play Store release, and 30-day warranty.\n• **Timeline**: 6 – 12 Weeks delivered in 2-week transparent sprints.",
        recommendation: "All engagements are structured with fixed-scope milestones so you never encounter budget creep. You retain 100% intellectual property ownership upon completion.",
        nextActionPrompt: "Would you like an exact milestone estimate tailored to your app idea?",
        suggestedFollowUps: [
          'What is the app development timeline?',
          'Do you handle App Store and Google Play publishing?',
          'Can we schedule a discovery call?'
        ],
        confidence: 'high',
        sources: [{ title: 'Pricing Guide', section: '2. App Development (iOS & Android)', file: 'pricing/pricing.md' }],
        actionButtons: [
          { label: 'Start an App Brief', href: '/contact?service=App%20Development' },
          { label: 'WhatsApp Founder Directly', href: 'https://wa.me/917702256073?text=Hi%20Desvanth,%20I%20would%20like%20to%20discuss%20a%20mobile%20app%20project%20budget%20and%20timeline.', isExternal: true }
        ],
        qualification: {
          detectedService: 'App Development',
          estimatedScope: 'Medium',
          suggestedBudget: '₹75,000 – ₹3,50,000 / $1,000 – $4,500',
          suggestedTimeline: '6 – 12 Weeks'
        }
      };
    }

    if (query.includes('ai') || query.includes('automation') || query.includes('rag') || query.includes('pipeline') || query.includes('bot')) {
      return {
        answer: "Our custom AI & Automation Pipeline projects start at **₹45,000 / $600**, with typical production scopes between **₹45,000 – ₹2,20,000 ($600 – $3,000)**.\n\n• **Includes**: Retrieval-Augmented Generation (RAG) knowledge engine, vector database indexing, n8n/LangChain automated workflow integration, and webhook recovery systems.\n• **Timeline**: 2 – 6 Weeks.",
        recommendation: "We specialize in real-world AI pipelines (such as our production EvalMesh API Gateway and JanAI Welfare Platform) that provide measurable operational efficiency.",
        nextActionPrompt: "What data or workflow are you looking to automate?",
        suggestedFollowUps: [
          'Tell me about your EvalMesh AI Proxy case study',
          'How does your RAG system integrate with our CRM?',
          'Start an AI project brief'
        ],
        confidence: 'high',
        sources: [{ title: 'Pricing Guide', section: '3. AI & Automation Pipelines', file: 'pricing/pricing.md' }],
        actionButtons: [
          { label: 'Start an AI Brief', href: '/contact?service=AI%20%26%20Automation' },
          { label: 'Discuss on WhatsApp', href: 'https://wa.me/917702256073?text=Hi%20Desvanth,%20I%20want%20to%20explore%20an%20AI%20and%20automation%20pipeline%20for%20my%20business.', isExternal: true }
        ],
        qualification: {
          detectedService: 'AI & Automation',
          estimatedScope: 'Medium',
          suggestedBudget: '₹45,000 – ₹2,20,000 / $600 – $3,000',
          suggestedTimeline: '2 – 6 Weeks'
        }
      };
    }

    // Default Web Development Pricing
    return {
      answer: "Here is an overview of our core discipline pricing:\n\n• **Web Development (Next.js 16 / TypeScript)**: ₹35,000 – ₹1,80,000 ($500 – $2,500) • 3–8 Weeks\n• **Mobile Apps (React Native / Flutter)**: ₹75,000 – ₹3,50,000 ($1,000 – $4,500) • 6–12 Weeks\n• **AI & Automation Pipelines**: ₹45,000 – ₹2,20,000 ($600 – $3,000) • 2–6 Weeks\n• **UI/UX & Brand Identity Systems**: ₹25,000 – ₹1,20,000 ($350 – $1,600) • 2–5 Weeks\n• **Video & Cinematography Production**: ₹25,000 – ₹1,50,000 ($350 – $2,000) • 2–4 Weeks",
      recommendation: "Every quote is fixed-scope with milestone billing (e.g. 30% upfront, 40% functional review, 30% final deployment). Zero surprise fees.",
      nextActionPrompt: "Which capability fits your immediate project goals?",
      suggestedFollowUps: [
        'How does payment and milestone billing work?',
        'What is included in the web development package?',
        'How do we schedule a discovery call?'
      ],
      confidence: 'high',
      sources: [{ title: 'Pricing Guide', section: 'Indicative Service Pricing', file: 'pricing/pricing.md' }],
      actionButtons: [
        { label: 'Submit Scoping Brief', href: '/contact' },
        { label: 'Chat on WhatsApp', href: 'https://wa.me/917702256073?text=Hi%20Desvanth,%20I%20would%20like%20a%20project%20cost%20estimate%20for%20my%20business.', isExternal: true }
      ]
    };
  }

  // 2. SPECIFIC SCENARIO: TIMELINES & DELIVERY PROCESS
  if (query.includes('timeline') || query.includes('how long') || query.includes('duration') || query.includes('process') || query.includes('sprint') || query.includes('stages')) {
    return {
      answer: "We deliver digital systems through a disciplined **6-Stage Framework**:\n\n1. **Discovery & Architecture (Week 1)**: System blueprint, technical schemas, and fixed-milestone scope.\n2. **Strategic Planning (Week 1–2)**: Architecture contracts, API contracts, and UX wireframes.\n3. **Design & Brand Engineering (Week 2–4)**: High-fidelity interactive Figma prototype.\n4. **Production Build & QA (Week 3–8)**: Clean Next.js/React Native development, database indexing, and multi-device audits.\n5. **Staging & Launch (Week 6–10)**: Domain routing, CDN optimization, sub-second latency verification.\n6. **Post-Launch & Warranty (30 Days)**: Direct bug-fixing warranty and operational support.",
      recommendation: "You receive weekly live staging walkthroughs and direct communications with the founding leads.",
      nextActionPrompt: "Do you have a specific launch target or hard deadline in mind?",
      suggestedFollowUps: [
        'What happens during the initial Discovery stage?',
        'Do you provide post-launch support and warranty?',
        'View the 6-stage process page'
      ],
      confidence: 'high',
      sources: [{ title: '6-Stage Process Guide', section: 'Framework Overview', file: 'process/process.md' }],
      actionButtons: [
        { label: 'Explore Full Process', href: '/process' },
        { label: 'Start a Project Brief', href: '/contact' }
      ]
    };
  }

  // 3. SPECIFIC SCENARIO: FOUNDER TEAM & DIRECT ACCOUNTABILITY
  if (query.includes('team') || query.includes('founder') || query.includes('who') || query.includes('desvanth') || query.includes('basha') || query.includes('siddiq') || query.includes('rithesh') || query.includes('sai deep') || query.includes('leadership')) {
    return {
      answer: "Kairos Flow Agency is engineered by **5 dedicated founding leads** with zero junior delegation:\n\n• **Desvanth**: *Founder & Technology Lead* — System architecture, Next.js full-stack engineering, and AI pipelines.\n• **Mehaboob Basha**: *Marketing & Operations Lead* — Growth infrastructure, client SLAs, and strategic partnerships.\n• **Siddiq**: *Creative & Content Lead* — UI/UX design systems, typography, and brand identity.\n• **Rithesh**: *Development & Technical Support* — Native app engineering, API integrations, and quality assurance.\n• **Sai Deep**: *Video Production Lead* — 4K cinematography, commercial editing, and audio mastering.",
      recommendation: "Every client works directly with the founders who architect and write the code.",
      nextActionPrompt: "You can connect with Founder Desvanth directly on WhatsApp, LinkedIn, or GitHub.",
      suggestedFollowUps: [
        'What technologies does Desvanth use?',
        'How do the 5 leads collaborate on a project?',
        'Schedule a founder call'
      ],
      confidence: 'high',
      sources: [{ title: 'Leadership & Team Overview', section: 'Core Founders', file: 'team/team.md' }],
      actionButtons: [
        { label: 'View Leadership Team', href: '/about' },
        { label: 'Founder LinkedIn', href: 'https://www.linkedin.com/in/deswanth', isExternal: true },
        { label: 'Chat with Desvanth on WhatsApp', href: 'https://wa.me/917702256073?text=Hi%20Desvanth,%20I%20would%20like%20to%20connect%20with%20you%20regarding%20a%20project.', isExternal: true }
      ]
    };
  }

  // 4. SPECIFIC SCENARIO: CASE STUDIES & PORTFOLIO
  if (query.includes('evalmesh') || query.includes('janai') || query.includes('signlang') || query.includes('ember') || query.includes('sagiro') || query.includes('work') || query.includes('portfolio') || query.includes('case study') || query.includes('examples')) {
    let highlightedCase = 'EvalMesh (High-performance AI proxy gateway with sub-80ms latency) and JanAI (State citizen welfare platform serving 500,000+ citizens).';
    let targetLink = '/work';

    if (query.includes('evalmesh')) {
      highlightedCase = '**EvalMesh**: AI Proxy Gateway engineered in Next.js & TypeScript, handling 1.2M+ monthly queries with sub-80ms routing latency and zero downtime.';
      targetLink = '/work/evalmesh-ai-proxy-gateway';
    } else if (query.includes('janai')) {
      highlightedCase = '**JanAI**: Citizen welfare platform supporting 500k+ users across multilingual voice & text AI pipelines with 99.98% uptime.';
      targetLink = '/work/janai-citizen-welfare-platform';
    } else if (query.includes('signlang')) {
      highlightedCase = '**SignLang AI**: Computer vision translation engine achieving 94.2% real-time accuracy across 120+ gestures.';
      targetLink = '/work/signlang-ai-computer-vision-translator';
    } else if (query.includes('ember') || query.includes('restaurant')) {
      highlightedCase = '**Ember & Oak**: Destination culinary brand & web reservation platform driving +180% online bookings in 60 days.';
      targetLink = '/work/ember-oak-destination-restaurant';
    }

    return {
      answer: `Here is a highlighted production case study:\n\n${highlightedCase}`,
      recommendation: "All our projects are built bespoke from scratch with sub-second page loads, SEO optimization, and clean maintainable code.",
      nextActionPrompt: "Would you like to review the technical architecture or explore our full case study directory?",
      suggestedFollowUps: [
        'Explore all 8 case studies',
        'What tech stack was used for EvalMesh?',
        'How can we build a similar system?'
      ],
      confidence: 'high',
      sources: [{ title: 'Selected Work & Case Studies', section: 'Production Deliverables', file: 'portfolio/evalmesh.md' }],
      actionButtons: [
        { label: 'View Case Studies', href: targetLink },
        { label: 'Discuss Your Concept on WhatsApp', href: 'https://wa.me/917702256073?text=Hi%20Desvanth,%20I%20reviewed%20your%20case%20studies%20and%20want%20to%20discuss%20building%20a%20product.', isExternal: true }
      ]
    };
  }

  // 5. HYBRID MATCH EXTRACTION FROM KNOWLEDGE BASE
  if (topMatches.length > 0) {
    const topMatch = topMatches[0].chunk;

    // Clean section content (strip header line)
    const cleanContent = topMatch.content.replace(/^##+\s+.+\n*/m, '').trim();
    const formattedParagraphs = cleanContent.split('\n\n').slice(0, 2).join('\n\n');

    return {
      answer: `### ${topMatch.sectionTitle}\n\n${formattedParagraphs}`,
      recommendation: "Our founding team engineers custom digital products with fixed-scope milestones, weekly staging demos, and 100% intellectual property transfer.",
      nextActionPrompt: "Tell us what you are looking to build or submit a scoping brief for a rapid 4-hour SLA review.",
      suggestedFollowUps: [
        'What are your pricing ranges?',
        'How does your 6-stage process work?',
        'Connect directly with the team on WhatsApp'
      ],
      confidence: topMatches[0].score > 20 ? 'high' : 'medium',
      sources: topMatches.map((m) => ({
        title: m.chunk.documentTitle,
        section: m.chunk.sectionTitle,
        file: m.chunk.id.split('#')[0]
      })),
      actionButtons: [
        { label: 'Start a Project Brief', href: '/contact' },
        { label: 'Chat on WhatsApp', href: `https://wa.me/917702256073?text=${encodeURIComponent(`Hi Desvanth, I have a question regarding: "${userQuery}"`)}`, isExternal: true }
      ]
    };
  }

  // 6. GENERAL GROUNDED FALLBACK
  return {
    answer: "Kairos Flow Agency is a digital engineering and design studio led by 5 founding specialists. We build high-performance web applications, native mobile apps, custom AI pipelines, brand identities, and commercial video production.\n\n• **Average Web Delivery**: 3 – 8 Weeks (Starting at ₹35,000 / $500)\n• **Average App Delivery**: 6 – 12 Weeks (Starting at ₹75,000 / $1,000)\n• **Average AI Pipeline Delivery**: 2 – 6 Weeks (Starting at ₹45,000 / $600)",
    recommendation: "Founder Desvanth and our founding leads review all custom requirements within 4 business hours.",
    nextActionPrompt: "What type of product or capability would you like to explore?",
    suggestedFollowUps: [
      'What does a custom Next.js web application cost?',
      'How does the 6-stage delivery process work?',
      'Who is on the founding leadership team?'
    ],
    confidence: 'medium',
    sources: [{ title: 'Company Overview & Capabilities', section: 'Core Disciplines', file: 'agency/company.md' }],
    actionButtons: [
      { label: 'Explore Services', href: '/services' },
      { label: 'Start Project Brief', href: '/contact' },
      { label: 'Chat on WhatsApp', href: 'https://wa.me/917702256073?text=Hi%20Desvanth,%20I%20would%20like%20to%20consult%20with%20you%20about%20a%20project.', isExternal: true }
    ]
  };
}
