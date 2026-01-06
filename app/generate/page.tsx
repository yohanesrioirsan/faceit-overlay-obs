import GenerateOverlay from "@/components/Generate/generate";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Generate Overlay",
  description:
    "Generate your custom FACEIT CS2 stats overlay for OBS. Enter your FACEIT nickname and choose from multiple template designs. Get your overlay URL instantly!",
  openGraph: {
    title: "Generate FACEIT Overlay - FaceitOBS",
    description:
      "Generate your custom FACEIT CS2 stats overlay for OBS. Enter your FACEIT nickname and choose from multiple template designs.",
    images: ["/assets/obs-showcase.png"],
  },
  twitter: {
    title: "Generate FACEIT Overlay - FaceitOBS",
    description:
      "Generate your custom FACEIT CS2 stats overlay for OBS. Enter your FACEIT nickname and choose from multiple template designs.",
  },
};

export default function GenerateOverlayPage() {
  return <GenerateOverlay />;
}
