import React from 'react';
import Link from 'next/link';
import { foundersData } from '@/data/team';
import { Users, Mail, ArrowRight, CheckCircle2, Terminal } from 'lucide-react';
import { LinkedInIcon, GitHubIcon } from '@/components/ui/SocialIcons';

export const TeamPreview: React.FC = () => {
  return (
    <section id="team" className="bg-[#F7F7F4] text-[#111827] py-20 sm:py-28 px-4 sm:px-6 lg:px-8 border-b border-[#D9E0E5]">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-[#D9E0E5] text-xs font-mono uppercase tracking-widest text-[#B8613A] mb-3 font-semibold shadow-subtle-card">
              <Terminal className="w-3.5 h-3.5 text-[#B8613A]" />
              <span>/ LEADERSHIP & SPECIALISTS</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#0B1F33] font-display">
              Five specialists. Five disciplines. One team.
            </h2>
            <p className="text-[#5B6875] text-base sm:text-lg mt-3 max-w-xl">
              Zero junior handoffs. Zero account managers. You work directly with Founder Desvanth and the specialist leads building your product.
            </p>
          </div>

          <Link
            href="/about"
            className="inline-flex items-center gap-2 text-xs font-mono font-bold text-[#0B1F33] hover:text-[#B8613A] transition-colors pb-1 border-b border-[#0B1F33]/30 hover:border-[#B8613A] self-start md:self-auto uppercase tracking-wider"
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
                    ? 'border-[#B8613A] bg-gradient-to-b from-white to-[#FBF4F0]/40 ring-1 ring-[#B8613A]/30'
                    : 'border-[#D9E0E5] hover:border-[#B8613A]/40'
                }`}
              >
                <div>
                  {/* Top Bar: Monogram + Badge/Number */}
                  <div className="flex items-center justify-between mb-5">
                    <div
                      className={`w-11 h-11 rounded-xl font-mono font-bold text-sm flex items-center justify-center border ${
                        isFounder
                          ? 'bg-[#0B1F33] text-white border-[#0B1F33] shadow-sm'
                          : 'bg-[#FBF4F0] text-[#0B1F33] border-[#B8613A]/20 group-hover:border-[#B8613A]'
                      } transition-colors`}
                    >
                      {initials}
                    </div>
                    {isFounder ? (
                      <span className="px-2.5 py-0.5 rounded-full bg-[#0B1F33] text-white text-[10px] font-bold uppercase font-mono tracking-wider flex items-center gap-1 shadow-sm">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#B8613A]" />
                        FOUNDER
                      </span>
                    ) : (
                      <span className="font-mono text-xs font-bold text-[#5B6875]">
                        0{idx + 1}
                      </span>
                    )}
                  </div>

                  {/* Name & Role */}
                  <h3 className="text-xl font-bold text-[#0B1F33] tracking-tight mb-1 group-hover:text-[#B8613A] transition-colors font-display">
                    {member.name}
                  </h3>
                  <div className="text-xs font-mono text-[#B8613A] font-semibold mb-4">
                    {member.role}
                  </div>

                  <p className="text-xs text-[#5B6875] leading-relaxed mb-5">
                    {member.bio}
                  </p>

                  {/* Key Responsibilities List */}
                  <div className="space-y-1.5 mb-6 pt-4 border-t border-[#D9E0E5]">
                    <div className="text-[10px] font-mono uppercase text-[#5B6875] tracking-wider font-semibold mb-2">
                      Key Scope:
                    </div>
                    {member.responsibilities?.slice(0, 4).map((resp, rIdx) => (
                      <div key={rIdx} className="flex items-start gap-1.5 text-[11px] text-[#111827]">
                        <CheckCircle2 className="w-3 h-3 text-[#B8613A] flex-shrink-0 mt-0.5" />
                        <span className="leading-tight">{resp}</span>
                      </div>
                    ))}
                    {(member.responsibilities?.length || 0) > 4 && (
                      <div className="text-[10px] font-mono text-[#5B6875] pl-4">
                        +{(member.responsibilities?.length || 0) - 4} more
                      </div>
                    )}
                  </div>
                </div>

                {/* Footer Designation & Social Actions */}
                <div className="pt-4 border-t border-[#D9E0E5] flex items-center justify-between text-[#5B6875] font-mono">
                  <span className={`text-[11px] font-semibold ${isFounder ? 'text-[#0B1F33] uppercase tracking-wider' : 'text-[#5B6875]'}`}>
                    {isFounder ? 'LEAD ARCHITECT' : 'CORE LEAD'}
                  </span>
                  <div className="flex items-center gap-2">
                    {member.socialLinks.email && (
                      <a
                        href={`mailto:${member.socialLinks.email}`}
                        className="p-1 hover:text-[#B8613A] transition-colors"
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
                        className="p-1 hover:text-[#B8613A] transition-colors"
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
                        className="p-1 hover:text-[#B8613A] transition-colors"
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
