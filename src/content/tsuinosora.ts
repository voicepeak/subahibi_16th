export type IntroPhase = "idle" | "sky" | "noise" | "collapse" | "blackout" | "return" | "done";

export type TsuiNoSoraAct = {
  phase: IntroPhase;
  label: string;
  durationMs: number;
  text: string;
  image?: string;
  intensity: "calm" | "unstable" | "terminal";
};

export const tsuiNoSoraActs: TsuiNoSoraAct[] = [
  {
    phase: "sky",
    label: "Act 1",
    durationMs: 4200,
    text: "静默的天空。",
    image: "/assets/bg/bg1015d.png",
    intensity: "calm",
  },
  {
    phase: "noise",
    label: "Act 2",
    durationMs: 8800,
    text: "信号开始污染画面。",
    image: "/assets/story/ev8005a.png",
    intensity: "unstable",
  },
  {
    phase: "collapse",
    label: "Act 3",
    durationMs: 6800,
    text: "世界终结被压缩成一个瞬间。",
    image: "/assets/story/ev8005j.png",
    intensity: "terminal",
  },
  {
    phase: "blackout",
    label: "Act 4",
    durationMs: 4200,
    text: "归零。",
    intensity: "terminal",
  },
  {
    phase: "return",
    label: "Act 5",
    durationMs: 5200,
    text: "回到天空。幸福地生活。",
    image: "/assets/bg/bg1015a.png",
    intensity: "calm",
  },
];

export const tsuiNoSoraTotalMs = tsuiNoSoraActs.reduce((total, act) => total + act.durationMs, 0);
