"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { VOLUMES } from "@/lib/volumes";

export function VolumeGate() {
  const pathname = usePathname();
  const [show, setShow] = useState(false);
  const [vol, setVol] = useState<(typeof VOLUMES)[0] | null>(null);

  useEffect(() => {
    const matched = VOLUMES.find((v) => v.route === pathname);
    if (!matched) return;

    const key = `seen_${matched.id}`;
    if (sessionStorage.getItem(key)) return;

    sessionStorage.setItem(key, "1");
    setVol(matched);
    setShow(true);

    const timer = setTimeout(() => setShow(false), 2800);
    return () => clearTimeout(timer);
  }, [pathname]);

  if (!show || !vol) return null;

  return (
    <div className="volume-gate" key={vol.id}>
      <div className="volume-gate-bg" />
      <div className="volume-gate-card">
        <span className="volume-gate-sub" style={{ color: vol.color }}>
          {vol.subtitle}
        </span>
        <h2 className="volume-gate-title">{vol.title}</h2>
        <div className="volume-gate-line" style={{ background: vol.color }} />
        <p className="volume-gate-epigraph">"{vol.epigraph}"</p>
        <cite className="volume-gate-source">{vol.epigraphSource}</cite>
      </div>
    </div>
  );
}
