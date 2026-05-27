export type VisualAsset = {
  src: string;
  alt: string;
  tone: "sky" | "mail" | "bbs" | "collapse" | "after";
};

export const skyBackdrops: VisualAsset[] = [
  { src: "/assets/bg/bg1015a.png", alt: "夏日天空", tone: "sky" },
  { src: "/assets/bg/bg1015b.png", alt: "黄昏天空", tone: "sky" },
  { src: "/assets/bg/bg1015d.png", alt: "夜空", tone: "sky" },
  { src: "/assets/hero-bg.png", alt: "纪念站天空背景", tone: "sky" },
];

export const archiveBackdrops: VisualAsset[] = [
  { src: "/assets/phone-cg.png", alt: "手机影像", tone: "mail" },
  { src: "/assets/phone-cg2.png", alt: "手机影像二", tone: "mail" },
  { src: "/assets/bbs-bg.png", alt: "掲示板背景", tone: "bbs" },
];

export const tsuiBackdrops: VisualAsset[] = [
  { src: "/assets/story/ev8005a.png", alt: "终之空片段一", tone: "collapse" },
  { src: "/assets/story/ev8005j.png", alt: "终之空片段二", tone: "collapse" },
  { src: "/assets/story/ev8005k.png", alt: "终之空片段三", tone: "collapse" },
  { src: "/assets/denpa/sp0001h.png", alt: "终之空信号", tone: "collapse" },
];

export const memoryAssets: VisualAsset[] = [
  { src: "/assets/cg/main/ev0009.png", alt: "楼顶天空", tone: "sky" },
  { src: "/assets/cg/main/ev0008b.png", alt: "起始记忆", tone: "sky" },
  { src: "/assets/cg/main/ev7001.png", alt: "偏在转生", tone: "after" },
  { src: "/assets/cg/main/ev8011a.png", alt: "向日葵坡道", tone: "after" },
  { src: "/assets/cg/main/ev8017.png", alt: "结尾记忆", tone: "after" },
  { src: "/assets/cg/main/ev8018.png", alt: "余韵", tone: "after" },
];

