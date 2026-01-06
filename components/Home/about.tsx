import Image from "next/image";

export default function HomeAbout() {
  return (
    <div className="mt-12 md:mt-16">
      <h1 className="text-3xl md:text-4xl mb-3">What is this?</h1>
      <p className="leading-loose text-balance text-base md:text-lg">
        This is a FACEIT CS2 stats overlay that updates itself. No manual
        refresh, no re-adding sources in OBS, no annoying setup every match.
        Your overlay auto-syncs with your FACEIT games and keeps the stats live
        while you play.
      </p>
      <div className="w-full mt-3 md:mt-6">
        <Image
          className="rounded-lg w-full h-auto"
          src="/assets/obs-showcase.png"
          alt="hero-image"
          width={1900}
          height={1032}
          priority
        />
      </div>
    </div>
  );
}
