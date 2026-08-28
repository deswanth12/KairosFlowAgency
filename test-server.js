async function test() {
  const base = 'http://localhost:3000';
  console.log('Testing server endpoints with authentic GitHub projects...');

  // 1. Pages
  const pages = [
    '/',
    '/work',
    '/work/evalmesh-ai-proxy-gateway',
    '/work/janai-citizen-welfare-platform',
    '/work/signlang-ai-computer-vision-translator',
    '/work/ember-oak-destination-restaurant',
    '/services',
    '/about',
    '/process',
    '/contact',
    '/privacy',
    '/admin',
    '/robots.txt',
    '/sitemap.xml'
  ];

  for (const p of pages) {
    const res = await fetch(base + p);
    console.log(`Page ${p.padEnd(46)}: status ${res.status}`);
    if (res.status !== 200) {
      throw new Error(`Page ${p} returned status ${res.status}`);
    }
  }

  // 2. Auth with valid pass
  const authOk = await fetch(base + '/api/auth', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ password: 'Kairos@$$' })
  });
  const authOkData = await authOk.json();
  console.log('Auth with valid password (Kairos@$$):', authOk.status, 'Success:', authOkData.success);
  if (!authOkData.success) throw new Error('Auth with valid password failed');

  // 3. Auth with invalid pass
  const authBad = await fetch(base + '/api/auth', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ password: 'wrongpassword' })
  });
  console.log('Auth with invalid password:', authBad.status, '(expected 401)');
  if (authBad.status !== 401) throw new Error('Auth with invalid password did not return 401');

  // 4. Submit Lead
  const leadRes = await fetch(base + '/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: 'Rohan Sharma',
      company: 'Matrix Health Cloud',
      email: 'rohan@matrixhealth.io',
      phone: '+91 77022 56073',
      services: ['Web Development', 'AI & Automation'],
      description: 'Need an enterprise telemedicine patient portal with AI triage workflow.',
      budget: '$25,000 – $50,000',
      timeline: '1 – 2 Months',
      hearAbout: 'Referral / Recommendation'
    })
  });
  const leadData = await leadRes.json();
  console.log('Contact form submission status:', leadRes.status, 'Lead ID:', leadData.leadId);
  if (!leadData.success || !leadData.leadId) throw new Error('Contact submission failed');

  // 5. Test AI Consultant RAG Endpoint
  const ragRes = await fetch(base + '/api/consultant', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query: 'Tell me about EvalMesh AI proxy' })
  });
  const ragData = await ragRes.json();
  console.log('AI Consultant RAG status:', ragRes.status, 'Confidence:', ragData.data?.confidence);
  if (!ragData.success || !ragData.data?.answer) throw new Error('RAG query failed');

  // 6. Test WhatsApp Webhook Endpoint
  const waRes = await fetch(base + '/api/whatsapp/webhook', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message: 'Can you show me projects built by Desvanth?' })
  });
  const waData = await waRes.json();
  console.log('WhatsApp Webhook RAG status:', waRes.status, 'Answer present:', !!waData.response?.answer);
  if (!waData.success || !waData.response?.answer) throw new Error('WhatsApp webhook RAG failed');

  console.log('\n========================================');
  console.log('✅ ALL PAGES, AUTHENTIC GITHUB PROJECTS & RAG VERIFIED!');
  console.log('========================================');
}

test().catch((err) => {
  console.error('❌ Test failed:', err);
  process.exit(1);
});
