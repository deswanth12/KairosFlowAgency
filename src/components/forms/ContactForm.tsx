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
  Clock
} from 'lucide-react';

const AVAILABLE_SERVICES = [
  'Web Development',
  'App Development',
  'AI & Automation',
  'UI/UX & Branding',
  'Digital Marketing',
  'Video & Content'
];

const BUDGET_RANGES = [
  'Under $5,000',
  '$5,000 – $10,000',
  '$10,000 – $25,000',
  '$25,000 – $50,000',
  '$50,000+'
];

const TIMELINE_OPTIONS = [
  'Urgent (< 1 month)',
  '1 – 2 Months',
  '2 – 3 Months',
  '3+ Months',
  'Flexible / Exploring'
];

export const ContactForm: React.FC = () => {
  const searchParams = useSearchParams();

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

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const serviceParam = searchParams.get('service');
    if (serviceParam) {
      const matched = AVAILABLE_SERVICES.find(
        (s) => s.toLowerCase() === serviceParam.toLowerCase() || s.toLowerCase().includes(serviceParam.toLowerCase())
      );
      if (matched && !formData.services.includes(matched)) {
        setFormData((prev) => ({ ...prev, services: [...prev.services, matched] }));
      }
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

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) newErrors.name = 'Full name is required';
    if (!formData.company.trim()) newErrors.company = 'Company or business name is required';

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

    if (formData.services.length === 0) {
      newErrors.services = 'Please select at least one capability';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Please outline your project goals and scope';
    } else if (formData.description.trim().length < 15) {
      newErrors.description = 'Please provide at least 15 characters describing your project';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!validate()) {
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
      <div className="p-8 sm:p-12 rounded-2xl bg-white border border-corporate-border shadow-elevated-card text-center">
        <div className="w-16 h-16 rounded-full bg-corporate-softBlue text-corporate-blue flex items-center justify-center mx-auto mb-6 border border-blue-200">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-corporate-softBlue text-xs font-mono text-corporate-blue mb-3 font-semibold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Brief Received</span>
        </div>
        <h3 className="text-2xl sm:text-3xl font-bold text-corporate-dark tracking-tight mb-3 font-display">
          Thanks, {formData.name}.
        </h3>
        <p className="text-corporate-mutedText text-sm sm:text-base max-w-md mx-auto leading-relaxed mb-8">
          Your project brief has been received. We&apos;ll review it and get back to you within <strong className="text-corporate-dark">4 business hours</strong>.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-6 border-t border-corporate-border max-w-md mx-auto">
          <a
            href={whatsappDirectUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 text-xs font-semibold text-white bg-corporate-dark hover:bg-corporate-darkHover rounded-lg transition-colors shadow-sm"
          >
            <MessageCircle className="w-4 h-4 text-emerald-400" />
            <span>Follow Up on WhatsApp</span>
          </a>

          <button
            type="button"
            onClick={() => {
              setIsSuccess(false);
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
            className="w-full sm:w-auto px-6 py-3.5 text-xs font-medium text-corporate-mutedText hover:text-corporate-dark bg-corporate-offwhite rounded-lg transition-colors border border-corporate-border"
          >
            Submit Another Brief
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="p-8 sm:p-12 rounded-2xl bg-white border border-corporate-border shadow-elevated-card">
      {/* Introduction */}
      <div className="mb-8 pb-6 border-b border-corporate-border">
        <h2 className="text-2xl sm:text-3xl font-bold text-corporate-dark tracking-tight font-display mb-2">
          Tell us what you&apos;re building.
        </h2>
        <p className="text-corporate-mutedText text-xs sm:text-sm leading-relaxed">
          Every project is scoped around your goals, requirements and timeline. Fill in the details below to receive a clear proposal.
        </p>
      </div>

      {errorMessage && (
        <div className="mb-8 p-4 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm flex items-start gap-3">
          <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
          <div>{errorMessage}</div>
        </div>
      )}

      {/* Step 1: What do you need? */}
      <div className="mb-8">
        <label className="block text-xs font-mono uppercase tracking-wider text-corporate-mutedText mb-3 font-semibold">
          What do you need? (Select all that apply) <span className="text-corporate-blue">*</span>
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
          {AVAILABLE_SERVICES.map((svc) => {
            const isSelected = formData.services.includes(svc);
            return (
              <button
                key={svc}
                type="button"
                onClick={() => toggleService(svc)}
                className={`p-3 text-left rounded-lg text-xs font-medium transition-all duration-150 border flex items-center justify-between ${
                  isSelected
                    ? 'bg-corporate-dark text-white border-corporate-dark shadow-sm'
                    : 'bg-corporate-offwhite hover:bg-corporate-softBlue text-corporate-text border-corporate-border'
                }`}
              >
                <span>{svc}</span>
                {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-corporate-sky" />}
              </button>
            );
          })}
        </div>
        {errors.services && (
          <p className="mt-2 text-xs text-red-600">{errors.services}</p>
        )}
      </div>

      {/* Step 2: Contact & Company Details */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-8">
        <div>
          <label className="block text-xs font-mono uppercase tracking-wider text-corporate-mutedText mb-2 font-semibold">
            Name <span className="text-corporate-blue">*</span>
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => {
              setFormData({ ...formData, name: e.target.value });
              if (errors.name) setErrors({ ...errors, name: '' });
            }}
            placeholder="Your name"
            className={`w-full px-4 py-3 text-sm rounded-lg bg-corporate-offwhite text-corporate-dark border focus:outline-none focus:border-corporate-blue ${
              errors.name ? 'border-red-400' : 'border-corporate-border'
            }`}
          />
          {errors.name && <p className="mt-1.5 text-xs text-red-600">{errors.name}</p>}
        </div>

        <div>
          <label className="block text-xs font-mono uppercase tracking-wider text-corporate-mutedText mb-2 font-semibold">
            Business / Company <span className="text-corporate-blue">*</span>
          </label>
          <input
            type="text"
            value={formData.company}
            onChange={(e) => {
              setFormData({ ...formData, company: e.target.value });
              if (errors.company) setErrors({ ...errors, company: '' });
            }}
            placeholder="Company or venture name"
            className={`w-full px-4 py-3 text-sm rounded-lg bg-corporate-offwhite text-corporate-dark border focus:outline-none focus:border-corporate-blue ${
              errors.company ? 'border-red-400' : 'border-corporate-border'
            }`}
          />
          {errors.company && <p className="mt-1.5 text-xs text-red-600">{errors.company}</p>}
        </div>

        <div>
          <label className="block text-xs font-mono uppercase tracking-wider text-corporate-mutedText mb-2 font-semibold">
            Email <span className="text-corporate-blue">*</span>
          </label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => {
              setFormData({ ...formData, email: e.target.value });
              if (errors.email) setErrors({ ...errors, email: '' });
            }}
            placeholder="you@company.com"
            className={`w-full px-4 py-3 text-sm rounded-lg bg-corporate-offwhite text-corporate-dark border focus:outline-none focus:border-corporate-blue ${
              errors.email ? 'border-red-400' : 'border-corporate-border'
            }`}
          />
          {errors.email && <p className="mt-1.5 text-xs text-red-600">{errors.email}</p>}
        </div>

        <div>
          <label className="block text-xs font-mono uppercase tracking-wider text-corporate-mutedText mb-2 font-semibold">
            WhatsApp / Phone <span className="text-corporate-blue">*</span>
          </label>
          <input
            type="text"
            value={formData.phone}
            onChange={(e) => {
              setFormData({ ...formData, phone: e.target.value });
              if (errors.phone) setErrors({ ...errors, phone: '' });
            }}
            placeholder="+91 77022 56073"
            className={`w-full px-4 py-3 text-sm rounded-lg bg-corporate-offwhite text-corporate-dark border focus:outline-none focus:border-corporate-blue ${
              errors.phone ? 'border-red-400' : 'border-corporate-border'
            }`}
          />
          {errors.phone && <p className="mt-1.5 text-xs text-red-600">{errors.phone}</p>}
        </div>
      </div>

      {/* Step 3: Project Details */}
      <div className="mb-8">
        <label className="block text-xs font-mono uppercase tracking-wider text-corporate-mutedText mb-2 font-semibold">
          Project Details <span className="text-corporate-blue">*</span>
        </label>
        <textarea
          rows={4}
          value={formData.description}
          onChange={(e) => {
            setFormData({ ...formData, description: e.target.value });
            if (errors.description) setErrors({ ...errors, description: '' });
          }}
          placeholder="Describe what you want to build, key features, and your target outcomes..."
          className={`w-full px-4 py-3 text-sm rounded-lg bg-corporate-offwhite text-corporate-dark border focus:outline-none focus:border-corporate-blue resize-y ${
            errors.description ? 'border-red-400' : 'border-corporate-border'
          }`}
        />
        {errors.description && <p className="mt-1.5 text-xs text-red-600">{errors.description}</p>}
      </div>

      {/* Step 4: Budget & Timeline */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-8">
        <div>
          <label className="block text-xs font-mono uppercase tracking-wider text-corporate-mutedText mb-2 font-semibold">
            Budget Range (Optional)
          </label>
          <select
            value={formData.budget}
            onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
            className="w-full px-4 py-3 text-sm rounded-lg bg-corporate-offwhite text-corporate-dark border border-corporate-border focus:outline-none focus:border-corporate-blue"
          >
            <option value="">Select budget range...</option>
            {BUDGET_RANGES.map((b) => (
              <option key={b} value={b}>{b}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-mono uppercase tracking-wider text-corporate-mutedText mb-2 font-semibold">
            Target Timeline (Optional)
          </label>
          <select
            value={formData.timeline}
            onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
            className="w-full px-4 py-3 text-sm rounded-lg bg-corporate-offwhite text-corporate-dark border border-corporate-border focus:outline-none focus:border-corporate-blue"
          >
            <option value="">Select target timeline...</option>
            {TIMELINE_OPTIONS.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Action Buttons & WhatsApp Alternative */}
      <div className="pt-6 border-t border-corporate-border flex flex-col sm:flex-row items-center justify-between gap-4">
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full sm:w-auto group inline-flex items-center justify-center gap-2 px-8 py-3.5 text-xs font-semibold text-white bg-corporate-dark hover:bg-corporate-darkHover rounded-lg shadow-sm transition-all duration-200 disabled:opacity-50"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Transmitting...</span>
            </>
          ) : (
            <>
              <span>Submit Project Brief</span>
              <Send className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
            </>
          )}
        </button>

        <div className="flex items-center gap-2 text-xs text-corporate-mutedText">
          <span>Prefer direct chat?</span>
          <a
            href={whatsappDirectUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 font-semibold text-corporate-dark hover:text-corporate-blue transition-colors"
          >
            <MessageCircle className="w-4 h-4 text-emerald-600" />
            <span>Chat on WhatsApp</span>
          </a>
        </div>
      </div>

      {/* Response Time Expectation & Privacy */}
      <div className="mt-6 flex items-center justify-center gap-4 text-[11px] text-corporate-mutedText">
        <div className="flex items-center gap-1.5">
          <Clock className="w-3.5 h-3.5 text-corporate-blue" />
          <span>Response within 4 hours</span>
        </div>
        <span>•</span>
        <div className="flex items-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-corporate-blue" />
          <span>Strict NDA Protection</span>
        </div>
      </div>
    </form>
  );
};
