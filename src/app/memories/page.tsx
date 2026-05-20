"use client";

import { useEffect, useRef, useState } from "react";

const CGS = [
  { src: "/assets/ev0001.png" },
  { src: "/assets/ev1002a.png" },
  { src: "/assets/ev6009c3.png" },
  { src: "/assets/ev8018.png" },
];

const QUOTES = [
  { text: "世界は、まだ続いている。", source: "『素晴日 〜不连续存在〜』" },
  { text: "幸福とは、ただそこにあるものではなく、自分自身で見つけ出すものだ。", source: "『素晴日 〜不连续存在〜』" },
];

function Reveal({ children, className = "" }: { children: React.ReactNode; className?: string }) {
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
  return <div ref={ref} className={`fi ${className}`}>{children}</div>;
}

export default function MemoriesPage() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <section className="page-section first">
        <div
          className="page-parallax"
          style={{ transform: `translateY(${scrollY * 0.15}px) scale(${1 + scrollY * 0.0002})` }}
        />
        <Reveal>
          <div className="page-head">
            <h1 className="page-title">記憶</h1>
            <p className="page-sub">— Scene Archive —</p>
          </div>
        </Reveal>
      </section>

      <section className="page-section">
        <div className="gallery-track">
          {CGS.map((cg, i) => (
            <div key={i} className="gallery-cell">
              <div className="gallery-cell-inner">
                <img src={cg.src} alt="" className="gallery-img" loading="lazy" />
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="page-section page-section-narrow">
        {QUOTES.map((q, i) => (
          <Reveal key={i}>
            <blockquote className="quote-card">
              <div className="quote-mark" aria-hidden="true" />
              <p className="quote-text">{q.text}</p>
              <cite className="quote-source">{q.source}</cite>
            </blockquote>
          </Reveal>
        ))}
      </section>

      <div className="divider-rule" />
    </>
  );
}
