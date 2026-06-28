"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type FrameSequenceProps = {
  frameCount?: number;
  framePath?: string;
  loadingLabel?: string;
  alt?: string;
};

const DEFAULT_FRAME_COUNT = 240;
const DEFAULT_FRAME_PATH = "/srimath-3d-frames";

function frameSrc(framePath: string, index: number) {
  return `${framePath}/ezgif-frame-${String(index).padStart(3, "0")}.jpg`;
}

function SceneFallback() {
  return (
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(20,26,36,0.35),rgba(5,6,8,0.96))]" />
  );
}

function LoadingOverlay({
  progress,
  label,
}: {
  progress: number;
  label: string;
}) {
  return (
    <div className="absolute inset-0 z-20 flex items-center justify-center bg-[radial-gradient(circle_at_center,rgba(5,8,13,0.35),rgba(5,6,8,0.9))] px-4">
      <div className="glass-panel flex min-w-60 flex-col items-start gap-4 rounded-3xl px-5 py-4 text-white shadow-2xl">
        <div>
          <p className="text-xs uppercase tracking-[0.35em] text-slate-400">
            {label}
          </p>
          <h3 className="mt-1 text-lg font-semibold">Preparing the sequence</h3>
        </div>
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/10">
          <div
            className="h-full rounded-full bg-linear-to-r from-sky-300 to-white transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-xs text-slate-300">{Math.round(progress)}% loaded</p>
      </div>
    </div>
  );
}

export function BuildingScene({
  frameCount = DEFAULT_FRAME_COUNT,
  framePath = DEFAULT_FRAME_PATH,
  loadingLabel = "Loading frames",
  alt = "Srimath architectural sequence",
}: FrameSequenceProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const frameState = useRef({ frame: 1 });
  const currentFrame = useRef(1);
  const [loadedFrames, setLoadedFrames] = useState(0);

  const initialFrame = useMemo(() => frameSrc(framePath, 1), [framePath]);

  useEffect(() => {
    let cancelled = false;

    const preloadedFrames: HTMLImageElement[] = [];

    for (let index = 1; index <= frameCount; index += 1) {
      const image = new Image();
      image.src = frameSrc(framePath, index);
      image.onload = () => {
        if (!cancelled) {
          setLoadedFrames((current) => Math.min(frameCount, current + 1));
        }
      };
      image.onerror = () => {
        if (!cancelled) {
          setLoadedFrames((current) => Math.min(frameCount, current + 1));
        }
      };
      preloadedFrames.push(image);
    }

    return () => {
      cancelled = true;
      preloadedFrames.forEach((image) => {
        image.onload = null;
        image.onerror = null;
      });
    };
  }, []);

  useEffect(() => {
    const triggerElement =
      rootRef.current?.closest("section") ?? rootRef.current;
    const image = imageRef.current;

    if (!triggerElement || !image) {
      return;
    }

    const updateFrame = () => {
      const nextFrame = Math.min(
        frameCount,
        Math.max(1, Math.round(frameState.current.frame)),
      );

      if (nextFrame === currentFrame.current) {
        return;
      }

      currentFrame.current = nextFrame;
      image.src = frameSrc(framePath, nextFrame);
    };

    image.src = initialFrame;

    const tween = gsap.to(frameState.current, {
      frame: frameCount,
      ease: "none",
      scrollTrigger: {
        trigger: triggerElement,
        start: "top top",
        end: "bottom bottom",
        scrub: 1,
      },
      onUpdate: updateFrame,
    });

    updateFrame();

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [initialFrame]);

  return (
    <div
      ref={rootRef}
      className="absolute inset-0 h-full w-full overflow-hidden"
    >
      <SceneFallback />
      <img
        ref={imageRef}
        src={initialFrame}
        alt={alt}
        className="absolute inset-0 h-full w-full object-cover"
        onLoad={() => setLoadedFrames((current) => Math.max(1, current))}
        draggable={false}
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(5,8,13,0.1),rgba(5,6,8,0.72)_68%,rgba(5,6,8,0.98))]" />
      {loadedFrames < frameCount ? (
        <LoadingOverlay
          progress={(loadedFrames / frameCount) * 100}
          label={loadingLabel}
        />
      ) : null}
    </div>
  );
}
