"use client";

import { useEffect, useState } from "react";

const SEGMENTS = 6;

const TRAIN_LAYERS = [
  { segments: [0, 1], speed: 1.0, scale: 1, y: 0, opacity: 0.8 },
  { segments: [2, 3], speed: 0.55, scale: 0.7, y: 90, opacity: 0.4 },
  { segments: [4, 5], speed: 0.25, scale: 0.48, y: 170, opacity: 0.2 },
];

export function TrainOverlay() {
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
    const onScroll = () => {
      const docH = document.documentElement.scrollHeight - window.innerHeight;
      const p = docH > 0 ? Math.min(window.scrollY / docH, 1) : 0;
      setProgress(p);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!ready) return null;

  const TRAIN_START = 0.05;
  const TRAIN_END = 0.45;
  const trainProgress = Math.max(0, Math.min(1, (progress - TRAIN_START) / (TRAIN_END - TRAIN_START)));

  return (
    <div className="train-overlay" aria-hidden="true" style={{ opacity: ready ? 1 : 0 }}>
      {TRAIN_LAYERS.map((layer, li) => {
        const travel = 120 + li * 25;
        const offsetX = -trainProgress * travel + 100;
        const fadeOut = Math.max(0, 1 - Math.max(0, trainProgress - 0.7) * 3.5);
        return (
          <div
            key={li}
            className="train-overlay-layer"
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
                className="train-overlay-seg"
              />
            ))}
          </div>
        );
      })}
    </div>
  );
}
