'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Sparkles, 
  Send, 
  X, 
  MessageCircle, 
  Bot, 
  ShieldCheck, 
  ChevronRight, 
  Loader2, 
  CornerDownRight,
  ExternalLink,
  ArrowRight,
  HelpCircle,
  Clock,
  CheckCircle2,
  Share2
} from 'lucide-react';
import { ConsultantResponse } from '@/lib/rag';

interface ChatMessage {
  id: string;
  sender: 'user' | 'consultant';
  text: string;
  response?: ConsultantResponse;
  timestamp: string;
}

const STARTER_PROMPTS = [
  'How much does a website cost?',
  'I need a website for my business',
  'How long does a typical project take?',
  'Who is on the leadership team?',
  'Can you build an iOS or Android app?'
];

export const AIConsultant: React.FC = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Hide AI Consultant inside the private admin CRM
  if (pathname && pathname.startsWith('/admin')) {
    return null;
  }
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-1',
      sender: 'consultant',
      text: 'Welcome to Kairos Flow Agency. I am your AI Consultant grounded in our approved services, technical architectures, indicative pricing, and team scopes.',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      response: {
        answer: 'I can help estimate project scope, explain our 6 disciplines, reference verified case studies, or connect you directly with Founder Desvanth on WhatsApp.',
        recommendation: 'Select an inquiry below or type what you are building to receive an indicative scope.',
        confidence: 'high',
        sources: ['agency/company.md', 'services/web.md'],
        actionButtons: [
          { label: 'Start a Project Brief', href: '/contact' },
          { label: 'WhatsApp Founder Directly', href: 'https://wa.me/917702256073', isExternal: true }
        ]
      }
    }
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  // Generate seamless WhatsApp Handover link containing the entire conversation summary
  const generateWhatsAppHandoverUrl = () => {
    const userInquiries = messages
      .filter((m) => m.sender === 'user')
      .map((m) => `• ${m.text}`)
      .join('\n');

    const lines = [
      `*Kairos Flow AI Consultant — Chat Handover*`,
      `----------------------------------------`,
      userInquiries ? `*Topics Discussed with AI Consultant:*\n${userInquiries}` : `*Inquiry:* Discussing custom project with Kairos Flow`,
      `----------------------------------------`,
      `_Hi Desvanth, I was chatting with the Kairos Flow AI Consultant on your website and would like to continue our project discussion directly with you here._`
    ];

    const encoded = encodeURIComponent(lines.join('\n'));
    return `https://wa.me/917702256073?text=${encoded}`;
  };

  const handleSend = async (customQuery?: string) => {
    const textToSend = customQuery || query;
    if (!textToSend.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: textToSend.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setQuery('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/consultant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: textToSend.trim() })
      });

      const json = await res.json();

      if (json.success && json.data) {
        const consultantMsg: ChatMessage = {
          id: `consultant-${Date.now()}`,
          sender: 'consultant',
          text: json.data.answer,
          response: json.data,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setMessages((prev) => [...prev, consultantMsg]);
      } else {
        const errorMsg: ChatMessage = {
          id: `consultant-${Date.now()}`,
          sender: 'consultant',
          text: "I couldn't complete that query. Please connect directly with Founder Desvanth on WhatsApp (+91 77022 56073) or submit a brief.",
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setMessages((prev) => [...prev, errorMsg]);
      }
    } catch {
      const errorMsg: ChatMessage = {
        id: `consultant-${Date.now()}`,
        sender: 'consultant',
        text: 'A connection error occurred. Feel free to reach out directly on WhatsApp at +91 77022 56073.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Launcher Button with Kairos Flow Brand Integration */}
      <div className="fixed bottom-6 right-6 z-50">
        {!isOpen ? (
          <button
            onClick={() => setIsOpen(true)}
            className="group flex items-center gap-3 pl-3 pr-4 py-2.5 bg-ink text-ivory rounded-full border border-navy-border shadow-2xl hover:border-champagne/60 transition-all duration-300 hover:scale-[1.02] backdrop-blur-md"
            aria-label="Open Kairos Flow AI Consultant"
          >
            <div className="relative w-8 h-8 rounded-full bg-navy flex items-center justify-center text-champagne border border-navy-border group-hover:border-champagne/50 transition-colors">
              <Bot className="w-4 h-4" />
              <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-teal animate-pulse" />
            </div>
            <div className="text-left pr-1">
              <div className="text-xs font-bold text-ivory tracking-tight font-display flex items-center gap-1.5">
                <span>AI Consultant</span>
                <span className="px-1.5 py-0.2 rounded bg-champagne/15 text-champagne text-[9px] font-mono font-semibold">
                  KAIROS OS
                </span>
              </div>
              <div className="text-[10px] text-slate font-mono">Scope & WhatsApp Sync</div>
            </div>
          </button>
        ) : null}
      </div>

      {/* Floating Chat Drawer Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-4 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-[440px] h-[600px] max-h-[85vh] bg-ink text-ivory rounded-2xl border border-navy-border shadow-2xl flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-200">
          {/* Header with Direct WhatsApp Transfer Button */}
          <div className="p-4 bg-navy/90 border-b border-navy-border flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-ink border border-champagne/40 flex items-center justify-center text-champagne">
                <Bot className="w-4 h-4" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="text-sm font-bold text-ivory font-display">Kairos Flow AI Consultant</h4>
                  <span className="px-1.5 py-0.5 rounded bg-teal/20 text-teal text-[9px] font-mono font-semibold">
                    RAG + WhatsApp
                  </span>
                </div>
                <p className="text-[11px] text-slate-light font-mono">Grounded strictly in agency knowledge</p>
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              <a
                href={generateWhatsAppHandoverUrl()}
                target="_blank"
                rel="noopener noreferrer"
                title="Transfer Conversation to WhatsApp"
                className="p-1.5 bg-teal/20 hover:bg-teal text-teal hover:text-ivory border border-teal/40 rounded-lg transition-colors flex items-center gap-1 text-[10px] font-mono font-semibold"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">WhatsApp</span>
              </a>

              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 text-slate-light hover:text-ivory hover:bg-navy rounded-lg transition-colors"
                aria-label="Close Consultant"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Messages Container */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4 text-xs font-sans">
            {messages.map((msg) => {
              const isUser = msg.sender === 'user';

              return (
                <div
                  key={msg.id}
                  className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}
                >
                  <div
                    className={`max-w-[90%] p-3.5 rounded-xl leading-relaxed ${
                      isUser
                        ? 'bg-teal text-ivory rounded-tr-none font-medium'
                        : 'bg-navy border border-navy-border text-ivory-muted rounded-tl-none space-y-2.5'
                    }`}
                  >
                    <p className="text-xs leading-relaxed">{msg.text}</p>

                    {/* Consultant Structured Advice */}
                    {msg.response && (
                      <div className="space-y-2 pt-2 border-t border-navy-border/60">
                        {msg.response.recommendation && (
                          <div className="p-2.5 rounded bg-ink/70 border-l-2 border-champagne text-[11px] text-slate-light leading-relaxed">
                            <span className="font-semibold text-champagne font-mono block mb-0.5">Recommendation:</span>
                            {msg.response.recommendation}
                          </div>
                        )}

                        {msg.response.nextActionPrompt && (
                          <div className="text-[11px] text-slate-light italic">
                            {msg.response.nextActionPrompt}
                          </div>
                        )}

                        {/* Action Buttons & WhatsApp Handover */}
                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {/* Dedicated WhatsApp Transfer Button */}
                          <a
                            href={generateWhatsAppHandoverUrl()}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded bg-[#25D366]/20 hover:bg-[#25D366] text-[#25D366] hover:text-ink border border-[#25D366]/40 text-[10px] font-semibold transition-colors"
                          >
                            <MessageCircle className="w-3 h-3" />
                            <span>Continue on WhatsApp</span>
                          </a>

                          {msg.response.actionButtons && msg.response.actionButtons.map((btn, bIdx) => {
                            if (btn.isExternal) {
                              return (
                                <a
                                  key={bIdx}
                                  href={btn.href}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded bg-teal/20 hover:bg-teal text-teal hover:text-ivory border border-teal/40 text-[10px] font-semibold transition-colors"
                                >
                                  <span>{btn.label}</span>
                                  <ExternalLink className="w-2.5 h-2.5" />
                                </a>
                              );
                            }

                            return (
                              <Link
                                key={bIdx}
                                href={btn.href}
                                onClick={() => setIsOpen(false)}
                                className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded bg-ivory-muted hover:bg-ivory text-softblack text-[10px] font-semibold transition-colors"
                              >
                                <span>{btn.label}</span>
                                <ArrowRight className="w-2.5 h-2.5" />
                              </Link>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                  <span className="text-[9px] font-mono text-slate-muted mt-1 px-1">{msg.timestamp}</span>
                </div>
              );
            })}

            {isLoading && (
              <div className="flex items-center gap-2 text-slate-light text-xs p-2">
                <Loader2 className="w-3.5 h-3.5 animate-spin text-teal" />
                <span>Consulting verified knowledge base...</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Starter Chips */}
          <div className="p-2.5 bg-navy/40 border-t border-navy-border overflow-x-auto whitespace-nowrap flex gap-1.5 no-scrollbar">
            {STARTER_PROMPTS.map((prompt) => (
              <button
                key={prompt}
                onClick={() => handleSend(prompt)}
                disabled={isLoading}
                className="px-2.5 py-1 rounded-full bg-navy hover:bg-ink border border-navy-border text-[10px] text-slate-light hover:text-ivory transition-colors flex-shrink-0"
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Input Bar */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="p-3 bg-navy/80 border-t border-navy-border flex items-center gap-2"
          >
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Ask about pricing, scope, tech stack, or team..."
              className="flex-1 px-3 py-2 text-xs rounded-lg bg-ink text-ivory border border-navy-border focus:outline-none focus:border-teal placeholder:text-slate-muted"
            />
            <button
              type="submit"
              disabled={isLoading || !query.trim()}
              className="p-2 rounded-lg bg-teal text-ivory hover:bg-teal-hover transition-colors disabled:opacity-50"
              aria-label="Send query"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      )}
    </>
  );
};
