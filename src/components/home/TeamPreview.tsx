import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { foundersData } from '@/data/team';
import { Users, Mail, ArrowRight } from 'lucide-react';
import { LinkedInIcon, GitHubIcon, TwitterIcon } from '@/components/ui/SocialIcons';

export const TeamPreview: React.FC = () => {
  return (
    <section id="team" className="bg-ivory text-softblack py-20 sm:py-28 px-4 sm:px-6 lg:px-8 border-b border-ivory-border">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-ivory-muted border border-ivory-border text-xs font-mono uppercase tracking-widest text-slate mb-3">
              <Users className="w-3.5 h-3.5 text-teal" />
              <span>Founding Team</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-softblack font-display">
              Led by specialists, not middlemen.
            </h2>
            <p className="text-slate text-base sm:text-lg mt-3 max-w-xl">
              Meet the five founders steering technology, marketing, creative direction, engineering, and video production across all Kairos Flow engagements.
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

        {/* 5 Founders Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 sm:gap-6">
          {foundersData.map((founder) => (
            <div
              key={founder.id}
              className="group flex flex-col bg-ivory-card border border-ivory-border rounded-xl overflow-hidden shadow-subtle-ivory hover:shadow-elevated-ivory transition-all duration-300 hover:border-teal/50"
            >
              {/* Photo */}
              <div className="relative aspect-[4/5] w-full overflow-hidden bg-navy-dark">
                <Image
                  src={founder.photo}
                  alt={founder.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 20vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105 filter grayscale group-hover:grayscale-0"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-transparent to-transparent opacity-80" />
                <div className="absolute bottom-3 left-3 right-3 text-ivory">
                  <div className="text-sm font-bold tracking-tight">{founder.name}</div>
                  <div className="text-[11px] text-teal-subtle font-mono">{founder.role}</div>
                </div>
              </div>

              {/* Bio & Skills */}
              <div className="p-4 flex flex-col justify-between flex-1">
                <div>
                  <p className="text-xs text-slate leading-relaxed mb-4 line-clamp-3">
                    {founder.bio}
                  </p>

                  <div className="flex flex-wrap gap-1 mb-4">
                    {founder.skills.slice(0, 2).map((skill) => (
                      <span
                        key={skill}
                        className="px-1.5 py-0.5 text-[10px] font-mono bg-ivory-muted text-slate-dark rounded border border-ivory-border"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Social Links */}
                <div className="pt-3 border-t border-ivory-border flex items-center gap-2 text-slate">
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
          ))}
        </div>
      </div>
    </section>
  );
};
