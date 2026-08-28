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
  ArrowRight
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
        sources: [],
        actionButtons: [
          { label: 'Explore Web Capabilities', href: '/services#web-development' },
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
      {/* Floating Launcher Button */}
      <div className="fixed bottom-6 right-6 z-50">
        {!isOpen ? (
          <button
            onClick={() => setIsOpen(true)}
            className="group flex items-center gap-3 pl-3 pr-4 py-2.5 bg-corporate-dark text-white rounded-full border border-corporate-dark/80 shadow-2xl hover:bg-corporate-darkHover transition-all duration-300 hover:scale-[1.02] backdrop-blur-md"
            aria-label="Open Kairos Flow AI Consultant"
          >
            <div className="relative w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-corporate-sky border border-white/20">
              <Bot className="w-4 h-4" />
              <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-corporate-blue animate-pulse" />
            </div>
            <div className="text-left pr-1">
              <div className="text-xs font-bold text-white tracking-tight font-display flex items-center gap-1.5">
                <span>AI Consultant</span>
                <span className="px-1.5 py-0.2 rounded-full bg-corporate-blue text-white text-[9px] font-mono font-semibold">
                  KAIROS OS
                </span>
              </div>
              <div className="text-[10px] text-slate-300 font-mono">Scope & WhatsApp Sync</div>
            </div>
          </button>
        ) : null}
      </div>

      {/* Floating Chat Drawer Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-4 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-[440px] h-[600px] max-h-[85vh] bg-white text-corporate-text rounded-2xl border border-corporate-border shadow-2xl flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-200">
          {/* Header */}
          <div className="p-4 bg-corporate-dark text-white border-b border-corporate-dark flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center text-corporate-sky">
                <Bot className="w-4 h-4" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="text-sm font-bold text-white font-display">Kairos Flow AI Consultant</h4>
                  <span className="px-1.5 py-0.5 rounded bg-corporate-blue text-white text-[9px] font-mono font-semibold">
                    RAG + WhatsApp
                  </span>
                </div>
                <p className="text-[11px] text-slate-300 font-mono">Grounded strictly in agency knowledge</p>
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              <a
                href={generateWhatsAppHandoverUrl()}
                target="_blank"
                rel="noopener noreferrer"
                title="Transfer Conversation to WhatsApp"
                className="p-1.5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg transition-colors flex items-center gap-1 text-[10px] font-mono font-semibold"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">WhatsApp</span>
              </a>

              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 text-slate-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                aria-label="Close Consultant"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Messages Container */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4 text-xs font-sans bg-corporate-offwhite">
            {messages.map((msg) => {
              const isUser = msg.sender === 'user';

              return (
                <div
                  key={msg.id}
                  className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}
                >
                  <div
                    className={`max-w-[90%] p-3.5 rounded-2xl leading-relaxed shadow-sm ${
                      isUser
                        ? 'bg-corporate-dark text-white rounded-tr-none font-medium'
                        : 'bg-white border border-corporate-border text-corporate-text rounded-tl-none space-y-2.5'
                    }`}
                  >
                    <p className="text-xs leading-relaxed">{msg.text}</p>

                    {/* Consultant Structured Advice */}
                    {msg.response && (
                      <div className="space-y-2 pt-2 border-t border-corporate-border">
                        {msg.response.recommendation && (
                          <div className="p-2.5 rounded-lg bg-corporate-softBlue border-l-2 border-corporate-blue text-[11px] text-corporate-dark leading-relaxed">
                            <span className="font-semibold text-corporate-blue font-mono block mb-0.5">Recommendation:</span>
                            {msg.response.recommendation}
                          </div>
                        )}

                        {msg.response.nextActionPrompt && (
                          <div className="text-[11px] text-corporate-mutedText italic">
                            {msg.response.nextActionPrompt}
                          </div>
                        )}

                        {/* Action Buttons & WhatsApp Handover */}
                        <div className="flex flex-wrap gap-1.5 pt-1">
                          <a
                            href={generateWhatsAppHandoverUrl()}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 text-[10px] font-semibold transition-colors"
                          >
                            <MessageCircle className="w-3 h-3 text-emerald-600" />
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
                                  className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-corporate-softBlue hover:bg-blue-100 text-corporate-blue border border-blue-200 text-[10px] font-semibold transition-colors"
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
                                className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-corporate-offwhite hover:bg-slate-200 text-corporate-dark text-[10px] font-semibold transition-colors border border-corporate-border"
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
                  <span className="text-[9px] font-mono text-corporate-mutedText mt-1 px-1">{msg.timestamp}</span>
                </div>
              );
            })}

            {isLoading && (
              <div className="flex items-center gap-2 text-corporate-mutedText text-xs p-2">
                <Loader2 className="w-3.5 h-3.5 animate-spin text-corporate-blue" />
                <span>Consulting verified knowledge base...</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Starter Chips */}
          <div className="p-2.5 bg-white border-t border-corporate-border overflow-x-auto whitespace-nowrap flex gap-1.5 no-scrollbar">
            {STARTER_PROMPTS.map((prompt) => (
              <button
                key={prompt}
                onClick={() => handleSend(prompt)}
                disabled={isLoading}
                className="px-3 py-1 rounded-full bg-corporate-offwhite hover:bg-corporate-softBlue border border-corporate-border text-[10px] text-corporate-mutedText hover:text-corporate-blue transition-colors flex-shrink-0"
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
            className="p-3 bg-white border-t border-corporate-border flex items-center gap-2"
          >
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Ask about pricing, scope, tech stack, or team..."
              className="flex-1 px-3 py-2 text-xs rounded-lg bg-corporate-offwhite text-corporate-dark border border-corporate-border focus:outline-none focus:border-corporate-blue placeholder:text-slate-400 font-sans"
            />
            <button
              type="submit"
              disabled={isLoading || !query.trim()}
              className="p-2 rounded-lg bg-corporate-dark text-white hover:bg-corporate-darkHover transition-colors disabled:opacity-50"
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
