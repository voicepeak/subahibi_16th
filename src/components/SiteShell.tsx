"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { MouseTracker, GrainOverlay, ScanLines, Vignette, FloatingParticles, SparkleField } from "./Atmosphere";
import { TruthFragment } from "./TruthFragment";
import { BGMPlayer } from "./BGMPlayer";
import { TimeSense } from "./TimeSense";
import { Nav } from "./Nav";
import { isAfterEnd } from "@/lib/date-utils";

function ScrollProgress() {
  const [pct, setPct] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      setPct(h > 0 ? Math.min(window.scrollY / h, 1) : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return <div className="scroll-progress" style={{ transform: `scaleX(${pct})` }} />;
}

export function SiteShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isEntry = pathname === "/";
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <>
      <MouseTracker />
      <GrainOverlay />
      <ScanLines />
      <Vignette />
      <FloatingParticles />
      <SparkleField />
      <div className="mouse-light" aria-hidden="true" />
      {!isEntry && <Nav />}
      {!isEntry && <ScrollProgress />}

      <BGMPlayer src="/assets/bgm.ogg" />

      {!isEntry && <TruthFragment />}

      {!isEntry && <TimeSense />}

      <div className={`page-wrap${loaded ? " page-wrap-in" : ""}${isAfterEnd() ? " page-wrap-ended" : ""}`}>
        {children}
      </div>
    </>
  );
}
