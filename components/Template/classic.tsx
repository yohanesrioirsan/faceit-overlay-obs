import { ArrowRight } from "lucide-react";
import { Fragment_Mono } from "next/font/google";

interface ClassicTemplateProps {
  nickname: string;
  recentMatches: any[];
  skillLevel: number;
  faceitElo: number;
  kdRatio: string;
  winRate: string;
}

const fragmentMono = Fragment_Mono({
  weight: ["400"],
  subsets: ["latin"],
  display: "swap",
});

export default function ClassicTemplate({
  nickname,
  recentMatches,
  skillLevel,
  faceitElo,
  kdRatio,
  winRate,
}: ClassicTemplateProps) {
  return (
    <div
      className={`p-3 max-w-sm bg-black text-lg border border-white text-white ${fragmentMono.className}`}
    >
      <div className="px-3 py-2 space-y-2">
        <div className="w-full flex justify-between items-center">
          <div className="flex items-center gap-2">
            <p className="font-semibold">{nickname}</p>
          </div>
          <p className="flex gap-1">
            {recentMatches.map((match, index) => (
              <span key={index} className={match === "L" ? "text-red-500" : ""}>
                {match}
              </span>
            ))}
          </p>
        </div>
        <div className="grid grid-cols-2">
          <p className="flex items-center gap-1">
            <ArrowRight className="w-4 h-4" /> Level {skillLevel}
          </p>
          <p className="flex items-center gap-1 justify-end">
            <ArrowRight className="w-4 h-4" /> {kdRatio} K/D
          </p>
          <p className="flex items-center gap-1">
            <ArrowRight className="w-4 h-4" /> {faceitElo} ELO
          </p>
          <p className="flex items-center gap-1 justify-end">
            <ArrowRight className="w-4 h-4" /> {winRate}% WinRate
          </p>
        </div>
      </div>
    </div>
  );
}
