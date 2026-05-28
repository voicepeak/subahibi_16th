import { cn } from "@/lib/cn";

type MediaOverlayProps = {
  chapter?: string;
  date?: string;
  status?: string;
  headline?: string;
  subtitle?: string;
  cta?: React.ReactNode;
  tone?: "bright" | "strange" | "archive" | "terminal" | "after";
  className?: string;
};

export function MediaOverlay({ chapter, date, status, headline, subtitle, cta, tone, className }: MediaOverlayProps) {
  return (
    <div className={cn("media-overlay", tone && `media-overlay-${tone}`, className)}>
      {(chapter || date || status) && (
        <p className="media-overlay-meta">
          {chapter && <span>{chapter}</span>}
          {date && <span>{date}</span>}
          {status && <span>{status}</span>}
        </p>
      )}
      {headline && <h2 className="media-overlay-headline">{headline}</h2>}
      {subtitle && <p className="media-overlay-subtitle">{subtitle}</p>}
      {cta && <div className="media-overlay-cta">{cta}</div>}
    </div>
  );
}
