"use client";

import { use, useEffect } from "react";
import { useFaceitRequest } from "@/hooks/useFaceitRequest";
import ClassicTemplate from "@/components/Template/classic";
import { useSearchParams } from "next/navigation";
import Type1Template from "@/components/Template/type1";

export default function OverlayPage({
  params,
}: {
  params: Promise<{ nickname: string }>;
}) {
  const { nickname } = use(params);
  const { data, loading, fetchStats } = useFaceitRequest();
  const stringParams = useSearchParams();

  useEffect(() => {
    // Remove background from body for OBS transparency
    document.body.style.backgroundColor = "transparent";
    document.documentElement.style.backgroundColor = "transparent";

    // Fetch stats on mount
    fetchStats(nickname);

    // Auto-refresh every 60 seconds
    const interval = setInterval(() => {
      fetchStats(nickname);
    }, 60000);

    return () => clearInterval(interval);
  }, [nickname]);

  if (loading && !data) {
    return null;
  }

  if (!data) return null;

  return (
    <div className="p-4 bg-transparent min-h-screen">
      {(stringParams.get("template") === "clasic" ||
        !stringParams.get("template")) && (
        <ClassicTemplate
          nickname={data.nickname}
          recentMatches={data.statistic.recent_matches_history}
          skillLevel={data.statistic.skill_level}
          faceitElo={data.statistic.faceit_elo}
          kdRatio={data.statistic.kd_ratio}
          winRate={data.statistic.win_rate}
        />
      )}

      {stringParams.get("template") === "type1" && (
        <Type1Template
          avatar={data.avatar}
          nickname={data.nickname}
          recentMatches={data.statistic.recent_matches_history}
          faceitElo={data.statistic.faceit_elo}
          kdRatio={data.statistic.kd_ratio}
        />
      )}
    </div>
  );
}
