import faceitLevels from "@/lib/faceit-level.json";
import { Route } from "lucide-react";
import Image from "next/image";
import { Fragment_Mono } from "next/font/google";

interface BadgeTemplateWithRankProps {
  skillLevel: number;
  faceitElo: number;
  regional_rank: number;
  is_challenger: boolean;
  nickname: string;
}

const fragmentMono = Fragment_Mono({
  weight: ["400"],
  subsets: ["latin"],
  display: "swap",
});

function getLevelFromElo(elo: number) {
  const levels = faceitLevels.faceit_cs2_levels;
  for (const level of levels) {
    if (level.elo_end === null) {
      // Level 10 - no upper limit
      if (elo >= level.elo_start) {
        return level;
      }
    } else {
      if (elo >= level.elo_start && elo <= level.elo_end) {
        return level;
      }
    }
  }
  // Fallback to level 1 if ELO is below 100
  return levels[0];
}

export default function BadgeTemplateWithRank({
  faceitElo,
  nickname,
  regional_rank,
  is_challenger,
}: BadgeTemplateWithRankProps) {
  const levelData = getLevelFromElo(faceitElo);

  return (
    <div className={`flex gap-2 items-center ${fragmentMono.className}`}>
      <div className="flex gap-2 items-center p-3 text-lg text-white w-fit rounded-xl bg-[#1f1f1f]">
        {is_challenger ? (
          <Image
            src={faceitLevels?.faceit_challenger?.image_url}
            alt={`Level ${levelData.level}`}
            width={52}
            height={52}
            className="object-contain"
          />
        ) : (
          <Image
            src={levelData.image_url}
            alt={`Level ${levelData.level}`}
            width={52}
            height={52}
            className="object-contain"
          />
        )}
        <div className="flex flex-col">
          <p className="text-sm opacity-50 tracking-widest">{nickname}</p>
          <div className="flex gap-2 items-center -mt-1">
            <p className="text-[11px] px-2 rounded-full bg-[#e80128] font-semibold text-[#1f1f1f]">
              #{regional_rank}
            </p>
            <div className="flex gap-1 items-center">
              <p className="font-bold text-2xl">{faceitElo}</p>
              <Route size={22} className="font-bold" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
