"use client";

import { useEffect, useRef, useState } from "react";

const SRC = "/assets/train/train_full.png";

const TRAINS = [
  { deg: -4, top: -8, alpha: 0.8, dir: 1 as const, flip: false },
  { deg: 7, top: 15, alpha: 0.9, dir: -1 as const, flip: true },
  { deg: -12, top: 38, alpha: 0.55, dir: 1 as const, flip: false },
];

export function TrainCutscene() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [p, setP] = useState(0);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const onScroll = () => {
      const rect = el.getBoundingClientRect();
      const h = window.innerHeight;
      const total = el.scrollHeight - h;
      const scrolled = -rect.top;
      setP(total > 0 ? Math.max(0, Math.min(1, scrolled / total)) : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const t = Math.max(0, Math.min(1, (p - 0.01) / 0.92));

  return (
    <section ref={sectionRef} className="cs-section">
      <div className="cs-stage">
        {TRAINS.map((tr, i) => {
          const delay = i * 0.06;
          const local = Math.max(0, Math.min(1, (t - delay) / (1 - delay)));
          const slide = local * 120;
          const fade = local < 0.2 ? local / 0.2 : local > 0.88 ? 1 - (local - 0.88) / 0.12 : 1;
          const x = tr.dir === 1 ? 110 - slide : -180 + slide;
          const ySway = Math.sin(local * Math.PI * 1.6) * 4;
          const flip = tr.flip ? "scaleX(-1)" : "";

          return (
            <div
              key={i}
              className="cs-train"
              style={{
                top: `${tr.top + ySway}vh`,
                transform: `translateX(${x}vw) rotate(${tr.deg}deg) ${flip}`,
                opacity: fade * tr.alpha,
              }}
            >
              <img src={SRC} alt="" className="cs-train-img" />
            </div>
          );
        })}

        <div
          className="cs-platform"
          style={{ opacity: Math.max(0, Math.min(1, (t - 0.95) / 0.04)) }}
        >
          <div className="cs-platform-inner">
            <div className="cs-platform-line" />
            <div className="cs-sign">
              <span className="cs-sign-label">next station</span>
              <span className="cs-sign-name">夏夜大三角</span>
              <span className="cs-sign-sub">Summer Triangle</span>
            </div>
            <div className="cs-lights">
              {[0, 1, 2, 3].map((i) => (
                <span key={i} className="cs-light" style={{ animationDelay: `${i * 0.3}s` }} />
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="cs-spacer" />
    </section>
  );
}
