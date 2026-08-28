import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { foundersData } from '@/data/team';
import { 
  Users, 
  Compass, 
  Sparkles, 
  ArrowUpRight, 
  Mail, 
  Target, 
  Zap, 
  ShieldCheck 
} from 'lucide-react';
import { LinkedInIcon, GitHubIcon, TwitterIcon } from '@/components/ui/SocialIcons';

export const metadata = {
  title: 'About & Founding Team | Kairos Flow Agency',
  description: 'Learn about the Kairos Flow philosophy and meet the five co-founders behind our technology, marketing, design, engineering, and cinematography.'
};

export default function AboutPage() {
  return (
    <div className="bg-ivory text-softblack min-h-screen">
      {/* Top Hero Section (Deep Ink) */}
      <section className="bg-ink text-ivory pt-32 pb-20 px-4 sm:px-6 lg:px-8 border-b border-navy-border">
        <div className="max-w-7xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-navy/80 border border-navy-border text-xs font-mono uppercase tracking-widest text-teal mb-4">
            <Users className="w-3.5 h-3.5" />
            <span>Origin & Ethos</span>
          </div>
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-ivory font-display max-w-3xl mb-6">
            Timing. Momentum. Execution.
          </h1>
          <p className="text-slate-light text-base sm:text-lg max-w-2xl font-normal leading-relaxed">
            We created Kairos Flow because traditional agencies were either too slow and detached from modern engineering, or too fragmented to deliver end-to-end commercial impact.
          </p>
        </div>
      </section>

      {/* Origin Story & Meaning (Warm Ivory) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-24">
          <div className="lg:col-span-6 space-y-6">
            <div className="text-xs font-mono uppercase tracking-wider text-slate font-semibold">
              The Meaning of the Name
            </div>
            <h2 className="text-2xl sm:text-4xl font-bold text-softblack tracking-tight font-display">
              Why “Kairos” and “Flow”?
            </h2>
            <div className="space-y-4 text-slate text-sm sm:text-base leading-relaxed">
              <p>
                In classical Greek thought, there are two words for time: <strong className="text-softblack">Chronos</strong> (the sequential ticking of the clock) and <strong className="text-softblack">Kairos</strong> (the opportune, decisive moment where action yields maximum leverage).
              </p>
              <p>
                <strong className="text-softblack">Flow</strong> represents uninterrupted kinetic movement—taking that critical window of opportunity and turning it into relentless, high-speed engineering momentum.
              </p>
              <p>
                As an agency, we exist to help founders and companies seize their <em>Kairos moment</em> with the digital products, AI systems, and visual authority needed to win.
              </p>
            </div>
          </div>

          <div className="lg:col-span-6 bg-ink text-ivory p-8 sm:p-12 rounded-2xl border border-navy-border shadow-card-dark">
            <div className="text-xs font-mono text-champagne uppercase tracking-widest mb-4">
              Our Core Operating Principles
            </div>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded bg-navy flex items-center justify-center text-teal font-mono text-xs font-bold flex-shrink-0">
                  01
                </div>
                <div>
                  <h4 className="text-sm font-bold text-ivory mb-1">Direct Founder Ownership</h4>
                  <p className="text-xs text-slate-light leading-relaxed">
                    You never deal with account managers who cannot explain the code or designers detached from frontend reality.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded bg-navy flex items-center justify-center text-teal font-mono text-xs font-bold flex-shrink-0">
                  02
                </div>
                <div>
                  <h4 className="text-sm font-bold text-ivory mb-1">Architectural Discipline</h4>
                  <p className="text-xs text-slate-light leading-relaxed">
                    We write strict TypeScript, modular components, and documented APIs that can scale for years without needing costly refactors.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded bg-navy flex items-center justify-center text-teal font-mono text-xs font-bold flex-shrink-0">
                  03
                </div>
                <div>
                  <h4 className="text-sm font-bold text-ivory mb-1">Commercial Velocity</h4>
                  <p className="text-xs text-slate-light leading-relaxed">
                    Speed is a feature. We deliver weekly working staging environments rather than endless static slide decks.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Founding Team Deep Dive */}
        <div>
          <div className="max-w-3xl mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-ivory-muted border border-ivory-border text-xs font-mono uppercase tracking-widest text-slate mb-3">
              <span>Meet The Founders</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-softblack font-display">
              The Five Co-Founders
            </h2>
            <p className="text-slate text-base sm:text-lg mt-3">
              A balanced team uniting technical architecture, marketing strategy, visual design, core engineering, and high-impact cinematography.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {foundersData.map((founder) => (
              <div
                key={founder.id}
                className="bg-ivory-card border border-ivory-border rounded-2xl overflow-hidden shadow-subtle-ivory hover:shadow-elevated-ivory transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Photo & Role Banner */}
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-navy-dark">
                    <Image
                      src={founder.photo}
                      alt={founder.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover filter grayscale hover:grayscale-0 transition-all duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-transparent to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4 text-ivory">
                      <div className="text-lg font-bold tracking-tight">{founder.name}</div>
                      <div className="text-xs text-teal font-mono">{founder.role}</div>
                    </div>
                  </div>

                  <div className="p-6">
                    <p className="text-xs text-slate-muted font-mono mb-3">{founder.title}</p>
                    <p className="text-sm text-slate leading-relaxed mb-6">
                      {founder.bio}
                    </p>

                    {founder.quote && (
                      <div className="p-3.5 rounded-lg bg-ivory-muted border-l-2 border-champagne text-xs italic text-softblack mb-6">
                        “{founder.quote}”
                      </div>
                    )}

                    <div className="space-y-1.5">
                      <div className="text-[11px] font-mono uppercase text-slate tracking-wider font-semibold mb-2">
                        Core Competencies:
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {founder.skills.map((skill) => (
                          <span
                            key={skill}
                            className="px-2 py-0.5 text-[11px] font-mono bg-ivory text-softblack rounded border border-ivory-border"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-6 pt-4 border-t border-ivory-border flex items-center justify-between">
                  <span className="text-xs text-slate font-medium">Co-Founder</span>
                  <div className="flex items-center gap-2 text-slate">
                    {founder.socialLinks.email && (
                      <a
                        href={`mailto:${founder.socialLinks.email}`}
                        className="p-1.5 hover:text-teal transition-colors"
                        aria-label={`Email ${founder.name}`}
                      >
                        <Mail className="w-4 h-4" />
                      </a>
                    )}
                    {founder.socialLinks.linkedin && (
                      <a
                        href={founder.socialLinks.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 hover:text-teal transition-colors"
                        aria-label={`LinkedIn ${founder.name}`}
                      >
                        <LinkedInIcon className="w-4 h-4" />
                      </a>
                    )}
                    {founder.socialLinks.github && (
                      <a
                        href={founder.socialLinks.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 hover:text-teal transition-colors"
                        aria-label={`GitHub ${founder.name}`}
                      >
                        <GitHubIcon className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
