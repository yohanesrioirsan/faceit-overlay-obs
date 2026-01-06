import Link from "next/link";
import { Button } from "../ui/button";

export default function HomeCta() {
  return (
    <div className="mt-12 md:mt-16">
      <h1 className="text-3xl md:text-4xl lg:text-5xl mb-3 text-center">
        It is 100% <span className="text-[#FF7A05] italic">free</span> and{" "}
        <span className="text-[#FF7A05] italic">easy </span>
        to integrate
      </h1>
      <p className="leading-loose text-balance text-base md:text-lg text-center">
        Built as a side project by players, for players.You can even request
        your own custom overlay design and get it made for free.
      </p>
      <div className="text-center">
        <Link href="/generate">
          <Button className="bg-[#FF7A05] text-white hover:bg-[#FF7A05]/70 w-fit cursor-pointer mt-3">
            Try It Now
          </Button>
        </Link>
      </div>
    </div>
  );
}
