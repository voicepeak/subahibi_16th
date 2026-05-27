"use client";

import Link from "next/link";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import { CGLoopBackdrop } from "@/components/cinematic/CGLoopBackdrop";
import { GlitchLayer } from "@/components/cinematic/GlitchLayer";
import { useReducedMotion } from "@/lib/motion";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { cn } from "@/lib/cn";
import type { JourneyScene } from "@/content/journey-scenes";

export function ScrollScene({ scene, index }: { scene: JourneyScene; index: number }) {
  const ref = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();

  useGSAP(
    () => {
      if (reducedMotion || !ref.current) return;
      const content = ref.current.querySelector(".scroll-scene-content");
      const bg = ref.current.querySelector(".cg-loop-backdrop");

      gsap.fromTo(
        content,
        { autoAlpha: 0, y: 44, filter: "blur(10px)" },
        {
          autoAlpha: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 0.9,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ref.current,
            start: "top 72%",
            toggleActions: "play none none reverse",
          },
        }
      );

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

  return (
    <section id={scene.id} ref={ref} className={cn("scroll-scene", `scroll-scene-${scene.mood}`)}>
      <CGLoopBackdrop images={[scene.background]} intensity={scene.mood === "blackout" ? "unstable" : "calm"} paused />
      {(scene.mood === "archive" || scene.mood === "blackout" || scene.mood === "terminal") && (
        <GlitchLayer intensity={scene.mood === "blackout" ? "medium" : "low"} />
      )}
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
    </section>
  );
}

