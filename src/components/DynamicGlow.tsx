"use client";

import { useEffect } from "react";

function getMoodAccent(): string {
  const h = new Date().getHours();
  if (h >= 5 && h < 8) return "radial-gradient(ellipse at 50% 30%, rgba(196, 164, 108, 0.04), transparent 70%)";
  if (h >= 8 && h < 16) return "radial-gradient(ellipse at 50% 30%, rgba(140, 164, 108, 0.03), transparent 70%)";
  if (h >= 16 && h < 19) return "radial-gradient(ellipse at 50% 30%, rgba(196, 140, 108, 0.04), transparent 70%)";
  if (h >= 19 && h < 22) return "radial-gradient(ellipse at 50% 30%, rgba(108, 140, 196, 0.03), transparent 70%)";
  return "radial-gradient(ellipse at 50% 30%, rgba(108, 108, 140, 0.03), transparent 70%)";
}

export function DynamicGlow() {
  useEffect(() => {
    const root = document.documentElement;
    const update = () => root.style.setProperty("--mood-glow", getMoodAccent());
    update();
    const id = setInterval(update, 60000);
    return () => clearInterval(id);
  }, []);
  return null;
}
