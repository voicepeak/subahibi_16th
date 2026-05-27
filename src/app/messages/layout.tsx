import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Galaxy Railway",
  description: "银河铁道车站留言板——列车驶过后留下的纪念留言。",
};

export default function MessagesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
