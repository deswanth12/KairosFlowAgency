import React from 'react';
import Link from 'next/link';
import { foundersData } from '@/data/team';
import { Users, Mail, ArrowRight } from 'lucide-react';
import { LinkedInIcon, GitHubIcon } from '@/components/ui/SocialIcons';

export const TeamPreview: React.FC = () => {
  return (
    <section id="team" className="bg-ivory text-softblack py-20 sm:py-28 px-4 sm:px-6 lg:px-8 border-b border-ivory-border">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-ivory-muted border border-ivory-border text-xs font-mono uppercase tracking-widest text-slate mb-3">
              <Users className="w-3.5 h-3.5 text-teal" />
              <span>Agency Leadership</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-softblack font-display">
              Led by specialists, not middlemen.
            </h2>
            <p className="text-slate text-base sm:text-lg mt-3 max-w-xl">
              Meet the leadership team steering technical architecture, marketing, creative direction, development, and video production.
            </p>
          </div>

          <Link
            href="/about"
            className="inline-flex items-center gap-2 text-sm font-semibold text-softblack hover:text-teal transition-colors pb-1 border-b border-softblack/30 hover:border-teal self-start md:self-auto"
          >
            <span>Read Agency Story & Values</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* 5 Founders Typographic Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-5">
          {foundersData.map((founder, idx) => {
            const isFounder = founder.id === 'desvanth';
            const initials = founder.name
              .split(' ')
              .map((n) => n[0])
              .join('');

            return (
              <div
                key={founder.id}
                className={`group flex flex-col justify-between p-6 bg-ivory-card border rounded-xl shadow-subtle-ivory hover:shadow-elevated-ivory transition-all duration-300 ${
                  isFounder
                    ? 'border-champagne/70 bg-gradient-to-b from-ivory-card to-champagne-subtle/30 ring-1 ring-champagne/30'
                    : 'border-ivory-border hover:border-teal/50'
                }`}
              >
                <div>
                  {/* Top Bar: Monogram + Number */}
                  <div className="flex items-center justify-between mb-5">
                    <div
                      className={`w-11 h-11 rounded-lg font-mono font-bold text-sm flex items-center justify-center border ${
                        isFounder
                          ? 'bg-ink text-champagne border-champagne'
                          : 'bg-ink text-ivory border-navy-border group-hover:border-teal'
                      } transition-colors`}
                    >
                      {initials}
                    </div>
                    {isFounder ? (
                      <span className="px-2 py-0.5 rounded bg-champagne text-ink text-[10px] font-bold uppercase font-mono tracking-wider flex items-center gap-1">
                        Founder
                      </span>
                    ) : (
                      <span className="font-mono text-xs font-bold text-slate-muted">
                        0{idx + 1}
                      </span>
                    )}
                  </div>

                  {/* Name & Role */}
                  <h3 className="text-xl font-bold text-softblack tracking-tight mb-1 group-hover:text-teal transition-colors">
                    {founder.name}
                  </h3>
                  <div className="text-xs font-mono text-teal font-semibold mb-4">
                    {founder.role}
                  </div>

                  <p className="text-xs text-slate leading-relaxed mb-6">
                    {founder.bio}
                  </p>

                  {/* Competency Badges */}
                  <div className="flex flex-wrap gap-1 mb-6">
                    {founder.skills.slice(0, 3).map((skill) => (
                      <span
                        key={skill}
                        className="px-2 py-0.5 text-[10px] font-mono bg-ivory-muted text-slate-dark rounded border border-ivory-border"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Footer Social Actions */}
                <div className="pt-4 border-t border-ivory-border flex items-center justify-between text-slate">
                  <span className={`text-[11px] font-mono font-semibold ${isFounder ? 'text-softblack uppercase tracking-wider' : 'text-slate-muted'}`}>
                    {isFounder ? 'Founder' : 'Founding Lead'}
                  </span>
                  <div className="flex items-center gap-2">
                    {founder.socialLinks.email && (
                      <a
                        href={`mailto:${founder.socialLinks.email}`}
                        className="p-1 hover:text-teal transition-colors"
                        aria-label={`Email ${founder.name}`}
                      >
                        <Mail className="w-3.5 h-3.5" />
                      </a>
                    )}
                    {founder.socialLinks.linkedin && (
                      <a
                        href={founder.socialLinks.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1 hover:text-teal transition-colors"
                        aria-label={`LinkedIn for ${founder.name}`}
                      >
                        <LinkedInIcon className="w-3.5 h-3.5" />
                      </a>
                    )}
                    {founder.socialLinks.github && (
                      <a
                        href={founder.socialLinks.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1 hover:text-teal transition-colors"
                        aria-label={`GitHub for ${founder.name}`}
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
