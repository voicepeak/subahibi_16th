export type FeaturedFanWork = {
  id: string;
  title: string;
  author: string;
  description: string;
  image: string;
  sourceLink?: string;
};

export const featuredFanWorks: FeaturedFanWork[] = [
  {
    id: "sky-memory",
    title: "Sky Memory",
    author: "Archive Staff",
    description: "以天空和日期为主题的纪念占位作品。正式投稿接入后将由已审核作品替换。",
    image: "/assets/cg/main/ev0009.png",
  },
  {
    id: "after-slope",
    title: "After the Slope",
    author: "Archive Staff",
    description: "向日葵坡道的余韵，用作二创墙的视觉基准。",
    image: "/assets/cg/main/ev8011a.png",
  },
  {
    id: "terminal-mail",
    title: "Terminal Mail",
    author: "Archive Staff",
    description: "短信异常和掲示板档案之间的视觉连接。",
    image: "/assets/phone-cg2.png",
  },
];

