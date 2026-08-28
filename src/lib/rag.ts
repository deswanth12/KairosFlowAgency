import fs from 'fs';
import path from 'path';

export interface RAGDocument {
  id: string;
  category: string;
  filename: string;
  title: string;
  content: string;
  tags: string[];
}

export interface ConsultantResponse {
  answer: string;
  recommendation?: string;
  nextActionPrompt?: string;
  confidence: 'high' | 'medium' | 'low';
  sources: string[];
  actionButtons: Array<{
    label: string;
    href: string;
    isExternal?: boolean;
  }>;
  qualification?: {
    detectedService?: string;
    detectedIndustry?: string;
    estimatedScope?: 'Small' | 'Medium' | 'Large';
  };
}

const KNOWLEDGE_DIR = path.join(process.cwd(), 'knowledge');
let cachedDocuments: RAGDocument[] | null = null;

export function loadKnowledgeBase(): RAGDocument[] {
  if (cachedDocuments) return cachedDocuments;

  const docs: RAGDocument[] = [];

  function readDirectory(dir: string, category: string) {
    if (!fs.existsSync(dir)) return;
    const entries = fs.readdirSync(dir, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        readDirectory(fullPath, entry.name);
      } else if (entry.isFile() && entry.name.endsWith('.md')) {
        try {
          const content = fs.readFileSync(fullPath, 'utf-8');
          const titleMatch = content.match(/^#\s+(.+)$/m);
          const title = titleMatch ? titleMatch[1] : entry.name.replace('.md', '');
          
          docs.push({
            id: `${category}-${entry.name.replace('.md', '')}`,
            category,
            filename: entry.name,
            title,
            content,
            tags: [category, entry.name.replace('.md', ''), ...title.toLowerCase().split(/\s+/)]
          });
        } catch (err) {
          console.error(`Error reading ${fullPath}:`, err);
        }
      }
    }
  }

  try {
    readDirectory(KNOWLEDGE_DIR, 'root');
    cachedDocuments = docs;
  } catch (error) {
    console.error('Error loading knowledge base:', error);
    return [];
  }

  return docs;
}

export function queryConsultant(userQuery: string): ConsultantResponse {
  const query = userQuery.toLowerCase().trim();
  const docs = loadKnowledgeBase();

  // Safety & Privacy Guardrails
  if (
    query.includes('admin password') ||
    query.includes('admin pass') ||
    query.includes('secret key') ||
    query.includes('profit') ||
    query.includes('revenue') ||
    query.includes('equity') ||
    query.includes('system prompt')
  ) {
    return {
      answer: "I don't have access to private administrative or internal financial information. If you have an inquiry regarding a project engagement or agency leadership, I'd be glad to help.",
      confidence: 'high',
      sources: ['policies/ai-policy.md'],
      actionButtons: [
        { label: 'View Our Services', href: '/services' },
        { label: 'Chat on WhatsApp', href: 'https://wa.me/917702256073', isExternal: true }
      ]
    };
  }

  // Score documents based on keyword matches
  const scored = docs.map((doc) => {
    let score = 0;
    const words = query.split(/\s+/).filter((w) => w.length > 2);

    for (const w of words) {
      if (doc.title.toLowerCase().includes(w)) score += 5;
      if (doc.tags.some((t) => t.toLowerCase().includes(w))) score += 3;
      const occurrences = (doc.content.toLowerCase().match(new RegExp(w, 'g')) || []).length;
      score += Math.min(occurrences, 4);
    }

    return { doc, score };
  });

  scored.sort((a, b) => b.score - a.score);
  const topMatches = scored.filter((s) => s.score > 0).slice(0, 3);

  // Fallback if low confidence
  if (topMatches.length === 0 || topMatches[0].score < 2) {
    return {
      answer: "I don't have enough verified information in our knowledge base to answer that specifically. However, Founder Desvanth and our core leads are always available to discuss custom project requirements.",
      recommendation: "Tell me a bit about your business goals, target timeline, or what you're looking to build.",
      nextActionPrompt: "Would you like to connect directly with the team?",
      confidence: 'low',
      sources: ['agency/contact.md'],
      actionButtons: [
        { label: 'Chat on WhatsApp', href: 'https://wa.me/917702256073', isExternal: true },
        { label: 'Submit Project Brief', href: '/contact' }
      ]
    };
  }

  const primaryDoc = topMatches[0].doc;

  // Tailored Consulting Scenarios
  // 1. Pricing / Cost queries
  if (query.includes('cost') || query.includes('price') || query.includes('pricing') || query.includes('how much') || query.includes('rate')) {
    let specificPrice = 'Our business website projects start from ₹35,000 / $500, with typical scopes ranging between ₹35,000 – ₹1,80,000 ($500 – $2,500). Mobile applications start from ₹75,000 / $1,000, and custom AI pipelines start from ₹45,000 / $600.';
    
    if (query.includes('app') || query.includes('mobile') || query.includes('ios') || query.includes('android')) {
      specificPrice = 'Our mobile app development projects start from ₹75,000 / $1,000 (typical range: ₹75,000 – ₹3,50,000 / $1,000 – $4,500), engineered with React Native/Flutter for iOS & Android.';
    } else if (query.includes('ai') || query.includes('automation') || query.includes('rag') || query.includes('bot')) {
      specificPrice = 'Our AI & automation pipeline projects start from ₹45,000 / $600 (typical range: ₹45,000 – ₹2,20,000 / $600 – $3,000) for custom RAG knowledge assistants and workflow orchestration.';
    } else if (query.includes('video') || query.includes('film') || query.includes('shoot')) {
      specificPrice = 'Our video & commercial content packages start from ₹25,000 / $350 (typical range: ₹25,000 – ₹1,50,000 / $350 – $2,000) including 4K cinematography, audio mastering, and social cutdowns.';
    }

    return {
      answer: specificPrice,
      recommendation: "All projects are quoted with fixed-scope milestones so you never face budget creep. Final pricing depends on the number of features, custom integrations, and target timeline.",
      nextActionPrompt: "Share your business type and functional requirements, and I'll help outline the estimated scope.",
      confidence: 'high',
      sources: ['pricing/pricing.md', 'pricing/policies.md'],
      actionButtons: [
        { label: 'Estimate Scope in Brief', href: '/contact' },
        { label: 'Chat on WhatsApp', href: 'https://wa.me/917702256073', isExternal: true }
      ]
    };
  }

  // 2. Timeline queries
  if (query.includes('how long') || query.includes('timeline') || query.includes('duration') || query.includes('time')) {
    return {
      answer: "Typical web development sprint delivery takes 3 to 8 weeks depending on complexity and custom backend integrations. Mobile apps and AI pipelines take 6 to 12 weeks, while branding or video packages can be completed in 2 to 4 weeks.",
      recommendation: "We follow a 6-stage delivery framework (Discover, Plan, Design, Build, Launch, Support) with weekly staging demos.",
      nextActionPrompt: "What is your target launch deadline?",
      confidence: 'high',
      sources: ['process/process.md', 'faq/faq.md'],
      actionButtons: [
        { label: 'Explore Delivery Process', href: '/process' },
        { label: 'Start a Project', href: '/contact' }
      ]
    };
  }

  // 3. Team & Leadership queries
  if (query.includes('team') || query.includes('founder') || query.includes('who') || query.includes('desvanth') || query.includes('bhasha') || query.includes('siddiq') || query.includes('rithesh') || query.includes('sai deep')) {
    return {
      answer: "Kairos Flow Agency is founded and led by Desvanth (Founder & Technology Lead), working alongside Mehaboob Basha (Marketing & Operations Lead), Siddiq (Creative & Content Lead), Rithesh (Development & Technical Support), and Sai Deep (Video Production Lead).",
      recommendation: "We maintain direct founder accountability on every project with zero junior handoffs.",
      nextActionPrompt: "You can connect directly with Founder Desvanth on LinkedIn, GitHub, or WhatsApp.",
      confidence: 'high',
      sources: ['team/team.md', 'agency/company.md'],
      actionButtons: [
        { label: 'Founder LinkedIn', href: 'https://www.linkedin.com/in/deswanth', isExternal: true },
        { label: 'Founder GitHub', href: 'https://github.com/deswanth12', isExternal: true },
        { label: 'Chat on WhatsApp', href: 'https://wa.me/917702256073', isExternal: true }
      ]
    };
  }

  // 4. Restaurant / Specific Industry consulting
  if (query.includes('restaurant') || query.includes('cafe') || query.includes('food')) {
    return {
      answer: "For a restaurant or culinary brand, we typically recommend a high-converting, mobile-first Web Development package featuring an interactive digital menu, reservation/order integration, high-resolution food cinematography/photo gallery, Google Maps location routing, and direct WhatsApp ordering.",
      recommendation: "A custom Next.js web build paired with our 4K video package gives restaurants immediate visual authority and faster table bookings.",
      nextActionPrompt: "What is your ideal launch timeline or location?",
      confidence: 'high',
      sources: ['services/web.md', 'services/video.md'],
      actionButtons: [
        { label: 'Start Restaurant Brief', href: '/contact?service=Web%20Development' },
        { label: 'Discuss on WhatsApp', href: 'https://wa.me/917702256073', isExternal: true }
      ],
      qualification: {
        detectedService: 'Web Development',
        detectedIndustry: 'Food & Hospitality',
        estimatedScope: 'Medium'
      }
    };
  }

  // Default Structured Extraction
  return {
    answer: `Regarding ${primaryDoc.title}: ${primaryDoc.content.split('\n\n')[1] || primaryDoc.content.slice(0, 280)}...`,
    recommendation: "Every Kairos Flow project is led directly by our specialist founder team with fixed-scope milestones and 100% IP ownership.",
    nextActionPrompt: "Tell us what you're building, or connect with our team on WhatsApp for an immediate consultation.",
    confidence: 'medium',
    sources: [primaryDoc.id],
    actionButtons: [
      { label: 'Start a Project Brief', href: '/contact' },
      { label: 'WhatsApp Founder Directly', href: 'https://wa.me/917702256073', isExternal: true }
    ]
  };
}
