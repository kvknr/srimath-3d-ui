"use client";

import { motion } from "framer-motion";
import {
  MapPin,
  Phone,
  Mail,
  Instagram,
  Linkedin,
  Facebook,
} from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { GlassCard } from "@/components/ui/glass-card";

const socials = [Instagram, Linkedin, Facebook];

export function ContactSection() {
  return (
    <section
      id="contact"
      className="relative border-t border-white/6 px-4 py-24 sm:px-6 lg:px-10 lg:py-32"
    >
      <div className="mx-auto grid max-w-7xl gap-5 lg:grid-cols-[0.95fr,1.05fr]">
        <div>
          <SectionHeading
            eyebrow="Contact"
            title="Let's shape the next landmark together."
            description="Tell us what you are building and we will respond with a clear plan, practical next steps, and a premium delivery approach."
          />

          <div className="mt-8 grid gap-4">
            <GlassCard className="p-5">
              <div className="flex items-center gap-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04]">
                  <MapPin className="h-4 w-4 text-sky-200" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.35em] text-slate-400">
                    Office
                  </p>
                  <p className="mt-1 text-sm text-white">Bangalore, India</p>
                </div>
              </div>
            </GlassCard>

            <GlassCard className="p-5">
              <div className="flex items-center gap-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04]">
                  <Phone className="h-4 w-4 text-sky-200" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.35em] text-slate-400">
                    Call
                  </p>
                  <p className="mt-1 text-sm text-white">+91 90000 00000</p>
                </div>
              </div>
            </GlassCard>

            <GlassCard className="p-5">
              <div className="flex items-center gap-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04]">
                  <Mail className="h-4 w-4 text-sky-200" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.35em] text-slate-400">
                    Email
                  </p>
                  <p className="mt-1 text-sm text-white">
                    hello@srimathbuilds.com
                  </p>
                </div>
              </div>
            </GlassCard>
          </div>
        </div>

        <GlassCard className="p-5 md:p-7">
          <div className="grid gap-5 lg:grid-cols-[1.1fr,0.9fr]">
            <form className="grid gap-4">
              <div>
                <label className="mb-2 block text-sm text-slate-300">
                  Name
                </label>
                <input
                  className="w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-white outline-none transition focus:border-sky-300/40 focus:bg-white/[0.06]"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm text-slate-300">
                  Email
                </label>
                <input
                  className="w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-white outline-none transition focus:border-sky-300/40 focus:bg-white/[0.06]"
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm text-slate-300">
                  Project details
                </label>
                <textarea
                  rows={5}
                  className="w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-white outline-none transition focus:border-sky-300/40 focus:bg-white/[0.06]"
                  placeholder="Tell us about your site, goals, and desired timeline."
                />
              </div>
              <button className="rounded-full bg-white px-6 py-3 text-sm font-medium text-black transition-transform duration-300 hover:-translate-y-0.5">
                Send Inquiry
              </button>
            </form>

            <div className="grid gap-4">
              <div className="overflow-hidden rounded-[24px] border border-white/10 bg-[radial-gradient(circle_at_20%_20%,rgba(127,178,255,0.25),transparent_30%),linear-gradient(160deg,rgba(11,14,20,1),rgba(6,8,12,1))] p-4">
                <div className="flex h-full min-h-[16rem] items-center justify-center rounded-[20px] border border-dashed border-white/12 bg-white/[0.03] text-center">
                  <div>
                    <p className="text-xs uppercase tracking-[0.35em] text-slate-400">
                      Map Placeholder
                    </p>
                    <p className="mt-3 text-lg font-semibold text-white">
                      Embedded location panel
                    </p>
                    <p className="mt-2 text-sm text-slate-300">
                      Drop in your preferred map provider here.
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between rounded-[24px] border border-white/10 bg-white/[0.04] px-5 py-4">
                <p className="text-sm text-slate-300">Follow the work</p>
                <div className="flex items-center gap-2">
                  {socials.map((Icon) => (
                    <button
                      key={Icon.displayName ?? Icon.name}
                      className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-slate-200 transition hover:bg-white/10 hover:text-white"
                    >
                      <Icon className="h-4 w-4" />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </GlassCard>
      </div>
    </section>
  );
}
