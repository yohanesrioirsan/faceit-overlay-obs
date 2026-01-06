import faceitLevels from "@/lib/faceit-level.json";
import Image from "next/image";

interface BadgeTemplateWithHistoryProps {
  skillLevel: number;
  faceitElo: number;
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

export default function BadgeTemplateWithHistory({
  faceitElo,
  wins,
  losses,
}: BadgeTemplateWithHistoryProps) {
  const levelData = getLevelFromElo(faceitElo);

  return (
    <div className="flex gap-2 items-center">
      <div className="flex gap-2 items-center p-3 text-lg border border-red-500 text-white w-fit bg-red-500/10 rounded-xl">
        <Image
          src={levelData.image_url}
          alt={`Level ${levelData.level}`}
          width={28}
          height={28}
          className="object-contain"
        />
        <p className="font-semibold text-lg">{faceitElo}</p>
      </div>
      <div className="flex items-center gap-2 ml-6">
        <div className="p-3 text-center bg-green-500/10 border border-green-500 rounded-xl">
          <p className="text-lg">
            {wins} <span className="font-semibold">Wins</span>
          </p>
        </div>
        <div className="p-3 text-center bg-red-500/10 border border-red-500 rounded-xl">
          <p className="text-lg">
            {losses} <span className="font-semibold">Losses</span>
          </p>
        </div>
      </div>
    </div>
  );
}
