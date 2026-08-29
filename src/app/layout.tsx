import type { Metadata } from 'next';
import { Inter, Plus_Jakarta_Sans, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { AIConsultant } from '@/components/consultant/AIConsultant';
import { siteSettingsData } from '@/data/settings';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'Kairos Flow Agency — Digital Experiences That Move Businesses Forward',
    template: '%s | Kairos Flow Agency'
  },
  description:
    'Kairos Flow Agency engineers high-performance web applications, native mobile apps, custom AI & automation workflows, brand identity design, and commercial cinematography.',
  keywords: [
    'Kairos Flow',
    'Kairos Flow Agency',
    'Web Development Agency',
    'Next.js Development',
    'Mobile App Engineering',
    'AI & Automation Workflows',
    'UI UX Design Studio',
    'Growth Marketing',
    'Video Production'
  ],
  authors: [{ name: 'Kairos Flow Agency Team' }],
  creator: 'Kairos Flow Agency',
  publisher: 'Kairos Flow Agency',
  formatDetection: {
    email: true,
    address: true,
    telephone: true
  },
  metadataBase: new URL('https://kairosflow.agency'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://kairosflow.agency',
    siteName: 'Kairos Flow Agency',
    title: 'Kairos Flow Agency — Digital Experiences That Move Businesses Forward',
    description:
      'We help ambitious businesses scale through custom web applications, mobile apps, AI automation, brand systems, and cinematic video production.',
    images: [
      {
        url: '/images/logo/logo-full.jpg',
        width: 1200,
        height: 630,
        alt: 'Kairos Flow Agency'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kairos Flow Agency — Digital Experiences That Move Businesses Forward',
    description:
      'Websites, native apps, AI workflows, and visual craftsmanship engineered for commercial velocity.',
    images: ['/images/logo/logo-full.jpg'],
    creator: '@kairosflow'
  },
  icons: {
    icon: '/images/logo/logo-mark.jpg',
    apple: '/images/logo/logo-mark.jpg'
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1
    }
  }
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: 'Kairos Flow Agency',
  image: 'https://kairosflow.agency/images/logo/logo-full.jpg',
  url: 'https://kairosflow.agency',
  telephone: siteSettingsData.phone,
  email: siteSettingsData.email,
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Tirupati',
    addressRegion: 'Andhra Pradesh',
    addressCountry: 'India'
  },
  description: 'Digital agency specializing in web development, mobile apps, AI automation, brand identity, and video production.',
  openingHoursSpecification: {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    opens: '09:00',
    closes: '19:00'
  },
  sameAs: [
    siteSettingsData.socials.linkedin,
    siteSettingsData.socials.twitter,
    siteSettingsData.socials.instagram,
    siteSettingsData.socials.github
  ].filter(Boolean)
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${plusJakartaSans.variable} ${jetbrainsMono.variable} scroll-smooth`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen flex flex-col bg-[#F7F7F4] text-[#111827] antialiased selection:bg-[#0B1F33] selection:text-[#F7F7F4] font-sans">
        <Navbar />
        <main className="flex-1 w-full bg-[#F7F7F4]">{children}</main>
        <Footer />
        <AIConsultant />
      </body>
    </html>
  );
}
