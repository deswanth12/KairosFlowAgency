import React from 'react';
import Link from 'next/link';
import { foundersData } from '@/data/team';
import { Users, Mail, ArrowRight, CheckCircle2, Terminal } from 'lucide-react';
import { LinkedInIcon, GitHubIcon } from '@/components/ui/SocialIcons';

export const TeamPreview: React.FC = () => {
  return (
    <section id="team" className="bg-[#F8FAFC] text-[#0F172A] py-20 sm:py-28 px-4 sm:px-6 lg:px-8 border-b border-[#DCE5EF]">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-[#DCE5EF] text-xs font-mono uppercase tracking-widest text-[#1677FF] mb-3 font-semibold shadow-subtle-card">
              <Terminal className="w-3.5 h-3.5 text-[#1677FF]" />
              <span>/ LEADERSHIP & SPECIALISTS</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#071A2F] font-display">
              Five specialists. Five disciplines. One team.
            </h2>
            <p className="text-[#64748B] text-base sm:text-lg mt-3 max-w-xl">
              Zero junior handoffs. Zero account managers. You work directly with Founder Desvanth and the specialist leads building your product.
            </p>
          </div>

          <Link
            href="/about"
            className="inline-flex items-center gap-2 text-xs font-mono font-bold text-[#071A2F] hover:text-[#1677FF] transition-colors pb-1 border-b border-[#071A2F]/30 hover:border-[#1677FF] self-start md:self-auto uppercase tracking-wider"
          >
            <span>/ VIEW FOUNDER PROFILES</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* 5 Team Typographic Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-5">
          {foundersData.map((member, idx) => {
            const isFounder = member.id === 'desvanth';
            const initials = member.name
              .split(' ')
              .map((n) => n[0])
              .join('');

            return (
              <div
                key={member.id}
                className={`group flex flex-col justify-between p-6 bg-white border rounded-2xl shadow-subtle-card hover:shadow-hover-card transition-all duration-300 ${
                  isFounder
                    ? 'border-[#1677FF] bg-gradient-to-b from-white to-[#EFF6FF]/40 ring-1 ring-[#1677FF]/30'
                    : 'border-[#DCE5EF] hover:border-[#1677FF]/40'
                }`}
              >
                <div>
                  {/* Top Bar: Monogram + Badge/Number */}
                  <div className="flex items-center justify-between mb-5">
                    <div
                      className={`w-11 h-11 rounded-xl font-mono font-bold text-sm flex items-center justify-center border ${
                        isFounder
                          ? 'bg-[#071A2F] text-white border-[#071A2F] shadow-sm'
                          : 'bg-[#EFF6FF] text-[#071A2F] border-blue-100 group-hover:border-[#1677FF]'
                      } transition-colors`}
                    >
                      {initials}
                    </div>
                    {isFounder ? (
                      <span className="px-2.5 py-0.5 rounded-full bg-[#071A2F] text-white text-[10px] font-bold uppercase font-mono tracking-wider flex items-center gap-1 shadow-sm">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#38BDF8]" />
                        FOUNDER
                      </span>
                    ) : (
                      <span className="font-mono text-xs font-bold text-[#64748B]">
                        0{idx + 1}
                      </span>
                    )}
                  </div>

                  {/* Name & Role */}
                  <h3 className="text-xl font-bold text-[#071A2F] tracking-tight mb-1 group-hover:text-[#1677FF] transition-colors font-display">
                    {member.name}
                  </h3>
                  <div className="text-xs font-mono text-[#1677FF] font-semibold mb-4">
                    {member.role}
                  </div>

                  <p className="text-xs text-[#64748B] leading-relaxed mb-5">
                    {member.bio}
                  </p>

                  {/* Key Responsibilities List */}
                  <div className="space-y-1.5 mb-6 pt-4 border-t border-[#DCE5EF]">
                    <div className="text-[10px] font-mono uppercase text-[#64748B] tracking-wider font-semibold mb-2">
                      Key Scope:
                    </div>
                    {member.responsibilities?.slice(0, 4).map((resp, rIdx) => (
                      <div key={rIdx} className="flex items-start gap-1.5 text-[11px] text-[#0F172A]">
                        <CheckCircle2 className="w-3 h-3 text-[#1677FF] flex-shrink-0 mt-0.5" />
                        <span className="leading-tight">{resp}</span>
                      </div>
                    ))}
                    {(member.responsibilities?.length || 0) > 4 && (
                      <div className="text-[10px] font-mono text-[#64748B] pl-4">
                        +{(member.responsibilities?.length || 0) - 4} more
                      </div>
                    )}
                  </div>
                </div>

                {/* Footer Designation & Social Actions */}
                <div className="pt-4 border-t border-[#DCE5EF] flex items-center justify-between text-[#64748B] font-mono">
                  <span className={`text-[11px] font-semibold ${isFounder ? 'text-[#071A2F] uppercase tracking-wider' : 'text-[#64748B]'}`}>
                    {isFounder ? 'LEAD ARCHITECT' : 'CORE LEAD'}
                  </span>
                  <div className="flex items-center gap-2">
                    {member.socialLinks.email && (
                      <a
                        href={`mailto:${member.socialLinks.email}`}
                        className="p-1 hover:text-[#1677FF] transition-colors"
                        aria-label={`Email ${member.name}`}
                      >
                        <Mail className="w-3.5 h-3.5" />
                      </a>
                    )}
                    {member.socialLinks.linkedin && (
                      <a
                        href={member.socialLinks.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1 hover:text-[#1677FF] transition-colors"
                        aria-label={`LinkedIn for ${member.name}`}
                      >
                        <LinkedInIcon className="w-3.5 h-3.5" />
                      </a>
                    )}
                    {member.socialLinks.github && (
                      <a
                        href={member.socialLinks.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1 hover:text-[#1677FF] transition-colors"
                        aria-label={`GitHub for ${member.name}`}
                      >
                        <GitHubIcon className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
