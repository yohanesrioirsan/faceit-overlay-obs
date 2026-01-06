import HomePage from "@/components/Home/home";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FaceitOBS",
  description:
    "Free FACEIT CS2 stats overlay for OBS. Auto-updating overlay that displays your K/D, ELO, WinRate, and recent match history in real-time on your live stream. No manual refresh needed!",
  openGraph: {
    title: "FaceitOBS - Showcase your FACEIT CS2 stats on stream",
    description:
      "Free FACEIT CS2 stats overlay for OBS. Auto-updating overlay that displays your K/D, ELO, WinRate, and recent match history in real-time on your live stream.",
    images: ["/assets/obs-showcase.png"],
  },
};

export default function Home() {
  return <HomePage />;
}
