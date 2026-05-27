"use client";

import { useEffect, useState } from "react";
import { ChapterProgress } from "@/components/cinematic/ChapterProgress";
import { ScrollScene } from "@/components/cinematic/ScrollScene";
import { CGRail } from "@/components/cinematic/CGRail";
import { CGLightbox } from "@/components/cinematic/CGLightbox";
import { journeyScenes } from "@/content/journey-scenes";
import { cgAssets } from "@/content/cg";
import type { CGAsset } from "@/content/cg";

export default function JourneyPage() {
  const [activeId, setActiveId] = useState(journeyScenes[0]?.id);
  const [lightboxCGs, setLightboxCGs] = useState<CGAsset[] | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  useEffect(() => {
    const sections = journeyScenes
      .map((scene) => document.getElementById(scene.id))
      .filter((section): section is HTMLElement => Boolean(section));
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) setActiveId(visible.target.id);
      },
      { threshold: [0.35, 0.55, 0.75] }
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const openCGLightbox = (cgs: CGAsset[], index: number) => {
    setLightboxCGs(cgs);
    setLightboxIndex(index);
  };

  return (
    <main className="journey-page">
      <ChapterProgress scenes={journeyScenes} activeId={activeId} />

      <section className="journey-opener">
        <div className="journey-opener-bg" />
        <p className="landing-kicker">Scroll narrative</p>
        <h1>The Sky Archive</h1>
        <p>从天空、人物、高岛短信与 7 月 20 日，回到纪念与留言。</p>
      </section>

      {journeyScenes.map((scene, index) => (
        <ScrollScene key={scene.id} scene={scene} index={index} />
      ))}

      <section className="journey-media-section" aria-label="CG 胶片">
        <CGRail images={cgAssets.slice(0, 12)} onSelect={(cg) => {
          const idx = cgAssets.indexOf(cg);
          openCGLightbox(cgAssets, idx >= 0 ? idx : 0);
        }} />
      </section>

      {lightboxCGs && (
        <CGLightbox images={lightboxCGs} initialIndex={lightboxIndex} onClose={() => setLightboxCGs(null)} />
      )}
    </main>
  );
}
