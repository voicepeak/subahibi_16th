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
  { src: "/assets/train/carriage_1.png", angle: -8, startSide: "right", yOffset: -35, scale: 0.85, speed: 1 },
  { src: "/assets/train/carriage_2.png", angle: 7, startSide: "right", yOffset: 25, scale: 0.7, speed: 0.65 },
  { src: "/assets/train/carriage_3.png", angle: -14, startSide: "left", yOffset: 5, scale: 0.55, speed: 0.4 },
];

export function TrainOverlay() {
  const pathname = usePathname();
  const isMessages = pathname === "/messages";
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!isMessages) { setProgress(0); return; }

    const onScroll = () => {
      const sec = document.querySelector(".page-section.first");
      if (!sec) return;
      const rect = sec.getBoundingClientRect();
      const past = -rect.bottom;
      const zone = window.innerHeight * 2.5;
      const p = Math.max(0, Math.min(1, past / zone));
      setProgress(p);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [isMessages]);

  if (!isMessages) return null;

  const sp = Math.max(0, Math.min(1, progress / 0.65));

  return (
    <div className="train-overlay" aria-hidden="true">
      {TRAINS.map((train, i) => {
        const delay = i * 0.06;
        const localP = Math.max(0, Math.min(1, (sp - delay) / (1 - delay)));
        const ease = 1 - Math.pow(1 - localP, 1.6);
        const startX = train.startSide === "right" ? 120 : -80;
        const endX = train.startSide === "right" ? -100 : 70;
        const x = startX + (endX - startX) * ease;
        const ySwing = Math.sin(ease * Math.PI * 1.5) * 15;
        const fadeOut = Math.max(0, 1 - Math.max(0, localP - 0.65) * 3);

        return (
          <div
            key={i}
            className="train-overlay-carriage"
            style={{
              transform: `translate(${x}vw, ${train.yOffset + ySwing}vh) rotate(${train.angle}deg) scale(${train.scale})`,
              opacity: fadeOut * (train.startSide === "right" ? 0.6 : 0.3),
            }}
          >
            <img src={train.src} alt="" className="train-overlay-img" />
          </div>
        );
      })}
    </div>
  );
}
