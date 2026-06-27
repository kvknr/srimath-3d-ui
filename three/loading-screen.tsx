"use client";

import { Html, useProgress } from "@react-three/drei";

export function LoadingScreen() {
  const { progress } = useProgress();

  return (
    <Html center style={{ pointerEvents: "none" }}>
      <div className="glass-panel flex min-w-[240px] flex-col items-start gap-4 rounded-[24px] px-5 py-4 text-white shadow-2xl">
        <div>
          <p className="text-xs uppercase tracking-[0.35em] text-slate-400">
            Loading experience
          </p>
          <h3 className="mt-1 text-lg font-semibold">Building the scene</h3>
        </div>
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/10">
          <div
            className="h-full rounded-full bg-gradient-to-r from-sky-300 to-white transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-xs text-slate-300">{Math.round(progress)}% loaded</p>
      </div>
    </Html>
  );
}
