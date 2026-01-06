import Image from "next/image";
import { Button } from "../ui/button";
import Link from "next/link";

export default function HomeHero() {
  return (
    <div className="flex flex-col md:flex-row justify-between items-center h-auto md:h-[80vh] gap-8 md:gap-0 mt-3">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl md:text-4xl lg:text-5xl leading-tight">
          Showcase your <span className="font-bold text-[#FF7A05]">FACEIT</span>{" "}
          stats
          <span className="block leading-tight">on your stream</span>
        </h1>
        <Link href="/generate">
          <Button className="bg-[#FF7A05] text-white hover:bg-[#FF7A05]/70 w-fit cursor-pointer mt-3">
            Generate Yours
          </Button>
        </Link>
      </div>
      <Image
        src="/assets/hero-img.png"
        alt="hero-image"
        width={500}
        height={500}
        priority
        className="w-full md:w-auto max-w-xs md:max-w-md"
      />
    </div>
  );
}
