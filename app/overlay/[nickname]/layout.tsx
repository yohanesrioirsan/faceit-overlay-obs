import type { Metadata } from "next";

type Props = {
  params: Promise<{ nickname: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { nickname } = await params;

  return {
    title: `${nickname}'s FACEIT Overlay`,
    description: `Live FACEIT CS2 stats overlay for ${nickname}. View real-time K/D, ELO, WinRate, and match history.`,
    robots: {
      index: false,
      follow: false,
    },
  };
}

export default function OverlayLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

