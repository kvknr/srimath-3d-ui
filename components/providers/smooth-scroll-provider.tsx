"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type SmoothScrollContextValue = {
  scrollTo: (target: string | number | HTMLElement) => void;
};

const SmoothScrollContext = createContext<SmoothScrollContextValue | null>(
  null,
);

export function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [lenis, setLenis] = useState<Lenis | null>(null);

  useEffect(() => {
    const instance = new Lenis({
      lerp: 0.1,
      smoothWheel: true,
      wheelMultiplier: 0.9,
    });

    setLenis(instance);

    let frame = 0;

    const raf = (time: number) => {
      instance.raf(time);
      ScrollTrigger.update();
      frame = window.requestAnimationFrame(raf);
    };

    frame = window.requestAnimationFrame(raf);

    return () => {
      window.cancelAnimationFrame(frame);
      instance.destroy();
      setLenis(null);
    };
  }, []);

  const value = useMemo(
    () => ({
      scrollTo: (target: string | number | HTMLElement) => {
        lenis?.scrollTo(target, { offset: -84, immediate: false });
      },
    }),
    [lenis],
  );

  return (
    <SmoothScrollContext.Provider value={value}>
      {children}
    </SmoothScrollContext.Provider>
  );
}

export function useSmoothScroll() {
  const context = useContext(SmoothScrollContext);
  if (!context) {
    throw new Error("useSmoothScroll must be used inside SmoothScrollProvider");
  }
  return context;
}
