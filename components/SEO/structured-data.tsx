export function StructuredData({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function WebsiteStructuredData() {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://faceitobs.online";

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "FaceitOBS",
    description:
      "Free FACEIT CS2 stats overlay for OBS. Auto-updating overlay that displays your K/D, ELO, WinRate, and recent match history in real-time on your live stream.",
    url: baseUrl,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${baseUrl}/generate?nickname={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };

  return <StructuredData data={websiteSchema} />;
}

export function SoftwareApplicationStructuredData() {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://faceitobs.online";

  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "FaceitOBS",
    applicationCategory: "GameApplication",
    operatingSystem: "Web Browser",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    description:
      "Free FACEIT CS2 stats overlay for OBS streaming. Auto-updating overlay that displays your K/D, ELO, WinRate, and recent match history in real-time.",
    url: baseUrl,
    featureList: [
      "Real-time FACEIT stats",
      "Auto-updating overlay",
      "Multiple template designs",
      "OBS integration",
      "K/D ratio display",
      "ELO tracking",
      "Win rate statistics",
      "Recent match history",
    ],
  };

  return <StructuredData data={softwareSchema} />;
}
