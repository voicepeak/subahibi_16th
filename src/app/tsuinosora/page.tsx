"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { ArrowRight, SkipForward } from "lucide-react";
import { GlitchLayer } from "@/components/cinematic/GlitchLayer";
import { NoiseLayer } from "@/components/cinematic/NoiseLayer";
import { tsuiNoSoraActs, tsuiNoSoraTotalMs } from "@/content/tsuinosora";
import { useReducedMotion } from "@/lib/motion";
import { cn } from "@/lib/cn";

export default function TsuiNoSoraPage() {
  const reducedMotion = useReducedMotion();
  const [started, setStarted] = useState(false);
  const [startAt, setStartAt] = useState<number | null>(null);
  const [now, setNow] = useState(Date.now());
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!started || done || reducedMotion) return;
    const id = window.setInterval(() => setNow(Date.now()), 120);
    return () => window.clearInterval(id);
  }, [done, reducedMotion, started]);

  useEffect(() => {
    if (started && startAt && now - startAt >= tsuiNoSoraTotalMs) setDone(true);
  }, [now, startAt, started]);

  const active = useMemo(() => {
    if (!started || !startAt) return tsuiNoSoraActs[0];
    let elapsed = now - startAt;
    for (const act of tsuiNoSoraActs) {
      if (elapsed <= act.durationMs) return act;
      elapsed -= act.durationMs;
    }
    return tsuiNoSoraActs.at(-1)!;
  }, [now, startAt, started]);

  const progress = !started || !startAt ? 0 : Math.min(1, (now - startAt) / tsuiNoSoraTotalMs);

  const begin = () => {
    setStarted(true);
    setStartAt(Date.now());
    setDone(reducedMotion);
  };

  const skip = () => setDone(true);

  if (reducedMotion) {
    return (
      <main className="tsui-page tsui-page-reduced">
        <section className="tsui-static">
          <p className="landing-kicker">Reduced Motion</p>
          <h1>终之空</h1>
          <p>已启用静态摘要模式：天空、信号污染、世界终结、黑屏归零，最后回到天空。</p>
          <Link href="/journey#wonderful-everyday" className="sky-button">
            <span>Return to Journey</span>
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </section>
      </main>
    );
  }

  return (
    <main className={cn("tsui-page", started && "tsui-page-started", done && "tsui-page-done")}>
      {!started && (
        <section className="tsui-gate">
          <p className="landing-kicker">20–40 sec cinematic intro</p>
          <h1>终之空</h1>
          <p>短片式演出可随时跳过，不自动播放声音。</p>
          <button type="button" className="sky-button" onClick={begin}>
            <span>Enter Tsui no Sora</span>
            <ArrowRight size={16} aria-hidden="true" />
          </button>
        </section>
      )}

      {started && !done && (
        <section className={cn("tsui-stage", `tsui-stage-${active.intensity}`)}>
          {active.image && <img src={active.image} alt={active.text} className="tsui-stage-image" loading="lazy" />}
          {(active.intensity === "unstable" || active.intensity === "terminal") && <GlitchLayer intensity={active.intensity === "terminal" ? "high" : "medium"} />}
          <NoiseLayer subtle={active.intensity === "calm"} />
          <div className="tsui-stage-copy">
            <span>{active.label}</span>
            <h1>{active.text}</h1>
          </div>
          <div className="tsui-progress" aria-hidden="true">
            <span style={{ transform: `scaleX(${progress})` }} />
          </div>
          <button type="button" className="tsui-skip" onClick={skip}>
            <SkipForward size={16} aria-hidden="true" />
            <span>Skip</span>
          </button>
        </section>
      )}

      {done && (
        <section className="tsui-return">
          <img src="/assets/bg/bg1015a.png" alt="回到天空" loading="lazy" />
          <div>
            <p className="landing-kicker">return</p>
            <h1>幸福地生活吧。</h1>
            <Link href="/journey#wonderful-everyday" className="sky-button">
              <span>Back to Chapter 06</span>
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>
        </section>
      )}
    </main>
  );
}
