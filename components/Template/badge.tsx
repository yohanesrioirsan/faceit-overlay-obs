import faceitLevels from "@/lib/faceit-level.json";
import Image from "next/image";

interface BadgeTemplateProps {
  skillLevel: number;
  faceitElo: number;
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

export default function BadgeTemplate({ faceitElo }: BadgeTemplateProps) {
  const levelData = getLevelFromElo(faceitElo);

  return (
    <div
      className={`p-3 text-lg border border-red-500 text-white w-fit bg-red-500/10 rounded-xl`}
    >
      <div className="flex gap-2 items-center">
        <Image
          src={levelData.image_url}
          alt={`Level ${levelData.level}`}
          width={30}
          height={30}
          className="object-contain"
        />
        <p className="font-semibold text-xl">{faceitElo}</p>
      </div>
    </div>
  );
}
