import Link from "next/link";

export default function NavBar() {
  return (
    <div className="w-full px-4 md:px-12 lg:px-20 pt-4 md:pt-6 flex justify-between items-center">
      <Link href="/">
        <p className="text-xl md:text-2xl lg:text-3xl font-semibold">
          <span className="text-[#FF7A05]">Faceit</span>OBS
        </p>
      </Link>
    </div>
  );
}
