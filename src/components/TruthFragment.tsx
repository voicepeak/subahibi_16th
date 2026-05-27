"use client";

import { useState, useEffect, useCallback } from "react";
import { truths } from "@/content/quotes";

export function TruthFragment() {
  const [open, setOpen] = useState(false);
  const [quote, setQuote] = useState("");
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  const show = useCallback(() => {
    setQuote(truths[Math.floor(Math.random() * truths.length)]);
    setOpen(true);
  }, []);

  const hide = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") hide(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, hide]);

  if (!mounted) return null;

  return (
    <>
      <button className="truth-fragment" onClick={show} aria-label="揭示一段真理">
        <span className="truth-fragment-dot" />
      </button>

      {open && (
        <div className="truth-overlay" onClick={hide}>
          <div className="truth-card" onClick={(e) => e.stopPropagation()}>
            <div className="truth-card-mark" aria-hidden="true" />
            <p className="truth-card-text">{quote}</p>
            <button className="truth-card-close" onClick={hide}>
              闭
            </button>
          </div>
        </div>
      )}
    </>
  );
}
