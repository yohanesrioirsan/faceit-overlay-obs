import faceitLevels from "@/lib/faceit-level.json";
import Image from "next/image";

interface Radar2TemplateProps {
  nickname: string;
  faceitElo: number;
  kdRatio: string;
  winRate: string;
  avatar: string;
  wins: number;
  losses: number;
}

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

export default function Radar2Template({
  nickname,
  faceitElo,
  kdRatio,
  winRate,
  avatar,
  wins,
  losses,
}: Radar2TemplateProps) {
  const levelData = getLevelFromElo(faceitElo);
  return (
    <div className="flex flex-col w-[250px]">
      <Image
        src={avatar}
        alt={`${nickname} Avatar`}
        width={250}
        height={250}
        className="w-full h-auto"
      />

      <div className="flex flex-col bg-neutral-900/90 p-3 w-full rounded-b-lg">
        <div className="flex justify-between items-center">
          <p className="font-semibold text-xl">{nickname}</p>
          <div className="flex gap-3 items-center">
            <p className="text-green-500">
              {wins} <span className="font-semibold">W</span>
            </p>
            <p className="text-red-500">
              {losses} <span className="font-semibold">L</span>
            </p>
          </div>
        </div>

        <div className="flex justify-between items-center mt-2">
          <div className="flex gap-2 items-center">
            <Image
              src={levelData.image_url}
              alt={`Level ${levelData.level}`}
              width={22}
              height={22}
              className="object-contain"
            />
            <p className="font-bold text-sm">{faceitElo}</p>
          </div>

          <p className="font-bold text-sm">{kdRatio} KDR</p>
          <p className="font-bold text-sm">{winRate}% WR</p>
        </div>
      </div>
    </div>
  );
}
