import { Hero } from "@/components/home/hero";
import { FeaturedProjects } from "@/components/home/featured-projects";
import { WhatIDo } from "@/components/home/what-i-do";
import { AboutPreview } from "@/components/home/about-preview";
import { ContactCta } from "@/components/home/contact-cta";

export default function HomePage() {
  return (
    <>
      <Hero />
      <FeaturedProjects />
      <WhatIDo />
      <AboutPreview />
      <ContactCta />
    </>
  );
}
