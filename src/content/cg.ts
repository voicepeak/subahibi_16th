export type CGAsset = {
  id: string;
  title: string;
  src: string;
  chapter?: "sky" | "characters" | "takashima" | "bulletin" | "july20" | "after";
  tone?: "bright" | "strange" | "archive" | "terminal" | "after";
  characters?: string[];
  tags?: string[];
  priority?: number;
};

export const cgAssets: CGAsset[] = [
  { id: "ev0008b", title: "起始记忆", src: "/assets/cg/main/ev0008b.png", tone: "bright", priority: 1 },
  { id: "ev0009", title: "楼顶天空", src: "/assets/cg/main/ev0009.png", tone: "bright", priority: 1 },
  { id: "ev4001a", title: "人物之章", src: "/assets/cg/main/ev4001a.png", chapter: "characters", tone: "strange", priority: 2 },
  { id: "ev4006a", title: "凝视", src: "/assets/cg/main/ev4006a.png", chapter: "characters", tone: "strange", priority: 2 },
  { id: "ev6005", title: "揭示板扩散", src: "/assets/cg/main/ev6005.png", chapter: "bulletin", tone: "archive", tags: ["bbs"], priority: 3 },
  { id: "ev7001", title: "偏在转生", src: "/assets/cg/main/ev7001.png", chapter: "july20", tone: "terminal", priority: 4 },
  { id: "ev7010", title: "7月20日", src: "/assets/cg/main/ev7010.png", chapter: "july20", tone: "terminal", priority: 4 },
  { id: "ev8011a", title: "向日葵坡道", src: "/assets/cg/main/ev8011a.png", chapter: "after", tone: "after", priority: 5 },
  { id: "ev8017", title: "结尾记忆", src: "/assets/cg/main/ev8017.png", chapter: "after", tone: "after", priority: 5 },
  { id: "ev8018", title: "余韵", src: "/assets/cg/main/ev8018.png", chapter: "after", tone: "after", priority: 5 },
  { id: "sp0001h", title: "电波信号一", src: "/assets/denpa/sp0001h.png", chapter: "july20", tone: "terminal", tags: ["glitch"], priority: 4 },
  { id: "sp0003a", title: "电波信号二", src: "/assets/denpa/sp0003a.png", chapter: "july20", tone: "terminal", tags: ["glitch"], priority: 4 },
  { id: "sp0003c", title: "电波信号三", src: "/assets/denpa/sp0003c.png", chapter: "july20", tone: "terminal", tags: ["glitch"], priority: 4 },
  { id: "sp0007a", title: "信号干扰四", src: "/assets/denpa/sp0007a.png", chapter: "july20", tone: "terminal", tags: ["glitch"], priority: 4 },
  { id: "sp0008a", title: "信号干扰五", src: "/assets/denpa/sp0008a.png", chapter: "july20", tone: "terminal", tags: ["glitch"], priority: 4 },
  { id: "sp0008g", title: "信号干扰六", src: "/assets/denpa/sp0008g.png", chapter: "july20", tone: "terminal", tags: ["glitch"], priority: 4 },
  { id: "sp0012a", title: "电波干扰七", src: "/assets/denpa/sp0012a.png", chapter: "july20", tone: "terminal", tags: ["glitch"], priority: 4 },
  { id: "sp0035a", title: "电波干扰八", src: "/assets/denpa/sp0035a.png", chapter: "july20", tone: "terminal", tags: ["glitch"], priority: 4 },
  { id: "sp0040a", title: "电波干扰九", src: "/assets/denpa/sp0040a.png", chapter: "july20", tone: "terminal", tags: ["glitch"], priority: 4 },
  { id: "sp0048i", title: "电波干扰十", src: "/assets/denpa/sp0048i.png", chapter: "july20", tone: "terminal", tags: ["glitch"], priority: 4 },
  { id: "sp0062", title: "电波干扰十一", src: "/assets/denpa/sp0062.png", chapter: "july20", tone: "terminal", tags: ["glitch"], priority: 4 },
  { id: "sp0084a", title: "电波干扰十二", src: "/assets/denpa/sp0084a.png", chapter: "july20", tone: "terminal", tags: ["glitch"], priority: 4 },
  { id: "sp0084b", title: "电波干扰十三", src: "/assets/denpa/sp0084b.png", chapter: "july20", tone: "terminal", tags: ["glitch"], priority: 4 },
  { id: "ev0001", title: "故事之始", src: "/assets/story/ev0001.png", tone: "bright", priority: 1 },
  { id: "ev0008a", title: "天空片段", src: "/assets/story/ev0008a.png", tone: "bright", priority: 1 },
  { id: "ev8005a", title: "终之空一幕", src: "/assets/story/ev8005a.png", chapter: "july20", tone: "terminal", tags: ["tsui"], priority: 4 },
  { id: "ev8005j", title: "终之空二幕", src: "/assets/story/ev8005j.png", chapter: "july20", tone: "terminal", tags: ["tsui"], priority: 4 },
  { id: "ev8005k", title: "终之空三幕", src: "/assets/story/ev8005k.png", chapter: "july20", tone: "terminal", tags: ["tsui"], priority: 4 },
  { id: "ev8015", title: "回到日常", src: "/assets/story/ev8015.png", chapter: "after", tone: "after", priority: 5 },
];

export function getCGsByChapter(chapter: CGAsset["chapter"]): CGAsset[] {
  return cgAssets.filter((cg) => cg.chapter === chapter);
}

export function getCGsByTone(tone: CGAsset["tone"]): CGAsset[] {
  return cgAssets.filter((cg) => cg.tone === tone);
}

export function getCGsByTag(tag: string): CGAsset[] {
  return cgAssets.filter((cg) => cg.tags?.includes(tag));
}
