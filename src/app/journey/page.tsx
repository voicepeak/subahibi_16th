"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { ArrowRight, MessageCircle, Palette, BarChart3, ExternalLink } from "lucide-react";
import { ChapterProgress } from "@/components/cinematic/ChapterProgress";
import { ScrollScene } from "@/components/cinematic/ScrollScene";
import { CGShowcase } from "@/components/cinematic/CGShowcase";
import { CGRail } from "@/components/cinematic/CGRail";
import { CGLightbox } from "@/components/cinematic/CGLightbox";
import { CharacterParade } from "@/components/cinematic/CharacterParade";
import { CharacterStage } from "@/components/cinematic/CharacterStage";
import { MediaOverlay } from "@/components/cinematic/MediaOverlay";
import { SharePanel } from "@/components/interaction/SharePanel";
import { journeyScenes } from "@/content/journey-scenes";
import { cgAssets, getCGsByChapter, getCGsByTone, getCGsByTag } from "@/content/cg";
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
  const bulletinCGs = useMemo(() => getCGsByChapter("bulletin"), []);
  const july20CGs = useMemo(() => getCGsByChapter("july20").slice(0, 4), []);
  const afterCGs = useMemo(() => getCGsByChapter("after"), []);

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
        <p>从明亮的天空进入短信、掲示板、7 月 20 日与终之空，再回到纪念。</p>
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

      <section className="journey-chapter-section journey-chapter-characters" id="character-parade" aria-label="人物入场">
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

      <section className="journey-chapter-section journey-chapter-mail" id="takashima-signal" aria-label="高岛异常信号">
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

      <section className="journey-chapter-section journey-chapter-bulletin" id="bulletin-spread" aria-label="揭示板扩散">
        <div className="media-driven-scene" style={{ background: "#0f1219" }}>
          <CGShowcase images={[...bulletinCGs, ...july20CGs.slice(0, 2)]} intervalMs={4000} />
          <div style={{ position: "relative", zIndex: 1 }}>
            <MediaOverlay
              chapter="Chapter 04"
              status="res: 0686"
              headline="Bulletin Spread"
              subtitle="匿名 ID 开始互相引用。恐惧从一条回帖变成了可回放的事件。"
              tone="archive"
              cta={
                <Link href="/archive/bulletin" className="sky-button sky-button-dark">
                  <span>Open Bulletin Archive</span>
                  <ArrowRight size={16} aria-hidden="true" />
                </Link>
              }
            />
          </div>
        </div>
      </section>

      <section className="journey-chapter-section journey-chapter-july20" id="july-20" aria-label="7月20日">
        <div className="media-driven-scene" style={{ background: "#0a0a0f" }}>
          <CGShowcase images={july20CGs} intervalMs={3000} />
          <div style={{ position: "relative", zIndex: 1 }}>
            <MediaOverlay
              chapter="Chapter 05"
              date="2012.07.20"
              status="terminal"
              headline="July 20"
              subtitle="日期不再只是日期。短信、掲示板、预言都指向同一个锚点。"
              tone="terminal"
            />
          </div>
        </div>
      </section>

      <section className="journey-chapter-section journey-chapter-after" aria-label="幸福地生活">
        <div className="media-driven-scene" style={{ background: "#f7faff" }}>
          <CGShowcase images={afterCGs} intervalMs={5000} />
          <div style={{ position: "relative", zIndex: 1 }}>
            <MediaOverlay
              chapter="Chapter 06"
              headline="Wonderful Everyday"
              subtitle="噪声消失以后，纪念才真正开始。留下留言，或把你的作品放进这座天空档案馆。"
              tone="after"
              cta={
                <div className="media-driven-cta-row">
                  <Link href="/memories" className="sky-button">
                    <MessageCircle size={16} aria-hidden="true" />
                    <span>Memories</span>
                  </Link>
                  <Link href="/works" className="sky-button sky-button-dark">
                    <Palette size={16} aria-hidden="true" />
                    <span>Works</span>
                  </Link>
                  <Link href="/poll" className="sky-button sky-button-ghost">
                    <BarChart3 size={16} aria-hidden="true" />
                    <span>Polls</span>
                  </Link>
                  <SharePanel />
                </div>
              }
            />
          </div>
        </div>
      </section>

      <section className="journey-tsuinosora-secondary" aria-label="终之空次级入口">
        <Link href="/tsuinosora" className="sky-button sky-button-ghost">
          <ExternalLink size={14} aria-hidden="true" />
          <span>终之空短片</span>
        </Link>
      </section>

      {lightboxCGs && (
        <CGLightbox images={lightboxCGs} initialIndex={lightboxIndex} onClose={() => setLightboxCGs(null)} />
      )}
    </main>
  );
}
