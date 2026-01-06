import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Footer() {
  return (
    <div className="my-8 py-8 border-t border-b border-white/10">
      <div className="text-center">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-light mb-2">
          Like the project?
        </h2>
        <h3 className="text-3xl md:text-4xl lg:text-5xl font-light mb-6">
          Keep it alive
        </h3>

        <div className="flex flex-col sm:flex-row gap-3 justify-center items-center mb-2">
          <Link href="https://steamcommunity.com/tradeoffer/new/?partner=164302201&token=SFueAA7j">
            <Button className="bg-[#FF7A05] text-white hover:bg-[#FF7A05]/80 px-6 py-2 font-medium">
              Trade Offers
            </Button>
          </Link>
          <Link href="https://sociabuzz.com/yohanesrioirsan">
            <Button className="bg-[#FF7A05] text-white hover:bg-[#FF7A05]/80 px-6 py-2 font-medium">
              Donations
            </Button>
          </Link>
        </div>

        <p className="text-sm text-gray-400">(totally optional)</p>

        <p className="text-sm text-gray-500 mt-6">
          Any requests or questions? Mail me here{" "}
          <a
            href="mailto:rioirsan8@gmail.com"
            className="text-[#FF7A05] hover:text-[#FF7A05]/80 transition-colors underline"
          >
            rioirsan8@gmail.com
          </a>
        </p>

        <p className="text-sm text-gray-500 mt-6">
          <strong>Disclaimer:</strong> This site is not affiliated with or endorsed by FACEIT. All data is provided by the FACEIT API. This is an open source project that you can contribute to on{" "}
          <a
            href="https://github.com/yohanesrioirsan/faceit-overlay-obs"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#FF7A05] hover:text-[#FF7A05]/80 transition-colors underline"
          >
            GitHub
          </a>
          .
        </p>

        <p className="text-sm text-gray-500 mt-3">
          Made with ❤️ by{" "}
          <a
            href="https://yohanesrioirsan.is-a.dev/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#FF7A05] hover:text-[#FF7A05]/80 transition-colors underline"
          >
            yohanesrioirsan
          </a>
        </p>

        <p className="text-xs text-gray-600 mt-4">
          © {new Date().getFullYear()} FaceitOBS. All rights reserved.
        </p>
      </div>
    </div>
  );
}
