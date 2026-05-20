"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { usePathname } from "next/navigation";
import { Volume2, VolumeX } from "lucide-react";
import { MouseTracker, GrainOverlay, ScanLines, Vignette, FloatingParticles, SparkleField } from "./Atmosphere";
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
  const [musicOn, setMusicOn] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

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
      <ScanLines />
      <Vignette />
      <FloatingParticles />
      <SparkleField />
      <div className="mouse-light" aria-hidden="true" />
      {!isEntry && <Nav />}
      {!isEntry && <ScrollProgress />}

      <button
        className="music-toggle"
        onClick={toggleMusic}
        aria-label={musicOn ? "暂停音乐" : "播放音乐"}
        type="button"
      >
        {musicOn ? <Volume2 size={16} /> : <VolumeX size={16} />}
      </button>

      <div className={`page-wrap${loaded ? " page-wrap-in" : ""}${isAfterEnd() ? " page-wrap-ended" : ""}`}>
        {children}
      </div>
    </>
  );
}
