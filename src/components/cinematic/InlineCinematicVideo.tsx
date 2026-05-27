"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "@/lib/motion";
import { cn } from "@/lib/cn";

type InlineCinematicVideoProps = {
  src: string;
  poster?: string;
  className?: string;
};

export function InlineCinematicVideo({ src, poster, className }: InlineCinematicVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;
    const video = videoRef.current;
    const container = containerRef.current;
    if (!video || !container) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(container);
    return () => observer.disconnect();
  }, [reducedMotion]);

  if (reducedMotion) {
    return poster ? <img src={poster} alt="" className={cn("inline-cinematic-video", className)} /> : null;
  }

  return (
    <div ref={containerRef} className={cn("inline-cinematic-video", className)}>
      <video ref={videoRef} src={src} poster={poster} muted loop playsInline preload="metadata" />
    </div>
  );
}
