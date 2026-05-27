export type JourneyScene = {
  id: string;
  chapter: string;
  title: string;
  subtitle: string;
  mood: "bright" | "strange" | "archive" | "terminal" | "blackout" | "after";
  background: string;
  eyebrow: string;
  lines: string[];
  archiveHref?: string;
  archiveLabel?: string;
  signal?: string;
};

export const journeyScenes: JourneyScene[] = [
  {
    id: "friday-rooftop",
    chapter: "Chapter 01",
    title: "Friday Rooftop",
    subtitle: "周五的楼顶",
    mood: "bright",
    background: "/assets/bg/bg1015a.png",
    eyebrow: "明亮 / 安静 / 夏日",
    lines: ["天空先于一切出现。", "楼顶的风很慢，像什么都还没有发生。"],
    signal: "2012.07.12 15:20",
  },
  {
    id: "takashima-mail",
    chapter: "Chapter 02",
    title: "Takashima Mail",
    subtitle: "高岛短信",
    mood: "strange",
    background: "/assets/phone-cg.png",
    eyebrow: "22:44 / signal lost",
    lines: ["第一条短信不是通知。", "它像从旧手机里渗出的裂缝。"],
    archiveHref: "/archive/takashima",
    archiveLabel: "Open Mail Archive",
    signal: "22:44",
  },
  {
    id: "north-school-bulletin",
    chapter: "Chapter 03",
    title: "North School Bulletin",
    subtitle: "北校掲示板",
    mood: "archive",
    background: "/assets/bbs-bg.png",
    eyebrow: "anonymous log / archived board",
    lines: ["匿名 ID 开始互相引用。", "恐惧从一条回帖变成了可回放的事件。"],
    archiveHref: "/archive/bulletin",
    archiveLabel: "Open Bulletin Archive",
    signal: "res: 0686",
  },
  {
    id: "world-ends",
    chapter: "Chapter 04",
    title: "World Ends on 7.20",
    subtitle: "世界终结",
    mood: "terminal",
    background: "/assets/bg/bg1015b.png",
    eyebrow: "7/12 → 7/20",
    lines: ["日期不再只是日期。", "短信、掲示板、预言都指向同一个锚点。"],
    signal: "2012.07.20",
  },
  {
    id: "tsui-no-sora",
    chapter: "Chapter 05",
    title: "Tsui no Sora",
    subtitle: "终之空",
    mood: "blackout",
    background: "/assets/story/ev8005a.png",
    eyebrow: "blackout / return",
    lines: ["不要解释。", "进入短片，让画面自己坠落。"],
    archiveHref: "/tsuinosora",
    archiveLabel: "Enter Tsui no Sora",
    signal: "00:00:00",
  },
  {
    id: "wonderful-everyday",
    chapter: "Chapter 06",
    title: "Wonderful Everyday",
    subtitle: "幸福地生活",
    mood: "after",
    background: "/assets/cg/main/ev8011a.png",
    eyebrow: "after the sky",
    lines: ["噪声消失以后，纪念才真正开始。", "留下留言，或把你的作品放进这座天空档案馆。"],
    archiveHref: "/memories",
    archiveLabel: "Leave a Memory",
    signal: "2010 — 2026",
  },
];

