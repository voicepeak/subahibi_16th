"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CGLightbox } from "@/components/CGLightbox";

gsap.registerPlugin(ScrollTrigger);

const CGS = [
  { src: "/assets/cg/main/ev0009.png", passage: "在人挤人的车站大楼的楼顶上……只有我一个人在这片天空下注视着这个世界。", chapter: "BGT1 序章 — 7月12日" },
  { src: "/assets/cg/main/ev0008b.png", passage: "由岐：我啊……是从什么时候开始存在于此的呢……从何时开始……我成为了我呢……", chapter: "BGT1 序章" },
  { src: "/assets/cg/main/ev7001.png", passage: "世界是我所看到、触摸到、感受到的东西。所以，世界和我没有差别。", chapter: "BGT4 偏在转生" },
  { src: "/assets/cg/main/ev6005.png", passage: "下一辆列车是特别快车，开往夏夜大三角。", chapter: "BGT6 银河铁道之夜" },
  { src: "/assets/cg/main/ev7010.png", passage: "悲惨的也好、污秽的也好、美丽的也好、荣耀的也好——他们全部都是我。", chapter: "BGT4 — 假设" },
  { src: "/assets/cg/main/ev8011a.png", passage: "向日葵依旧向着太阳，仿佛什么也不曾发生过。", chapter: "BGT8 尾声 — 向日葵的坡道" },
  { src: "/assets/cg/main/ev8017.png", passage: "皆守：那……不是英雄会做的约定啊……", chapter: "BGT8 尾声" },
  { src: "/assets/cg/main/ev4006a.png", passage: "由岐：蝉的叫声……这里是……屋顶？为什么……为什么会在这里……", chapter: "终之空Ⅱ" },
  { src: "/assets/cg/main/ev4001a.png", passage: "彩名：没有什么……我们走吧……去那开始的地点……", chapter: "终之空Ⅱ" },
];

const STORY_BEATS = [
  { src: "/assets/story/ev0001.png", quote: "在人挤人的车站大楼的楼顶上…只有我一个人在这片天空下注视着这个世界。", label: "序章 · 7月12日" },
  { src: "/assets/story/ev0008a.png", quote: "那一年夏天，我们回到了那个村子。向日葵依旧向着太阳。", label: "终章 · 向日葵坡道" },
  { src: "/assets/story/ev8005a.png", quote: "世界要终结了。必然要终结了。这是真实。", label: "终之空" },
  { src: "/assets/story/ev8005j.png", quote: "全部的「我」——不管是谁，他们全部都是「我」。", label: "偏在转生" },
  { src: "/assets/story/ev8015.png", quote: "只有一个灵魂。它轮回于所有生命之中。", label: "魂之环" },
];

export default function MemoriesPage() {
  const gridRef = useRef<HTMLDivElement>(null);
  const storyRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".cg-grid-cell", { y: 40, opacity: 0, scale: 0.95 }, {
        y: 0, opacity: 1, scale: 1, stagger: { amount: 0.5, from: "random" },
        duration: 0.55, ease: "power2.out",
        scrollTrigger: { trigger: gridRef.current, start: "top 82%", toggleActions: "play none none none" },
      });
    });
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const el = storyRef.current;
    if (!el) return;
    const panels = el.querySelectorAll<HTMLElement>(".story-panel");
    const ctx = gsap.context(() => {
      panels.forEach((panel, i) => {
        const img = panel.querySelector<HTMLElement>(".story-img");
        const text = panel.querySelector<HTMLElement>(".story-text-box");
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: panel, start: "top 75%", end: "top 25%",
            toggleActions: "play reverse play reverse",
          },
        });
        tl.fromTo(img, { opacity: 0, scale: 1.12, filter: "grayscale(0.8) brightness(0.5)" },
                    { opacity: 0.2, scale: 1, filter: "grayscale(0) brightness(1)", duration: 0.8, ease: "power2.out" })
          .fromTo(text, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }, "-=0.4");
      });
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <>
      <section className="page-section first" style={{ overflow: "hidden" }}>
        <div ref={heroRef} className="story-hero-vid">
          <video autoPlay muted loop playsInline className="story-hero-vid-el">
            <source src="/assets/op.mpg" type="video/mpeg" />
          </video>
          <div className="story-hero-vid-overlay" />
        </div>
        <div className="page-parallax" style={{ transform: `translateY(${scrollY * 0.15}px) scale(${1 + scrollY * 0.0002})` }} />
        <div className="page-head" style={{ zIndex: 3 }}>
          <h1 className="page-title">記憶</h1>
          <p className="page-sub">— Scene Archive —</p>
        </div>
      </section>

      <section className="page-section">
        <div ref={gridRef}><CGLightbox images={CGS} /></div>
      </section>

      <section ref={storyRef} className="story-scroll">
        <div className="story-scroll-head">
          <div className="quote-mark" aria-hidden="true" />
          <p className="story-scroll-title">叙事 · Narrative</p>
        </div>
        {STORY_BEATS.map((beat, i) => (
          <div key={i} className="story-panel">
            <img src={beat.src} alt="" className="story-img" loading="lazy" />
            <div className="story-panel-overlay" />
            <div className="story-text-box">
              <div className="story-text-mark" />
              <p className="story-quote">{beat.quote}</p>
              <span className="story-label">{beat.label}</span>
            </div>
          </div>
        ))}
        <div className="story-scroll-end">
          <div className="story-scroll-end-line" />
          <p className="story-scroll-end-text">世界は、まだ続いている。</p>
        </div>
      </section>

      <div className="divider-rule" />
    </>
  );
}
