"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

interface Train {
  src: string;
  angle: number;
  startSide: "right" | "left";
  yOffset: number;
  scale: number;
  speed: number;
}

const TRAINS: Train[] = [
  { src: "/assets/train/carriage_1.png", angle: -8, startSide: "right", yOffset: -40, scale: 0.9, speed: 1 },
  { src: "/assets/train/carriage_2.png", angle: 6, startSide: "right", yOffset: 30, scale: 0.75, speed: 0.7 },
  { src: "/assets/train/carriage_3.png", angle: -12, startSide: "left", yOffset: 10, scale: 0.6, speed: 0.45 },
];

export function TrainOverlay() {
  const pathname = usePathname();
  const isMessages = pathname === "/messages";
  const [progress, setProgress] = useState(0);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!isMessages) return;
    let loaded = 0;
    TRAINS.forEach((t) => {
      const img = new Image();
      img.onload = img.onerror = () => {
        loaded++;
        if (loaded === TRAINS.length) setReady(true);
      };
      img.src = t.src;
    });
    setTimeout(() => setReady(true), 4000);
  }, [isMessages]);

  useEffect(() => {
    if (!isMessages) { setProgress(0); return; }

    const onScroll = () => {
      const viewH = window.innerHeight;
      const msgSection = document.querySelector(".page-section.first");
      if (!msgSection) { setProgress(0); return; }
      const rect = msgSection.getBoundingClientRect();
      const heroBottom = rect.bottom;
      const scrolledPast = -heroBottom;
      const trainZone = viewH * 3;
      const p = Math.max(0, Math.min(1, scrolledPast / trainZone));
      setProgress(p);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [isMessages]);

  if (!isMessages || !ready) return null;

  const active = progress > 0.01;
  const sp = Math.max(0, Math.min(1, (progress) / 0.7));

  return (
    <div className="train-overlay" aria-hidden="true" style={{ opacity: active ? 1 : 0, pointerEvents: active ? "none" : "none" }}>
      {TRAINS.map((train, i) => {
        const delay = i * 0.08;
        const localP = Math.max(0, Math.min(1, (sp - delay) / (1 - delay)));
        const ease = 1 - Math.pow(1 - localP, 1.8);
        const startX = train.startSide === "right" ? 110 : -70;
        const endX = train.startSide === "right" ? -90 : 60;
        const x = startX + (endX - startX) * ease;
        const ySwing = Math.sin(ease * Math.PI * 1.2) * 20;
        const fadeOut = Math.max(0, 1 - Math.max(0, localP - 0.7) * 3.5);

        return (
          <div
            key={i}
            className="train-overlay-carriage"
            style={{
              transform: `translate(${x}vw, ${train.yOffset + ySwing}vh) rotate(${train.angle}deg) scale(${train.scale})`,
              opacity: fadeOut * (train.startSide === "right" ? 0.65 : 0.35),
              zIndex: train.startSide === "right" ? 10 - i : i,
            }}
          >
            <img src={train.src} alt="" className="train-overlay-img" />
          </div>
        );
      })}
    </div>
  );
}
