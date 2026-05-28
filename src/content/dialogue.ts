export type DialogueCharacter = {
  id: string;
  name: string;
  sprite: string;
  role: string;
};

export const dialogueCharacters: DialogueCharacter[] = [
  { id: "yk", name: "水上由岐", sprite: "/assets/chara/yk.png", role: "眺望世界之人" },
  { id: "tk", name: "间宫卓司", sprite: "/assets/chara/tk.png", role: "追求真理之人" },
  { id: "zk", name: "高岛柘榴", sprite: "/assets/chara/zk.png", role: "即为世界本身的少女" },
  { id: "km", name: "若槻镜", sprite: "/assets/chara/km.png", role: "活在日常之人" },
  { id: "kg", name: "若槻司", sprite: "/assets/chara/kg.png", role: "无法成为任何人的我" },
  { id: "hs", name: "间宫羽咲", sprite: "/assets/chara/hs.png", role: "献上祈祷之人" },
  { id: "ay", name: "音无彩名", sprite: "/assets/chara/ay.png", role: "旁观之人" },
  { id: "tm", name: "间宫皆守", sprite: "/assets/chara/tm.png", role: "守护之人" },
  { id: "ms", name: "木村", sprite: "/assets/chara/ms.png", role: "游离之人" },
];

export type DialogueBackground = {
  id: string;
  label: string;
  src: string;
  group: "day" | "sunset" | "night" | "fantasy";
};

export const dialogueBackgrounds: DialogueBackground[] = [
  { id: "bg1015a", label: "夏日天空", src: "/assets/bg/bg1015a.png", group: "day" },
  { id: "bg1008a", label: "学校校门", src: "/assets/bg/bg1008a.png", group: "day" },
  { id: "bg1003a", label: "书房卧室", src: "/assets/bg/bg1003a.png", group: "day" },
  { id: "bg1054a", label: "空房间", src: "/assets/bg/bg1054a.png", group: "day" },
  { id: "bg1015b", label: "黄昏天空", src: "/assets/bg/bg1015b.png", group: "sunset" },
  { id: "bg1022a", label: "下水道出口", src: "/assets/bg/bg1022a.png", group: "fantasy" },
  { id: "bg1022b", label: "下水道剪影", src: "/assets/bg/bg1022b.png", group: "fantasy" },
  { id: "bg1015c", label: "夜空", src: "/assets/bg/bg1015c.png", group: "night" },
  { id: "bg1015d", label: "粉色黄昏", src: "/assets/bg/bg1015d.png", group: "sunset" },
];
