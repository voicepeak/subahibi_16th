"use client";

import { useEffect, useRef, useState } from "react";

interface BGMPlayerProps {
  src: string;
}

export function BGMPlayer({ src }: BGMPlayerProps) {
  const [on, setOn] = useState(false);
  const [bars, setBars] = useState<number[]>([]);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const animRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const toggle = () => {
    if (!audioRef.current) {
      audioRef.current = new Audio(src);
      audioRef.current.loop = true;
      audioRef.current.volume = 0.25;
    }
    if (on) {
      audioRef.current.pause();
      if (animRef.current) clearTimeout(animRef.current);
    } else {
      audioRef.current.play().catch(() => {});
      tick();
    }
    setOn(!on);
  };

  const tick = () => {
    const newBars = Array.from({ length: 24 }, () => Math.random());
    setBars(newBars);
    animRef.current = setTimeout(tick, 160 + Math.random() * 200);
  };

  useEffect(() => {
    return () => {
      audioRef.current?.pause();
      if (animRef.current) clearTimeout(animRef.current);
    };
  }, []);

  return (
    <button
      className={`bgm-player ${on ? "bgm-player-on" : ""}`}
      onClick={toggle}
      aria-label={on ? "暂停BGM" : "播放BGM"}
      type="button"
    >
      <div className="bgm-player-visual" aria-hidden="true">
        {bars.map((h, i) => (
          <span
            key={i}
            className="bgm-player-bar"
            style={{ height: `${h * 100}%`, animationDelay: `${i * 0.04}s` }}
          />
        ))}
      </div>
      <span className="bgm-player-label">
        {on ? "BGM ON" : "BGM OFF"}
      </span>
    </button>
  );
}
