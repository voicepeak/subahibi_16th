"use client";

import Link from "next/link";
import type { CSSProperties } from "react";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import { CGLoopBackdrop } from "@/components/cinematic/CGLoopBackdrop";
import { GlitchLayer } from "@/components/cinematic/GlitchLayer";
import { useReducedMotion } from "@/lib/motion";
import { gsap, ScrollTrigger, useGSAP, ensureGsapReady } from "@/lib/gsap";
import { cn } from "@/lib/cn";
import type { JourneyScene } from "@/content/journey-scenes";

export function ScrollScene({ scene, index }: { scene: JourneyScene; index: number }) {
  const ref = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();

  useGSAP(
    () => {
      ensureGsapReady();
      if (reducedMotion || !ref.current) return;
      const content = ref.current.querySelector(".scroll-scene-content");
      const artifact = ref.current.querySelector(".scroll-scene-artifact");
      const bg = ref.current.querySelector(".cg-loop-backdrop");

      gsap.fromTo(
        content,
        { autoAlpha: 0, y: 34, filter: "blur(2px)" },
        {
          autoAlpha: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 0.58,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ref.current,
            start: "top 72%",
            toggleActions: "play none none reverse",
          },
        }
      );

      if (artifact) {
        gsap.fromTo(
          artifact,
          { autoAlpha: 0, y: 36, rotate: index % 2 === 0 ? 2.5 : -2.5, scale: 0.96 },
          {
            autoAlpha: 1,
            y: 0,
            rotate: 0,
            scale: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: ref.current,
              start: "top 68%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      if (bg) {
        gsap.to(bg, {
          yPercent: index % 2 === 0 ? -8 : 8,
          scale: 1.05,
          ease: "none",
          scrollTrigger: {
            trigger: ref.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.2,
          },
        });
      }

      ScrollTrigger.refresh();
    },
    { scope: ref, dependencies: [reducedMotion], revertOnUpdate: true }
  );

  const style = { "--scene-accent": scene.visual.accent } as CSSProperties;
  const sequence = String(index + 1).padStart(2, "0");

  return (
    <section
      id={scene.id}
      ref={ref}
      style={style}
      className={cn("scroll-scene", `scroll-scene-${scene.mood}`, `scroll-scene-${scene.visual.align}`)}
    >
      <CGLoopBackdrop images={[scene.visual.backdrop]} intensity={scene.mood === "terminal" ? "unstable" : "calm"} paused />
      {scene.mood === "terminal" && <GlitchLayer intensity="medium" />}
      <span className="scroll-scene-index" aria-hidden="true">{sequence}</span>
      <div className="scroll-scene-content">
        <p className="scroll-scene-kicker">{scene.chapter} / {scene.eyebrow}</p>
        <h2>{scene.title}</h2>
        <p className="scroll-scene-subtitle">{scene.subtitle}</p>
        <div className="scroll-scene-lines">
          {scene.lines.map((line) => <p key={line}>{line}</p>)}
        </div>
        <div className="scroll-scene-footer">
          <span className="scroll-scene-signal">{scene.signal}</span>
          {scene.archiveHref && (
            <Link className="sky-button sky-button-dark" href={scene.archiveHref}>
              <span>{scene.archiveLabel}</span>
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
          )}
        </div>
      </div>
      <aside className="scroll-scene-artifact" aria-label={scene.visual.caption}>
        <div className="scroll-scene-artifact-image">
          <img src={scene.visual.image} alt="" loading="lazy" />
        </div>
        <p>{scene.visual.caption}</p>
      </aside>
    </section>
  );
}

