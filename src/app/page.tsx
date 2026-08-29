import { HeroSection } from '@/components/home/HeroSection';
import { TrustStrip } from '@/components/home/TrustStrip';
import { FeaturedProjects } from '@/components/home/FeaturedProjects';
import { ServicesGrid } from '@/components/home/ServicesGrid';
import { PricingSection } from '@/components/home/PricingSection';
import { TestimonialsSection } from '@/components/home/TestimonialsSection';
import { WhyKairos } from '@/components/home/WhyKairos';
import { ProcessPreview } from '@/components/home/ProcessPreview';
import { TeamPreview } from '@/components/home/TeamPreview';
import { FAQSection } from '@/components/home/FAQSection';
import { FinalCTA } from '@/components/home/FinalCTA';

export default function HomePage() {
  return (
    <>
      {/* 1. Hero with Quick Intent Routing & Senior Team Agility */}
      <HeroSection />

      {/* 2. Trust Strip */}
      <TrustStrip />

      {/* 3. Selected Work with Transparent Project Classification Badges */}
      <FeaturedProjects />

      {/* 4. Six Core Disciplines */}
      <ServicesGrid />

      {/* 5. Transparent Starting Pricing Anchors (INR / USD) */}
      <PricingSection />

      {/* 6. Verified Client Proof & Testimonials */}
      <TestimonialsSection />

      {/* 7. Why Kairos Flow (5 Practical Agility Reasons) */}
      <WhyKairos />

      {/* 8. Process Roadmap (6 Sprints) */}
      <ProcessPreview />

      {/* 9. Founding Team (5 Specialists with Verified Credentials) */}
      <TeamPreview />

      {/* 10. FAQ Section (Pricing, Timeline, SLA, IP Ownership) */}
      <FAQSection />

      {/* 11. Final High-Conversion Call to Action */}
      <FinalCTA />
    </>
  );
}
