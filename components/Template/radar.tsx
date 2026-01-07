import faceitLevels from "@/lib/faceit-level.json";
import Image from "next/image";

interface RadarTemplateProps {
  nickname: string;
  recentMatches: any[];
  faceitElo: number;
  kdRatio: string;
  winRate: string;
  avatar: string;
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

export default function RadarTemplate({
  nickname,
  recentMatches,
  faceitElo,
  kdRatio,
  winRate,
  avatar,
}: RadarTemplateProps) {
  const levelData = getLevelFromElo(faceitElo);
  return (
    <div
      className="px-3 p-2 text-lg border text-white max-w-lg rounded-full relative overflow-hidden w-[350px] h-[350px] flex justify-center items-center"
      style={{
        backgroundImage: `
      linear-gradient(rgba(0,0,0,0.8), rgba(0,0,0,0.8)),
      url(${avatar})
    `,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="flex flex-col items-center">
        <p className="font-semibold text-3xl">{nickname}</p>
        <div className="flex gap-3 items-center">
          <div className="mt-3 flex flex-col items-center">
            <Image
              src={levelData.image_url}
              alt={`Level ${levelData.level}`}
              width={28}
              height={28}
              className="object-contain"
            />
            <p className="font-bold">{faceitElo}</p>
          </div>
          <div className="mt-3 flex flex-col items-center">
            <p className="font-bold">{kdRatio}</p>
            <p className="font-bold text-sm">K/D</p>
          </div>
          <div className="mt-3 flex flex-col items-center">
            <p className="font-bold">{winRate}%</p>
            <p className="font-bold text-sm">Win Rate</p>
          </div>
        </div>
        <div className="flex gap-3 items-center">
          <div className="mt-3 flex flex-col items-center">
            <p className="text-xl rounded-full font-bold">
              {recentMatches.map((match, index) => (
                <span
                  key={index}
                  className={
                    match === "L" ? "text-red-500 mr-1" : "text-green-500 mr-1"
                  }
                >
                  {match}
                </span>
              ))}
            </p>
            <p className="font-bold text-sm">Recent Matches</p>
          </div>
        </div>
      </div>
    </div>
  );
}
