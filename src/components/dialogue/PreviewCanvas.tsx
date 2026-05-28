"use client";

import { useRef, useState } from "react";
import { toPng } from "html-to-image";
import { Download } from "lucide-react";

interface PreviewCanvasProps {
  bgSrc: string;
  charaSrc: string;
  charaName: string;
  text: string;
}

export function PreviewCanvas({ bgSrc, charaSrc, charaName, text }: PreviewCanvasProps) {
  const previewRef = useRef<HTMLDivElement>(null);
  const [exporting, setExporting] = useState(false);

  const handleDownload = async () => {
    if (!previewRef.current || exporting) return;
    setExporting(true);
    try {
      const dataUrl = await toPng(previewRef.current, {
        width: 1280,
        height: 720,
        pixelRatio: 2,
        cacheBust: true,
      });
      const link = document.createElement("a");
      link.download = `subahibi_dialogue_${charaName}_${Date.now()}.png`;
      link.href = dataUrl;
      link.click();
    } catch {
      //
    } finally {
      setExporting(false);
    }
  };

  return (
    <div className="dialogue-preview-col">
      <div className="dialogue-preview-frame" ref={previewRef}>
        <img src={bgSrc} alt="" className="dialogue-preview-bg" />
        <img src={charaSrc} alt={charaName} className="dialogue-preview-chara" />
        <div className="dialogue-preview-box">
          <div className="dialogue-preview-name">{charaName || "——"}</div>
          <div className="dialogue-preview-divider" />
          <div className="dialogue-preview-text">{text || "在这里写下你想说的话……"}</div>
        </div>
      </div>

      <button
        className="dialogue-download-btn"
        onClick={handleDownload}
        disabled={exporting}
      >
        <Download size={18} aria-hidden="true" />
        <span>{exporting ? "生成中…" : "下载 PNG"}</span>
      </button>
    </div>
  );
}
