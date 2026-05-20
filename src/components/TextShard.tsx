"use client";

import { useEffect, useRef, useState } from "react";

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
  const [shard, setShard] = useState<Shard | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (pool.length === 0) return;
    setShard(pool[Math.floor(Math.random() * pool.length)]);
  }, [pool]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setTimeout(() => setVisible(true), delay);
        }
      },
      { threshold: 0.3 }
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
