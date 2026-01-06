import type { Metadata } from "next";
import "./globals.css";
import { Poppins } from "next/font/google";
import {
  WebsiteStructuredData,
  SoftwareApplicationStructuredData,
} from "@/components/SEO/structured-data";

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://faceitobs.vercel.app"
  ),
  title: {
    default: "FaceitOBS - Showcase your FACEIT CS2 stats on stream",
    template: "%s | FaceitOBS",
  },
  description:
    "Free FACEIT CS2 stats overlay for OBS. Auto-updating overlay that displays your K/D, ELO, WinRate, and recent match history in real-time on your live stream. No manual refresh needed!",
  keywords: [
    "FACEIT",
    "CS2",
    "Counter-Strike 2",
    "OBS overlay",
    "streaming overlay",
    "FACEIT stats",
    "gaming overlay",
    "live stream",
    "ELO tracker",
    "K/D ratio",
    "win rate",
    "match history",
  ],
  authors: [{ name: "FaceitOBS" }],
  creator: "FaceitOBS",
  publisher: "FaceitOBS",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "FaceitOBS",
    title: "FaceitOBS - Showcase your FACEIT CS2 stats on stream",
    description:
      "Free FACEIT CS2 stats overlay for OBS. Auto-updating overlay that displays your K/D, ELO, WinRate, and recent match history in real-time on your live stream.",
    images: [
      {
        url: "/assets/obs-showcase.png",
        width: 1900,
        height: 1032,
        alt: "FACEIT OBS Overlay Showcase",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "FaceitOBS - Showcase your FACEIT CS2 stats on stream",
    description:
      "Free FACEIT CS2 stats overlay for OBS. Auto-updating overlay that displays your K/D, ELO, WinRate, and recent match history in real-time.",
    images: ["/assets/obs-showcase.png"],
    creator: "@faceitobs",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    // Add your verification codes here when available
    // google: "your-google-verification-code",
    // yandex: "your-yandex-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <WebsiteStructuredData />
        <SoftwareApplicationStructuredData />
        {children}
      </body>
    </html>
  );
}
