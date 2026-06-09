"use client";

import { useEffect, useMemo, useState } from "react";

type CountdownUnit = {
  key: string;
  label: string;
  value: number | null;
};

const DEFAULT_TARGET = "2026-07-20T00:00:00+08:00";

function splitTime(ms: number): CountdownUnit[] {
  const totalSeconds = Math.max(0, Math.floor(ms / 1000));
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return [
    { key: "days", label: "days", value: days },
    { key: "hours", label: "hours", value: hours },
    { key: "minutes", label: "min", value: minutes },
    { key: "seconds", label: "sec", value: seconds },
  ];
}

function getPendingUnits(): CountdownUnit[] {
  return [
    { key: "days", label: "days", value: null },
    { key: "hours", label: "hours", value: null },
    { key: "minutes", label: "min", value: null },
    { key: "seconds", label: "sec", value: null },
  ];
}

function formatUnit(unit: CountdownUnit) {
  if (unit.value === null) return "--";
  if (unit.key === "days") return String(unit.value).padStart(2, "0");
  return String(unit.value).padStart(2, "0");
}

export function AnniversaryCountdown({ targetIso = DEFAULT_TARGET }: { targetIso?: string }) {
  const targetTime = useMemo(() => new Date(targetIso).getTime(), [targetIso]);
  const [remaining, setRemaining] = useState<number | null>(null);

  useEffect(() => {
    const tick = () => setRemaining(targetTime - Date.now());
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, [targetTime]);

  const units = remaining === null ? getPendingUnits() : splitTime(remaining);

  return (
    <section className="anniversary-countdown" aria-label="Countdown to July 20">
      <p className="anniversary-countdown-kicker">Countdown to 7.20</p>
      <div className="anniversary-countdown-type">
        {units.map((unit, index) => (
          <span className={`countdown-slab countdown-slab-${unit.key}`} key={unit.key}>
            <b>{formatUnit(unit)}</b>
            <small>{unit.label}</small>
            {index < units.length - 1 && <i aria-hidden="true">/</i>}
          </span>
        ))}
      </div>
      <p className="anniversary-countdown-note">2026.07.20 / Wonderful Everyday</p>
    </section>
  );
}
