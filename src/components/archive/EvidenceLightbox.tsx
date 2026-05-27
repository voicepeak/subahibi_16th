"use client";

import { X } from "lucide-react";

export type EvidenceItem = {
  title: string;
  body: string;
  image?: string;
};

export function EvidenceLightbox({ item, onClose }: { item: EvidenceItem | null; onClose: () => void }) {
  if (!item) return null;

  return (
    <div className="evidence-lightbox" role="dialog" aria-modal="true" aria-label={item.title}>
      <button className="evidence-lightbox-backdrop" type="button" onClick={onClose} aria-label="关闭证据浮层" />
      <div className="evidence-lightbox-card">
        <button className="evidence-lightbox-close" type="button" onClick={onClose} aria-label="关闭" title="关闭">
          <X size={18} />
        </button>
        {item.image && <img src={item.image} alt={item.title} loading="lazy" />}
        <h2>{item.title}</h2>
        <p>{item.body}</p>
      </div>
    </div>
  );
}

