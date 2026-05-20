"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { MouseTracker, GrainOverlay, FloatingParticles, SparkleField } from "@/components/Atmosphere";
import { Volume2, VolumeX } from "lucide-react";

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

const CGS = [
  { src: "/assets/ev0001.png" },
  { src: "/assets/ev1002a.png" },
  { src: "/assets/ev6009c3.png" },
  { src: "/assets/ev8018.png" }
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
  return <div ref={ref} className={`reveal ${className}`}>{children}</div>;
}

export default function Home() {
  const [musicOn, setMusicOn] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const toggleMusic = useCallback(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio("/assets/bgm.ogg");
      audioRef.current.loop = true;
      audioRef.current.volume = 0.25;
    }
    if (musicOn) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(() => {});
    }
    setMusicOn(!musicOn);
  }, [musicOn]);

  useEffect(() => {
    return () => {
      audioRef.current?.pause();
      audioRef.current = null;
    };
  }, []);

  return (
    <>
      <MouseTracker />
      <GrainOverlay />
      <FloatingParticles />
      <SparkleField />
      <div className="mouse-light" aria-hidden="true" />

      <button
        className="music-toggle"
        onClick={toggleMusic}
        aria-label={musicOn ? "暂停音乐" : "播放音乐"}
        type="button"
      >
        {musicOn ? <Volume2 size={16} /> : <VolumeX size={16} />}
      </button>

      {/* Hero */}
      <section className="hero">
        <div className="hero-bg follow" style={{ backgroundImage: "url('/assets/hero-bg.png')" }} />
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

      {/* CG Gallery */}
      <section className="gallery-wrap">
        <Reveal>
          <h2 className="gallery-heading">— 記憶 —</h2>
        </Reveal>
        <div className="gallery-track">
          {CGS.map((cg, i) => (
            <div key={i} className="gallery-cell">
              <img src={cg.src} alt="" className="gallery-img" loading="lazy" />
            </div>
          ))}
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

      {/* Character encounter */}
      <section className="chara-wrap">
        <div className="chara-inner">
          <Reveal className="chara-figure">
            <img src="/assets/chara-yuki.png" alt="" className="chara-sprite" />
          </Reveal>
          <Reveal className="chara-words">
            <p className="chara-line">「世界は、美しい。」</p>
            <span className="chara-by">— 高島ざくろ</span>
          </Reveal>
        </div>
      </section>

      <div className="divider-rule" aria-hidden="true" />

      <section className="closing">
        <Reveal>
          <p className="closing-text">献给所有热爱这个世界的你</p>
          <p className="closing-date">2026 · 夏</p>
        </Reveal>
      </section>
    </>
  );
}
