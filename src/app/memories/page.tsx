"use client";

import { useEffect, useRef } from "react";

const CGS = [
  { src: "/assets/ev0001.png" },
  { src: "/assets/ev1002a.png" },
  { src: "/assets/ev6009c3.png" },
  { src: "/assets/ev8018.png" },
];

const QUOTES = [
  { text: "世界は、まだ続いている。", source: "『素晴らしき日々 〜不連続存在〜』" },
  { text: "幸福とは、ただそこにあるものではなく、自分自身で見つけ出すものだ。", source: "『素晴らしき日々 〜不連続存在〜』" },
];

function FadeIn({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) el.classList.add("in"); },
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return <div ref={ref} className="fi">{children}</div>;
}

export default function MemoriesPage() {
  return (
    <>
      <section className="page-section first">
        <FadeIn>
          <div className="page-head">
            <h1 className="page-title">記憶</h1>
            <p className="page-sub">— Scene Archive —</p>
          </div>
        </FadeIn>
      </section>

      <section className="page-section">
        <div className="gallery-track">
          {CGS.map((cg, i) => (
            <div key={i} className="gallery-cell">
              <img src={cg.src} alt="" className="gallery-img" loading="lazy" />
            </div>
          ))}
        </div>
      </section>

      <section className="page-section page-section-narrow">
        {QUOTES.map((q, i) => (
          <FadeIn key={i}>
            <blockquote className="quote-card">
              <p className="quote-text">{q.text}</p>
              <cite className="quote-source">{q.source}</cite>
            </blockquote>
          </FadeIn>
        ))}
      </section>

      <div className="divider-rule" />
    </>
  );
}
