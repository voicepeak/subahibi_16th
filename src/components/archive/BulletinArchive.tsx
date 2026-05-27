"use client";

import Link from "next/link";
import { ArrowLeft, Play, Square } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { BulletinPostList } from "@/components/archive/BulletinPostList";
import { BulletinThreadList } from "@/components/archive/BulletinThreadList";
import { BulletinTimeline } from "@/components/archive/BulletinTimeline";
import { bulletinThreads } from "@/content/bulletin";

export function BulletinArchive() {
  const [activeId, setActiveId] = useState(bulletinThreads[0]?.id ?? "");
  const [autoplay, setAutoplay] = useState(false);
  const activeThread = useMemo(
    () => bulletinThreads.find((thread) => thread.id === activeId) ?? bulletinThreads[0],
    [activeId]
  );

  useEffect(() => {
    if (!autoplay || bulletinThreads.length <= 1) return;
    const id = window.setInterval(() => {
      setActiveId((current) => {
        const index = bulletinThreads.findIndex((thread) => thread.id === current);
        return bulletinThreads[(index + 1) % bulletinThreads.length].id;
      });
    }, 4200);
    return () => window.clearInterval(id);
  }, [autoplay]);

  if (!activeThread) return null;

  return (
    <div className="bulletin-archive">
      <header className="archive-topbar">
        <Link href="/journey#north-school-bulletin" className="archive-return">
          <ArrowLeft size={16} aria-hidden="true" />
          <span>Return to Journey</span>
        </Link>
        <button type="button" className="archive-playback" onClick={() => setAutoplay((value) => !value)}>
          {autoplay ? <Square size={14} /> : <Play size={14} />}
          <span>{autoplay ? "Stop Replay" : "Auto Replay"}</span>
        </button>
      </header>

      <div className="bulletin-summary-card">
        <h3>事件摘要</h3>
        <p>{activeThread.summary}</p>
        <div className="bulletin-summary-stats">
          <span>{activeThread.posts.length} 条帖子</span>
          <span>日期范围 {activeThread.dateRange}</span>
          <span>危险等级 {activeThread.dangerLevel}/5</span>
        </div>
      </div>

      <div className="bulletin-layout">
        <BulletinThreadList threads={bulletinThreads} activeId={activeThread.id} onSelect={setActiveId} />
        <BulletinPostList thread={activeThread} />
        <BulletinTimeline thread={activeThread} />
      </div>
    </div>
  );
}

