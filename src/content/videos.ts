export type VideoAsset = {
  id: string;
  title: string;
  src: string;
  poster?: string;
  section?: "home" | "journey" | "takashima" | "bulletin" | "memories" | "ambient";
  tone?: "bright" | "strange" | "archive" | "terminal" | "after";
  tags?: string[];
  autoplay?: boolean;
  loop?: boolean;
  muted?: boolean;
};

export const videoAssets: VideoAsset[] = [
  {
    id: "op-movie",
    title: "Opening Movie",
    src: "/assets/op.mpg",
    poster: "/assets/bg/bg1015a.png",
    section: "home",
    tone: "bright",
    autoplay: true,
    loop: true,
    muted: true,
  },
];

export function getVideosBySection(section: VideoAsset["section"]): VideoAsset[] {
  return videoAssets.filter((video) => video.section === section);
}
