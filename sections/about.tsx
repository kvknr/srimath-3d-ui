"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { SectionHeading } from "@/components/ui/section-heading";
import { GlassCard } from "@/components/ui/glass-card";
import { stats } from "@/lib/site-data";

const premiumEase = [0.22, 1, 0.36, 1] as const;

const cardMotion = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.35 },
  transition: { duration: 0.7, ease: premiumEase },
};

export function AboutSection() {
  return (
    <section
      id="about"
      className="relative border-t border-white/6 bg-[#06080c] px-4 py-24 sm:px-6 lg:px-10 lg:py-32"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-14 flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="About"
            title="Crafting buildings that feel permanent, elegant, and unmistakably modern."
            description="We combine engineering discipline with editorial-level presentation to create homes and developments that hold their value in both the market and the memory."
          />
          <div className="grid gap-3 sm:grid-cols-3 lg:w-[40%]">
            {stats.map((stat) => (
              <motion.div key={stat.label} {...cardMotion}>
                <GlassCard className="h-full p-5">
                  <p className="text-3xl font-semibold tracking-tight text-white">
                    {stat.value}
                  </p>
                  <p className="mt-2 text-sm leading-6 text-slate-300">
                    {stat.label}
                  </p>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="grid gap-5 lg:grid-cols-[1.1fr,0.9fr]">
          <motion.div {...cardMotion}>
            <GlassCard className="relative min-h-[28rem] overflow-hidden p-0">
              <Image
                src="/srimath-logo.png"
                alt="Construction detail"
                fill
                className="object-cover opacity-60"
                sizes="(max-width: 1024px) 100vw, 60vw"
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,14,20,0.06),rgba(10,14,20,0.88))]" />
              <div className="absolute inset-x-0 bottom-0 p-6 md:p-8">
                <p className="text-xs uppercase tracking-[0.35em] text-slate-400">
                  Design Language
                </p>
                <h3 className="mt-3 max-w-xl text-3xl font-semibold tracking-tight text-white md:text-5xl">
                  Atmospheric spaces shaped by light, shadow, and material calm.
                </h3>
              </div>
            </GlassCard>
          </motion.div>

          <div className="grid gap-5">
            <motion.div
              {...cardMotion}
              transition={{ duration: 0.75, ease: premiumEase, delay: 0.08 }}
            >
              <GlassCard className="p-6 md:p-8">
                <p className="text-sm leading-7 text-slate-300">
                  Every project is run as a collaboration between architecture,
                  execution, and client vision. We keep the process transparent,
                  disciplined, and highly curated so the final result feels
                  effortless.
                </p>
              </GlassCard>
            </motion.div>
            <motion.div
              {...cardMotion}
              transition={{ duration: 0.75, ease: premiumEase, delay: 0.16 }}
            >
              <GlassCard className="grid gap-4 p-6 md:grid-cols-2 md:p-8">
                <div className="rounded-[22px] border border-white/10 bg-white/[0.04] p-4">
                  <p className="text-xs uppercase tracking-[0.35em] text-slate-400">
                    Precision
                  </p>
                  <p className="mt-3 text-sm leading-6 text-slate-200">
                    Exacting delivery schedules, site discipline, and finish
                    quality.
                  </p>
                </div>
                <div className="rounded-[22px] border border-white/10 bg-white/[0.04] p-4">
                  <p className="text-xs uppercase tracking-[0.35em] text-slate-400">
                    Trust
                  </p>
                  <p className="mt-3 text-sm leading-6 text-slate-200">
                    Reliable communication and long-term client relationships.
                  </p>
                </div>
              </GlassCard>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
