# Kairos Flow Agency

> **Digital experiences built for businesses that want to move forward.**  
> Websites, applications, AI systems, branding, marketing, and commercial cinematography designed and engineered by one multidisciplinary team.

[![Next.js](https://img.shields.io/badge/Next.js-15+-0D1117?style=flat-square&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7+-2F7C78?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4+-182B3A?style=flat-square&logo=tailwindcss)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-Proprietary-B99A62?style=flat-square)](#)

---

## 🏛️ Agency Ethos

**Kairos** represents the right, decisive moment where action yields maximum leverage.  
**Flow** represents continuous, kinetic execution and engineering momentum.

Our core operating principle: **Trust first, premium second, sales third.**  
We eliminate generic agency fluff and deliver production-ready software, verifiable case studies, and transparent founder-led communication.

---

## ⚡ Six Core Disciplines

| Capability | Scope & Focus | Deliverables |
| :--- | :--- | :--- |
| **🌐 Web Development** | High-speed Next.js web applications, SaaS dashboards, client portals, and e-commerce. | Modular TypeScript architecture, sub-second load times (<0.8s), technical SEO, responsive design. |
| **📱 App Development** | Native & cross-platform iOS/Android experiences built for offline sync and intuitive UX. | React Native / Flutter builds, BLE hardware sync, biometric auth, App Store publishing. |
| **🤖 AI & Automation** | Custom LLM chat assistants, RAG pipelines, document intelligence, and workflow automations. | n8n / Python webhooks, pgvector knowledge bases, CRM data pipelines, error recovery webhooks. |
| **🎨 UI/UX & Branding** | Distinctive visual identities, design systems, and human-centered digital products. | High-fidelity Figma prototypes, comprehensive design tokens, typography scales, brand manuals. |
| **📈 Digital Marketing** | Full-funnel customer acquisition, technical SEO audits, and conversion rate optimization (CRO). | Landing page A/B tests, attribution tracking, paid search/social funnels, revenue analytics. |
| **🎬 Video & Content** | High-impact brand films, product motion showcases, 4K cinematography, and social reels. | Multi-camera 4K shoots, DaVinci Resolve color grading, custom sound design, vertical social packages. |

---

## 👥 The Founding Team

We operate with **direct founder ownership**—zero junior handoffs or disconnected account managers:

- **Desvanth** — *Technology & Client Lead* (Technical Architecture, Client Strategy, Cloud Infrastructure)
- **Bhasha** — *Marketing & Operations* (Growth Strategy, Agency Operations, Conversion Funnels)
- **Siddiq** — *Creative & Content* (UI/UX Design, Visual Strategy, Brand Systems)
- **Rithesh** — *Development* (Frontend Engineering, TypeScript, Component Libraries, Performance QA)
- **Sai Deep** — *Video Production* (Cinematography, Post-Production, Sound Design, Content Engine)

---

## 🎨 Architectural Design System

The platform is designed around a restrained, timeless agency palette:

```
Deep Ink      #0D1117   Hero background, Navbar, Footer, architectural dark framing
Warm Ivory    #F4F1EA   Main editorial reading areas, case studies, content sections
Deep Navy     #182B3A   Cards, structural borders, secondary dark UI areas
Soft Black    #20252B   Headlines, high-contrast typography, sharp body text
Slate         #69737D   Metadata, timestamps, category tags, captions
Muted Teal    #2F7C78   5%–10% visual budget for buttons, active pills, flow particles
Champagne     #B99A62   1%–2% visual budget for luxury badges, milestone metrics, status dots
```

---

## 📊 Operations CRM & Admin Portal (`/admin`)

The website includes a full internal CRM to manage incoming project inquiries and client pipeline stages:

- **Security Gate**: Protected by admin key / password (default: `Kairos@$$` or via `ADMIN_PASSWORD` env).
- **9-Stage Workflow**:
  $$\text{New Lead} \rightarrow \text{Contacted} \rightarrow \text{Discovery Call} \rightarrow \text{Proposal Sent} \rightarrow \text{Negotiation} \rightarrow \text{Won} \rightarrow \text{In Progress} \rightarrow \text{Completed} \rightarrow \text{Lost / Closed}$$
- **Interactive Views**: Switch between a visual **Kanban Pipeline Board** and **Data Table**.
- **Business Management**:
  - Lead Priority (`High` / `Medium` / `Low`)
  - Expected Deal Value tracking
  - Proposal Status (`Not Started`, `Draft`, `Sent`, `Approved`, `Declined`)
  - Payment Status (`Pending Deposit`, `Deposit Paid`, `Milestone Paid`, `Fully Paid`)
  - Founder assignment & timestamped internal team notes
  - One-click CSV export

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18.18+ or 20+
- npm / yarn / pnpm

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/deswanth12/KairosFlowAgency.git
   cd KairosFlowAgency
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   Create a `.env.local` file in the root directory:
   ```env
   ADMIN_PASSWORD=Kairos@$$
   NEXT_PUBLIC_WHATSAPP_NUMBER=917702256073
   NEXT_PUBLIC_CONTACT_EMAIL=hello@kairosflow.agency
   NEXT_PUBLIC_SITE_URL=https://kairosflow.agency
   ```

4. **Run the development server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) to view the website.

5. **Build for production**:
   ```bash
   npm run build
   npm run start
   ```

---

## ☁️ Deployment to Vercel

1. Push your changes to GitHub:
   ```bash
   git add .
   git commit -m "feat: deploy to production"
   git push origin main
   ```
2. Connect the repository on [Vercel](https://vercel.com).
3. Add the `ADMIN_PASSWORD` environment variable in the Vercel dashboard.
4. Click **Deploy**.

---

## 📞 Direct Agency Contact

- **Phone / WhatsApp**: [+91 77022 56073](https://wa.me/917702256073)
- **Email**: [hello@kairosflow.agency](mailto:hello@kairosflow.agency)
- **Location**: Hyderabad & Bangalore, India • Global Client Delivery
- **Business Turnaround**: Inquiries reviewed within 24 hours on business days.

---

© 2026 **Kairos Flow Agency**. All rights reserved.
