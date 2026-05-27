"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { gsap } from "gsap";
import { getCountdown, isAfterEnd } from "@/lib/date-utils";

export default function EntryPage() {
  const router = useRouter();
  const root = useRef<HTMLDivElement>(null);
  const ended = isAfterEnd();
  const cd = getCountdown();

  useEffect(() => {
    const el = root.current;
    if (!el) return;

    const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

    tl.fromTo(el.querySelector(".entry-letterbox-top"), { height: 0 }, { height: "2rem", duration: 0.7, delay: 0.2 })
      .fromTo(el.querySelector(".entry-letterbox-bottom"), { height: 0 }, { height: "2rem", duration: 0.7 }, "-=0.5")
      .fromTo(el.querySelector(".entry-bg"), { opacity: 0, scale: 1.2 }, { opacity: 0.18, scale: 1.1, duration: 1.2 }, "-=0.6")
      .fromTo(el.querySelector(".entry-badge"), { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7 }, "-=0.4")
      .fromTo(el.querySelector(".entry-title"), { y: 30, opacity: 0, filter: "blur(6px)" }, { y: 0, opacity: 1, filter: "blur(0px)", duration: 1 }, "-=0.3")
      .fromTo(el.querySelector(".entry-subtitle"), { y: 16, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 }, "-=0.4")
      .fromTo(el.querySelector(".entry-countdown, .entry-year"), { y: 16, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.12, duration: 0.6 }, "-=0.3")
      .fromTo(el.querySelector(".entry-enter"), { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 }, "-=0.2");

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " " || e.key === "Escape") {
        tl.to(el.querySelector(".entry-bg"), { opacity: 0, duration: 0.3 })
          .to(el.querySelector(".entry-overlay"), { opacity: 0, duration: 0.2 }, "-=0.3")
          .call(() => router.push("/memories"), undefined, "-=0.1");
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [router]);

  if (ended) {
    return (
      <section ref={root} className="entry" onClick={() => router.push("/memories")}>
        <div className="entry-letterbox-top" />
        <div className="entry-letterbox-bottom" />
        <div className="entry-bg" />
        <div className="entry-overlay" />
        <div className="entry-badge">— 16th Anniversary —</div>
        <h1 className="entry-title entry-title-ended">终の空</h1>
        <p className="entry-subtitle">ここから始まる</p>
        <p className="entry-year">2010 — 2026</p>
        <div className="entry-enter"><span>PRESS ANY KEY</span><span className="entry-enter-line" /></div>
      </section>
    );
  }

  return (
    <section ref={root} className="entry" onClick={() => router.push("/memories")}>
      <div className="entry-letterbox-top" />
      <div className="entry-letterbox-bottom" />
      <div className="entry-bg" />
      <div className="entry-overlay" />
      <div className="entry-badge">16th Anniversary</div>
      <h1 className="entry-title">素晴らしき日々</h1>
      <p className="entry-subtitle">Subarashiki Hibi</p>
      <p className="entry-countdown">
        世界終焉まで <span className="entry-countdown-num">{cd.days}</span> 日
      </p>
      <p className="entry-year">2010 — 2026</p>
      <div className="entry-enter"><span>PRESS ANY KEY</span><span className="entry-enter-line" /></div>
    </section>
  );
}
