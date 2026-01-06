"use client";

import { use, useEffect } from "react";
import { useFaceitRequest } from "@/hooks/useFaceitRequest";
import ClassicTemplate from "@/components/Template/classic";

export default function OverlayPage({
  params,
}: {
  params: Promise<{ nickname: string }>;
}) {
  const { nickname } = use(params);
  const { data, loading, fetchStats } = useFaceitRequest();

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
      <ClassicTemplate
        nickname={data.nickname}
        recentMatches={data.statistic.recent_matches_history}
        skillLevel={data.statistic.skill_level}
        faceitElo={data.statistic.faceit_elo}
        kdRatio={data.statistic.kd_ratio}
        winRate={data.statistic.win_rate}
      />
    </div>
  );
}
