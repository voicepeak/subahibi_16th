"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowRight, MessageCircle, Palette } from "lucide-react";
import { ChapterProgress } from "@/components/cinematic/ChapterProgress";
import { ScrollScene } from "@/components/cinematic/ScrollScene";
import { SharePanel } from "@/components/interaction/SharePanel";
import { journeyScenes } from "@/content/journey-scenes";

export default function JourneyPage() {
  const [activeId, setActiveId] = useState(journeyScenes[0]?.id);

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

      <section className="journey-epilogue">
        <p className="landing-kicker">Wonderful Everyday</p>
        <h2>天空已经恢复安静。</h2>
        <p>主线结束后，站点回到留言、二创和分享。这里不提供游戏下载、补丁或素材批量下载。</p>
        <div className="landing-actions">
          <Link href="/memories" className="sky-button">
            <MessageCircle size={16} aria-hidden="true" />
            <span>Memories</span>
          </Link>
          <Link href="/works" className="sky-button sky-button-dark">
            <Palette size={16} aria-hidden="true" />
            <span>Works</span>
          </Link>
          <SharePanel />
        </div>
      </section>
    </main>
  );
}

