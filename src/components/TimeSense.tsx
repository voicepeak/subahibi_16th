"use client";

import { useEffect, useState } from "react";

interface TimePhrase {
  text: string;
  sub: string;
}

function getTimePhrase(): TimePhrase {
  const h = new Date().getHours();
  if (h >= 5 && h < 8) return { text: "黎明。世界在薄明中苏醒。", sub: "dawn" };
  if (h >= 8 && h < 12) return { text: "太阳还高悬着。世界仍在运转。", sub: "morning" };
  if (h >= 12 && h < 15) return { text: "午后。蝉声嘈杂。", sub: "afternoon" };
  if (h >= 15 && h < 18) return { text: "黄昏。影子被拉长。", sub: "dusk" };
  if (h >= 18 && h < 22) return { text: "夜。灯火渐起。", sub: "night" };
  return { text: "深夜。窗外的世界是否也和你一样醒着？", sub: "midnight" };
}

function getDatePhrase(): TimePhrase | null {
  const today = new Date();
  const m = today.getMonth() + 1;
  const d = today.getDate();
  if (m === 7 && d === 20) return { text: "就是今天。世界在此终结与开始。", sub: "7月20日" };
  if (m === 7 && d === 12) return { text: "7月12日。由岐在天台上。", sub: "a day" };
  if (m === 7 && d === 28) return { text: "向日葵的季节。", sub: "sunflower" };
  return null;
}

export function TimeSense() {
  const [phrase, setPhrase] = useState<TimePhrase | null>(null);
  const [datePhrase, setDatePhrase] = useState<TimePhrase | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setPhrase(getTimePhrase());
    setDatePhrase(getDatePhrase());
    setMounted(true);
  }, []);

  if (!mounted || !phrase) return null;

  return (
    <div className="time-sense" aria-hidden="true">
      <span className="time-sense-dot" />
      <span className="time-sense-text">{phrase.text}</span>
      {datePhrase && (
        <span className="time-sense-date">{datePhrase.text}</span>
      )}
    </div>
  );
}
