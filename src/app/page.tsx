"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { getCountdown, isAfterEnd } from "@/lib/date-utils";

export default function EntryPage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const ended = isAfterEnd();
  const cd = getCountdown();

  const enter = useCallback(() => {
    router.push("/memories");
  }, [router]);

  useEffect(() => {
    setMounted(true);

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " " || e.key === "Escape") {
        enter();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [enter]);

  if (!mounted) {
    return (
      <section className="entry">
        <div className="entry-bg" />
        <div className="entry-overlay" />
      </section>
    );
  }

  if (ended) {
    return (
      <section className="entry" onClick={enter}>
        <div className="entry-letterbox-top" />
        <div className="entry-letterbox-bottom" />
        <div className="entry-bg" />
        <div className="entry-overlay" />
        <div className="entry-badge">— 16th Anniversary —</div>
        <h1 className="entry-title entry-title-ended">終の空</h1>
        <p className="entry-subtitle">ここから始まる</p>
        <p className="entry-year">2010 — 2026</p>
        <div className="entry-enter">
          <span>PRESS ANY KEY</span>
          <span className="entry-enter-line" />
        </div>
      </section>
    );
  }

  return (
    <section className="entry" onClick={enter}>
      <div className="entry-letterbox-top" />
      <div className="entry-letterbox-bottom" />
      <div className="entry-bg" />
      <div className="entry-overlay" />
      <div className="entry-badge entry-badge-in">16th Anniversary</div>
      <h1 className="entry-title">素晴らしき日々</h1>
      <p className="entry-subtitle">Subarashiki Hibi</p>
      <p className="entry-countdown">
        世界終焉まで <span className="entry-countdown-num">{cd.days}</span> 日
      </p>
      <p className="entry-year">2010 — 2026</p>
      <div className="entry-enter">
        <span>PRESS ANY KEY</span>
        <span className="entry-enter-line" />
      </div>
    </section>
  );
}
