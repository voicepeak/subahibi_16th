"use client";

import { useEffect, useRef } from "react";

const CHARACTERS = [
  {
    file: "yk",
    name: "水上由岐",
    role: "你——眺望世界之人",
    quote: "世界是我所看到、触摸到、感受到的东西。所以，世界和我没有差别。",
  },
  {
    file: "tk",
    name: "间宫卓司",
    role: "你——追求真理之人",
    quote: "一切都是谎言。但谎言的对面，有着真实。",
  },
  {
    file: "zk",
    name: "高岛柘榴",
    role: "我——即为世界本身的少女",
    quote: "我要保护这个世界。因为这是我的罪，也是我的救赎。",
  },
  {
    file: "km",
    name: "若槻镜",
    role: "你——活在日常之人",
    quote: "只是想变得更强。强到能保护珍惜的东西。",
  },
  {
    file: "hs",
    name: "间宫羽咲",
    role: "我——献上祈祷之人",
    quote: "即便如此，世界依然是美丽的。所以我祈祷。",
  },
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
            <p className="page-sub">— All are "I" —</p>
          </div>
        </FadeIn>
      </section>

      <section className="page-section page-section-narrow">
        <FadeIn delay={80}>
          <blockquote className="quote-card">
            <div className="quote-mark" aria-hidden="true" />
            <p className="quote-text">
              "悲惨的也好、污秽的也好、美丽的也好、荣耀的也好——他们全部都是"我"……世界只由"我"构成，所以，我才能理解你。"
            </p>
            <cite className="quote-source">音无彩名 · 假设7 · 『素晴日』</cite>
          </blockquote>
        </FadeIn>
      </section>

      <section className="page-section">
        <div className="chara-grid">
          {CHARACTERS.map((c, i) => (
            <FadeIn key={c.file} delay={i * 80}>
              <div className="chara-card">
                <div className="chara-card-fig">
                  <img
                    src={`/assets/chara-${c.file}.png`}
                    alt=""
                    className="chara-card-sprite"
                    loading="lazy"
                  />
                </div>
                <div className="chara-card-info">
                  <p className="chara-card-name">{c.name}</p>
                  <p className="chara-card-role">{c.role}</p>
                  <p className="chara-card-quote">"{c.quote}"</p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      <section className="page-section page-section-narrow">
        <FadeIn delay={400}>
          <div className="chara-epilogue">
            <div className="quote-mark" aria-hidden="true" />
            <p className="chara-epilogue-text">
              这里的所有人，不过是同一个灵魂的不同视角。<br />
              你与我和她，皆是一体。
            </p>
          </div>
        </FadeIn>
      </section>

      <div className="divider-rule" />
    </>
  );
}
