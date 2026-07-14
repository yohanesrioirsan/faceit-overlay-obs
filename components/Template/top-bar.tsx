import { IBM_Plex_Mono } from "next/font/google";

interface TopBarTemplateProps {
  nickname: string;
  faceitElo: number;
  kdRatio: string;
  winRate: string;
}

const fragmentMono = IBM_Plex_Mono({
  weight: ["400"],
  subsets: ["latin"],
  display: "swap",
});

export default function TopBarTemplate({
  nickname,
  faceitElo,
  kdRatio,
  winRate,
}: TopBarTemplateProps) {
  return (
    <div
      className={`py-1 w-fit bg-[#2b2e37]/90 text-md text-white ${fragmentMono.className}`}
    >
      <div className="px-3 py-1 space-y-2">
        <div className="flex gap-3 items-center">
          <div className="flex items-center gap-2">
            <p className="text-xs text-green-500 font-semibold">
              {nickname}
              <span className="text-white font-normal">{"'s stats"}</span>
            </p>
          </div>
          <div className="flex gap-2 items-center">
            <div className="flex items-center gap-2">
              <p className="text-xs text-green-500 font-semibold">elo</p>
              <p className="text-xs">{faceitElo}</p>
            </div>
            <div className="flex items-center gap-2">
              <p className="text-xs text-green-500 font-semibold">win-rate</p>
              <p className="text-xs">{winRate}%</p>
            </div>
            <div className="flex items-center gap-2">
              <p className="text-xs text-green-500 font-semibold">kdr</p>
              <p className="text-xs">{kdRatio}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
