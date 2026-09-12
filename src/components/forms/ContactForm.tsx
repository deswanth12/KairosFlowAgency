'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { generateWhatsAppLink } from '@/lib/utils';
import { siteSettingsData } from '@/data/settings';
import { 
  Send, 
  MessageCircle, 
  CheckCircle2, 
  AlertCircle, 
  Loader2, 
  Sparkles,
  ShieldCheck,
  Clock,
  ArrowRight,
  ArrowLeft,
  Check
} from 'lucide-react';

const AVAILABLE_SERVICES = [
  'Web Development',
  'App Development',
  'AI & Automation',
  'UI/UX & Branding',
  'Digital Marketing',
  'Video & Content'
];

const BUDGET_RANGES_INR = [
  '₹15,000 – ₹40,000 (Rapid Web & Brand Sprint)',
  '₹40,000 – ₹1,00,000 (Custom Web Portal & AI)',
  '₹1,00,000 – ₹2,50,000 (Full-Stack Web / Mobile App)',
  '₹2,50,000+ (Enterprise Digital Transformation)',
  'Flexible / Exploring'
];

const BUDGET_RANGES_USD = [
  'Under $1,000 (Rapid Web & Brand Sprint)',
  '$1,000 – $2,500 (Custom Web Portal & AI)',
  '$2,500 – $5,000 (Full-Stack Web / Mobile App)',
  '$5,000+ (Enterprise Scale)',
  'Flexible / Exploring'
];

const ALL_BUDGET_RANGES = [...BUDGET_RANGES_INR, ...BUDGET_RANGES_USD];

const TIMELINE_OPTIONS = [
  'Urgent (< 1 month)',
  '1 – 2 Months',
  '2 – 3 Months',
  '3+ Months',
  'Flexible / Exploring'
];

export const ContactForm: React.FC = () => {
  const searchParams = useSearchParams();

  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);

  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    services: [] as string[],
    description: '',
    budget: '',
    timeline: '',
    referenceLinks: '',
    hearAbout: ''
  });

  const [currency, setCurrency] = useState<'INR' | 'USD'>('INR');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const rawServices = searchParams.get('services') || searchParams.get('service');
    const timelineParam = searchParams.get('timeline');
    const budgetParam = searchParams.get('budget');

    if (rawServices) {
      const requested = rawServices.split(',').map((s) => s.trim().toLowerCase());
      const matched = AVAILABLE_SERVICES.filter((svc) =>
        requested.some((req) => svc.toLowerCase() === req || svc.toLowerCase().includes(req) || req.includes(svc.toLowerCase()))
      );
      if (matched.length > 0) {
        setFormData((prev) => {
          const combined = Array.from(new Set([...prev.services, ...matched]));
          return { ...prev, services: combined };
        });
      }
    }

    if (timelineParam) {
      const matchedTimeline = TIMELINE_OPTIONS.find((t) => t.toLowerCase().includes(timelineParam.toLowerCase())) || timelineParam;
      setFormData((prev) => ({ ...prev, timeline: matchedTimeline }));
    }

    if (budgetParam) {
      if (budgetParam.includes('$') || budgetParam.toLowerCase().includes('usd')) {
        setCurrency('USD');
      } else if (budgetParam.includes('₹') || budgetParam.toLowerCase().includes('inr')) {
        setCurrency('INR');
      }
      const matchedBudget = ALL_BUDGET_RANGES.find((b) => b.toLowerCase().includes(budgetParam.toLowerCase())) || budgetParam;
      setFormData((prev) => ({ ...prev, budget: matchedBudget }));
    }
  }, [searchParams]);

  const toggleService = (service: string) => {
    setFormData((prev) => {
      const exists = prev.services.includes(service);
      return {
        ...prev,
        services: exists
          ? prev.services.filter((s) => s !== service)
          : [...prev.services, service]
      };
    });
    if (errors.services) {
      setErrors((prev) => ({ ...prev, services: '' }));
    }
  };

  const validateStep1 = () => {
    const newErrors: Record<string, string> = {};
    if (formData.services.length === 0) {
      newErrors.services = 'Please select at least one capability';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.description.trim()) {
      newErrors.description = 'Please outline your project goals and scope';
    } else if (formData.description.trim().length < 15) {
      newErrors.description = 'Please provide at least 15 characters describing your project';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep3 = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = 'Full name is required';
    if (!formData.company.trim()) newErrors.company = 'Company or venture name is required';

    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone / WhatsApp number is required';
    } else if (formData.phone.replace(/[^0-9]/g, '').length < 8) {
      newErrors.phone = 'Please provide a valid phone number with country code';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateAll = () => {
    const s1 = validateStep1();
    if (!s1) {
      setCurrentStep(1);
      return false;
    }
    const s2 = validateStep2();
    if (!s2) {
      setCurrentStep(2);
      return false;
    }
    const s3 = validateStep3();
    if (!s3) {
      setCurrentStep(3);
      return false;
    }
    return true;
  };

  const goToNextStep = () => {
    if (currentStep === 1) {
      if (validateStep1()) setCurrentStep(2);
    } else if (currentStep === 2) {
      if (validateStep2()) setCurrentStep(3);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!validateAll()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setIsSuccess(true);
      } else {
        setErrorMessage(data.message || 'Failed to submit enquiry. Please reach out via WhatsApp.');
      }
    } catch {
      setErrorMessage('Network error occurred. Please check your connection or contact us via WhatsApp.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const whatsappDirectUrl = generateWhatsAppLink(siteSettingsData.whatsappNumber, formData);

  if (isSuccess) {
    return (
      <div className="p-8 sm:p-12 rounded-2xl bg-white border border-[#D9E0E5] shadow-elevated-card text-center">
        <div className="w-16 h-16 rounded-full bg-[#FBF4F0] text-[#B8613A] flex items-center justify-center mx-auto mb-6 border border-orange-200">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FBF4F0] text-xs font-mono text-[#B8613A] mb-3 font-semibold">
          <Sparkles className="w-3.5 h-3.5 text-[#B8613A]" />
          <span>STATUS: BRIEF TRANSMITTED</span>
        </div>
        <h3 className="text-2xl sm:text-3xl font-bold text-[#0B1F33] tracking-tight mb-3 font-display">
          Thanks, {formData.name}.
        </h3>
        <p className="text-[#5B6875] text-sm sm:text-base max-w-md mx-auto leading-relaxed mb-8">
          Your project brief has been received. Our founding leads will review it and get back to you within <strong className="text-[#0B1F33]">4 business hours</strong>.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-6 border-t border-[#D9E0E5] max-w-md mx-auto font-mono">
          <a
            href={whatsappDirectUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 text-xs font-bold text-white bg-[#0B1F33] hover:bg-[#132B45] rounded-lg transition-colors shadow-sm uppercase tracking-wider"
          >
            <MessageCircle className="w-4 h-4 text-emerald-400" />
            <span>Follow Up on WhatsApp</span>
          </a>

          <button
            type="button"
            onClick={() => {
              setIsSuccess(false);
              setCurrentStep(1);
              setFormData({
                name: '',
                company: '',
                email: '',
                phone: '',
                services: [],
                description: '',
                budget: '',
                timeline: '',
                referenceLinks: '',
                hearAbout: ''
              });
            }}
            className="w-full sm:w-auto px-6 py-3.5 text-xs font-semibold text-[#5B6875] hover:text-[#0B1F33] bg-[#F7F7F4] rounded-lg transition-colors border border-[#D9E0E5] uppercase tracking-wider"
          >
            Submit Another Brief
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="p-6 sm:p-10 md:p-12 rounded-2xl bg-white border border-[#D9E0E5] shadow-elevated-card">
      {/* Introduction */}
      <div className="mb-6 pb-6 border-b border-[#D9E0E5]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#0B1F33] tracking-tight font-display">
              Tell us what you&apos;re building.
            </h2>
            <p className="text-[#5B6875] text-xs sm:text-sm mt-1 leading-relaxed">
              Step-by-step technical scoping with direct senior founder oversight.
            </p>
          </div>

          <a
            href={whatsappDirectUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200 text-xs font-mono font-bold transition-colors self-start"
            title="Skip the form and chat directly on WhatsApp"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span>Fast WhatsApp Brief</span>
          </a>
        </div>

        {/* 3-Step Guided Progress Bar */}
        <div className="grid grid-cols-3 gap-2 pt-2 font-mono">
          <button
            type="button"
            onClick={() => setCurrentStep(1)}
            className={`flex items-center gap-2 p-2 rounded-lg border text-left transition-all ${
              currentStep === 1
                ? 'bg-[#0B1F33] text-white border-[#0B1F33] shadow-xs'
                : 'bg-[#F7F7F4] text-[#5B6875] hover:text-[#0B1F33] border-[#D9E0E5]'
            }`}
          >
            <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
              currentStep === 1 ? 'bg-[#B8613A] text-white' : 'bg-white text-[#5B6875] border border-[#D9E0E5]'
            }`}>
              1
            </span>
            <div className="hidden sm:block min-w-0">
              <div className="text-[10px] uppercase font-bold leading-none">Step 1</div>
              <div className="text-[11px] truncate opacity-90">Capabilities</div>
            </div>
          </button>

          <button
            type="button"
            onClick={() => {
              if (validateStep1()) setCurrentStep(2);
            }}
            className={`flex items-center gap-2 p-2 rounded-lg border text-left transition-all ${
              currentStep === 2
                ? 'bg-[#0B1F33] text-white border-[#0B1F33] shadow-xs'
                : 'bg-[#F7F7F4] text-[#5B6875] hover:text-[#0B1F33] border-[#D9E0E5]'
            }`}
          >
            <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
              currentStep === 2 ? 'bg-[#B8613A] text-white' : 'bg-white text-[#5B6875] border border-[#D9E0E5]'
            }`}>
              2
            </span>
            <div className="hidden sm:block min-w-0">
              <div className="text-[10px] uppercase font-bold leading-none">Step 2</div>
              <div className="text-[11px] truncate opacity-90">Scope & Goals</div>
            </div>
          </button>

          <button
            type="button"
            onClick={() => {
              if (validateStep1() && validateStep2()) setCurrentStep(3);
            }}
            className={`flex items-center gap-2 p-2 rounded-lg border text-left transition-all ${
              currentStep === 3
                ? 'bg-[#0B1F33] text-white border-[#0B1F33] shadow-xs'
                : 'bg-[#F7F7F4] text-[#5B6875] hover:text-[#0B1F33] border-[#D9E0E5]'
            }`}
          >
            <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
              currentStep === 3 ? 'bg-[#B8613A] text-white' : 'bg-white text-[#5B6875] border border-[#D9E0E5]'
            }`}>
              3
            </span>
            <div className="hidden sm:block min-w-0">
              <div className="text-[10px] uppercase font-bold leading-none">Step 3</div>
              <div className="text-[11px] truncate opacity-90">Contact Details</div>
            </div>
          </button>
        </div>
      </div>

      {errorMessage && (
        <div className="mb-6 p-4 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm flex items-start gap-3 font-mono">
          <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
          <div>{errorMessage}</div>
        </div>
      )}

      {/* ==================================================== */}
      {/* STEP 1: CAPABILITIES & BUDGET                        */}
      {/* ==================================================== */}
      {currentStep === 1 && (
        <div className="space-y-6 animate-in fade-in duration-150">
          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-[#5B6875] mb-3 font-semibold">
              01 // REQUIRED DISCIPLINES <span className="text-[#B8613A]">*</span>
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 font-mono">
              {AVAILABLE_SERVICES.map((svc) => {
                const isSelected = formData.services.includes(svc);
                return (
                  <button
                    key={svc}
                    type="button"
                    onClick={() => toggleService(svc)}
                    className={`p-3 text-left rounded-xl text-xs font-medium transition-all duration-150 border flex items-center justify-between ${
                      isSelected
                        ? 'bg-[#0B1F33] text-white border-[#0B1F33] shadow-sm'
                        : 'bg-[#F7F7F4] hover:bg-[#FBF4F0] text-[#111827] border-[#D9E0E5]'
                    }`}
                  >
                    <span>{svc}</span>
                    {isSelected && <Check className="w-3.5 h-3.5 text-[#B8613A] stroke-[3]" />}
                  </button>
                );
              })}
            </div>
            {errors.services && (
              <p className="mt-2 text-xs text-red-600 font-mono">{errors.services}</p>
            )}
          </div>

          <div className="pt-4 border-t border-[#D9E0E5] font-mono">
            <div className="flex items-center justify-between mb-2">
              <label className="block text-xs uppercase tracking-wider text-[#5B6875] font-semibold">
                ESTIMATED BUDGET RANGE (OPTIONAL)
              </label>
              <div className="flex items-center gap-1 bg-[#F7F7F4] p-0.5 rounded-md border border-[#D9E0E5] text-[10px]">
                <button
                  type="button"
                  onClick={() => setCurrency('INR')}
                  className={`px-2 py-0.5 rounded font-bold transition-all ${
                    currency === 'INR' ? 'bg-[#0B1F33] text-white shadow-xs' : 'text-[#5B6875] hover:text-[#0B1F33]'
                  }`}
                >
                  ₹ INR
                </button>
                <button
                  type="button"
                  onClick={() => setCurrency('USD')}
                  className={`px-2 py-0.5 rounded font-bold transition-all ${
                    currency === 'USD' ? 'bg-[#0B1F33] text-white shadow-xs' : 'text-[#5B6875] hover:text-[#0B1F33]'
                  }`}
                >
                  $ USD
                </button>
              </div>
            </div>
            <select
              value={formData.budget}
              onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
              className="w-full px-4 py-3 text-xs rounded-xl bg-[#F7F7F4] text-[#111827] border border-[#D9E0E5] focus:outline-none focus:border-[#B8613A]"
            >
              <option value="">Select target investment bracket...</option>
              {(currency === 'INR' ? BUDGET_RANGES_INR : BUDGET_RANGES_USD).map((b) => (
                <option key={b} value={b}>{b}</option>
              ))}
            </select>
          </div>

          <div className="pt-6 border-t border-[#D9E0E5] flex justify-end">
            <button
              type="button"
              onClick={goToNextStep}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 text-xs font-bold text-white bg-[#0B1F33] hover:bg-[#132B45] rounded-xl shadow-sm transition-all uppercase font-mono tracking-wider"
            >
              <span>Continue to Scope & Goals</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#B8613A]" />
            </button>
          </div>
        </div>
      )}

      {/* ==================================================== */}
      {/* STEP 2: PROJECT SPECIFICATIONS & TIMELINE            */}
      {/* ==================================================== */}
      {currentStep === 2 && (
        <div className="space-y-6 animate-in fade-in duration-150">
          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-[#5B6875] mb-2 font-semibold">
              02 // PROJECT SPECIFICATIONS & GOALS <span className="text-[#B8613A]">*</span>
            </label>
            <textarea
              rows={4}
              value={formData.description}
              onChange={(e) => {
                setFormData({ ...formData, description: e.target.value });
                if (errors.description) setErrors({ ...errors, description: '' });
              }}
              placeholder="Describe what you want to build, key architecture requirements, target users, and expected business outcomes..."
              className={`w-full px-4 py-3 text-sm rounded-xl bg-[#F7F7F4] text-[#111827] border focus:outline-none focus:border-[#B8613A] resize-y ${
                errors.description ? 'border-red-400' : 'border-[#D9E0E5]'
              }`}
            />
            {errors.description && <p className="mt-1.5 text-xs text-red-600 font-mono">{errors.description}</p>}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 font-mono">
            <div>
              <label className="block text-xs uppercase tracking-wider text-[#5B6875] mb-2 font-semibold">
                TARGET TIMELINE (OPTIONAL)
              </label>
              <select
                value={formData.timeline}
                onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                className="w-full px-4 py-3 text-xs rounded-xl bg-[#F7F7F4] text-[#111827] border border-[#D9E0E5] focus:outline-none focus:border-[#B8613A]"
              >
                <option value="">Select target timeline...</option>
                {TIMELINE_OPTIONS.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-[#5B6875] mb-2 font-semibold">
                REFERENCE LINKS / FIGMA / REPOS (OPTIONAL)
              </label>
              <input
                type="text"
                value={formData.referenceLinks}
                onChange={(e) => setFormData({ ...formData, referenceLinks: e.target.value })}
                placeholder="Figma, GitHub, or benchmark links..."
                className="w-full px-4 py-3 text-xs rounded-xl bg-[#F7F7F4] text-[#111827] border border-[#D9E0E5] focus:outline-none focus:border-[#B8613A]"
              />
            </div>
          </div>

          <div className="pt-6 border-t border-[#D9E0E5] flex flex-col sm:flex-row items-center justify-between gap-3">
            <button
              type="button"
              onClick={() => setCurrentStep(1)}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 text-xs font-semibold text-[#5B6875] hover:text-[#0B1F33] bg-[#F7F7F4] hover:bg-white border border-[#D9E0E5] rounded-xl transition-all font-mono"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Disciplines</span>
            </button>

            <button
              type="button"
              onClick={goToNextStep}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 text-xs font-bold text-white bg-[#0B1F33] hover:bg-[#132B45] rounded-xl shadow-sm transition-all uppercase font-mono tracking-wider"
            >
              <span>Continue to Contact Details</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#B8613A]" />
            </button>
          </div>
        </div>
      )}

      {/* ==================================================== */}
      {/* STEP 3: CONTACT INFORMATION & SCHEDULING             */}
      {/* ==================================================== */}
      {currentStep === 3 && (
        <div className="space-y-6 animate-in fade-in duration-150">
          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-[#5B6875] mb-3 font-semibold">
              03 // DIRECT CONTACT & FOUNDER SCHEDULING
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-[#5B6875] mb-1.5 font-semibold">
                  Full Name <span className="text-[#B8613A]">*</span>
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => {
                    setFormData({ ...formData, name: e.target.value });
                    if (errors.name) setErrors({ ...errors, name: '' });
                  }}
                  placeholder="Your full name"
                  className={`w-full px-4 py-3 text-sm rounded-xl bg-[#F7F7F4] text-[#111827] border focus:outline-none focus:border-[#B8613A] ${
                    errors.name ? 'border-red-400' : 'border-[#D9E0E5]'
                  }`}
                />
                {errors.name && <p className="mt-1 text-xs text-red-600 font-mono">{errors.name}</p>}
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-[#5B6875] mb-1.5 font-semibold">
                  Company / Venture <span className="text-[#B8613A]">*</span>
                </label>
                <input
                  type="text"
                  value={formData.company}
                  onChange={(e) => {
                    setFormData({ ...formData, company: e.target.value });
                    if (errors.company) setErrors({ ...errors, company: '' });
                  }}
                  placeholder="Company or venture name"
                  className={`w-full px-4 py-3 text-sm rounded-xl bg-[#F7F7F4] text-[#111827] border focus:outline-none focus:border-[#B8613A] ${
                    errors.company ? 'border-red-400' : 'border-[#D9E0E5]'
                  }`}
                />
                {errors.company && <p className="mt-1 text-xs text-red-600 font-mono">{errors.company}</p>}
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-[#5B6875] mb-1.5 font-semibold">
                  Work Email <span className="text-[#B8613A]">*</span>
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => {
                    setFormData({ ...formData, email: e.target.value });
                    if (errors.email) setErrors({ ...errors, email: '' });
                  }}
                  placeholder="you@company.com"
                  className={`w-full px-4 py-3 text-sm rounded-xl bg-[#F7F7F4] text-[#111827] border focus:outline-none focus:border-[#B8613A] ${
                    errors.email ? 'border-red-400' : 'border-[#D9E0E5]'
                  }`}
                />
                {errors.email && <p className="mt-1 text-xs text-red-600 font-mono">{errors.email}</p>}
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-[#5B6875] mb-1.5 font-semibold">
                  WhatsApp / Phone <span className="text-[#B8613A]">*</span>
                </label>
                <input
                  type="text"
                  value={formData.phone}
                  onChange={(e) => {
                    setFormData({ ...formData, phone: e.target.value });
                    if (errors.phone) setErrors({ ...errors, phone: '' });
                  }}
                  placeholder="+91 77022 56073"
                  className={`w-full px-4 py-3 text-sm rounded-xl bg-[#F7F7F4] text-[#111827] border focus:outline-none focus:border-[#B8613A] ${
                    errors.phone ? 'border-red-400' : 'border-[#D9E0E5]'
                  }`}
                />
                {errors.phone && <p className="mt-1 text-xs text-red-600 font-mono">{errors.phone}</p>}
              </div>
            </div>
          </div>

          <div className="font-mono">
            <label className="block text-xs uppercase tracking-wider text-[#5B6875] mb-1.5 font-semibold">
              HOW DID YOU HEAR ABOUT US? (OPTIONAL)
            </label>
            <input
              type="text"
              value={formData.hearAbout}
              onChange={(e) => setFormData({ ...formData, hearAbout: e.target.value })}
              placeholder="Referral, Founder LinkedIn, Twitter, Direct..."
              className="w-full px-4 py-3 text-xs rounded-xl bg-[#F7F7F4] text-[#111827] border border-[#D9E0E5] focus:outline-none focus:border-[#B8613A]"
            />
          </div>

          {/* Action Buttons & Submit */}
          <div className="pt-6 border-t border-[#D9E0E5] flex flex-col sm:flex-row items-center justify-between gap-4 font-mono">
            <button
              type="button"
              onClick={() => setCurrentStep(2)}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 text-xs font-semibold text-[#5B6875] hover:text-[#0B1F33] bg-[#F7F7F4] hover:bg-white border border-[#D9E0E5] rounded-xl transition-all"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Scope</span>
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full sm:w-auto group inline-flex items-center justify-center gap-2 px-8 py-3.5 text-xs font-bold text-white bg-[#0B1F33] hover:bg-[#132B45] rounded-xl shadow-sm transition-all duration-200 disabled:opacity-50 uppercase tracking-wider"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-[#B8613A]" />
                  <span>Transmitting...</span>
                </>
              ) : (
                <>
                  <span>/ TRANSMIT BRIEF & LOCK SPRINT</span>
                  <Send className="w-3.5 h-3.5 text-[#B8613A] transition-transform group-hover:translate-x-0.5" />
                </>
              )}
            </button>
          </div>
        </div>
      )}

      {/* Response Time Expectation & Privacy */}
      <div className="mt-8 pt-6 border-t border-[#D9E0E5] flex flex-wrap items-center justify-center gap-4 text-[11px] font-mono text-[#5B6875]">
        <div className="flex items-center gap-1.5">
          <Clock className="w-3.5 h-3.5 text-[#B8613A]" />
          <span>SLA: Response within 4h</span>
        </div>
        <span>•</span>
        <div className="flex items-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-[#B8613A]" />
          <span>Standard NDA Protected</span>
        </div>
        <span>•</span>
        <div className="flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-[#B8613A]" />
          <span>Tirupati, AP Studio</span>
        </div>
      </div>
    </form>
  );
};
