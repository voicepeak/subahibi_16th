"use client";

import { useEffect, useState } from "react";

function getTimePhrase() {
  const h = new Date().getHours();
  if (h >= 5 && h < 8) return { text: "黎明 · 世界在薄明中苏醒", emoji: "🌅" };
  if (h >= 8 && h < 12) return { text: "早晨 · 太阳还高悬着", emoji: "☀️" };
  if (h >= 12 && h < 15) return { text: "午后 · 蝉声嘈杂", emoji: "🌤" };
  if (h >= 15 && h < 18) return { text: "黄昏 · 影子被拉长", emoji: "🌇" };
  if (h >= 18 && h < 22) return { text: "夜 · 灯火渐起", emoji: "🌙" };
  return { text: "深夜 · 窗外的世界是否也和你一样醒着", emoji: "🌌" };
}

function getDateMark() {
  const today = new Date();
  const m = today.getMonth() + 1;
  const d = today.getDate();
  if (m === 7 && d === 20) return { text: "就是今天。世界在此终结与开始。", emoji: "⏳" };
  if (m === 7 && d === 12) return { text: "7月12日 · 由岐在天台上", emoji: "🏢" };
  if (m === 7) return { text: "7月 · 向日葵的季节", emoji: "🌻" };
  return null;
}

export function TimeSense() {
  const [phrase, setPhrase] = useState<ReturnType<typeof getTimePhrase> | null>(null);
  const [dateMark, setDateMark] = useState<ReturnType<typeof getDateMark> | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setPhrase(getTimePhrase());
    setDateMark(getDateMark());
    setMounted(true);
  }, []);

  if (!mounted || !phrase) return null;

  return (
    <div className="time-sense" aria-hidden="true">
      <div className="time-sense-icon">{phrase.emoji}</div>
      <div className="time-sense-body">
        <span className="time-sense-text">{phrase.text}</span>
        {dateMark && (
          <span className="time-sense-mark">
            {dateMark.emoji} {dateMark.text}
          </span>
        )}
      </div>
    </div>
  );
}
