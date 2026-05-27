import { cn } from "@/lib/cn";

export function NoiseLayer({ fixed = false, subtle = false }: { fixed?: boolean; subtle?: boolean }) {
  return <div className={cn("noise-layer", fixed && "noise-layer-fixed", subtle && "noise-layer-subtle")} aria-hidden="true" />;
}

