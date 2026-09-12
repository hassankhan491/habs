// src/app/(webiste)/page.tsx
import HeroSection from '@/components/website/sections/home/HeroSection';
import CategorySection from "@/components/website/sections/home/CategorySection";
import EmpoweringSection from '@/components/website/sections/home/EmpoweringSection';
import SignatureCollectionSection from '@/components/website/sections/home/SignatureCollectionSection';
import ProductShowcase from '@/components/website/sections/home/ProductShowcase';
import BestSellersSections from "@/components/website/sections/home/BestSellersSections";
import NewsletterSection from "@/components/website/sections/home/NewsletterSection";
import ShawqStorySection  from "@/components/website/sections/home/ShawqStorySection";
import ShawqManifesto from "@/components/website/sections/home/ShawqManifesto";


export default function HomePage() {
  return (
    <div>

      <HeroSection />

      <CategorySection />

      <ShawqStorySection  />
      
      <SignatureCollectionSection />

      <EmpoweringSection />

      <ShawqManifesto />

      <ProductShowcase />

       <BestSellersSections />

      <NewsletterSection />

    </div>
  );
}