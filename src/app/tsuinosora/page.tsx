"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const SKY_CHAPTERS = [
  { title: "序", subtitle: "我们的情人", bg: "/assets/cg/main/ev0009.png", quote: "我们的情人，不过是随便借个名字，用幻想吹出来的肥皂泡。", source: "埃德蒙·罗斯坦《西哈诺·德·贝热拉克》", text: "那片天空之下。这个世界存在于此。" },
  { title: "壹", subtitle: "天空的起始", bg: "/assets/bg/bg1015a.png", quote: "世界是我所看到、触摸到、感受到的东西。所以，世界和我没有差别。", source: "水上由岐", text: "由岐望着天空。神并不存在——但她说出了那个词。" },
  { title: "贰", subtitle: "夏夜大三角", bg: "/assets/bg/bg1015d.png", quote: "在夏日中闪耀的大三角……无限的线即三角形……", source: "高岛柘榴", text: "顶点织女、牛郎、天津四。在星空下，少女们寻找着归还天空的地点。" },
  { title: "叁", subtitle: "黄昏之时", bg: "/assets/bg/bg1015b.png", quote: "我们的头脑比天空更辽阔——来，将二者对比着看一看。", source: "艾米莉·狄金森", text: "意识能容纳整个天空。那么，天空的极限在哪里？世界的极限又在哪里？" },
  { title: "肆", subtitle: "世界终结", bg: "/assets/denpa/sp0040a.png", quote: "世界要终结了。必然要终结了。这是真实。", source: "间宫卓司", text: "救世主宣告了末日的预言。回归天空的日子是7月20日。" },
  { title: "伍", subtitle: "坠落", bg: "/assets/denpa/sp0012a.png", quote: "月正笑。仿佛一无所知般。仿佛对人间的一切丑恶都浑然不知。", source: "间宫皆守", text: "从屋顶坠落——那一瞬间，时间慢了下来。" },
  { title: "陆", subtitle: "偏在转生", bg: "/assets/denpa/sp0008g.png", quote: "全部的'我'——不管是那个丑陋的女孩，还是那个漂亮的孩子。他们全部都是'我'。", source: "音无彩名 · 假设7", text: "只有一个灵魂。它轮回于所有生命之中。" },
  { title: "柒", subtitle: "向日葵的坡道", bg: "/assets/denpa/sp0084a.png", quote: "没有必要给死者供花了。", source: "水上由岐", text: "在坡道的顶端，天空依然广阔。什么都不曾改变，一切都已改变。" },
  { title: "终", subtitle: "终之空", bg: "/assets/denpa/sp0001h.png", quote: "幸福地生活吧。", source: "路德维希·维特根斯坦《草稿》", text: "这便是世界的全部意义。" },
];

function SkyChapter({ chapter, index, glitching }: { chapter: typeof SKY_CHAPTERS[0]; index: number; glitching: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const isLast = index === SKY_CHAPTERS.length - 1;

  useEffect(() => {
    const el = ref.current;
    const img = imgRef.current;
    const content = contentRef.current;
    if (!el || !img || !content) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: el, start: "top bottom", end: "bottom top",
        onEnter: () => gsap.to(img, { opacity: 0.4, scale: 1, duration: 0.8, ease: "power2.out" }),
        onLeave: () => { if (index < SKY_CHAPTERS.length - 1) gsap.to(img, { opacity: 0, scale: 1.08, duration: 0.5 }); },
        onEnterBack: () => gsap.to(img, { opacity: 0.4, scale: 1, duration: 0.8 }),
        onLeaveBack: () => gsap.to(img, { opacity: 0, scale: 1.08, duration: 0.5 }),
      });

      ScrollTrigger.create({
        trigger: el, start: "top 75%",
        onEnter: () => gsap.to(content, { opacity: 1, y: 0, duration: 0.7, ease: "power2.out", delay: 0.15 }),
        onLeaveBack: () => gsap.set(content, { opacity: 0, y: 30 }),
      });
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="sky-chapter">
      <div className="sky-chapter-bg">
        <img ref={imgRef} src={chapter.bg} alt="" className="sky-chapter-img" style={{ opacity: 0, transform: "scale(1.15)" }} />
        <div className="sky-chapter-overlay" />
      </div>
      <div ref={contentRef} className={`sky-chapter-content${isLast ? " sky-chapter-last" : ""}`} style={{ opacity: 0, y: 30 }}>
        <div className="sky-chapter-badge">
          <span className="sky-chapter-num">{chapter.title}</span>
          <span className="sky-chapter-sub">{chapter.subtitle}</span>
        </div>
        <blockquote className="sky-chapter-quote">
          <div className="sky-chapter-mark" />
          {isLast ? (
            <p className={`sky-chapter-text tsui-glitch-text${glitching ? " glitching" : ""}`} data-text={chapter.quote}>
              {chapter.quote}
              {glitching && (
                <>
                  <span className="tsui-glitch-block" style={{ left: "-5%", top: "30%", width: "25%", height: "10%", background: "rgba(255,80,80,0.2)" }} />
                  <span className="tsui-glitch-block" style={{ left: "75%", top: "60%", width: "20%", height: "7%", background: "rgba(80,200,255,0.18)" }} />
                </>
              )}
            </p>
          ) : (
            <p className="sky-chapter-text">{chapter.quote}</p>
          )}
          <cite className="sky-chapter-source">{chapter.source}</cite>
        </blockquote>
        <p className="sky-chapter-desc">{chapter.text}</p>
      </div>
    </section>
  );
}

function GlitchIntro({ onDone }: { onDone: () => void }) {
  const [phase, setPhase] = useState(0);
  const texts = [
    "终之空", "世界は終わる", "回归天空",
    "幸福地生活吧", "Wittgenstein", "偏在転生",
    "不连续存在", "坠落", "月正笑",
    "神不存在", "世界终结", "救世主",
    "夏夜大三角", "向日葵", "坡道",
    "英雄", "约定", "幸福的每一天",
    "透明な白", "预定和谐", "魂の偏在",
    "脑反转", "方舟", "光",
  ];
  const [showText, setShowText] = useState(-1);
  const [rgbBurst, setRgbBurst] = useState(false);
  const [blackout, setBlackout] = useState(false);

  useEffect(() => {
    const timeline = [
      { t: 0, fn: () => { setPhase(1); } },
      { t: 10, fn: () => { setPhase(2); setShowText(0); setRgbBurst(true); } },
      { t: 35, fn: () => { setPhase(3); setRgbBurst(false); } },
      { t: 75, fn: () => { setPhase(4); setShowText(1); setRgbBurst(true); } },
      { t: 90, fn: () => { setPhase(5); setRgbBurst(false); } },
      { t: 145, fn: () => { setPhase(6); setShowText(2); setRgbBurst(true); } },
      { t: 155, fn: () => { setPhase(7); setRgbBurst(false); } },
      { t: 190, fn: () => { setPhase(8); setShowText(3); } },
      { t: 245, fn: () => { setPhase(9); setShowText(4); setRgbBurst(true); } },
      { t: 255, fn: () => { setPhase(10); setRgbBurst(false); } },
      { t: 315, fn: () => { setPhase(11); setShowText(5); setRgbBurst(true); } },
      { t: 330, fn: () => { setPhase(12); setRgbBurst(false); } },
      { t: 380, fn: () => { setPhase(13); setShowText(6); } },
      { t: 405, fn: () => { setPhase(14); setShowText(7); setRgbBurst(true); } },
      { t: 420, fn: () => { setPhase(15); setRgbBurst(false); } },
      { t: 475, fn: () => { setPhase(16); setShowText(8); setRgbBurst(true); } },
      { t: 490, fn: () => { setPhase(17); setRgbBurst(false); } },
      { t: 525, fn: () => { setPhase(18); setShowText(9); } },
      { t: 580, fn: () => { setPhase(19); setShowText(10); setRgbBurst(true); } },
      { t: 595, fn: () => { setPhase(20); setRgbBurst(false); } },
      { t: 640, fn: () => { setPhase(21); setShowText(11); setRgbBurst(true); } },
      { t: 655, fn: () => { setPhase(22); setRgbBurst(false); } },
      { t: 715, fn: () => { setPhase(23); setShowText(12); } },
      { t: 750, fn: () => { setPhase(24); setShowText(13); setRgbBurst(true); } },
      { t: 765, fn: () => { setPhase(25); setRgbBurst(false); } },
      { t: 810, fn: () => { setPhase(26); setShowText(14); setRgbBurst(true); } },
      { t: 830, fn: () => { setPhase(27); setRgbBurst(false); } },
      { t: 880, fn: () => { setPhase(28); setShowText(15); } },
      { t: 910, fn: () => { setPhase(29); setShowText(16); setRgbBurst(true); } },
      { t: 925, fn: () => { setPhase(30); setRgbBurst(false); } },
      { t: 970, fn: () => { setPhase(31); setShowText(17); setRgbBurst(true); } },
      { t: 990, fn: () => { setPhase(32); setRgbBurst(false); } },
      { t: 1020, fn: () => { setPhase(33); setShowText(18); } },
      { t: 1075, fn: () => { setPhase(34); setShowText(19); setRgbBurst(true); } },
      { t: 1090, fn: () => { setPhase(35); setRgbBurst(false); } },
      { t: 1135, fn: () => { setPhase(36); setShowText(20); } },
      { t: 1180, fn: () => { setPhase(37); setRgbBurst(true); } },
      { t: 1240, fn: () => { setPhase(38); setRgbBurst(false); } },
      { t: 1280, fn: () => { setPhase(39); setShowText(21); setRgbBurst(true); } },
      { t: 1300, fn: () => { setPhase(40); setRgbBurst(false); } },
      { t: 1350, fn: () => { setPhase(41); setShowText(22); } },
      { t: 1400, fn: () => { setPhase(42); setShowText(-1); setRgbBurst(true); } },
      { t: 1430, fn: () => { setPhase(43); setRgbBurst(false); } },
      { t: 1470, fn: () => { setPhase(44); setRgbBurst(true); } },
      { t: 1500, fn: () => { setPhase(45); setRgbBurst(false); setBlackout(true); } },
      { t: 3200, fn: () => { setPhase(46); } },
      { t: 3700, fn: () => { onDone(); } },
    ];

    const timers = timeline.map(({ t, fn }) => setTimeout(fn, t));
    return () => timers.forEach(clearTimeout);
  }, [onDone]);

  return (
    <>
      {!blackout && (
        <div className="glitch-intro" aria-hidden="true">
          <div className="glitch-black" />
          {(phase >= 2 && phase < 4) && <div className="glitch-flash glitch-flash-w" />}
          {(phase >= 5 && phase < 7) && <div className="glitch-flash glitch-flash-b" />}
          {(phase >= 9 && phase < 11) && <div className="glitch-flash glitch-flash-w" />}
          {(phase >= 12 && phase < 14) && <div className="glitch-flash glitch-flash-b" />}
          {(phase >= 16 && phase < 18) && <div className="glitch-flash glitch-flash-w" />}
          {(phase >= 20 && phase < 22) && <div className="glitch-flash glitch-flash-b" />}
          {(phase >= 24 && phase < 26) && <div className="glitch-flash glitch-flash-w" />}
          {(phase >= 29 && phase < 31) && <div className="glitch-flash glitch-flash-b" />}
          {(phase >= 34 && phase < 36) && <div className="glitch-flash glitch-flash-w" />}
          {(phase >= 37 && phase < 41) && <div className="glitch-flash glitch-flash-flicker" />}
          {(phase >= 42) && <div className="glitch-flash glitch-flash-final" />}
          {rgbBurst && (
            <>
              <div className="glitch-channel glitch-channel-r" />
              <div className="glitch-channel glitch-channel-g" />
              <div className="glitch-channel glitch-channel-b" />
              <div className="glitch-channel glitch-channel-c" />
            </>
          )}
          {!rgbBurst && phase >= 14 && phase < 37 && phase % 3 === 0 && (
            <>
              <div className="glitch-channel glitch-channel-r" style={{ animationDuration: "0.04s" }} />
              <div className="glitch-channel glitch-channel-b" style={{ animationDuration: "0.06s" }} />
            </>
          )}
          {phase >= 3 && (
            <>
              <div className="crt-band" style={{ top: "8%", height: "5%", width: "65%", left: "-8%", animationDuration: "0.06s" }} />
              <div className="crt-band" style={{ top: "22%", height: "3%", width: "40%", left: "52%", animationDuration: "0.08s", background: "rgba(255,80,80,0.12)" }} />
              <div className="crt-band" style={{ top: "38%", height: "6%", width: "55%", left: "-12%", animationDuration: "0.05s" }} />
              <div className="crt-band" style={{ top: "50%", height: "4%", width: "30%", left: "60%", animationDuration: "0.07s", background: "rgba(80,200,255,0.10)" }} />
              <div className="crt-band" style={{ top: "65%", height: "5%", width: "75%", left: "-5%", animationDuration: "0.09s" }} />
              <div className="crt-band" style={{ top: "78%", height: "3%", width: "35%", left: "45%", animationDuration: "0.06s", background: "rgba(255,200,80,0.08)" }} />
              <div className="crt-band" style={{ top: "90%", height: "4%", width: "50%", left: "-15%", animationDuration: "0.07s" }} />
            </>
          )}
          {(phase >= 8) && (
            <>
              <div className="crt-band" style={{ top: "2%", height: "4%", width: "25%", left: "55%", animationDuration: "0.04s", background: "rgba(255,255,255,0.20)" }} />
              <div className="crt-band" style={{ top: "15%", height: "5%", width: "45%", left: "-18%", animationDuration: "0.06s", background: "rgba(80,255,80,0.07)" }} />
              <div className="crt-band" style={{ top: "30%", height: "3%", width: "20%", left: "15%", animationDuration: "0.07s" }} />
              <div className="crt-band" style={{ top: "45%", height: "6%", width: "35%", left: "58%", animationDuration: "0.05s" }} />
              <div className="crt-band" style={{ top: "58%", height: "4%", width: "40%", left: "-8%", animationDuration: "0.08s", background: "rgba(200,100,255,0.08)" }} />
              <div className="crt-band" style={{ top: "72%", height: "3%", width: "55%", left: "35%", animationDuration: "0.05s" }} />
              <div className="crt-band" style={{ top: "85%", height: "5%", width: "30%", left: "-10%", animationDuration: "0.07s" }} />
              <div className="crt-band" style={{ top: "95%", height: "3%", width: "60%", left: "20%", animationDuration: "0.06s" }} />
            </>
          )}
          {showText >= 0 && showText < texts.length && phase < 37 && (
            <div className={`glitch-text${rgbBurst ? " glitch-text-corrupt" : ""}`} style={{ color: "#fff" }}>
              {texts[showText]}
            </div>
          )}
          <div className="glitch-noise" />
          <div className="glitch-scanlines" />
          {phase >= 6 && <div className="glitch-bars" />}
          {rgbBurst && (
            <>
              <div className="glitch-block" style={{ left: "10%", top: "5%", width: "25%", height: "4%" }} />
              <div className="glitch-block" style={{ left: "50%", top: "18%", width: "35%", height: "6%" }} />
              <div className="glitch-block" style={{ left: "5%", top: "38%", width: "15%", height: "3%" }} />
              <div className="glitch-block" style={{ left: "60%", top: "50%", width: "30%", height: "5%" }} />
              <div className="glitch-block" style={{ left: "25%", top: "72%", width: "45%", height: "4%" }} />
              <div className="glitch-block" style={{ left: "40%", top: "88%", width: "20%", height: "3%" }} />
              <div className="glitch-block" style={{ left: "70%", top: "30%", width: "18%", height: "7%" }} />
              <div className="glitch-block" style={{ left: "0%", top: "60%", width: "22%", height: "5%" }} />
            </>
          )}
          {!rgbBurst && phase >= 6 && phase % 5 < 2 && (
            <>
              <div className="glitch-block" style={{ left: "30%", top: "25%", width: "20%", height: "4%" }} />
              <div className="glitch-block" style={{ left: "55%", top: "65%", width: "15%", height: "5%" }} />
            </>
          )}
        </div>
      )}
      {blackout && <div className="glitch-blackout" style={{ opacity: phase >= 46 ? 0 : 1 }} />}
    </>
  );
}

export default function TsuiNoSoraPage() {
  const [scrollY, setScrollY] = useState(0);
  const [introDone, setIntroDone] = useState(false);
  const [glitching, setGlitching] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const schedule = () => {
      const delay = 3000 + Math.random() * 6000;
      return setTimeout(() => {
        setGlitching(true);
        setTimeout(() => setGlitching(false), 1200);
        timer = schedule();
      }, delay);
    };
    let timer = schedule();
    return () => clearTimeout(timer);
  }, []);

  /* ─── Cloud vortex scroll sequence ─── */
  useEffect(() => {
    const el = document.querySelector(".vortex-track");
    if (!el) return;
    const imgs = el.querySelectorAll<HTMLElement>(".vortex-img-wrap");
    if (!imgs.length) return;
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".vortex-section", start: "top bottom", end: "bottom top",
        scrub: 1.5, pin: true,
      },
    });
    tl.to(imgs[0], { opacity: 1, scale: 1, duration: 0.3 })
      .to(imgs[0], { opacity: 0, duration: 0.3 })
      .to(imgs[1], { opacity: 1, scale: 1, duration: 0.3 })
      .to(imgs[1], { opacity: 0, duration: 0.3 })
      .to(imgs[2], { opacity: 1, scale: 1, duration: 0.3 });
  }, []);

  return (
    <>
      {!introDone && <GlitchIntro onDone={() => setIntroDone(true)} />}
      <section className="page-section first sky-hero-section">
        <div className="page-parallax" style={{ transform: `translateY(${scrollY * 0.15}px)` }} />
        <div className="page-head" style={{ zIndex: 2 }}>
          <h1 className="page-title" style={{ fontSize: "clamp(3rem, 8vw, 6rem)" }}>
            <span className={`tsui-glitch-text${glitching ? " glitching" : ""}`} data-text="终之空">
              终之空
              {glitching && (
                <>
                  <span className="tsui-glitch-block" style={{ left: "-10%", top: "20%", width: "30%", height: "8%", background: "rgba(255,80,80,0.25)" }} />
                  <span className="tsui-glitch-block" style={{ left: "80%", top: "50%", width: "20%", height: "6%", background: "rgba(80,200,255,0.2)" }} />
                  <span className="tsui-glitch-block" style={{ left: "40%", top: "75%", width: "25%", height: "5%", background: "rgba(255,200,80,0.15)" }} />
                </>
              )}
            </span>
          </h1>
          <p className="page-sub">— The Sky That Ends —</p>
        </div>
      </section>

      <div className="sky-journey">
        {SKY_CHAPTERS.map((ch, i) => (
          <SkyChapter key={i} chapter={ch} index={i} glitching={glitching} />
        ))}
      </div>

      {/* Cloud vortex scroll sequence */}
      <section className="vortex-section">
        <div className="vortex-track">
          <div className="vortex-img-wrap">
            <img src="/assets/story/ev8005a.png" alt="" className="vortex-img" />
          </div>
          <div className="vortex-img-wrap">
            <img src="/assets/story/ev8005j.png" alt="" className="vortex-img" />
          </div>
          <div className="vortex-img-wrap">
            <img src="/assets/story/ev8005k.png" alt="" className="vortex-img" />
          </div>
        </div>
        <div className="vortex-overlay" />
        <div className="vortex-text">
          <div className="vortex-text-line" />
          <p className="vortex-quote">终之空</p>
          <p className="vortex-sub">——这便是世界的全部意义。</p>
        </div>
      </section>

      <div className="divider-rule" />
    </>
  );
}
