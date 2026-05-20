"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { TextShard } from "@/components/TextShard";

const CHARACTERS = [
  {
    file: "yk",
    name: "水上由岐",
    role: "你——眺望世界之人",
    quote: "世界是我所看到、触摸到、感受到的东西。所以，世界和我没有差别。",
    monologue: "世界的极限到底在哪里呢。\n如果我能站在那个地方的话……\n我还是能跟平时一样看着那个尽头的风景吗。\n世界的极限，是否就等同于我的极限呢。\n世界就是我看到的摸到的，并且感受到的东西。\n那样的话，世界到底是什么呢。\n世界和我的差别……是没有的。",
  },
  {
    file: "tk",
    name: "间宫卓司",
    role: "你——追求真理之人",
    quote: "一切都是谎言。但谎言的对面，有着真实。",
    monologue: "一切都是谎言。\n很久以前，就存在于世的一切，\n接下来，也将继续的一切，\n全是谎言。\n我们向前迈出双脚，那里——\n就是地狱。\n世界要终结了。\n必然要终结了。\n这是真实。",
  },
  {
    file: "zk",
    name: "高岛柘榴",
    role: "我——即为世界本身的少女",
    quote: "我要保护这个世界。因为这是我的罪，也是我的救赎。",
    monologue: "我深知这会给您带来诸多困扰，\n但是，能否在回归天空之前的这段时间里，\n允许我暂时寄居于府上……\n我所追求的赎罪……只会让您变得痛苦。\n在被你称作幻想世界的这个世界中的生活，\n对我来说是至高无上的美好回忆。\n这个梦之世界，\n才是我人生中最重要的记忆。",
  },
  {
    file: "km",
    name: "若槻镜",
    role: "你——活在日常之人",
    quote: "只是想变得更强。强到能保护珍惜的东西。",
    monologue: "每次都是那样。\n只要我一哭由岐就会赶过来。\n因为我每次都只会哭……\n每次都什么也做不了……\n所以才想要变强。\n……我真是没用呢。\n要是我就那样一辈子都不结婚的话……\n你就稍微喜欢我一点吧……",
  },
  {
    file: "hs",
    name: "间宫羽咲",
    role: "我——献上祈祷之人",
    quote: "即便如此，世界依然是美丽的。所以我祈祷。",
    monologue: "泽衣村的夏天很热。\n宛如阳光在暴晒整个世界一般。\n但是树荫下也有东京比不上的凉爽。\n这里就是这样的村庄。\n向日葵依旧向着太阳，\n仿佛什么也不曾发生过。\n什么都不曾改变，\n一切都已改变。",
  },
];

const SHARDS = [
  { text: '悲惨的也好、污秽的也好、美丽的也好、荣耀的也好——他们全部都是"我"……世界只由"我"构成，所以，我才能理解你。', source: "音无彩名 · 假设7" },
  { text: "你与我和她，皆是一体——不过是同一个灵魂的不同视角。", source: "『不连续存在』" },
  { text: "我已经无数次地重复了同样的体验。同一个灵魂，在不同的身体里，看着不同的世界。", source: "第4卷" },
];

function FadeIn({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setTimeout(() => el.classList.add("in"), delay); } },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [delay]);
  return <div ref={ref} className={`fi fi-up ${className}`}>{children}</div>;
}

export default function CharactersPage() {
  const [focus, setFocus] = useState<typeof CHARACTERS[0] | null>(null);

  const close = useCallback(() => setFocus(null), []);

  useEffect(() => {
    if (!focus) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") close(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [focus, close]);

  return (
    <>
      <section className="page-section first">
        <div className="page-bg-img" style={{ backgroundImage: `url("/assets/bg/bg1008a.png")` }} />
        <div className="page-parallax" />
        <FadeIn>
          <div className="page-head">
            <h1 className="page-title">邂逅</h1>
            <p className="page-sub">— All are "I" —</p>
          </div>
        </FadeIn>
      </section>

      <section className="page-section page-section-narrow">
        <FadeIn delay={80}>
          <blockquote className="quote-card">
            <div className="quote-mark" aria-hidden="true" />
            <p className="quote-text">
              "悲惨的也好、污秽的也好、美丽的也好、荣耀的也好——他们全部都是"我"……世界只由"我"构成，所以，我才能理解你。"
            </p>
            <cite className="quote-source">音无彩名 · 假设7 · 『素晴日』</cite>
          </blockquote>
        </FadeIn>
      </section>

      <section className="page-section page-section-narrow">
        <TextShard pool={SHARDS.slice(0, 1)} delay={100} />
      </section>

      <section className="page-section">
        <div className="chara-grid">
          {CHARACTERS.map((c, i) => (
            <FadeIn key={c.file} delay={i * 80}>
              <button className="chara-card" onClick={() => setFocus(c)}>
                <div className="chara-card-fig">
                  <img
                    src={`/assets/chara-${c.file}.png`}
                    alt=""
                    className="chara-card-sprite"
                    loading="lazy"
                  />
                </div>
                <div className="chara-card-info">
                  <p className="chara-card-name">{c.name}</p>
                  <p className="chara-card-role">{c.role}</p>
                  <p className="chara-card-quote">点击倾听心声</p>
                </div>
              </button>
            </FadeIn>
          ))}
        </div>
      </section>

      <section className="page-section page-section-narrow">
        <TextShard pool={SHARDS.slice(1)} delay={100} />
      </section>

      <section className="page-section page-section-narrow">
        <FadeIn delay={400}>
          <div className="chara-epilogue">
            <div className="quote-mark" aria-hidden="true" />
            <p className="chara-epilogue-text">
              这里的所有人，不过是同一个灵魂的不同视角。<br />
              你与我和她，皆是一体。
            </p>
          </div>
        </FadeIn>
      </section>

      <div className="divider-rule" />

      {focus && (
        <div className="monologue-overlay" onClick={close}>
          <div className="monologue-card" onClick={(e) => e.stopPropagation()}>
            <img
              src={`/assets/chara-${focus.file}.png`}
              alt=""
              className="monologue-sprite"
            />
            <p className="monologue-name">{focus.name}</p>
            <p className="monologue-role">{focus.role}</p>
            <div className="monologue-mark" aria-hidden="true" />
            <p className="monologue-text">{focus.monologue}</p>
            <button className="monologue-close" onClick={close}>
              闭
            </button>
          </div>
        </div>
      )}
    </>
  );
}
