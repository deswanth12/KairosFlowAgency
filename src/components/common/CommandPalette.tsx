'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Search, 
  X, 
  ArrowRight, 
  MessageCircle, 
  Calculator, 
  Layers, 
  Sparkles, 
  FileText, 
  ExternalLink,
  Code2,
  Smartphone,
  Cpu,
  Palette,
  TrendingUp,
  Video
} from 'lucide-react';
import { projectsData } from '@/data/projects';
import { generateWhatsAppLink } from '@/lib/utils';
import { siteSettingsData } from '@/data/settings';

interface CommandItem {
  id: string;
  category: 'Actions' | 'Case Studies' | 'Services' | 'Navigation';
  title: string;
  description: string;
  icon: React.ElementType;
  action: () => void;
  external?: boolean;
}

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({ isOpen, onClose }) => {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const whatsappUrl = generateWhatsAppLink(siteSettingsData.whatsappNumber);

  // Focus input when modal opens
  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  // Global shortcut to open/close (Cmd+K / Ctrl+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else onClose(); // parent handles toggle if passed, or listens
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Build items catalog
  const items: CommandItem[] = [
    // Primary Actions
    {
      id: 'act-estimator',
      category: 'Actions',
      title: 'Estimate Project Scope & Cost',
      description: 'Interactive calculator with INR / USD currency rates',
      icon: Calculator,
      action: () => {
        onClose();
        router.push('/#cost-estimator');
      }
    },
    {
      id: 'act-contact',
      category: 'Actions',
      title: 'Start a Project Brief',
      description: 'Submit an inquiry or schedule a discovery sprint',
      icon: Sparkles,
      action: () => {
        onClose();
        router.push('/contact');
      }
    },
    {
      id: 'act-whatsapp',
      category: 'Actions',
      title: 'Chat with Founder on WhatsApp',
      description: 'Direct response from Founder Desvanth (<15m SLA)',
      icon: MessageCircle,
      external: true,
      action: () => {
        onClose();
        window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
      }
    },

    // Services
    {
      id: 'svc-web',
      category: 'Services',
      title: 'Web Engineering & Portals',
      description: 'Next.js 15, TypeScript, Tailwind, Sub-second performance',
      icon: Code2,
      action: () => {
        onClose();
        router.push('/services#web');
      }
    },
    {
      id: 'svc-apps',
      category: 'Services',
      title: 'Mobile Applications (iOS & Android)',
      description: 'React Native, Flutter, offline-first sync engines',
      icon: Smartphone,
      action: () => {
        onClose();
        router.push('/services#apps');
      }
    },
    {
      id: 'svc-ai',
      category: 'Services',
      title: 'AI Systems & Autonomous Pipelines',
      description: 'RAG pipelines, custom LLM fine-tuning, voice agents',
      icon: Cpu,
      action: () => {
        onClose();
        router.push('/services#ai');
      }
    },
    {
      id: 'svc-branding',
      category: 'Services',
      title: 'UI/UX & Brand Architecture',
      description: 'Design systems, tokens, conversion design',
      icon: Palette,
      action: () => {
        onClose();
        router.push('/services#branding');
      }
    },
    {
      id: 'svc-marketing',
      category: 'Services',
      title: 'Full-Funnel Growth & Performance Marketing',
      description: 'Technical SEO, tracking, attribution analytics',
      icon: TrendingUp,
      action: () => {
        onClose();
        router.push('/services#marketing');
      }
    },
    {
      id: 'svc-video',
      category: 'Services',
      title: 'Commercial Video & Motion Production',
      description: 'Founder stories, 3D product reels, UI animations',
      icon: Video,
      action: () => {
        onClose();
        router.push('/services#video');
      }
    },

    // Case Studies
    ...projectsData.map((project) => ({
      id: `proj-${project.slug}`,
      category: 'Case Studies' as const,
      title: project.title,
      description: `${project.client} • ${project.category} • ${project.tagline}`,
      icon: FileText,
      action: () => {
        onClose();
        router.push(`/work/${project.slug}`);
      }
    })),

    // Navigation
    {
      id: 'nav-process',
      category: 'Navigation',
      title: 'Our 6-Sprint Process & SLAs',
      description: 'Agile sprints, architecture first, guaranteed deliverables',
      icon: Layers,
      action: () => {
        onClose();
        router.push('/process');
      }
    },
    {
      id: 'nav-about',
      category: 'Navigation',
      title: 'About Founding Team & Studio',
      description: 'Tirupati, AP headquarters, senior engineering team',
      icon: Layers,
      action: () => {
        onClose();
        router.push('/about');
      }
    }
  ];

  // Filter items by search query
  const filteredItems = items.filter((item) => {
    const q = query.toLowerCase().trim();
    if (!q) return true;
    return (
      item.title.toLowerCase().includes(q) ||
      item.description.toLowerCase().includes(q) ||
      item.category.toLowerCase().includes(q)
    );
  });

  // Handle keyboard arrow navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % (filteredItems.length || 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filteredItems.length) % (filteredItems.length || 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredItems[selectedIndex]) {
        filteredItems[selectedIndex].action();
      }
    }
  };

  // Scroll selected item into view
  useEffect(() => {
    if (listRef.current) {
      const selectedEl = listRef.current.querySelector(`[data-index="${selectedIndex}"]`);
      if (selectedEl) {
        selectedEl.scrollIntoView({ block: 'nearest' });
      }
    }
  }, [selectedIndex]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 pb-4">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-[#0B1F33]/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Palette Container */}
      <div 
        className="relative w-full max-w-2xl bg-white border border-[#D9E0E5] rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh] animate-in fade-in zoom-in-95 duration-150 z-10"
        onKeyDown={handleKeyDown}
      >
        {/* Search Header */}
        <div className="flex items-center px-4 py-3.5 border-b border-[#D9E0E5] bg-[#F7F7F4]">
          <Search className="w-5 h-5 text-[#5B6875] mr-3 flex-shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            placeholder="Search projects, services, pricing, or quick actions..."
            className="w-full bg-transparent text-sm text-[#111827] placeholder:text-[#5B6875] focus:outline-none font-mono"
          />
          <button
            onClick={onClose}
            className="p-1 rounded-md text-[#5B6875] hover:text-[#0B1F33] hover:bg-[#D9E0E5]/50 transition-colors ml-2"
            aria-label="Close command palette"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results List */}
        <div ref={listRef} className="flex-1 overflow-y-auto p-2 space-y-1">
          {filteredItems.length === 0 ? (
            <div className="py-12 text-center text-[#5B6875] font-mono text-xs">
              No results found for &quot;{query}&quot;
            </div>
          ) : (
            filteredItems.map((item, index) => {
              const isSelected = index === selectedIndex;
              const Icon = item.icon;

              return (
                <div
                  key={item.id}
                  data-index={index}
                  onClick={() => item.action()}
                  onMouseEnter={() => setSelectedIndex(index)}
                  className={`group flex items-center justify-between px-3.5 py-2.5 rounded-xl cursor-pointer transition-colors ${
                    isSelected
                      ? 'bg-[#0B1F33] text-white shadow-xs'
                      : 'hover:bg-[#F7F7F4] text-[#111827]'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className={`p-2 rounded-lg ${
                      isSelected ? 'bg-white/10 text-white' : 'bg-[#F7F7F4] text-[#B8613A]'
                    }`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className={`text-xs font-semibold font-mono truncate ${
                          isSelected ? 'text-white' : 'text-[#0B1F33]'
                        }`}>
                          {item.title}
                        </span>
                        <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded ${
                          isSelected ? 'bg-white/20 text-white' : 'bg-[#F7F7F4] text-[#5B6875] border border-[#D9E0E5]'
                        }`}>
                          {item.category}
                        </span>
                      </div>
                      <p className={`text-[11px] truncate mt-0.5 ${
                        isSelected ? 'text-slate-300' : 'text-[#5B6875]'
                      }`}>
                        {item.description}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 flex-shrink-0 ml-3">
                    {item.external ? (
                      <ExternalLink className={`w-3.5 h-3.5 ${isSelected ? 'text-[#B8613A]' : 'text-[#5B6875]'}`} />
                    ) : (
                      <ArrowRight className={`w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 ${
                        isSelected ? 'text-[#B8613A]' : 'text-[#5B6875]'
                      }`} />
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer Shortcut Helper */}
        <div className="px-4 py-2.5 bg-[#F7F7F4] border-t border-[#D9E0E5] flex items-center justify-between text-[10px] font-mono text-[#5B6875]">
          <div className="flex items-center gap-3">
            <span><kbd className="px-1 py-0.5 bg-white border border-[#D9E0E5] rounded">↑</kbd> <kbd className="px-1 py-0.5 bg-white border border-[#D9E0E5] rounded">↓</kbd> to navigate</span>
            <span><kbd className="px-1 py-0.5 bg-white border border-[#D9E0E5] rounded">Enter</kbd> to select</span>
            <span><kbd className="px-1 py-0.5 bg-white border border-[#D9E0E5] rounded">Esc</kbd> to close</span>
          </div>
          <span className="hidden sm:inline">Kairos Flow OS</span>
        </div>
      </div>
    </div>
  );
};
