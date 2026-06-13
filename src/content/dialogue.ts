export type DialogueCharacter = {
  id: string;
  name: string;
  dialogueName: string;
  sprite: string;
  role: string;
  variants: DialogueCharacterVariant[];
};

export type DialogueCharacterVariant = {
  id: string;
  label: string;
  sprite: string;
};

export const dialogueCharacters: DialogueCharacter[] = [
  {
    id: "yk",
    name: "水上由岐",
    dialogueName: "由岐",
    sprite: "/assets/chara/yk.png",
    role: "眺望世界之人",
    variants: [
      { id: "neutral", label: "抱臂", sprite: "/assets/chara/variants/yk-neutral.png" },
      { id: "soft", label: "微笑", sprite: "/assets/chara/variants/yk-soft.png" },
      { id: "alt", label: "差分", sprite: "/assets/chara/variants/yk-alt.png" },
    ],
  },
  {
    id: "takuji",
    name: "间宫卓司",
    dialogueName: "卓司",
    sprite: "/assets/chara/takuji.png",
    role: "追求真理之人",
    variants: [
      { id: "neutral", label: "正面", sprite: "/assets/chara/variants/takuji-neutral.png" },
      { id: "side", label: "侧身", sprite: "/assets/chara/variants/takuji-side.png" },
      { id: "raise", label: "差分", sprite: "/assets/chara/variants/takuji-raise.png" },
    ],
  },
  {
    id: "zk",
    name: "高岛柘榴",
    dialogueName: "柘榴",
    sprite: "/assets/chara/zk.png",
    role: "即为世界本身的少女",
    variants: [
      { id: "neutral", label: "端正", sprite: "/assets/chara/variants/zk-neutral.png" },
      { id: "calm", label: "沉静", sprite: "/assets/chara/variants/zk-calm.png" },
      { id: "alt", label: "差分", sprite: "/assets/chara/variants/zk-alt.png" },
    ],
  },
  {
    id: "kagami",
    name: "若槻镜",
    dialogueName: "镜",
    sprite: "/assets/chara/kg.png",
    role: "活在日常之人",
    variants: [
      { id: "neutral", label: "基础", sprite: "/assets/chara/variants/kg-neutral.png" },
      { id: "soft", label: "表情", sprite: "/assets/chara/variants/kg-soft.png" },
      { id: "alt", label: "差分", sprite: "/assets/chara/variants/kg-alt.png" },
    ],
  },
  {
    id: "tsukasa",
    name: "若槻司",
    dialogueName: "司",
    sprite: "/assets/chara/tk.png",
    role: "无法成为任何人的我",
    variants: [
      { id: "neutral", label: "侧身", sprite: "/assets/chara/variants/tsukasa-neutral.png" },
      { id: "side", label: "表情", sprite: "/assets/chara/variants/tsukasa-side.png" },
      { id: "alt", label: "差分", sprite: "/assets/chara/variants/tsukasa-alt.png" },
    ],
  },
  {
    id: "hs",
    name: "间宫羽咲",
    dialogueName: "羽咲",
    sprite: "/assets/chara/hs.png",
    role: "献上祈祷之人",
    variants: [
      { id: "neutral", label: "基础", sprite: "/assets/chara/variants/hs-neutral.png" },
      { id: "soft", label: "低眉", sprite: "/assets/chara/variants/hs-soft.png" },
      { id: "alt", label: "差分", sprite: "/assets/chara/variants/hs-alt.png" },
    ],
  },
  {
    id: "ay",
    name: "音无彩名",
    dialogueName: "彩名",
    sprite: "/assets/chara/ay.png",
    role: "旁观之人",
    variants: [
      { id: "neutral", label: "基础", sprite: "/assets/chara/variants/ay-neutral.png" },
      { id: "side", label: "侧身", sprite: "/assets/chara/variants/ay-side.png" },
      { id: "alt", label: "差分", sprite: "/assets/chara/variants/ay-alt.png" },
    ],
  },
  {
    id: "tm",
    name: "间宫皆守",
    dialogueName: "皆守",
    sprite: "/assets/chara/tm.png",
    role: "守护之人",
    variants: [
      { id: "neutral", label: "基础", sprite: "/assets/chara/variants/tm-neutral.png" },
      { id: "side", label: "差分", sprite: "/assets/chara/variants/tm-side.png" },
      { id: "alt", label: "差分", sprite: "/assets/chara/variants/tm-alt.png" },
    ],
  },
  {
    id: "kimika",
    name: "橘希实香",
    dialogueName: "希实香",
    sprite: "/assets/chara/km.png",
    role: "挥杖的少女",
    variants: [
      { id: "neutral", label: "基础", sprite: "/assets/chara/variants/km-neutral.png" },
      { id: "smile", label: "笑颜", sprite: "/assets/chara/variants/km-smile.png" },
      { id: "alt", label: "差分", sprite: "/assets/chara/variants/km-alt.png" },
    ],
  },
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
