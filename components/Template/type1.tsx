import Image from "next/image";
import faceitLevels from "@/lib/faceit-level.json";

interface Type1TemplateProps {
  nickname: string;
  recentMatches: any[];
  faceitElo: number;
  kdRatio: string;
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

export default function Type1Template({
  nickname,
  recentMatches,
  faceitElo,
  kdRatio,
  avatar,
}: Type1TemplateProps) {
  const levelData = getLevelFromElo(faceitElo);

  return (
    <div
      className="px-3 p-2 text-lg border border-[#FF6969] text-white max-w-lg rounded-lg relative overflow-hidden"
      style={{
        backgroundImage: `url(${avatar})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="absolute inset-0 bg-black opacity-90"></div>
      <div className="relative px-3 py-2 space-y-2">
        <div className="w-full flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Image
              src={levelData.image_url}
              alt={`Level ${levelData.level}`}
              width={34}
              height={34}
              className="object-contain"
            />
            <p className="text-2xl font-semibold">{nickname}</p>
          </div>
          <div className="flex gap-3 items-center">
            <div className="flex flex-col">
              <p className="font-bold text-sm">ELO</p>
              <p className="font-bold text-xl text-[#FF6969]">{faceitElo}</p>
            </div>
          </div>
          <div className="flex gap-3 items-center">
            <div className="flex flex-col">
              <p className="font-bold text-sm">K/D</p>
              <p className="font-bold text-xl text-[#FF6969]">{kdRatio}</p>
            </div>
          </div>
          <div className="flex gap-3 items-center">
            <div className="flex flex-col">
              <p className="font-bold text-sm">RECENT RESULTS</p>
              <p className="font-bold text-xl text-[#FF6969]">
                {recentMatches.map((match, index) => (
                  <span
                    key={index}
                    className={
                      match === "L"
                        ? "text-red-500 mr-1"
                        : "text-green-500 mr-1"
                    }
                  >
                    {match}
                  </span>
                ))}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
