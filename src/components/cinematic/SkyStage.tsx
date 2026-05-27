import { CGLoopBackdrop } from "@/components/cinematic/CGLoopBackdrop";

export function SkyStage({ children, images }: { children: React.ReactNode; images: string[] }) {
  return (
    <section className="sky-stage">
      <CGLoopBackdrop images={images} intensity="calm" />
      <div className="sky-stage-content">{children}</div>
    </section>
  );
}

