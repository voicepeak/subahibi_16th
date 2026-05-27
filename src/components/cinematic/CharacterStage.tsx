"use client";

import { useRef, useState } from "react";
import { useReducedMotion } from "@/lib/motion";
import { gsap, useGSAP } from "@/lib/gsap";
import { cn } from "@/lib/cn";

type CharacterStageProps = {
  image: string;
  name: string;
  subtitle?: string;
  quote?: string;
  side?: "left" | "right" | "center";
  bgImage?: string;
};

export function CharacterStage({ image, name, subtitle, quote, side = "center", bgImage }: CharacterStageProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useGSAP(
    () => {
      if (reducedMotion || !ref.current) return;
      const el = ref.current;
      gsap.fromTo(
        el.querySelector(".character-stage-sprite"),
        { autoAlpha: 0, x: side === "left" ? -60 : side === "right" ? 60 : 0, scale: 0.94 },
        {
          autoAlpha: 1,
          x: 0,
          scale: 1,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 78%", toggleActions: "play none none reverse" },
        }
      );
      gsap.fromTo(
        el.querySelector(".character-stage-copy"),
        { autoAlpha: 0, y: 24 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.6,
          delay: 0.3,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 78%", toggleActions: "play none none reverse" },
        }
      );
    },
    { scope: ref, dependencies: [reducedMotion], revertOnUpdate: true }
  );

  return (
    <div ref={ref} className={cn("character-stage", `character-stage-${side}`)}>
      {bgImage && (
        <img src={bgImage} alt="" className="character-stage-bg" aria-hidden="true" />
      )}
      <div className="character-stage-figure">
        <img src={image} alt={name} className="character-stage-sprite" loading="lazy" />
      </div>
      <div className="character-stage-copy">
        <h2>{name}</h2>
        {subtitle && <p className="character-stage-subtitle">{subtitle}</p>}
        {quote && <p className="character-stage-quote">{quote}</p>}
      </div>
    </div>
  );
}
