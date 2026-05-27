export type ApprovedMessage = {
  id: string;
  nickname: string;
  country?: string;
  content: string;
  pinned?: boolean;
  created_at: string;
};

export const seedMessages: ApprovedMessage[] = [
  {
    id: "seed-1",
    nickname: "archive",
    country: "rooftop",
    content: "愿天空仍然被记得。",
    pinned: true,
    created_at: "2026-07-20T22:44:00.000Z",
  },
  {
    id: "seed-2",
    nickname: "visitor",
    country: "station",
    content: "这里不是下载站，只是一封写给夏天的回信。",
    created_at: "2026-07-20T22:45:00.000Z",
  },
];

