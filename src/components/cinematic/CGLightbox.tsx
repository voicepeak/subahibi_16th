"use client";

import { useCallback, useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import type { CGAsset } from "@/content/cg";

type CGLightboxProps = {
  images: CGAsset[];
  initialIndex?: number;
  onClose: () => void;
};

export function CGLightbox({ images, initialIndex = 0, onClose }: CGLightboxProps) {
  const [index, setIndex] = useState(initialIndex);
  const current = images[index];
  if (!current) return null;

  const prev = () => setIndex((i) => (i - 1 + images.length) % images.length);
  const next = () => setIndex((i) => (i + 1) % images.length);

  const onKeyDown = useCallback((event: React.KeyboardEvent) => {
    if (event.key === "Escape") onClose();
    if (event.key === "ArrowLeft") prev();
    if (event.key === "ArrowRight") next();
  }, []);

  return (
    <div className="cg-lightbox" onClick={onClose} onKeyDown={onKeyDown} role="dialog" aria-modal="true" aria-label={current.title} tabIndex={0}>
      <button type="button" className="cg-lightbox-close" onClick={onClose} aria-label="关闭">
        <X size={20} aria-hidden="true" />
      </button>
      <img src={current.src} alt={current.title} onClick={(e) => e.stopPropagation()} />
      {images.length > 1 && (
        <>
          <button type="button" className="cg-lightbox-nav cg-lightbox-prev" onClick={(e) => { e.stopPropagation(); prev(); }} aria-label="上一张">
            <ChevronLeft size={24} aria-hidden="true" />
          </button>
          <button type="button" className="cg-lightbox-nav cg-lightbox-next" onClick={(e) => { e.stopPropagation(); next(); }} aria-label="下一张">
            <ChevronRight size={24} aria-hidden="true" />
          </button>
        </>
      )}
      <p className="cg-lightbox-caption">{current.title} — {index + 1}/{images.length}</p>
    </div>
  );
}
