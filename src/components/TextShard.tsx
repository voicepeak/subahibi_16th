"use client";

import { useEffect, useRef, useState, useMemo } from "react";

interface Shard {
  text: string;
  source?: string;
}

interface TextShardProps {
  pool: Shard[];
  delay?: number;
  className?: string;
}

export function TextShard({ pool, delay = 0, className = "" }: TextShardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const shard = useMemo(() => {
    if (pool.length === 0) return null;
    return pool[Math.floor(Math.random() * pool.length)];
  }, [pool]);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setTimeout(() => setVisible(true), delay);
          obs.disconnect();
        }
      },
      { threshold: 0.25 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [delay]);

  if (!shard) return null;

  return (
    <div
      ref={ref}
      className={`text-shard ${visible ? "text-shard-in" : ""} ${className}`}
    >
      <div className="text-shard-mark" aria-hidden="true" />
      <p className="text-shard-body">{shard.text}</p>
      {shard.source && (
        <cite className="text-shard-source">{shard.source}</cite>
      )}
    </div>
  );
}
