"use client";

import { useEffect, useRef } from "react";

const SPRITES = [
  { file: "zk", label: "zk" },
  { file: "tk", label: "tk" },
  { file: "km", label: "km" },
  { file: "yk", label: "yk" },
  { file: "hs", label: "hs" },
];

function FadeIn({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setTimeout(() => el.classList.add("in"), delay); } },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [delay]);
  return <div ref={ref} className={`fi fi-up ${className}`}>{children}</div>;
}

export default function CharactersPage() {
  return (
    <>
      <section className="page-section first">
        <div className="page-parallax" />
        <FadeIn>
          <div className="page-head">
            <h1 className="page-title">邂逅</h1>
            <p className="page-sub">— Encounter —</p>
          </div>
        </FadeIn>
      </section>

      <section className="page-section">
        <div className="chara-grid">
          {SPRITES.map((s, i) => (
            <FadeIn key={s.file} delay={i * 80}>
              <div className="chara-card">
                <div className="chara-card-fig">
                  <img
                    src={`/assets/chara-${s.file}.png`}
                    alt=""
                    className="chara-card-sprite"
                    loading="lazy"
                  />
                </div>
                <div className="chara-card-info">
                  <p className="chara-card-code">{s.label}</p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      <div className="divider-rule" />
    </>
  );
}
