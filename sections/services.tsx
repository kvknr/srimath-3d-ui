"use client";

import { motion } from "framer-motion";
import { Building2, Layers3, Compass, ShieldCheck } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { GlassCard } from "@/components/ui/glass-card";
import { services } from "@/lib/site-data";

const premiumEase = [0.22, 1, 0.36, 1] as const;

const icons = {
  "building-2": Building2,
  "layers-3": Layers3,
  compass: Compass,
  "shield-check": ShieldCheck,
};

export function ServicesSection() {
  return (
    <section
      id="services"
      className="relative border-t border-white/6 px-4 py-24 sm:px-6 lg:px-10 lg:py-32"
    >
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Services"
          title="A full-service construction practice, built for demanding projects."
          description="From feasibility through delivery, our service model is designed to keep the process lean, visual, and exceptionally controlled."
          className="mb-14"
        />

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {services.map((service, index) => {
            const Icon = icons[service.icon as keyof typeof icons];
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 28, rotateX: 8 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{
                  duration: 0.7,
                  delay: index * 0.06,
                  ease: premiumEase,
                }}
                whileHover={{ y: -8, scale: 1.01 }}
              >
                <GlassCard className="group h-full p-6 md:p-7">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] text-sky-200 transition-colors group-hover:bg-sky-400/10 group-hover:text-white">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-5 text-xl font-semibold tracking-tight text-white">
                    {service.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-slate-300">
                    {service.description}
                  </p>
                </GlassCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
