export type Message = {
  id: string;
  nickname: string;
  country: string;
  content: string;
  avatarUrl?: string;
  approved: boolean;
  pinned: boolean;
  createdAt: string;
};

export type FanWork = {
  id: string;
  title: string;
  author: string;
  description: string;
  imageUrl?: string;
  sourceLink?: string;
  approved: boolean;
  createdAt: string;
};

export type PollOption = {
  name: string;
  votes: number;
};

export type PollCategory = {
  id: string;
  label: string;
  options: PollOption[];
};
