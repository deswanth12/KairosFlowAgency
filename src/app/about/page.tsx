import React from 'react';
import Link from 'next/link';
import { foundersData } from '@/data/team';
import { 
  Users, 
  Mail, 
  CheckCircle2,
  Terminal
} from 'lucide-react';
import { LinkedInIcon, GitHubIcon } from '@/components/ui/SocialIcons';

export const metadata = {
  title: 'About & Leadership | Kairos Flow Agency',
  description: 'Learn about the Kairos Flow philosophy and meet Founder Desvanth and the leadership team behind our technology, marketing, design, engineering, and cinematography.'
};

export default function AboutPage() {
  return (
    <div className="bg-[#F8FAFC] text-[#0F172A] min-h-screen">
      {/* Top Hero Section */}
      <section className="bg-[#F8FAFC] text-[#0F172A] pt-32 pb-16 px-4 sm:px-6 lg:px-8 border-b border-[#DCE5EF]">
        <div className="max-w-7xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-[#DCE5EF] text-xs font-mono uppercase tracking-widest text-[#1677FF] mb-4 font-semibold shadow-subtle-card">
            <Terminal className="w-3.5 h-3.5 text-[#1677FF]" />
            <span>/ ORIGIN & ARCHITECTURAL ETHOS</span>
          </div>
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[#071A2F] font-display max-w-3xl mb-6">
            Timing. Momentum. <span className="text-[#1677FF]">Execution.</span>
          </h1>
          <p className="text-[#64748B] text-base sm:text-lg max-w-2xl font-normal leading-relaxed">
            We created Kairos Flow because traditional agencies were either too slow and detached from modern engineering, or too fragmented to deliver end-to-end commercial impact.
          </p>
        </div>
      </section>

      {/* Origin Story & Meaning */}
      <section className="bg-[#F8FAFC] py-16 sm:py-24 px-4 sm:px-6 lg:px-8 border-b border-[#DCE5EF]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-24">
            <div className="lg:col-span-6 space-y-6">
              <div className="text-xs font-mono uppercase tracking-wider text-[#1677FF] font-bold">
                / PHILOSOPHY BEHIND THE SYSTEM
              </div>
              <h2 className="text-2xl sm:text-4xl font-bold text-[#071A2F] tracking-tight font-display">
                Why “Kairos” and “Flow”?
              </h2>
              <div className="space-y-4 text-[#64748B] text-sm sm:text-base leading-relaxed">
                <p>
                  In classical Greek thought, there are two words for time: <strong className="text-[#071A2F] font-semibold">Chronos</strong> (the sequential ticking of the clock) and <strong className="text-[#071A2F] font-semibold">Kairos</strong> (the opportune, decisive moment where action yields maximum leverage).
                </p>
                <p>
                  <strong className="text-[#071A2F] font-semibold">Flow</strong> represents uninterrupted kinetic movement—taking that critical window of opportunity and turning it into relentless, high-speed engineering momentum.
                </p>
                <p>
                  Founded by <strong className="text-[#071A2F] font-semibold">Desvanth</strong> alongside a dedicated multidisciplinary team, Kairos Flow exists to help founders and companies seize their <em>Kairos moment</em> with the digital products, AI systems, and visual authority needed to win.
                </p>
              </div>
            </div>

            <div className="lg:col-span-6 bg-[#071A2F] text-white p-8 sm:p-12 rounded-2xl border border-[#071A2F] shadow-elevated-card">
              <div className="text-xs font-mono text-[#38BDF8] uppercase tracking-widest mb-6 font-bold">
                / CORE OPERATING SPECIFICATIONS
              </div>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-[#38BDF8] font-mono text-xs font-bold flex-shrink-0">
                    01
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white mb-1 font-display">Direct Founder Ownership</h4>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      You never deal with account managers who cannot explain the code or designers detached from frontend reality.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-[#38BDF8] font-mono text-xs font-bold flex-shrink-0">
                    02
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white mb-1 font-display">Architectural Discipline</h4>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      We write strict TypeScript, modular components, and documented APIs that can scale for years without needing costly refactors.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-[#38BDF8] font-mono text-xs font-bold flex-shrink-0">
                    03
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white mb-1 font-display">Commercial Velocity</h4>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      Speed is a feature. We deliver weekly working staging environments rather than endless static slide decks.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Founding Leadership Team */}
          <div>
            <div className="max-w-3xl mb-16">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-[#DCE5EF] text-xs font-mono uppercase tracking-widest text-[#1677FF] mb-3 font-semibold shadow-subtle-card">
                <span>/ LEADERSHIP TEAM</span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#071A2F] font-display">
                Founder & Technical Structure
              </h2>
              <p className="text-[#64748B] text-base sm:text-lg mt-3">
                Specialist leadership across technical architecture, growth marketing, design systems, development sprints, and commercial video.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {foundersData.map((member, idx) => {
                const isFounder = member.id === 'desvanth';
                const initials = member.name
                  .split(' ')
                  .map((n) => n[0])
                  .join('');

                return (
                  <div
                    key={member.id}
                    className={`bg-white border rounded-2xl p-7 shadow-subtle-card hover:shadow-hover-card transition-all duration-300 flex flex-col justify-between ${
                      isFounder
                        ? 'border-[#1677FF] bg-gradient-to-b from-white to-[#EFF6FF]/30 ring-1 ring-[#1677FF]/30 md:col-span-2 lg:col-span-1'
                        : 'border-[#DCE5EF]'
                    }`}
                  >
                    <div>
                      {/* Header */}
                      <div className="flex items-center justify-between pb-4 border-b border-[#DCE5EF] mb-5">
                        <div
                          className={`w-12 h-12 rounded-xl font-mono font-bold text-base flex items-center justify-center border ${
                            isFounder
                              ? 'bg-[#071A2F] text-white border-[#071A2F] shadow-sm'
                              : 'bg-[#EFF6FF] text-[#071A2F] border-blue-100'
                          }`}
                        >
                          {initials}
                        </div>
                        {isFounder ? (
                          <span className="px-2.5 py-1 rounded-full bg-[#071A2F] text-white text-[11px] font-bold uppercase font-mono tracking-wider shadow-sm flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#38BDF8]" />
                            FOUNDER
                          </span>
                        ) : (
                          <span className="font-mono text-xs font-bold text-[#64748B]">
                            0{idx + 1}
                          </span>
                        )}
                      </div>

                      <div className="text-xs font-mono text-[#1677FF] font-semibold uppercase tracking-wider mb-1">
                        {member.role}
                      </div>
                      <h3 className="text-2xl font-bold text-[#071A2F] tracking-tight font-display mb-1">
                        {member.name}
                      </h3>
                      <p className="text-xs text-[#64748B] font-mono mb-4">{member.title}</p>

                      <p className="text-sm text-[#64748B] leading-relaxed mb-6">
                        {member.bio}
                      </p>

                      {member.quote && (
                        <div className="p-3.5 rounded-xl bg-[#F8FAFC] border-l-2 border-[#1677FF] text-xs italic text-[#071A2F] mb-6 font-mono">
                          “{member.quote}”
                        </div>
                      )}

                      {/* Detailed List of Responsibilities */}
                      <div className="space-y-2 mb-6 pt-4 border-t border-[#DCE5EF]">
                        <div className="text-[11px] font-mono uppercase text-[#64748B] tracking-wider font-semibold mb-2">
                          Core Functional Scope:
                        </div>
                        <div className="space-y-1.5">
                          {member.responsibilities?.map((resp, rIdx) => (
                            <div key={rIdx} className="flex items-start gap-2 text-xs text-[#0F172A]">
                              <CheckCircle2 className="w-3.5 h-3.5 text-[#1677FF] flex-shrink-0 mt-0.5" />
                              <span>{resp}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-[#DCE5EF] flex items-center justify-between font-mono">
                      <span className={`text-[11px] font-semibold ${isFounder ? 'text-[#071A2F] uppercase tracking-wider' : 'text-[#64748B]'}`}>
                        {isFounder ? 'LEAD ARCHITECT' : 'CORE LEAD'}
                      </span>
                      <div className="flex items-center gap-2 text-[#64748B]">
                        {member.socialLinks.email && (
                          <a
                            href={`mailto:${member.socialLinks.email}`}
                            className="p-1.5 hover:text-[#1677FF] transition-colors"
                            aria-label={`Email ${member.name}`}
                          >
                            <Mail className="w-4 h-4" />
                          </a>
                        )}
                        {member.socialLinks.linkedin && (
                          <a
                            href={member.socialLinks.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 hover:text-[#1677FF] transition-colors"
                            aria-label={`LinkedIn for ${member.name}`}
                          >
                            <LinkedInIcon className="w-4 h-4" />
                          </a>
                        )}
                        {member.socialLinks.github && (
                          <a
                            href={member.socialLinks.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 hover:text-[#1677FF] transition-colors"
                            aria-label={`GitHub for ${member.name}`}
                          >
                            <GitHubIcon className="w-4 h-4" />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
