"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { getCountdown, isAfterEnd } from "@/lib/date-utils";
import { VOLUMES } from "@/lib/volumes";

const EPIGRAPH = "我们的情人，不过是随便借个名字，用幻想吹出来的肥皂泡。";

function Typewriter({ text, speed = 60, delay = 0 }: { text: string; speed?: number; delay?: number }) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      let i = 0;
      const iv = setInterval(() => {
        i++;
        setDisplayed(text.slice(0, i));
        if (i >= text.length) {
          clearInterval(iv);
          setDone(true);
        }
      }, speed);
      return () => clearInterval(iv);
    }, delay);
    return () => clearTimeout(timeout);
  }, [text, speed, delay]);

  return (
    <span className="typewriter">
      {displayed}
      {!done && <span className="typewriter-cursor" aria-hidden="true" />}
    </span>
  );
}

export default function EntryPage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [phase, setPhase] = useState<"epigraph" | "title" | "countdown" | "routes">("epigraph");
  const [enterHint, setEnterHint] = useState(false);
  const ended = isAfterEnd();
  const cd = getCountdown();

  useEffect(() => {
    setMounted(true);
    const t1 = setTimeout(() => setPhase("title"), 2000);
    const t2 = setTimeout(() => setPhase("countdown"), 3800);
    const t3 = setTimeout(() => setPhase("routes"), 5000);
    const t4 = setTimeout(() => setEnterHint(true), 6500);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); };
  }, []);

  const enter = useCallback((route?: string) => {
    router.push(route || VOLUMES[0].route);
  }, [router]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " " || e.key === "Escape") {
        enter();
      }
    };
    if (phase === "routes") {
      window.addEventListener("keydown", onKey);
      return () => window.removeEventListener("keydown", onKey);
    }
  }, [phase, enter]);

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
      <section className="entry" onClick={() => enter()}>
        <div className="entry-letterbox-top" />
        <div className="entry-letterbox-bottom" />
        <div className="entry-bg" />
        <div className="entry-overlay" />
        <div className="entry-badge">— 16th Anniversary —</div>
        <h1 className="entry-title entry-title-ended">终の空</h1>
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
    <section className="entry" onClick={() => phase === "routes" && enter()}>
      <div className="entry-letterbox-top" />
      <div className="entry-letterbox-bottom" />
      <div className="entry-bg" />
      <div className="entry-overlay" />

      <div className="entry-badge entry-badge-in">16th Anniversary</div>

      <div className="entry-epigraph-wrap">
        <Typewriter text={EPIGRAPH} speed={50} delay={400} />
      </div>

      {phase !== "epigraph" && (
        <>
          <h1 className="entry-title entry-title-fade">素晴らしき日々</h1>
          <p className="entry-subtitle">Subarashiki Hibi</p>
        </>
      )}

      {phase === "countdown" || phase === "routes" ? (
        <p className="entry-countdown">
          世界終焉まで <span className="entry-countdown-num">{cd.days}</span> 日
        </p>
      ) : null}

      {phase === "routes" && (
        <div className="entry-routes">
          {VOLUMES.map((v) => (
            <button
              key={v.id}
              className="entry-route-btn"
              onClick={(e) => { e.stopPropagation(); enter(v.route); }}
              style={{ "--route-color": v.color } as React.CSSProperties}
            >
              <span className="entry-route-line" />
              <span className="entry-route-label">{v.title}</span>
              <span className="entry-route-sub">{v.subtitle}</span>
            </button>
          ))}
        </div>
      )}

      <p className="entry-year">2010 — 2026</p>

      {enterHint && (
        <div className="entry-enter" onClick={(e) => { e.stopPropagation(); enter(); }}>
          <span>{phase === "routes" ? "PRESS ANY KEY OR CHOOSE A PATH" : "PRESS ANY KEY"}</span>
          <span className="entry-enter-line" />
        </div>
      )}
    </section>
  );
}
