// src/app/(webiste)/page.tsx
import HeroSection from '@/components/website/sections/home/HeroSection';
import EmpoweringSection from '@/components/website/sections/home/EmpoweringSection';
import NewsletterSection from "@/components/website/sections/home/NewsletterSection";
import FeaturedDrops from "@/components/website/sections/home/FeaturedDrops";
import CoverflowCarousel from "@/components/website/sections/home/CoverflowCarousel";


export default function HomePage() {
  return (
    <div>

      <HeroSection />

      <FeaturedDrops />

      <EmpoweringSection />

      <CoverflowCarousel />

      <NewsletterSection />

    </div>
  );
}