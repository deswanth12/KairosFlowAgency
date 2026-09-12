import { HeroSection } from '@/components/home/HeroSection';
import { TrustStrip } from '@/components/home/TrustStrip';
import { FeaturedProjects } from '@/components/home/FeaturedProjects';
import { ServicesGrid } from '@/components/home/ServicesGrid';
import { PricingSection } from '@/components/home/PricingSection';
import { CostEstimator } from '@/components/home/CostEstimator';
import { TestimonialsSection } from '@/components/home/TestimonialsSection';
import { WhyKairos } from '@/components/home/WhyKairos';
import { ProcessPreview } from '@/components/home/ProcessPreview';
import { TeamPreview } from '@/components/home/TeamPreview';
import { FAQSection } from '@/components/home/FAQSection';
import { FinalCTA } from '@/components/home/FinalCTA';
import { AgencyComparison } from '@/components/home/AgencyComparison';
import { MobileConversionBar } from '@/components/layout/MobileConversionBar';

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

      {/* 5. Interactive Scope & Cost Estimator */}
      <CostEstimator />

      {/* 6. Transparent Starting Pricing Anchors (INR / USD) */}
      <PricingSection />

      {/* 6. Verified Client Proof & Testimonials */}
      <TestimonialsSection />

      {/* 7. Why Kairos Flow (5 Practical Agility Reasons) */}
      <WhyKairos />

      {/* 8. The Engineering Difference: Traditional vs Kairos Flow Matrix */}
      <AgencyComparison />

      {/* 9. Process Roadmap (6 Sprints) */}
      <ProcessPreview />

      {/* 10. Founding Team (5 Specialists with Verified Credentials) */}
      <TeamPreview />

      {/* 11. FAQ Section (Pricing, Timeline, SLA, IP Ownership) */}
      <FAQSection />

      {/* 12. Final High-Conversion Call to Action */}
      <FinalCTA />

      {/* Sticky Mobile Conversion Bar (md:hidden) */}
      <MobileConversionBar />
    </>
  );
}
