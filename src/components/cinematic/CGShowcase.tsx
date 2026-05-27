"use client";

import { useEffect, useMemo, useState } from "react";
import { useReducedMotion } from "@/lib/motion";
import { cn } from "@/lib/cn";
import type { CGAsset } from "@/content/cg";

type CGShowcaseProps = {
  images: CGAsset[];
  intervalMs?: number;
  className?: string;
};

export function CGShowcase({ images, intervalMs = 4200, className }: CGShowcaseProps) {
  const reducedMotion = useReducedMotion();
  const [active, setActive] = useState(0);
  const srcs = useMemo(() => images.map((img) => img.src), [images]);

  useEffect(() => {
    if (reducedMotion || srcs.length <= 1) return;
    const id = window.setInterval(() => {
      setActive((current) => (current + 1) % srcs.length);
    }, intervalMs);
    return () => window.clearInterval(id);
  }, [reducedMotion, intervalMs, srcs.length]);

  return (
    <div className={cn("cg-showcase", className)}>
      {srcs.map((src, index) => (
        <img
          key={src}
          src={src}
          alt={images[index]?.title ?? ""}
          className={cn("cg-showcase-image", index === active && "cg-showcase-image-active")}
          loading={index === 0 ? "eager" : "lazy"}
        />
      ))}
    </div>
  );
}
