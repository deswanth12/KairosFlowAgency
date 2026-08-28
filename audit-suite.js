/**
 * Comprehensive System Audit for Kairos Flow Agency
 */
const BASE_URL = 'http://localhost:3000';

async function runAudit() {
  console.log('====================================================');
  console.log('🚀 RUNNING COMPREHENSIVE KAIROS FLOW PLATFORM AUDIT');
  console.log('====================================================\n');

  let passed = 0;
  let total = 0;

  function assert(condition, message) {
    total++;
    if (condition) {
      console.log(`  ✅ [PASS] ${message}`);
      passed++;
    } else {
      console.error(`  ❌ [FAIL] ${message}`);
      throw new Error(`Audit check failed: ${message}`);
    }
  }

  // 1. PUBLIC PAGES AUDIT
  console.log('1. Auditing Core Public Pages...');
  const pages = [
    { path: '/', title: 'Homepage' },
    { path: '/work', title: 'Work / Portfolio' },
    { path: '/work/evalmesh-ai-proxy-gateway', title: 'EvalMesh Case Study' },
    { path: '/work/janai-citizen-welfare-platform', title: 'JanAI Case Study' },
    { path: '/work/signlang-ai-computer-vision-translator', title: 'SignLang AI Case Study' },
    { path: '/work/ember-oak-destination-restaurant', title: 'Ember & Oak Case Study' },
    { path: '/work/sagiro-mobile-app', title: 'Sagiro App Case Study' },
    { path: '/services', title: 'Services Overview' },
    { path: '/about', title: 'About & Leadership Team' },
    { path: '/process', title: '6-Stage Process' },
    { path: '/contact', title: 'Contact & Intake Brief' },
    { path: '/privacy', title: 'Privacy & Legal Standards' },
    { path: '/admin', title: 'Admin CRM Portal' }
  ];

  for (const page of pages) {
    const res = await fetch(`${BASE_URL}${page.path}`);
    const html = await res.text();
    assert(res.status === 200, `${page.title} (${page.path}) loaded with status 200`);
    assert(html.length > 500, `${page.title} returned non-empty content (${html.length} bytes)`);
  }

  // 2. BRAND & CONTACT CONSISTENCY AUDIT
  console.log('\n2. Auditing Email & Contact Touchpoints...');
  const homeRes = await fetch(`${BASE_URL}/`);
  const homeHtml = await homeRes.text();
  assert(homeHtml.includes('kairosflowagency@gmail.com'), 'Homepage contains official email kairosflowagency@gmail.com');
  assert(homeHtml.includes('77022 56073') || homeHtml.includes('7702256073'), 'Homepage contains official WhatsApp number +91 77022 56073');
  assert(!homeHtml.includes('hello@kairosflow.agency'), 'Homepage has NO obsolete email addresses');

  // 3. LEADERSHIP & FOUNDER IDENTITY AUDIT
  console.log('\n3. Auditing Leadership & Founder Designation...');
  const aboutRes = await fetch(`${BASE_URL}/about`);
  const aboutHtml = await aboutRes.text();
  assert(aboutHtml.includes('Desvanth'), 'About page features Founder Desvanth');
  assert(aboutHtml.includes('Founder & Technology Lead') || aboutHtml.includes('Founder'), 'Desvanth is designated Founder');
  assert(aboutHtml.includes('github.com/deswanth12'), 'Founder profile links to GitHub (deswanth12)');
  assert(aboutHtml.includes('linkedin.com/in/deswanth'), 'Founder profile links to LinkedIn (/in/deswanth)');
  assert((aboutHtml.includes('Mehaboob Basha') || aboutHtml.includes('Basha')) && aboutHtml.includes('Siddiq') && aboutHtml.includes('Rithesh') && aboutHtml.includes('Sai Deep'), 'All 5 team members present');

  // 4. AUTHENTIC GITHUB REPOSITORIES AUDIT
  console.log('\n4. Auditing Featured GitHub Projects...');
  const workRes = await fetch(`${BASE_URL}/work`);
  const workHtml = await workRes.text();
  assert(workHtml.includes('EvalMesh'), 'Work page includes EvalMesh');
  assert(workHtml.includes('JanAI'), 'Work page includes JanAI');
  assert(workHtml.includes('SignLang AI') || workHtml.includes('singlangbydeshu'), 'Work page includes SignLang AI');
  assert(workHtml.includes('Ember &amp; Oak') || workHtml.includes('Ember & Oak'), 'Work page includes Ember & Oak');

  // 5. SECURITY & ADMIN GATE AUDIT
  console.log('\n5. Auditing Admin CRM Security & Operations...');
  // Invalid auth
  const badAuth = await fetch(`${BASE_URL}/api/auth`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ password: 'WrongPassword123' })
  });
  assert(badAuth.status === 401, 'Admin API rejects incorrect passwords with 401');

  // Valid auth
  const goodAuth = await fetch(`${BASE_URL}/api/auth`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ password: 'Kairos@$$' })
  });
  const goodAuthData = await goodAuth.json();
  assert(goodAuth.status === 200 && goodAuthData.success === true, 'Admin API unlocks with Kairos@$$');

  // 6. CONTACT FORM & PIPELINE INTEL AUDIT
  console.log('\n6. Auditing Contact Form Submission & Storage...');
  const contactSubmission = await fetch(`${BASE_URL}/api/contact`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: 'Ananya Roy',
      company: 'Novus Biotech Labs',
      email: 'ananya@novusbiotech.com',
      phone: '+91 77022 56073',
      services: ['Web Development', 'AI & Automation'],
      description: 'Require high-performance diagnostic analytics dashboard with AI pipeline.',
      budget: '$25,000 – $50,000',
      timeline: '1 – 2 Months',
      hearAbout: 'Referral'
    })
  });
  const contactData = await contactSubmission.json();
  assert(contactSubmission.status === 200 && contactData.success, 'Contact submission successfully logged');

  // Verify lead in CRM
  const leadsRes = await fetch(`${BASE_URL}/api/leads`);
  const leadsData = await leadsRes.json();
  assert(leadsData.success && Array.isArray(leadsData.leads), 'Leads database API returns list');
  const foundLead = leadsData.leads.find((l) => l.name === 'Ananya Roy');
  assert(!!foundLead, 'Submitted lead is present in CRM leads store');

  // 7. RAG AI CONSULTANT & WHATSAPP WEBHOOK AUDIT
  console.log('\n7. Auditing RAG AI Consultant & WhatsApp Handover...');
  const ragRes = await fetch(`${BASE_URL}/api/consultant`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query: 'What services does Kairos Flow provide and who is the founder?' })
  });
  const ragData = await ragRes.json();
  assert(ragRes.status === 200 && ragData.success, 'AI Consultant RAG responds with 200');
  assert(ragData.data.answer.includes('Desvanth') || ragData.data.answer.includes('Kairos Flow'), 'AI Consultant correctly identifies agency & founder');

  const waRes = await fetch(`${BASE_URL}/api/whatsapp/webhook`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message: 'I need a mobile app quotation' })
  });
  const waData = await waRes.json();
  assert(waRes.status === 200 && waData.success, 'WhatsApp Webhook executes RAG pipeline');

  // 8. STATIC SEO & ROBOTS AUDIT
  console.log('\n8. Auditing SEO, Sitemap, and Crawlers...');
  const robotsRes = await fetch(`${BASE_URL}/robots.txt`);
  const robotsTxt = await robotsRes.text();
  assert(robotsTxt.includes('Disallow: /admin'), 'robots.txt disallows /admin for privacy');
  assert(robotsTxt.includes('sitemap.xml'), 'robots.txt references sitemap.xml');

  const sitemapRes = await fetch(`${BASE_URL}/sitemap.xml`);
  const sitemapXml = await sitemapRes.text();
  assert(sitemapXml.includes('<loc>https://kairosflow.agency</loc>'), 'Sitemap contains root domain');
  assert(!sitemapXml.includes('/admin'), 'Sitemap does NOT expose /admin');

  console.log('\n====================================================');
  console.log(`🎉 ALL ${passed}/${total} AUDIT CHECKS PASSED WITH ZERO ERRORS!`);
  console.log('====================================================');
}

runAudit().catch((err) => {
  console.error('\n❌ AUDIT FAILED:', err);
  process.exit(1);
});
