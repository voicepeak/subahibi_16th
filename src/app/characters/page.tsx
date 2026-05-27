"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { gsap } from "gsap";

const CHARACTERS = [
  {
    file: "yk", name: "水上由岐", role: "你——眺望世界之人",
    quote: "世界是我所看到、触摸到、感受到的东西。所以，世界和我没有差别。",
    monologue: "世界的极限到底在哪里呢。\n如果我能站在那个地方的话……\n我还是能跟平时一样看着那个尽头的风景吗。\n世界的极限，是否就等同于我的极限呢。\n世界就是我看到的摸到的，并且感受到的东西。\n那样的话，世界到底是什么呢。\n世界和我的差别……是没有的。",
  },
  {
    file: "tk", name: "间宫卓司", role: "你——追求真理之人",
    quote: "一切都是谎言。但谎言的对面，有着真实。",
    monologue: "一切都是谎言。\n很久以前，就存在于世的一切，\n接下来，也将继续的一切，\n全是谎言。\n我们向前迈出双脚，那里——\n就是地狱。\n世界要终结了。\n必然要终结了。\n这是真实。",
  },
  {
    file: "zk", name: "高岛柘榴", role: "我——即为世界本身的少女",
    quote: "我要保护这个世界。因为这是我的罪，也是我的救赎。",
    monologue: "我深知这会给您带来诸多困扰，\n但是，能否在回归天空之前的这段时间里，\n允许我暂时寄居于府上……\n我所追求的赎罪……只会让您变得痛苦。\n在被你称作幻想世界的这个世界中的生活，\n对我来说是至高无上的美好回忆。\n这个梦之世界，\n才是我人生中最重要的记忆。",
  },
  {
    file: "km", name: "若槻镜", role: "你——活在日常之人",
    quote: "只是想变得更强。强到能保护珍惜的东西。",
    monologue: "每次都是那样。\n只要我一哭由岐就会赶过来。\n因为我每次都只会哭……\n每次都什么也做不了……\n所以才想要变强。\n……我真是没用呢。\n要是我就那样一辈子都不结婚的话……\n你就稍微喜欢我一点吧……",
  },
  {
    file: "kg", name: "若槻司", role: "我——无法成为任何人的我",
    quote: "姐姐一直在看着我……所以我必须成为姐姐期待的妹妹。",
    monologue: "姐姐她……一直都在保护我。\n从小时候开始，不管什么事都是姐姐在保护我。\n所以我也想成为姐姐那样坚强的人。\n但是……我好像……做不到啊。\n因为我……什么也做不好。\n如果……我能像姐姐那样就好了……",
  },
  {
    file: "hs", name: "间宫羽咲", role: "我——献上祈祷之人",
    quote: "即便如此，世界依然是美丽的。所以我祈祷。",
    monologue: "泽衣村的夏天很热。\n宛如阳光在暴晒整个世界一般。\n但是树荫下也有东京比不上的凉爽。\n这里就是这样的村庄。\n向日葵依旧向着太阳，\n仿佛什么也不曾发生过。\n什么都不曾改变，\n一切都已改变。",
  },
  {
    file: "ay", name: "音无彩名", role: "她——旁观之人",
    quote: '悲惨的也好、污秽的也好、美丽的也好、荣耀的也好——他们全部都是"我"。',
    monologue: '假设。\n如果世界是由个人的感觉构成的——\n那么他人的世界，就永远无法被完全理解。\n这便是孤独的构造。\n但同时——正因为世界只由"我"构成，\n我才能理解你。\n这就是假设7。\n也是这个故事的真相之一。',
  },
  {
    file: "tm", name: "间宫皆守", role: "他——守护之人",
    quote: "那……不是英雄会做的约定啊……",
    monologue: "我要保护羽咲。\n那是我的使命……也是我的赎罪。\n虽然我可能什么都做不到……\n但至少……让我待在她的身边吧。\n由岐姐……如果我消失的话，\n羽咲她会……怎么样呢……",
  },
  {
    file: "ms", name: "木村", role: "他——游离之人",
    quote: "非要走这种山路吗？就没有直通村子的巴士吗？",
    monologue: "喂喂，我可是被硬拉来的啊。\n不过嘛……偶尔来趟这种乡下也不错。\n空气好，星星也看得清楚。\n比起东京那个闷热的地方好多了。\n只是蚊子太多了。\n喂，羽咲，涂点防蚊药吧。",
  },
];

export default function CharactersPage() {
  const gridRef = useRef<HTMLDivElement>(null);
  const quoteRef = useRef<HTMLDivElement>(null);
  const [focus, setFocus] = useState<typeof CHARACTERS[0] | null>(null);

  const close = useCallback(() => setFocus(null), []);

  useEffect(() => {
    if (!focus) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") close(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [focus, close]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".chara-card", { y: 40, opacity: 0 }, {
        y: 0, opacity: 1, stagger: { amount: 0.5, from: "random" },
        duration: 0.6, ease: "power2.out",
        scrollTrigger: { trigger: gridRef.current, start: "top 82%", toggleActions: "play none none none" },
      });
    });
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (!gridRef.current) return;
    const cards = gridRef.current.querySelectorAll<HTMLElement>(".chara-card");
    cards.forEach((card) => {
      const onMove = (e: MouseEvent) => {
        const r = card.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5;
        const y = (e.clientY - r.top) / r.height - 0.5;
        gsap.to(card, { rotationX: -y * 5, rotationY: x * 5, duration: 0.3, ease: "power1.out", overwrite: "auto" });
      };
      const onLeave = () => gsap.to(card, { rotationX: 0, rotationY: 0, duration: 0.4, ease: "power2.out" });
      card.addEventListener("mousemove", onMove);
      card.addEventListener("mouseleave", onLeave);
      return () => { card.removeEventListener("mousemove", onMove); card.removeEventListener("mouseleave", onLeave); };
    });
  }, []);

  return (
    <>
      <section className="page-section first">
        <div className="page-bg-img" style={{ backgroundImage: `url("/assets/bg/bg1008a.png")` }} />
        <div className="page-parallax" />
        <div className="page-head">
          <h1 className="page-title">邂逅</h1>
          <p className="page-sub">— All are "I" —</p>
        </div>
      </section>

      <section className="page-section page-section-narrow">
        <div ref={quoteRef}>
          <blockquote className="quote-card">
            <div className="quote-mark" aria-hidden="true" />
            <p className="quote-text">
              {'悲惨的也好、污秽的也好、美丽的也好、荣耀的也好——他们全部都是"我"……'}
            </p>
            <cite className="quote-source">音无彩名 · 假设7 · 『素晴日』</cite>
          </blockquote>
        </div>
      </section>

      <section className="page-section">
        <div ref={gridRef} className="chara-grid">
          {CHARACTERS.map((c) => (
            <button key={c.file} className="chara-card" onClick={() => setFocus(c)}>
              <div className="chara-card-fig">
                <img src={`/assets/chara-${c.file}.png`} alt="" className="chara-card-sprite" loading="lazy" />
              </div>
              <div className="chara-card-info">
                <p className="chara-card-name">{c.name}</p>
                <p className="chara-card-role">{c.role}</p>
              </div>
            </button>
          ))}
        </div>
      </section>

      <section className="page-section page-section-narrow">
        <div className="chara-epilogue">
          <div className="quote-mark" aria-hidden="true" />
          <p className="chara-epilogue-text">
            这里的所有人，不过是同一个灵魂在不同世界中的投影。<br />你与我和她，皆是一体。
          </p>
        </div>
      </section>

      <div className="divider-rule" />

      {focus && (
        <div className="monologue-overlay" onClick={close}>
          <div className="monologue-card" onClick={(e) => e.stopPropagation()}>
            <img src={`/assets/chara-${focus.file}.png`} alt="" className="monologue-sprite" />
            <p className="monologue-name">{focus.name}</p>
            <p className="monologue-role">{focus.role}</p>
            <div className="monologue-mark" aria-hidden="true" />
            <p className="monologue-text">{focus.monologue}</p>
            <button className="monologue-close" onClick={close}>闭</button>
          </div>
        </div>
      )}
    </>
  );
}
