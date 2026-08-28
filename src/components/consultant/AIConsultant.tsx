'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Send, 
  X, 
  MessageCircle, 
  Bot, 
  Loader2, 
  ExternalLink,
  ArrowRight,
  Terminal,
  Sparkles,
  CheckCircle2,
  BookOpen,
  ArrowUpRight
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
  'What does a custom Next.js web app cost?',
  'How does your 6-stage delivery process work?',
  'Tell me about your AI & automation workflows',
  'Who is on the founding leadership team?',
  'Can you build an iOS and Android app?'
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
      text: 'Welcome to Kairos Flow Agency. I am your AI Consultant grounded in our verified technical architectures, pricing frameworks, and founding lead scopes.',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      response: {
        answer: 'I can help estimate project scope, explain our 6 disciplines, reference verified production case studies, or connect you directly with Founder Desvanth on WhatsApp.',
        recommendation: 'Select a question below or describe your product idea to receive an immediate architectural scope.',
        suggestedFollowUps: [
          'What does a custom Next.js web app cost?',
          'How does your 6-stage delivery process work?',
          'Tell me about your AI & automation workflows'
        ],
        confidence: 'high',
        sources: [{ title: 'Company Overview & Capabilities', section: 'Core Disciplines', file: 'agency/company.md' }],
        actionButtons: [
          { label: 'Explore Web Capabilities', href: '/services' },
          { label: 'View Case Studies', href: '/work' }
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

  // Generate WhatsApp Handover URL containing the recent chat context
  const generateWhatsAppHandoverUrl = () => {
    const lastUserMsg = [...messages].reverse().find((m) => m.sender === 'user')?.text || 'Inquiry on digital agency services';
    const text = encodeURIComponent(
      `Hi Desvanth & Kairos Flow Team,\n\nI was just chatting with your AI Consultant regarding:\n"${lastUserMsg}"\n\nI would like to discuss next steps and pricing with your team.`
    );
    return `https://wa.me/917702256073?text=${text}`;
  };

  const handleSend = async (overrideText?: string) => {
    const textToSend = overrideText || query;
    if (!textToSend.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: textToSend.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!overrideText) setQuery('');
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
          text: "I couldn't complete that query right now. Feel free to connect directly with Founder Desvanth on WhatsApp.",
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          response: {
            answer: "Founder Desvanth and our team are available on WhatsApp for direct technical scoping.",
            confidence: 'low',
            sources: [],
            actionButtons: [
              { label: 'Chat on WhatsApp', href: 'https://wa.me/917702256073', isExternal: true },
              { label: 'Submit Scoping Brief', href: '/contact' }
            ]
          }
        };
        setMessages((prev) => [...prev, errorMsg]);
      }
    } catch {
      const errorMsg: ChatMessage = {
        id: `consultant-${Date.now()}`,
        sender: 'consultant',
        text: 'Network connection issue. Please connect with our team on WhatsApp for an instant response.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Toggle Button */}
      {!isOpen && (
        <div className="fixed bottom-6 right-6 z-40 flex items-center gap-2.5">
          <button
            onClick={() => setIsOpen(true)}
            className="group flex items-center gap-3 px-4 py-3 rounded-full bg-[#0B1F33] hover:bg-[#132B45] text-white border border-[#0B1F33] shadow-elevated-card transition-all duration-300 hover:scale-105"
            aria-label="Open AI Consultant"
          >
            <div className="relative flex items-center justify-center w-7 h-7 rounded-full bg-[#B8613A] text-white">
              <Bot className="w-4 h-4" />
              <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-500" />
            </div>
            <div className="text-left font-mono">
              <div className="text-xs font-bold leading-none tracking-wide text-white">
                AI Consultant
              </div>
              <div className="text-[10px] text-[#B8613A] font-semibold mt-0.5">
                Grounded RAG • Online
              </div>
            </div>
          </button>
        </div>
      )}

      {/* Floating Chat Modal */}
      {isOpen && (
        <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-[460px] h-[640px] max-h-[88vh] bg-white border border-[#D9E0E5] rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-200 text-[#111827]">
          {/* Top Header */}
          <div className="flex items-center justify-between p-4 bg-[#0B1F33] text-white border-b border-[#0B1F33]">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#B8613A] text-white flex items-center justify-center">
                <Bot className="w-4 h-4" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-xs font-bold font-mono tracking-wider text-white uppercase">
                    Kairos Flow AI Consultant
                  </h3>
                  <span className="px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-300 text-[9px] font-mono font-bold">
                    RAG 2.0
                  </span>
                </div>
                <p className="text-[11px] text-slate-300 font-mono">
                  Grounded in Verified Architectures & Pricing
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg transition-colors"
              aria-label="Close chat"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages Container */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-[#F7F7F4] text-xs">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${
                  msg.sender === 'user' ? 'items-end' : 'items-start'
                }`}
              >
                {/* Message Bubble */}
                <div
                  className={`max-w-[88%] p-3.5 rounded-2xl shadow-subtle-card leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-[#0B1F33] text-white rounded-tr-none'
                      : 'bg-white text-[#111827] border border-[#D9E0E5] rounded-tl-none'
                  }`}
                >
                  <p className="whitespace-pre-wrap">{msg.text}</p>

                  {/* Recommendation Callout */}
                  {msg.response?.recommendation && (
                    <div className="mt-3 pt-2.5 border-t border-[#D9E0E5] text-[11px] text-[#5B6875] flex items-start gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-[#B8613A] flex-shrink-0 mt-0.5" />
                      <span>{msg.response.recommendation}</span>
                    </div>
                  )}

                  {/* Grounded Source Citations */}
                  {msg.response?.sources && msg.response.sources.length > 0 && (
                    <div className="mt-2.5 pt-2 border-t border-[#D9E0E5]/60 flex flex-wrap items-center gap-1.5 font-mono text-[9px] text-[#5B6875]">
                      <BookOpen className="w-3 h-3 text-[#B8613A]" />
                      <span>Grounded source:</span>
                      {msg.response.sources.map((src, i) => (
                        <span key={i} className="px-1.5 py-0.5 rounded bg-[#F7F7F4] border border-[#D9E0E5] text-[#0B1F33] font-medium">
                          {src.section || src.title}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Action Buttons */}
                  {msg.response?.actionButtons && msg.response.actionButtons.length > 0 && (
                    <div className="mt-3 pt-2.5 border-t border-[#D9E0E5] flex flex-wrap gap-1.5 font-mono">
                      {msg.response.actionButtons.map((btn, idx) => (
                        btn.isExternal ? (
                          <a
                            key={idx}
                            href={btn.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-semibold text-white bg-[#0B1F33] hover:bg-[#132B45] rounded-md transition-colors shadow-sm"
                          >
                            <span>{btn.label}</span>
                            <ArrowUpRight className="w-3 h-3 text-[#B8613A]" />
                          </a>
                        ) : (
                          <Link
                            key={idx}
                            href={btn.href}
                            onClick={() => setIsOpen(false)}
                            className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-semibold text-[#0B1F33] hover:text-[#B8613A] bg-[#F7F7F4] hover:bg-white border border-[#D9E0E5] rounded-md transition-colors"
                          >
                            <span>{btn.label}</span>
                            <ArrowRight className="w-3 h-3 text-[#B8613A]" />
                          </Link>
                        )
                      ))}
                    </div>
                  )}
                </div>

                {/* Suggested Follow-Up Quick Pills */}
                {msg.response?.suggestedFollowUps && msg.response.suggestedFollowUps.length > 0 && (
                  <div className="mt-2 space-y-1.5 max-w-[88%] font-mono">
                    <span className="text-[10px] text-[#5B6875] font-semibold">Suggested follow-ups:</span>
                    <div className="flex flex-wrap gap-1">
                      {msg.response.suggestedFollowUps.map((prompt, pIdx) => (
                        <button
                          key={pIdx}
                          onClick={() => handleSend(prompt)}
                          className="text-left px-2.5 py-1 rounded-lg bg-white hover:bg-[#FBF4F0] text-[#0B1F33] hover:text-[#B8613A] border border-[#D9E0E5] text-[10px] transition-colors shadow-sm font-medium"
                        >
                          {prompt}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <span className="text-[9px] font-mono text-[#5B6875] mt-1 px-1">
                  {msg.timestamp}
                </span>
              </div>
            ))}

            {isLoading && (
              <div className="flex items-center gap-2 text-xs text-[#5B6875] font-mono bg-white p-3 rounded-xl border border-[#D9E0E5] w-fit shadow-subtle-card">
                <Loader2 className="w-3.5 h-3.5 animate-spin text-[#B8613A]" />
                <span>Searching knowledge base & synthesizing response...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Starter Prompts */}
          {messages.length === 1 && (
            <div className="p-3 bg-white border-t border-[#D9E0E5] overflow-x-auto whitespace-nowrap flex gap-1.5 font-mono">
              {STARTER_PROMPTS.map((p, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSend(p)}
                  className="px-2.5 py-1 text-[10px] bg-[#F7F7F4] hover:bg-[#FBF4F0] text-[#0B1F33] hover:text-[#B8613A] rounded-md border border-[#D9E0E5] transition-colors flex-shrink-0"
                >
                  {p}
                </button>
              ))}
            </div>
          )}

          {/* Bottom WhatsApp Handover & Input Bar */}
          <div className="p-3 bg-white border-t border-[#D9E0E5] space-y-2">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Ask about web apps, AI pipelines, pricing, or timelines..."
                className="flex-1 px-3 py-2 text-xs rounded-lg bg-[#F7F7F4] text-[#111827] border border-[#D9E0E5] focus:outline-none focus:border-[#B8613A] placeholder:text-[#5B6875]"
              />
              <button
                type="submit"
                disabled={isLoading || !query.trim()}
                className="p-2 rounded-lg bg-[#0B1F33] hover:bg-[#132B45] text-white disabled:opacity-40 transition-colors shadow-sm"
                aria-label="Send message"
              >
                <Send className="w-4 h-4 text-[#B8613A]" />
              </button>
            </form>

            <div className="flex items-center justify-between text-[10px] font-mono text-[#5B6875] pt-1">
              <span>Grounded on 36+ agency knowledge files</span>
              <a
                href={generateWhatsAppHandoverUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 font-bold text-[#0B1F33] hover:text-emerald-600 transition-colors"
              >
                <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                <span>Handover to WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
