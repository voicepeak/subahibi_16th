"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "@/lib/motion";
import { cn } from "@/lib/cn";

type CGLoopBackdropProps = {
  images: string[];
  intervalMs?: number;
  fadeMs?: number;
  intensity?: "calm" | "normal" | "unstable";
  paused?: boolean;
  className?: string;
};

export function CGLoopBackdrop({
  images,
  intervalMs = 6200,
  intensity = "calm",
  paused = false,
  className,
}: CGLoopBackdropProps) {
  const [active, setActive] = useState(0);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (paused || reducedMotion || images.length <= 1) return;
    const id = window.setInterval(() => {
      setActive((value) => (value + 1) % images.length);
    }, intervalMs);
    return () => window.clearInterval(id);
  }, [images.length, intervalMs, paused, reducedMotion]);

  if (!images.length) return null;

  return (
    <div className={cn("cg-loop-backdrop", `cg-loop-${intensity}`, className)} aria-hidden="true">
      {images.map((image, index) => (
        <img
          key={image}
          src={image}
          alt=""
          loading={index === 0 ? "eager" : "lazy"}
          className={cn("cg-loop-image", index === active && "cg-loop-image-active")}
        />
      ))}
      <div className="cg-loop-wash" />
    </div>
  );
}

