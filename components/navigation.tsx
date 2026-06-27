"use client";

import {
  AnimatePresence,
  motion,
  useScroll,
  useTransform,
} from "framer-motion";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { navItems } from "@/lib/site-data";
import { useSmoothScroll } from "@/components/providers/smooth-scroll-provider";
import Image from "next/image";

const premiumEase = [0.22, 1, 0.36, 1] as const;

export function Navigation() {
  const { scrollY } = useScroll();
  const [open, setOpen] = useState(false);
  const { scrollTo } = useSmoothScroll();

  const background = useTransform(scrollY, [0, 120], [0.08, 0.28]);
  const y = useTransform(scrollY, [0, 120], [12, 0]);
  const shadow = useTransform(scrollY, [0, 120], [0.08, 0.25]);

  useEffect(() => {
    const onEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    window.addEventListener("keydown", onEscape);
    return () => window.removeEventListener("keydown", onEscape);
  }, []);

  return (
    <motion.header
      style={{
        y,
        backgroundColor: background,
        boxShadow: useTransform(
          shadow,
          (value) => `0 20px 70px rgba(0,0,0,${value})`,
        ),
      }}
      className="fixed left-1/2 top-4 z-50 w-[calc(100%-1.5rem)] max-w-6xl -translate-x-1/2 rounded-full border border-white/10 backdrop-blur-2xl md:top-6"
    >
      <div className="flex items-center justify-between px-4 py-3 md:px-6">
        <button
          className="flex items-center gap-3 text-left"
          onClick={() => scrollTo("#home")}
          aria-label="Scroll to top"
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 shadow-inner shadow-white/5">
            <Image
              src="/srimath-logo.png"
              alt="Srimath logo"
              width={28}
              height={28}
              className="h-7 w-7 object-contain"
            />
          </span>
          <span className="hidden flex-col md:flex">
            <span className="text-[10px] uppercase tracking-[0.35em] text-slate-400">
              Premium Build
            </span>
            <span className="text-sm font-semibold text-white">Srimath</span>
          </span>
        </button>

        <nav className="hidden items-center gap-1 rounded-full border border-white/10 bg-white/[0.04] px-2 py-1 md:flex">
          {navItems.map((item) => (
            <button
              key={item.label}
              onClick={() => scrollTo(item.href)}
              className="rounded-full px-4 py-2 text-sm text-slate-200 transition-colors hover:bg-white/10 hover:text-white"
            >
              {item.label}
            </button>
          ))}
        </nav>

        <button
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white shadow-[0_12px_40px_rgba(0,0,0,0.25)] md:hidden"
          onClick={() => setOpen((value) => !value)}
          aria-label="Toggle menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.28, ease: premiumEase }}
            className="border-t border-white/10 bg-[#06080c]/95 px-4 py-4 md:hidden"
          >
            <div className="grid gap-2">
              {navItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() => {
                    scrollTo(item.href);
                    setOpen(false);
                  }}
                  className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4 text-left text-base text-white"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </motion.header>
  );
}
