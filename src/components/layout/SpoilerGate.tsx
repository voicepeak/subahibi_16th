"use client";

import Link from "next/link";
import { ArrowRight, Archive, ShieldAlert } from "lucide-react";
import { useEffect, useState } from "react";

const STORAGE_KEY = "sky_archive_spoiler_consent";

export function hasSpoilerConsent(): boolean {
  if (typeof window === "undefined") return false;
  return sessionStorage.getItem(STORAGE_KEY) === "1";
}

export function SpoilerGate() {
  const [acknowledged, setAcknowledged] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (sessionStorage.getItem(STORAGE_KEY) === "1") setAcknowledged(true);
  }, []);

  const consent = () => {
    sessionStorage.setItem(STORAGE_KEY, "1");
    setAcknowledged(true);
  };

  if (!mounted || acknowledged) return null;

  return (
    <div className="spoiler-gate" role="dialog" aria-modal="true" aria-label="剧透与内容提醒">
      <div className="spoiler-gate-card">
        <ShieldAlert size={28} aria-hidden="true" />
        <h2>内容提醒</h2>
        <p>
          本网站包含《素晴日》关键剧情意象、核心剧透以及死亡、精神压迫等主题表现。站点避免直接展示露骨成人内容，不提供游戏下载、破解或商业化服务。
        </p>
        <p>点击下方确认你已经了解并愿意继续浏览。</p>
        <div className="spoiler-gate-actions">
          <button type="button" className="sky-button" onClick={consent}>
            <span>已知晓，继续浏览</span>
            <ArrowRight size={17} aria-hidden="true" />
          </button>
          <Link href="/archive/takashima" className="sky-button sky-button-ghost" onClick={consent}>
            <Archive size={16} aria-hidden="true" />
            <span>Skip to Takashima</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
