"use client";

import { useRef } from "react";
import { useReducedMotion } from "@/lib/motion";
import { gsap, useGSAP } from "@/lib/gsap";
import type { CharacterAsset } from "@/content/characters";

type CharacterParadeProps = {
  characters: CharacterAsset[];
};

export function CharacterParade({ characters }: CharacterParadeProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useGSAP(
    () => {
      if (reducedMotion || !ref.current) return;
      const cards = ref.current.querySelectorAll(".char-parade-card");
      gsap.fromTo(
        cards,
        { autoAlpha: 0, y: 48 },
        {
          autoAlpha: 1,
          y: 0,
          stagger: 0.08,
          duration: 0.55,
          ease: "power2.out",
          scrollTrigger: { trigger: ref.current, start: "top 74%", toggleActions: "play none none reverse" },
        }
      );
    },
    { scope: ref, dependencies: [reducedMotion, characters.length], revertOnUpdate: true }
  );

  return (
    <div ref={ref} className="character-parade">
      {characters.map((chara) => (
        <div key={chara.id} className="char-parade-card">
          <div className="char-parade-figure">
            <img src={chara.image} alt={chara.name} loading="lazy" />
          </div>
          <div className="char-parade-info">
            <strong>{chara.name}</strong>
            {chara.accent && <span>{chara.accent}</span>}
          </div>
        </div>
      ))}
    </div>
  );
}
