import { HeroSection } from '@/components/home/HeroSection';
import { TrustStrip } from '@/components/home/TrustStrip';
import { FeaturedProjects } from '@/components/home/FeaturedProjects';
import { ServicesGrid } from '@/components/home/ServicesGrid';
import { WhyKairos } from '@/components/home/WhyKairos';
import { ProcessPreview } from '@/components/home/ProcessPreview';
import { TeamPreview } from '@/components/home/TeamPreview';
import { FAQSection } from '@/components/home/FAQSection';
import { FinalCTA } from '@/components/home/FinalCTA';

export default function HomePage() {
  return (
    <>
      {/* 1. Hero with 3 Core Trust Cards */}
      <HeroSection />

      {/* 2. Trust Strip */}
      <TrustStrip />

      {/* 3. Selected Work (Shown immediately after hero/trust) */}
      <FeaturedProjects />

      {/* 4. Six Core Capabilities / Services */}
      <ServicesGrid />

      {/* 5. Why Kairos Flow (5 Practical Reasons) */}
      <WhyKairos />

      {/* 6. Process Roadmap (6 Stages) */}
      <ProcessPreview />

      {/* 7. Founding Team (5 Specialists) */}
      <TeamPreview />

      {/* 8. FAQ Section (Pricing, Timeline, Process, Revisions, Support, Payment) */}
      <FAQSection />

      {/* 9. Final Call to Action */}
      <FinalCTA />
    </>
  );
}
