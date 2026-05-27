"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function AboutPage() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        el.querySelectorAll<HTMLElement>("[data-r]"),
        { y: 24, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.1, duration: 0.6, ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 85%", toggleActions: "play none none none" },
        }
      );
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <>
      <section className="page-section first">
        <div className="page-parallax" />
        <div className="page-head">
          <h1 className="page-title">关于</h1>
          <p className="page-sub">— About —</p>
        </div>
      </section>

      <section ref={root} className="page-section page-section-narrow">
        <div className="about-body">
          <p className="about-text" data-r>这是一个非官方的粉丝纪念站。<br />献给《素晴らしき日々 〜不連続存在〜》。</p>
          <p className="about-text" data-r>本站为纪念性质，所有图像素材版权归原制作公司所有。<br />若权利人认为存在侵权，请联系我们移除相关内容。</p>
          <p className="about-text about-muted" data-r>Subarashiki Hibi 16th Anniversary<br />2010 — 2026</p>
          <p className="about-credit" data-r>— Built with love for the wonderful everyday —</p>
        </div>
      </section>

      <div className="divider-rule" />
    </>
  );
}
