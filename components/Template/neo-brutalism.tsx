import Image from "next/image";
import faceitLevels from "@/lib/faceit-level.json";

interface NeoBrutalismProps {
  nickname: string;
  recentMatches: any[];
  faceitElo: number;
  kdRatio: string;
  winRate: string;
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

export default function NeoBrutalismTemplate({
  nickname,
  recentMatches,
  faceitElo,
  kdRatio,
  winRate,
}: NeoBrutalismProps) {
  const levelData = getLevelFromElo(faceitElo);

  return (
    <div className="px-3 p-2 text-lg border-2 border-black text-white max-w-lg rounded-lg relative overflow-hidden bg-[#FF7A05] shadow-[-2px_3px_0px_#000]">
      <div className="absolute inset-0 "></div>
      <div className="relative px-3 py-2 space-y-2">
        <div className="w-full flex flex-col items-center">
          <div className="flex items-center justify-between gap-2 w-full">
            <h1 className="text-5xl font-bold">{nickname.toUpperCase()}</h1>
            <Image
              src={levelData.image_url}
              alt={`Level ${levelData.level}`}
              width={48}
              height={48}
              className="object-contain"
            />
          </div>
          <div className="flex justify-center items-center gap-3">
            <div className="flex gap-3 mt-4">
              <div className="flex gap-3 items-center">
                <div className="flex flex-col">
                  <p className="font-bold text-sm text-center">ELO</p>
                  <p className="text-xl bg-[#D9D9D9] px-6 py-px rounded-full border-2 border-black text-[#FF7A05] shadow-[1px_1px_0px_#000]">
                    {faceitElo}
                  </p>
                </div>
              </div>
            </div>
            <div className="flex gap-3 mt-4">
              <div className="flex gap-3 items-center">
                <div className="flex flex-col">
                  <p className="font-bold text-sm text-center">K/D</p>
                  <p className="text-xl bg-[#D9D9D9] px-6 py-px rounded-full border-2 border-black text-[#FF7A05] shadow-[1px_1px_0px_#000]">
                    {kdRatio}
                  </p>
                </div>
              </div>
            </div>
            <div className="flex gap-3 mt-4">
              <div className="flex gap-3 items-center">
                <div className="flex flex-col">
                  <p className="font-bold text-sm text-center">Win Rate</p>
                  <p className="text-xl bg-[#D9D9D9] px-6 py-px rounded-full border-2 border-black text-[#FF7A05] shadow-[1px_1px_0px_#000]">
                    {winRate}%
                  </p>
                </div>
              </div>
            </div>
            <div className="flex gap-3 mt-4">
              <div className="flex gap-3 items-center">
                <div className="flex flex-col">
                  <p className="font-bold text-sm text-center">Win Rate</p>
                  <p className="text-xl bg-[#D9D9D9] px-6 py-px rounded-full border-2 border-black text-[#FF7A05] shadow-[1px_1px_0px_#000]">
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
      </div>
    </div>
  );
}
