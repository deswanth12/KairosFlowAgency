import React from 'react';
import { Compass, Users, Clock, Cpu, PenTool } from 'lucide-react';

const VALUES = [
  {
    icon: Compass,
    number: '01',
    title: 'Strategy Before Execution',
    description: 'We do not build without clear commercial rationale. Every interface decision, architecture choice, and line of code traces directly to measurable business velocity.'
  },
  {
    icon: Users,
    number: '02',
    title: 'One Integrated Founder Team',
    description: 'Zero junior handoffs. You work directly with the specialist co-founders who write the code, design the systems, film the media, and manage the deployment.'
  },
  {
    icon: Clock,
    number: '03',
    title: 'Rapid, Transparent Communication',
    description: 'Async-first updates, 4-hour SLA responses, weekly video staging walkthroughs, and clear milestone dashboards. No radio silence.'
  },
  {
    icon: Cpu,
    number: '04',
    title: 'Practical Technology Over Hype',
    description: 'We avoid bloated agency trends. We leverage high-speed modern frameworks (Next.js, TypeScript, PostgreSQL) and pragmatic AI pipelines that produce real ROI.'
  },
  {
    icon: PenTool,
    number: '05',
    title: 'Architectural & Purpose-Driven Design',
    description: 'Restrained, timeless, and human-centered. We design for clarity, conversion, and longevity rather than short-lived visual fads.'
  }
];

export const WhyKairos: React.FC = () => {
  return (
    <section className="bg-ivory text-softblack py-20 sm:py-28 px-4 sm:px-6 lg:px-8 border-b border-ivory-border">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-ivory-muted border border-ivory-border text-xs font-mono uppercase tracking-widest text-slate mb-3">
            <span>Our Philosophy</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-softblack font-display">
            Why partner with Kairos Flow?
          </h2>
          <p className="text-slate text-base sm:text-lg mt-4 leading-relaxed">
            Named after the Greek concept of the opportune moment (*Kairos*) and seamless progress (*Flow*), we combine deep technical rigor with creative agility.
          </p>
        </div>

        {/* 5 Value Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {VALUES.map((val) => {
            const Icon = val.icon;
            return (
              <div
                key={val.number}
                className="flex flex-col justify-between p-7 rounded-xl bg-ivory-card border border-ivory-border shadow-subtle-ivory hover:shadow-elevated-ivory transition-all duration-300"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-10 h-10 rounded-lg bg-ivory-muted border border-ivory-border flex items-center justify-center text-teal">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="font-mono text-xs font-bold text-champagne">
                      {val.number}
                    </span>
                  </div>

                  <h3 className="text-lg sm:text-xl font-bold text-softblack tracking-tight mb-3">
                    {val.title}
                  </h3>

                  <p className="text-slate text-sm leading-relaxed">
                    {val.description}
                  </p>
                </div>
              </div>
            );
          })}

          {/* 6th Card: Direct Commitment */}
          <div className="flex flex-col justify-between p-7 rounded-xl bg-ink text-ivory border border-navy-border shadow-card-dark">
            <div>
              <div className="text-xs font-mono text-champagne uppercase tracking-widest mb-4">
                Our Guarantee
              </div>
              <h3 className="text-xl font-bold text-ivory tracking-tight mb-3">
                100% Code & Asset Ownership
              </h3>
              <p className="text-slate-light text-sm leading-relaxed mb-6">
                All IP, source code, Figma files, raw 4K video footage, and cloud accounts remain 100% yours upon milestone completion. No proprietary lock-in.
              </p>
            </div>
            <div className="text-xs font-mono text-teal">
              Clean TypeScript • Zero Vendor Lock-in
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
