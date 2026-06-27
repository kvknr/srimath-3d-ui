"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/section-heading";
import { GlassCard } from "@/components/ui/glass-card";
import { portfolio } from "@/lib/site-data";

const premiumEase = [0.22, 1, 0.36, 1] as const;

export function PortfolioSection() {
  return (
    <section
      id="portfolio"
      className="relative border-t border-white/6 bg-[#06080c] px-4 py-24 sm:px-6 lg:px-10 lg:py-32"
    >
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Portfolio"
          title="Projects presented like a luxury editorial spread."
          description="Each card is designed to feel tactile and cinematic, with layered motion and restrained visual hierarchy."
          className="mb-14"
        />

        <div className="columns-1 gap-5 md:columns-2 xl:columns-3">
          {portfolio.map((project, index) => (
            <motion.div
              key={project.title}
              className="mb-5 break-inside-avoid"
              initial={{ opacity: 0, y: 28, scale: 0.98 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{
                duration: 0.7,
                delay: index * 0.06,
                ease: premiumEase,
              }}
              whileHover={{ y: -8 }}
            >
              <GlassCard className="group overflow-hidden p-0">
                <div className="aspect-[4/5] bg-[radial-gradient(circle_at_30%_20%,rgba(126,171,255,0.24),transparent_35%),linear-gradient(135deg,rgba(18,22,30,1),rgba(7,9,13,1))] p-6 transition-transform duration-500 group-hover:scale-[1.02]">
                  <div className="flex h-full flex-col justify-between rounded-[24px] border border-white/10 bg-white/[0.03] p-5 backdrop-blur-sm">
                    <div>
                      <p className="text-xs uppercase tracking-[0.35em] text-slate-400">
                        {project.meta}
                      </p>
                      <h3 className="mt-4 text-2xl font-semibold tracking-tight text-white">
                        {project.title}
                      </h3>
                    </div>
                    <p className="max-w-sm text-sm leading-7 text-slate-300">
                      {project.tone}
                    </p>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
