"use client";

import { Navigation } from "@/components/navigation";
import { HeroSection } from "@/sections/hero";
import { AboutSection } from "@/sections/about";
import { ServicesSection } from "@/sections/services";
import { PortfolioSection } from "@/sections/portfolio";
import { ContactSection } from "@/sections/contact";
import { FooterSection } from "@/sections/footer";

export function Site() {
  return (
    <div className="relative isolate overflow-hidden bg-[#050608]">
      <div className="pointer-events-none absolute inset-0 hero-gradient" />
      <div className="noise-overlay pointer-events-none absolute inset-0" />
      <Navigation />
      <main className="relative">
        <HeroSection />
        <AboutSection />
        <ServicesSection />
        <PortfolioSection />
        <ContactSection />
      </main>
      <FooterSection />
    </div>
  );
}
