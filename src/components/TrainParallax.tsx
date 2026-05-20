"use client";

import { useEffect, useRef, useState } from "react";

const SEGMENTS = 6;

const TRAIN_LAYERS = [
  { segments: [0, 1], speed: 1.0, scale: 1, y: 0, opacity: 0.85 },
  { segments: [2, 3], speed: 0.6, scale: 0.72, y: 80, opacity: 0.45 },
  { segments: [4, 5], speed: 0.3, scale: 0.5, y: 150, opacity: 0.25 },
];

export function TrainParallax({ children }: { children: React.ReactNode }) {
  const sentinelRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let loaded = 0;
    for (let i = 1; i <= SEGMENTS; i++) {
      const img = new Image();
      img.onload = img.onerror = () => {
        loaded++;
        if (loaded === SEGMENTS) setReady(true);
      };
      img.src = `/assets/train/segment_${i}.png`;
    }
    setTimeout(() => setReady(true), 4000);
  }, []);

  useEffect(() => {
    const el = sentinelRef.current;
    if (!el) return;

    const onScroll = () => {
      const rect = el.getBoundingClientRect();
      const viewH = window.innerHeight;
      const totalScroll = rect.height - viewH;
      const scrolled = -rect.top;
      const p = Math.max(0, Math.min(1, totalScroll > 0 ? scrolled / totalScroll : 0));
      setProgress(p);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div ref={sentinelRef} className="train-parallax-section">
      <div className="train-parallax-stage" aria-hidden="true">
        {TRAIN_LAYERS.map((layer, li) => {
          const totalTravel = 130 + li * 20;
          const offsetX = -progress * totalTravel;
          const fadeOut = Math.max(0, 1 - Math.max(0, progress - 0.55) * 4);
          return (
            <div
              key={li}
              className="train-parallax-layer"
              style={{
                transform: `translateX(${offsetX}vw) scale(${layer.scale})`,
                top: `${layer.y}px`,
                opacity: layer.opacity * fadeOut,
              }}
            >
              {layer.segments.map((si) => (
                <img
                  key={si}
                  src={`/assets/train/segment_${si + 1}.png`}
                  alt=""
                  className="train-parallax-seg"
                  style={{ opacity: ready ? 1 : 0 }}
                />
              ))}
            </div>
          );
        })}

        <div
          className="train-parallax-station"
          style={{ opacity: Math.max(0, Math.min(1, (progress - 0.6) / 0.25)) }}
        >
          <div className="train-parallax-station-line" />
        </div>
      </div>

      <div
        className="train-parallax-content"
        style={{
          opacity: Math.max(0, Math.min(1, (progress - 0.5) / 0.3)),
          transform: `translateY(${Math.max(0, (1 - progress) * 80)}px)`,
        }}
      >
        {children}
      </div>
    </div>
  );
}
