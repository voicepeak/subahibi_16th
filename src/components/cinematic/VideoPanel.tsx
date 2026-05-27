"use client";

import { Pause, Play, Volume2, VolumeX } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "@/lib/motion";
import { cn } from "@/lib/cn";

type VideoPanelProps = {
  src: string;
  poster?: string;
  title?: string;
  mode: "ambient" | "focus" | "intro";
  autoplay?: boolean;
  muted?: boolean;
  loop?: boolean;
};

export function VideoPanel({
  src,
  poster,
  title,
  mode,
  autoplay = false,
  muted = true,
  loop = true,
}: VideoPanelProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const reducedMotion = useReducedMotion();
  const [playing, setPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(muted);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || reducedMotion || !autoplay) return;
    video.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
  }, [autoplay, reducedMotion]);

  const togglePlay = async () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      await video.play();
      setPlaying(true);
    } else {
      video.pause();
      setPlaying(false);
    }
  };

  const toggleSound = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setIsMuted(video.muted);
  };

  return (
    <figure className={cn("video-panel", `video-panel-${mode}`)}>
      <video
        ref={videoRef}
        className="video-panel-media"
        poster={poster}
        muted={isMuted}
        playsInline
        loop={loop}
        preload={mode === "ambient" ? "metadata" : "none"}
      >
        <source src={src} />
      </video>
      <figcaption className="video-panel-caption">
        <span>{title ?? "Ambient video"}</span>
        <div className="video-panel-controls">
          <button type="button" onClick={togglePlay} aria-label={playing ? "暂停视频" : "播放视频"} title={playing ? "暂停" : "播放"}>
            {playing ? <Pause size={16} /> : <Play size={16} />}
          </button>
          <button type="button" onClick={toggleSound} aria-label={isMuted ? "开启声音" : "静音"} title={isMuted ? "开启声音" : "静音"}>
            {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
          </button>
        </div>
      </figcaption>
    </figure>
  );
}

