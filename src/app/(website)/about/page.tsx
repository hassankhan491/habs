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
  title: "Our Story | HABS Shoes - Step Into Your Style",
  description:
    "Discover the story behind HABS Shoes. Curated footwear bringing style, quality, and individuality to every step.",
  openGraph: {
    title: "Our Story | HABS Shoes",
    description:
      "The story, style, and vision behind HABS Shoes.",
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