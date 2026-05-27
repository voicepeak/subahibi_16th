"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { ArrowRight } from "lucide-react";
import { ChapterProgress } from "@/components/cinematic/ChapterProgress";
import { ScrollScene } from "@/components/cinematic/ScrollScene";
import { CGShowcase } from "@/components/cinematic/CGShowcase";
import { CGRail } from "@/components/cinematic/CGRail";
import { CGLightbox } from "@/components/cinematic/CGLightbox";
import { CharacterParade } from "@/components/cinematic/CharacterParade";
import { MediaOverlay } from "@/components/cinematic/MediaOverlay";
import { journeyScenes } from "@/content/journey-scenes";
import { cgAssets, getCGsByChapter, getCGsByTone } from "@/content/cg";
import { characterAssets } from "@/content/characters";
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

  const skyCGs = useMemo(() => getCGsByTone("bright").slice(0, 5), []);
  const july20CGs = useMemo(() => getCGsByChapter("july20").slice(0, 4), []);

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

      <section className="journey-chapter-section journey-chapter-characters" aria-label="人物入场">
        <div className="media-driven-scene">
          <CGShowcase images={skyCGs} intervalMs={5000} />
          <div style={{ position: "relative", zIndex: 1, width: "100%" }}>
            <MediaOverlay
              chapter="Chapter 02"
              headline="Character Parade"
              subtitle="ここにいるすべての人は、ただ一つの魂が別々の世界に投影されたものに過ぎない。"
              tone="strange"
            />
            <CharacterParade characters={characterAssets} />
          </div>
        </div>
      </section>

      <section className="journey-chapter-section journey-chapter-mail" aria-label="高岛短信">
        <div className="media-driven-scene">
          <CGShowcase images={[cgAssets[0], cgAssets[2]].filter(Boolean) as CGAsset[]} intervalMs={6000} />
          <div style={{ position: "relative", zIndex: 1 }}>
            <MediaOverlay
              chapter="Chapter 03"
              date="22:44"
              status="signal lost"
              headline="Takashima Signal"
              subtitle="第一条短信不是通知。它像从旧手机里渗出的裂缝。"
              tone="strange"
              cta={
                <Link href="/archive/takashima" className="sky-button sky-button-dark">
                  <span>Open Mail Archive</span>
                  <ArrowRight size={16} aria-hidden="true" />
                </Link>
              }
            />
          </div>
        </div>
      </section>

      <section className="journey-chapter-section journey-chapter-july20" aria-label="7月20日">
        <div className="media-driven-scene" style={{ background: "#0a0a0f" }}>
          <CGShowcase images={july20CGs} intervalMs={3000} />
          <div style={{ position: "relative", zIndex: 1 }}>
            <MediaOverlay
              chapter="Chapter 04"
              date="2012.07.20"
              status="terminal"
              headline="July 20"
              subtitle="日期不再只是日期。短信、掲示板、预言都指向同一个锚点。"
              tone="terminal"
            />
          </div>
        </div>
      </section>

      {lightboxCGs && (
        <CGLightbox images={lightboxCGs} initialIndex={lightboxIndex} onClose={() => setLightboxCGs(null)} />
      )}
    </main>
  );
}
