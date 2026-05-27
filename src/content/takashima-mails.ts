export type TakashimaMail = {
  id: string;
  from: string;
  subject?: string;
  body: string;
  unlockDelayMs: number;
  timestampLabel: string;
  severity: "normal" | "strange" | "danger" | "terminal";
  relatedArchive?: {
    type: "bbs" | "cg" | "video" | "quote";
    id: string;
  };
};

export const takashimaMails: TakashimaMail[] = [
  {
    id: "first-signal",
    from: "zakuro@north-school.example",
    subject: "signal",
    body: "我借由死亡而重生为战士。本来应该是这样，但好痛。大家都会死。在八天后。",
    unlockDelayMs: 0,
    timestampLabel: "22:44",
    severity: "strange",
    relatedArchive: { type: "bbs", id: "strange-mail" },
  },
  {
    id: "confirmed",
    from: "unknown relay",
    subject: "confirmed",
    body: "邮箱地址一致。照片分辨率一致。发送者像是已经不在这里的人。",
    unlockDelayMs: 5000,
    timestampLabel: "22:51",
    severity: "danger",
    relatedArchive: { type: "bbs", id: "takashima-confirmed" },
  },
  {
    id: "countdown",
    from: "zakuro@north-school.example",
    subject: "countdown",
    body: "四天后。三天后。日期在每一次解锁时缩短，直到所有人都只能看向 7 月 20 日。",
    unlockDelayMs: 10000,
    timestampLabel: "09:12",
    severity: "danger",
  },
  {
    id: "terminal",
    from: "no sender",
    subject: "7.20",
    body: "世界终结日。不要再把它当成普通恶作剧。",
    unlockDelayMs: 16000,
    timestampLabel: "00:00",
    severity: "terminal",
    relatedArchive: { type: "quote", id: "world-ends" },
  },
];

