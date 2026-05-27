"use client";

import { useState } from "react";
import { MessageCircle } from "lucide-react";
import { MessageForm } from "@/components/interaction/MessageForm";
import { MessageWall } from "@/components/interaction/MessageWall";
import { SharePanel } from "@/components/interaction/SharePanel";
import { MemoryStrip } from "@/components/cinematic/MemoryStrip";
import { memoryAssets } from "@/content/assets";

export default function MemoriesPage() {
  const [refreshKey, setRefreshKey] = useState(0);

  return (
    <main className="memories-page">
      <section className="memory-hero">
        <p className="landing-kicker">Memories</p>
        <h1>留言墙</h1>
        <p>主线结束后，天空恢复安静。这里保留已经审核的纪念留言。</p>
        <div className="landing-actions">
          <a href="#message-form" className="sky-button">
            <MessageCircle size={16} aria-hidden="true" />
            <span>Leave a Message</span>
          </a>
          <SharePanel />
        </div>
      </section>

      <MemoryStrip assets={memoryAssets} />

      <section className="memory-content">
        <div id="message-form" className="memory-form-card">
          <h2>留下纪念</h2>
          <MessageForm onSubmitted={() => setRefreshKey((value) => value + 1)} />
        </div>
        <MessageWall refreshKey={refreshKey} />
      </section>
    </main>
  );
}
