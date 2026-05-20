"use client";

import { useEffect, useRef } from "react";

const CHARACTERS = [
  { id: "yuki", name: "高島ざくろ", sub: "Zakuro Takashima", sprite: "/assets/chara-zakuro.png" },
  { id: "takuji", name: "間宮卓司", sub: "Takuji Mamiya", sprite: "/assets/chara-takuji.png" },
  { id: "kimika", name: "雪村希実香", sub: "Kimika Yukimura", sprite: "/assets/chara-kimika.png" },
  { id: "yuki2", name: "高島由岐", sub: "Yuki Takashima", sprite: "/assets/chara-yuki.png" },
  { id: "hs", name: "日向", sub: "??", sprite: "/assets/chara-hs.png" },
];

function FadeIn({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
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
  return <div ref={ref} className="fi fi-up">{children}</div>;
}

export default function CharactersPage() {
  return (
    <>
      <section className="page-section first">
        <FadeIn>
          <div className="page-head">
            <h1 className="page-title">邂逅</h1>
            <p className="page-sub">— Encounter —</p>
          </div>
        </FadeIn>
      </section>

      <section className="page-section">
        <div className="chara-grid">
          {CHARACTERS.map((ch, i) => (
            <FadeIn key={ch.id} delay={i * 80}>
              <div className="chara-card">
                <div className="chara-card-fig">
                  <img src={ch.sprite} alt={ch.name} className="chara-card-sprite" loading="lazy" />
                </div>
                <div className="chara-card-info">
                  <h3 className="chara-card-name">{ch.name}</h3>
                  <p className="chara-card-sub">{ch.sub}</p>
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
