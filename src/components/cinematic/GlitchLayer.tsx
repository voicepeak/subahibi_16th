import { cn } from "@/lib/cn";

export function GlitchLayer({ intensity = "low" }: { intensity?: "low" | "medium" | "high" }) {
  return (
    <div className={cn("glitch-layer", `glitch-layer-${intensity}`)} aria-hidden="true">
      <span />
      <span />
      <span />
    </div>
  );
}

