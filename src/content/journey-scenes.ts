import type { CGAsset } from "@/content/cg";
import type { CharacterAsset } from "@/content/characters";

export type JourneyScene = {
  id: string;
  chapter: string;
  title: string;
  subtitle: string;
  mood: "bright" | "strange" | "archive" | "terminal" | "after";
  eyebrow: string;
  lines: string[];
  archiveHref?: string;
  archiveLabel?: string;
  signal?: string;
};

export const journeyScenes: JourneyScene[] = [
  {
    id: "sky-opening",
    chapter: "Chapter 01",
    title: "Sky Opening",
    subtitle: "天空开场",
    mood: "bright",
    eyebrow: "明亮 / 安静 / 夏日",
    lines: ["天空先于一切出现。", "楼顶的风很慢，像什么都还没有发生。"],
    signal: "2012.07.12 15:20",
  },
  {
    id: "character-parade",
    chapter: "Chapter 02",
    title: "Character Parade",
    subtitle: "人物入场",
    mood: "strange",
    eyebrow: "すべては私",
    lines: ["这里的所有人，不过是同一个灵魂在不同世界中的投影。", "你与我和她，皆是一体。"],
    signal: "all are \"I\"",
  },
  {
    id: "takashima-signal",
    chapter: "Chapter 03",
    title: "Takashima Signal",
    subtitle: "高岛异常信号",
    mood: "strange",
    eyebrow: "22:44 / signal lost",
    lines: ["第一条短信不是通知。", "它像从旧手机里渗出的裂缝。"],
    archiveHref: "/archive/takashima",
    archiveLabel: "Open Mail Archive",
    signal: "22:44",
  },
  {
    id: "bulletin-spread",
    chapter: "Chapter 04",
    title: "Bulletin Spread",
    subtitle: "揭示板扩散",
    mood: "archive",
    eyebrow: "anonymous log / archived board",
    lines: ["匿名 ID 开始互相引用。", "恐惧从一条回帖变成了可回放的事件。"],
    archiveHref: "/archive/bulletin",
    archiveLabel: "Open Bulletin Archive",
    signal: "res: 0686",
  },
  {
    id: "july-20",
    chapter: "Chapter 05",
    title: "July 20",
    subtitle: "7月20日",
    mood: "terminal",
    eyebrow: "7/12 → 7/20",
    lines: ["日期不再只是日期。", "短信、掲示板、预言都指向同一个锚点。"],
    signal: "2012.07.20",
  },
  {
    id: "wonderful-everyday",
    chapter: "Chapter 06",
    title: "Wonderful Everyday",
    subtitle: "幸福地生活",
    mood: "after",
    eyebrow: "after the sky",
    lines: ["噪声消失以后，纪念才真正开始。", "留下留言，或把你的作品放进这座天空档案馆。"],
    archiveHref: "/memories",
    archiveLabel: "Leave a Memory",
    signal: "2010 — 2026",
  },
];

export const journeyChapterCGs: Record<string, CGAsset[]> = {};

export const journeyChapterCharacters: Record<string, CharacterAsset[]> = {};
