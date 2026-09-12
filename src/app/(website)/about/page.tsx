import { Metadata } from "next";
import CursorGlow from "@/components/website/sections/about/CursorGlow";
import AboutHero from "@/components/website/sections/about/AboutHero";
import HouseIntro from "@/components/website//sections/about/HouseIntro";
import StoryChapters from "@/components/website/sections/about/StoryChapters";
import HouseNumbers from "@/components/website/sections/about/HouseNumbers";
import BukhoorRitual from "@/components/website/sections/about/BukhoorRitual";
import CollectionSegments from "@/components/website/sections/about/CollectionSegments";
import TheAtelier from "@/components/website/sections/about/TheAtelier";

export const metadata: Metadata = {
  title: "Our Story | SHAWQ Fragrances - The Art of Scent",
  description:
    "Discover the editorial story behind SHAWQ Fragrances. Handcrafted luxury Extrait de Parfums from Karachi, Pakistan.",
  openGraph: {
    title: "Our Story | SHAWQ Fragrances",
    description: "The artistry, heritage, and soul behind SHAWQ Fragrances.",
    type: "website",
    locale: "en_US",
  },
};

export default function AboutPage() {
  return (
    <div>
      <CursorGlow />
      <main className="bg-[#0d0c0a] text-[#F5F0E8]">
        <AboutHero />
        <HouseIntro />
        <StoryChapters />
        <HouseNumbers />
        <BukhoorRitual />
        <CollectionSegments />
        <TheAtelier />
      </main>
    </div>
  );
}