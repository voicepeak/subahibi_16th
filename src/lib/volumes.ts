export interface VolumeDef {
  id: string;
  title: string;
  subtitle: string;
  epigraph: string;
  epigraphSource: string;
  route: string;
  color: string;
}

export const VOLUMES: VolumeDef[] = [
  {
    id: "vol1",
    title: "Down the Rabbit-Hole",
    subtitle: "第1卷 — 不连续存在",
    epigraph: "我们的情人，不过是随便借个名字，用幻想吹出来的肥皂泡。",
    epigraphSource: "埃德蒙·罗斯坦《西哈诺·德·贝热拉克》",
    route: "/memories",
    color: "#c4a46c",
  },
  {
    id: "vol2",
    title: "It's My Own Invention",
    subtitle: "第2卷 — 这种混乱，别人都未曾体会吗",
    epigraph: "我们的头脑比天空更辽阔。",
    epigraphSource: "埃米莉·狄更生",
    route: "/messages",
    color: "#6c8ca4",
  },
  {
    id: "vol3",
    title: "Jabberwocky",
    subtitle: "第3卷 — 镜之国",
    epigraph: "名为炸脖龙的实体不明的怪物……这个怪物被无名之人打倒了。",
    epigraphSource: "刘易斯·卡罗《炸脖龙之诗》",
    route: "/characters",
    color: "#a46c8c",
  },
  {
    id: "vol4",
    title: "Which Dreamed It",
    subtitle: "第4卷 — 向日葵的坡道",
    epigraph: "透明的白色……那是单纯的光。",
    epigraphSource: "『终之空Ⅱ』",
    route: "/sunflower",
    color: "#8ca46c",
  },
];
