"use client";

import { useState, useEffect, useCallback } from "react";

interface CGEntry {
  src: string;
  passage: string;
  chapter?: string;
}

interface CGLightboxProps {
  images: CGEntry[];
}

export function CGLightbox({ images }: CGLightboxProps) {
  const [open, setOpen] = useState(false);
  const [idx, setIdx] = useState(0);

  const current = images[idx];

  const next = useCallback(() => setIdx((i) => (i + 1) % images.length), [images.length]);
  const prev = useCallback(() => setIdx((i) => (i - 1 + images.length) % images.length), [images.length]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, next, prev]);

  return (
    <>
      <div className="cg-grid">
        {images.map((cg, i) => (
          <button
            key={i}
            className="cg-grid-cell"
            onClick={() => { setIdx(i); setOpen(true); }}
          >
            <img src={cg.src} alt="" className="cg-grid-img" loading="lazy" />
            <div className="cg-grid-hint">
              <span className="cg-grid-chapter">{cg.chapter || "——"}</span>
            </div>
          </button>
        ))}
      </div>

      {open && current && (
        <div className="cg-lightbox" onClick={() => setOpen(false)}>
          <div className="cg-lightbox-inner" onClick={(e) => e.stopPropagation()}>
            <div className="cg-lightbox-image-wrap">
              <img src={current.src} alt="" className="cg-lightbox-img" />
              <button className="cg-lightbox-nav cg-lightbox-prev" onClick={prev} aria-label="上一张">
                ‹
              </button>
              <button className="cg-lightbox-nav cg-lightbox-next" onClick={next} aria-label="下一张">
                ›
              </button>
            </div>
            <div className="cg-lightbox-text">
              <div className="cg-lightbox-mark" aria-hidden="true" />
              <p className="cg-lightbox-passage">{current.passage}</p>
              {current.chapter && (
                <cite className="cg-lightbox-chapter">{current.chapter}</cite>
              )}
              <button className="cg-lightbox-close" onClick={() => setOpen(false)}>
                闭
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
