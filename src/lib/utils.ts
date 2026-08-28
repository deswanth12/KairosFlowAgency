import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(dateString: string): string {
  try {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    }).format(date);
  } catch {
    return dateString;
  }
}

export function formatTimeAgo(dateString: string): string {
  try {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMs = now.getTime() - date.getTime();
    const diffInMins = Math.floor(diffInMs / (1000 * 60));
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

    if (diffInMins < 1) return 'Just now';
    if (diffInMins < 60) return `${diffInMins}m ago`;
    if (diffInHours < 24) return `${diffInHours}h ago`;
    if (diffInDays === 1) return 'Yesterday';
    return `${diffInDays}d ago`;
  } catch {
    return dateString;
  }
}

export function generateWhatsAppLink(
  phoneNumber: string = '917702256073',
  data?: {
    name?: string;
    company?: string;
    services?: string[];
    description?: string;
    budget?: string;
    timeline?: string;
  }
): string {
  let cleanPhone = phoneNumber.replace(/[^0-9]/g, '');
  if (cleanPhone.length === 10) {
    cleanPhone = '91' + cleanPhone;
  }

  if (!data || !data.name) {
    const defaultMsg = encodeURIComponent(
      'Hi, I am contacting you from Kairos Flow Agency regarding your project inquiry.'
    );
    return `https://wa.me/${cleanPhone}?text=${defaultMsg}`;
  }

  const lines = [
    `*New Project Enquiry — Kairos Flow Agency*`,
    `----------------------------------------`,
    `*Name:* ${data.name}`,
    data.company ? `*Company:* ${data.company}` : '',
    data.services && data.services.length > 0 ? `*Services:* ${data.services.join(', ')}` : '',
    data.budget ? `*Budget Range:* ${data.budget}` : '',
    data.timeline ? `*Target Timeline:* ${data.timeline}` : '',
    data.description ? `\n*Brief / Notes:*\n${data.description}` : '',
    `----------------------------------------`,
    `_Sent via kairosflow.agency project intake_`
  ].filter(Boolean);

  const encoded = encodeURIComponent(lines.join('\n'));
  return `https://wa.me/${cleanPhone}?text=${encoded}`;
}
