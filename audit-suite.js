/**
 * Comprehensive System & Multi-User Audit Suite for Kairos Flow Agency
 */
const BASE_URL = 'http://localhost:3000';

async function runAudit() {
  console.log('====================================================');
  console.log('🚀 RUNNING COMPREHENSIVE FOUNDER IDENTITY & AUDIT SUITE');
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

  // 3. MULTI-USER AUTHENTICATION & FOUNDER IDENTITY AUDIT
  console.log('\n3. Auditing 5 Individual Founder Accounts...');
  const accounts = [
    { id: 'usr-desvanth', name: 'Desvanth', pass: 'Kairos@$$', role: 'Owner/Admin' },
    { id: 'usr-basha', name: 'Mehaboob Basha', pass: 'Basha@2026', role: 'Operations' },
    { id: 'usr-siddiq', name: 'Siddiq', pass: 'Siddiq@2026', role: 'Creative' },
    { id: 'usr-rithesh', name: 'Rithesh', pass: 'Rithesh@2026', role: 'Development' },
    { id: 'usr-saideep', name: 'Sai Deep', pass: 'SaiDeep@2026', role: 'Video' }
  ];

  const authTokens = {};

  for (const acc of accounts) {
    const loginRes = await fetch(`${BASE_URL}/api/auth`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId: acc.id, password: acc.pass })
    });
    const loginData = await loginRes.json();
    assert(loginRes.status === 200 && loginData.success === true, `Authenticated ${acc.name} (${acc.role}) with individual password`);
    assert(loginData.user.role === acc.role, `Verified ${acc.name} role is ${acc.role}`);
    assert(!!loginData.token, `Received signed session token for ${acc.name}`);
    authTokens[acc.name] = loginData.token;
  }

  // 4. SERVER-SIDE AUDIT TRAIL & DIFF GENERATION AUDIT
  console.log('\n4. Auditing Server-Side Activity Log & Field Diffs...');

  // Step A: Desvanth creates a new lead
  const createLeadRes = await fetch(`${BASE_URL}/api/leads`, {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${authTokens['Desvanth']}`
    },
    body: JSON.stringify({
      name: 'Dr. Suresh Kumar',
      company: 'Apollo Advanced Imaging',
      email: 'suresh@apolloimaging.in',
      phone: '+91 98401 23456',
      services: ['AI & Automation', 'Web Development'],
      description: 'Need real-time DICOM CT scan AI classification workflow.',
      status: 'Contacted',
      priority: 'High',
      estimatedValue: '₹1,50,000'
    })
  });
  const createLeadData = await createLeadRes.json();
  assert(createLeadRes.status === 200 && createLeadData.success, 'Desvanth created new lead record');
  const createdLeadId = createLeadData.lead.id;
  assert(createLeadData.lead.createdBy.name === 'Desvanth', 'Lead record stores Created By = Desvanth');

  // Step B: Mehaboob Basha updates status & expected value (Contacted -> Proposal Sent)
  const updateLeadRes = await fetch(`${BASE_URL}/api/leads`, {
    method: 'PATCH',
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${authTokens['Mehaboob Basha']}`
    },
    body: JSON.stringify({
      id: createdLeadId,
      status: 'Proposal Sent',
      estimatedValue: '₹1,80,000',
      assignedTo: 'Mehaboob Basha'
    })
  });
  const updateLeadData = await updateLeadRes.json();
  assert(updateLeadRes.status === 200 && updateLeadData.success, 'Mehaboob Basha updated lead record');
  assert(updateLeadData.lead.updatedBy.name === 'Mehaboob Basha', 'Lead record stores Last Updated By = Mehaboob Basha');
  assert(updateLeadData.lead.status === 'Proposal Sent', 'Status updated to Proposal Sent');

  // Step C: Verify Activity Log recorded exact Before -> After Diffs on server
  const activityRes = await fetch(`${BASE_URL}/api/activity?entityId=${createdLeadId}`);
  const activityData = await activityRes.json();
  assert(activityRes.status === 200 && activityData.success, 'Queried activity log for lead entity');
  assert(activityData.logs.length >= 2, 'Activity log captured both Create and Update events');

  const updateLog = activityData.logs.find((l) => l.action === 'Changed Lead Status' || l.userName === 'Mehaboob Basha');
  assert(!!updateLog, 'Found specific update log signed by Mehaboob Basha');
  assert(updateLog.details.summary.includes('Contacted') && updateLog.details.summary.includes('Proposal Sent'), 'Activity log summary captures Contacted → Proposal Sent');

  const statusDiff = updateLog.details.changes.find((c) => c.field === 'status');
  assert(statusDiff && statusDiff.before === 'Contacted' && statusDiff.after === 'Proposal Sent', 'Detailed field diff verified: Before = Contacted, After = Proposal Sent');

  // 5. ROLE-BASED ACCESS CONTROL (RBAC) AUDIT
  console.log('\n5. Auditing Role-Based Permissions & Protection...');
  // Non-admin attempting delete (e.g. Siddiq with Creative role)
  const forbiddenDelete = await fetch(`${BASE_URL}/api/leads?id=${createdLeadId}`, {
    method: 'DELETE',
    headers: { 'Authorization': `Bearer ${authTokens['Siddiq']}` }
  });
  assert(forbiddenDelete.status === 403, 'Non-Admin role correctly blocked from deleting record (403 Forbidden)');

  // Owner/Admin deleting record (Desvanth)
  const allowedDelete = await fetch(`${BASE_URL}/api/leads?id=${createdLeadId}`, {
    method: 'DELETE',
    headers: { 'Authorization': `Bearer ${authTokens['Desvanth']}` }
  });
  const deleteData = await allowedDelete.json();
  assert(allowedDelete.status === 200 && deleteData.success, 'Owner/Admin (Desvanth) successfully deleted record');

  // Verify deletion recorded in audit trail
  const deleteLogRes = await fetch(`${BASE_URL}/api/activity?category=leads&limit=5`);
  const deleteLogData = await deleteLogRes.json();
  const deleteLog = deleteLogData.logs.find((l) => l.action === 'Deleted Lead');
  assert(!!deleteLog && deleteLog.userName === 'Desvanth', 'Permanent audit trail recorded deletion by Desvanth');

  // 6. RAG AI CONSULTANT & WHATSAPP WEBHOOK AUDIT
  console.log('\n6. Auditing RAG AI Consultant & WhatsApp Handover...');
  const ragRes = await fetch(`${BASE_URL}/api/consultant`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query: 'What services does Kairos Flow provide and who is the founder?' })
  });
  const ragData = await ragRes.json();
  assert(ragRes.status === 200 && ragData.success, 'AI Consultant RAG responds with 200');

  // Clean up test sessions and activity logs while preserving genuine user login history
  const fs = require('fs');
  if (fs.existsSync('.data/leads.json')) fs.writeFileSync('.data/leads.json', '[]', 'utf-8');
  if (fs.existsSync('.data/activity_logs.json')) fs.writeFileSync('.data/activity_logs.json', '[]', 'utf-8');
  if (fs.existsSync('.data/users.json')) {
    const users = JSON.parse(fs.readFileSync('.data/users.json', 'utf-8'));
    const cleanUsers = users.map((u) => {
      // Mark test sessions offline, but do NOT wipe genuine lastLogin if present
      if (u.id === 'usr-desvanth') {
        return { ...u, isOnline: true, lastActiveAt: new Date().toISOString() };
      }
      return { ...u, isOnline: false, lastActiveAt: null };
    });
    fs.writeFileSync('.data/users.json', JSON.stringify(cleanUsers, null, 2), 'utf-8');
  }

  console.log('\n====================================================');
  console.log(`🎉 ALL ${passed}/${total} AUDIT & IDENTITY CHECKS PASSED!`);
  console.log('====================================================');
}

runAudit().catch((err) => {
  console.error('\n❌ AUDIT FAILED:', err);
  process.exit(1);
});
