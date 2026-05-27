"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { gsap } from "gsap";
import { characters, type Character } from "@/content/characters";

export default function CharactersPage() {
  const gridRef = useRef<HTMLDivElement>(null);
  const quoteRef = useRef<HTMLDivElement>(null);
  const [focus, setFocus] = useState<Character | null>(null);

  const close = useCallback(() => setFocus(null), []);

  useEffect(() => {
    if (!focus) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") close(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [focus, close]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".chara-card", { y: 40, opacity: 0 }, {
        y: 0, opacity: 1, stagger: { amount: 0.5, from: "random" },
        duration: 0.6, ease: "power2.out",
        scrollTrigger: { trigger: gridRef.current, start: "top 82%", toggleActions: "play none none none" },
      });
    });
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (!gridRef.current) return;
    const cards = gridRef.current.querySelectorAll<HTMLElement>(".chara-card");
    cards.forEach((card) => {
      const onMove = (e: MouseEvent) => {
        const r = card.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5;
        const y = (e.clientY - r.top) / r.height - 0.5;
        gsap.to(card, { rotationX: -y * 5, rotationY: x * 5, duration: 0.3, ease: "power1.out", overwrite: "auto" });
      };
      const onLeave = () => gsap.to(card, { rotationX: 0, rotationY: 0, duration: 0.4, ease: "power2.out" });
      card.addEventListener("mousemove", onMove);
      card.addEventListener("mouseleave", onLeave);
      return () => { card.removeEventListener("mousemove", onMove); card.removeEventListener("mouseleave", onLeave); };
    });
  }, []);

  return (
    <>
      <section className="page-section first">
        <div className="page-bg-img" style={{ backgroundImage: `url("/assets/bg/bg1008a.png")` }} />
        <div className="page-parallax" />
        <div className="page-head">
          <h1 className="page-title">邂逅</h1>
          <p className="page-sub">— All are "I" —</p>
        </div>
      </section>

      <section className="page-section page-section-narrow">
        <div ref={quoteRef}>
          <blockquote className="quote-card">
            <div className="quote-mark" aria-hidden="true" />
            <p className="quote-text">
              {'悲惨的也好、污秽的也好、美丽的也好、荣耀的也好——他们全部都是"我"……'}
            </p>
            <cite className="quote-source">音无彩名 · 假设7 · 『素晴日』</cite>
          </blockquote>
        </div>
      </section>

      <section className="page-section">
        <div ref={gridRef} className="chara-grid">
          {characters.map((c) => (
            <button key={c.file} className="chara-card" onClick={() => setFocus(c)}>
              <div className="chara-card-fig">
                <img src={`/assets/chara-${c.file}.png`} alt={c.name} className="chara-card-sprite" loading="lazy" />
              </div>
              <div className="chara-card-info">
                <p className="chara-card-name">{c.name}</p>
                <p className="chara-card-role">{c.role}</p>
              </div>
            </button>
          ))}
        </div>
      </section>

      <section className="page-section page-section-narrow">
        <div className="chara-epilogue">
          <div className="quote-mark" aria-hidden="true" />
          <p className="chara-epilogue-text">
            这里的所有人，不过是同一个灵魂在不同世界中的投影。<br />你与我和她，皆是一体。
          </p>
        </div>
      </section>

      <div className="divider-rule" />

      {focus && (
        <div className="monologue-overlay" onClick={close}>
          <div className="monologue-card" onClick={(e) => e.stopPropagation()}>
            <img src={`/assets/chara-${focus.file}.png`} alt={focus.name} className="monologue-sprite" loading="lazy" />
            <p className="monologue-name">{focus.name}</p>
            <p className="monologue-role">{focus.role}</p>
            <div className="monologue-mark" aria-hidden="true" />
            <p className="monologue-text">{focus.monologue}</p>
            <button className="monologue-close" onClick={close}>闭</button>
          </div>
        </div>
      )}
    </>
  );
}
