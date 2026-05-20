"use client";

import { useEffect, useRef } from "react";
function FadeIn({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) el.classList.add("in"); },
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return <div ref={ref} className="fi">{children}</div>;
}

export default function AboutPage() {
  return (
    <>
      <section className="page-section first">
        <div className="page-bg-img" style={{ backgroundImage: `url("/assets/bg/bg1003a.png")` }} />
        <div className="page-parallax" />
        <FadeIn>
          <div className="page-head">
            <h1 className="page-title">About</h1>
            <p className="page-sub">— 16th Anniversary —</p>
          </div>
        </FadeIn>
      </section>

      <section className="page-section page-section-narrow">
        <FadeIn>
          <div className="about-body">
            <p className="about-text">
              『素晴らしき日々 〜不連続存在〜』は、2010年にケロQより発売された
              ビジュアルノベルです。
            </p>
            <p className="about-text">
              本サイトは、16周年を記念した非公式ファンサイトです。
              作品への愛と敬意を込めて制作されています。
            </p>
            <p className="about-text about-muted">
              This is an unofficial fan project for the 16th anniversary of
              Subarashiki Hibi ~Flying Panic Composition~.
              All asset rights belong to Kerog Q.
            </p>
            <p className="about-text about-credit">
              Site built with Next.js · Design by fan
            </p>
          </div>
        </FadeIn>
      </section>

      <div className="divider-rule" />
    </>
  );
}
