"use client";

import { useRef } from "react";
import { useReducedMotion } from "@/lib/motion";
import { cn } from "@/lib/cn";
import type { CGAsset } from "@/content/cg";

type CGRailProps = {
  images: CGAsset[];
  onSelect?: (cg: CGAsset) => void;
};

export function CGRail({ images, onSelect }: CGRailProps) {
  const reducedMotion = useReducedMotion();
  const trackRef = useRef<HTMLDivElement>(null);
  const doubled = [...images, ...images];

  return (
    <div className="cg-rail" ref={trackRef}>
      <div className={cn("cg-rail-track", reducedMotion && "cg-rail-track-static")}>
        {doubled.map((cg, index) => (
          <button
            key={`${cg.id}-${index}`}
            type="button"
            className="cg-rail-frame"
            onClick={() => onSelect?.(cg)}
            aria-label={`查看 ${cg.title}`}
          >
            <img src={cg.src} alt={cg.title} loading="lazy" />
          </button>
        ))}
      </div>
    </div>
  );
}
