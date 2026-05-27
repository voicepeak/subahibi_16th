"use client";

import { useRef } from "react";
import { useReducedMotion } from "@/lib/motion";
import { cn } from "@/lib/cn";
import type { VideoAsset } from "@/content/videos";

type VideoHeroProps = {
  video?: VideoAsset;
  fallbackImage?: string;
  overlay?: React.ReactNode;
};

export function VideoHero({ video, fallbackImage, overlay }: VideoHeroProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const reducedMotion = useReducedMotion();

  const showVideo = video && !reducedMotion;
  const posterImage = video?.poster || fallbackImage;

  return (
    <section className={cn("video-hero")}>
      {showVideo ? (
        <video
          ref={videoRef}
          className="video-hero-media"
          src={video.src}
          poster={posterImage}
          autoPlay={video.autoplay ?? true}
          loop={video.loop ?? true}
          muted={video.muted ?? true}
          playsInline
          aria-hidden="true"
        />
      ) : (
        posterImage && (
          <img src={posterImage} alt="" className="video-hero-media" aria-hidden="true" />
        )
      )}
      {overlay && <div className="video-hero-overlay">{overlay}</div>}
    </section>
  );
}
