"use client";

import { useEffect, useRef } from "react";
import { MouseTracker, GrainOverlay, FloatingParticles } from "@/components/Atmosphere";

const QUOTES = [
  {
    text: "世界は、まだ続いている。",
    source: "『素晴らしき日々 〜不連続存在〜』"
  },
  {
    text: "幸福とは、ただそこにあるものではなく、自分自身で見つけ出すものだ。",
    source: "『素晴らしき日々 〜不連続存在〜』"
  }
];

function Reveal({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) el.classList.add("in"); },
      { threshold: 0.25 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} className={`reveal ${className}`}>
      {children}
    </div>
  );
}

export default function Home() {
  return (
    <>
      <MouseTracker />
      <GrainOverlay />
      <FloatingParticles />
      <div className="mouse-light" aria-hidden="true" />

      {/* Hero */}
      <section className="hero">
        <div className="hero-bg follow" />
        <div className="hero-overlay" />

        <div className="hero-badge">16th Anniversary</div>
        <h1 className="hero-title follow">素晴らしき日々</h1>
        <p className="hero-subtitle">Subarashiki Hibi</p>
        <p className="hero-year">2010 — 2026</p>

        <div className="scroll-hint">
          <span>scroll</span>
          <div className="scroll-hint-line" />
        </div>
      </section>

      {/* Quotes */}
      {QUOTES.map((q, i) => (
        <section key={i} className="quote-section">
          <Reveal>
            <div className="quote-block">
              <p className="quote-text">{q.text}</p>
              <cite className="quote-source">{q.source}</cite>
            </div>
          </Reveal>
        </section>
      ))}

      <div className="divider-rule" aria-hidden="true" />

      {/* Closing */}
      <section className="closing">
        <Reveal>
          <p className="closing-text">
            献给所有热爱这个世界的你
          </p>
          <p className="closing-date">2026 · 夏</p>
        </Reveal>
      </section>
    </>
  );
}
