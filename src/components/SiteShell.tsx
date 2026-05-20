"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { usePathname } from "next/navigation";
import { Volume2, VolumeX } from "lucide-react";
import { MouseTracker, GrainOverlay, FloatingParticles, SparkleField } from "./Atmosphere";
import { Nav } from "./Nav";

export function SiteShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isEntry = pathname === "/";
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
      {!isEntry && <Nav />}

      <button
        className="music-toggle"
        onClick={toggleMusic}
        aria-label={musicOn ? "暂停音乐" : "播放音乐"}
        type="button"
      >
        {musicOn ? <Volume2 size={16} /> : <VolumeX size={16} />}
      </button>

      {children}
    </>
  );
}
