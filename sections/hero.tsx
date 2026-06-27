"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { PremiumButton } from "@/components/ui/premium-button";
import { SplitTitle } from "@/animations/split-title";
import { useSmoothScroll } from "@/components/providers/smooth-scroll-provider";

const BuildingScene = dynamic(
  () => import("@/three/building-scene").then((module) => module.BuildingScene),
  {
    ssr: false,
    loading: () => (
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(20,26,36,0.35),rgba(5,6,8,0.96))]" />
    ),
  },
);

function FloatingParticle({
  delay,
  className,
}: {
  delay: number;
  className: string;
}) {
  return (
    <motion.span
      className={`absolute rounded-full bg-white/60 blur-[1px] ${className}`}
      initial={{ opacity: 0, scale: 0.6, y: 0 }}
      animate={{
        opacity: [0.1, 0.45, 0.18],
        scale: [0.7, 1.1, 0.8],
        y: [0, -16, 0],
      }}
      transition={{ duration: 7, delay, repeat: Infinity, ease: "easeInOut" }}
    />
  );
}

export function HeroSection() {
  const { scrollTo } = useSmoothScroll();

  return (
    <section id="home" className="relative min-h-[500vh]">
      <div className="sticky top-0 h-screen w-screen overflow-hidden">
        <div className="absolute inset-0">
          <BuildingScene />
        </div>

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(5,8,13,0.1),rgba(5,6,8,0.75)_68%,rgba(5,6,8,0.98))]" />

        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <FloatingParticle
            delay={0.2}
            className="left-[12%] top-[24%] h-2 w-2"
          />
          <FloatingParticle
            delay={1.1}
            className="left-[68%] top-[20%] h-1.5 w-1.5"
          />
          <FloatingParticle
            delay={2.2}
            className="left-[80%] top-[48%] h-2 w-2"
          />
          <FloatingParticle
            delay={0.7}
            className="left-[20%] top-[70%] h-1.5 w-1.5"
          />
        </div>

        <div className="absolute inset-x-0 bottom-0 z-10 px-4 pb-8 pt-24 sm:px-6 md:pb-12 lg:px-10">
          <div className="mx-auto flex max-w-7xl flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <p className="mb-5 text-xs font-semibold uppercase tracking-[0.4em] text-slate-300/80">
                Luxury Construction
              </p>
              <h1 className="max-w-4xl text-balance text-5xl font-semibold tracking-[-0.05em] text-white sm:text-6xl md:text-7xl xl:text-[6.5rem]">
                <SplitTitle text="Building Tomorrow's Landmarks" />
              </h1>
              <p className="mt-6 max-w-2xl text-sm leading-7 text-slate-300/90 md:text-lg">
                Srimath designs and delivers premium residences and landmark
                environments with cinematic precision, material honesty, and an
                obsession with detail from first sketch to final handover.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <PremiumButton href="#portfolio" accent>
                  Explore Projects
                </PremiumButton>
                <PremiumButton href="#contact">Contact Us</PremiumButton>
              </div>
            </div>

            <button
              onClick={() => scrollTo("#about")}
              className="group flex items-center gap-4 self-start rounded-full border border-white/10 bg-white/5 px-4 py-3 text-left text-sm text-slate-200 backdrop-blur-xl transition-colors hover:bg-white/10"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/10">
                <ArrowDown className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-1" />
              </span>
              <span className="pr-3">
                <span className="block text-[10px] uppercase tracking-[0.35em] text-slate-400">
                  Scroll Story
                </span>
                <span className="block text-white">Discover the journey</span>
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
