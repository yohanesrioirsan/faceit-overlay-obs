"use client";

import { use, useEffect, useRef } from "react";
import { useFaceitRequest } from "@/hooks/useFaceitRequest";
import ClassicTemplate from "@/components/Template/classic";
import { useSearchParams } from "next/navigation";
import Type1Template from "@/components/Template/type1";
import NeoBrutalismTemplate from "@/components/Template/neo-brutalism";

export default function OverlayPage({
  params,
}: {
  params: Promise<{ nickname: string }>;
}) {
  const { nickname } = use(params);
  const { data, loading, fetchStats, error } = useFaceitRequest();
  const stringParams = useSearchParams();
  const retryTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const previousDataRef = useRef<typeof data>(null);
  const fastPollingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Remove background from body for OBS transparency
    document.body.style.backgroundColor = "transparent";
    document.documentElement.style.backgroundColor = "transparent";

    // Get refresh interval from query params (default: 90 seconds = 90000ms)
    // Optimal balance: Updates stats within ~1-2 min after match ends without excessive API calls
    // Users can set ?refresh=60000 for 60s, ?refresh=120000 for 2min, etc.
    const refreshInterval = parseInt(
      stringParams.get("refresh") || "90000",
      10
    );
    const normalInterval = Math.max(30000, Math.min(refreshInterval, 600000)); // Clamp between 30s and 10min

    // Fetch stats on mount
    fetchStats(nickname);

    // Start with normal interval
    intervalRef.current = setInterval(() => {
      fetchStats(nickname);
    }, normalInterval);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      if (retryTimeoutRef.current) {
        clearTimeout(retryTimeoutRef.current);
      }
      if (fastPollingTimeoutRef.current) {
        clearTimeout(fastPollingTimeoutRef.current);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nickname]); // Only depend on nickname - refresh interval is read once on mount

  // Smart polling: Detect stats changes and poll more frequently temporarily
  // When ELO or match history changes, poll every 45s for 5 minutes, then return to normal
  useEffect(() => {
    if (!data || !previousDataRef.current) {
      previousDataRef.current = data;
      return;
    }

    // Check if stats changed (new match, ELO change, etc.)
    const statsChanged =
      previousDataRef.current.statistic.faceit_elo !==
        data.statistic.faceit_elo ||
      JSON.stringify(
        previousDataRef.current.statistic.recent_matches_history
      ) !== JSON.stringify(data.statistic.recent_matches_history);

    if (statsChanged) {
      // Stats changed - switch to faster polling temporarily (45s)
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }

      // Clear any existing fast polling timeout
      if (fastPollingTimeoutRef.current) {
        clearTimeout(fastPollingTimeoutRef.current);
      }

      const fastInterval = 45000; // 45 seconds
      intervalRef.current = setInterval(() => {
        fetchStats(nickname);
      }, fastInterval);

      // Return to normal polling after 5 minutes
      const normalInterval = parseInt(
        stringParams.get("refresh") || "90000",
        10
      );
      const clampedInterval = Math.max(30000, Math.min(normalInterval, 600000));

      fastPollingTimeoutRef.current = setTimeout(() => {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
        intervalRef.current = setInterval(() => {
          fetchStats(nickname);
        }, clampedInterval);
        fastPollingTimeoutRef.current = null;
      }, 300000); // 5 minutes
    }

    previousDataRef.current = data;

    return () => {
      if (fastPollingTimeoutRef.current) {
        clearTimeout(fastPollingTimeoutRef.current);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, nickname]);

  // Retry logic on error (retry after 30 seconds if we have existing data)
  useEffect(() => {
    if (error && data) {
      // Only retry if we have existing data (don't retry on initial load failure)
      // Retry after 30 seconds
      retryTimeoutRef.current = setTimeout(() => {
        fetchStats(nickname);
      }, 30000);
    }

    return () => {
      if (retryTimeoutRef.current) {
        clearTimeout(retryTimeoutRef.current);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error, data, nickname]); // fetchStats is stable due to useCallback

  // Show nothing only on initial load (no data yet)
  // During refresh, keep showing existing data to prevent flickering
  if (loading && !data) {
    return null;
  }

  // If we have no data at all (initial load failed), show nothing
  if (!data) return null;

  const template =
    stringParams.get("template") ||
    stringParams.get("style") || // fallback for old embed URLs
    "classic";

  return (
    <div className="p-4 bg-transparent min-h-screen">
      {(template === "classic" || template === "clasic") && ( // keep old typo for backward compatibility
        <ClassicTemplate
          nickname={data.nickname}
          recentMatches={data.statistic.recent_matches_history}
          skillLevel={data.statistic.skill_level}
          faceitElo={data.statistic.faceit_elo}
          kdRatio={data.statistic.kd_ratio}
          winRate={data.statistic.win_rate}
        />
      )}

      {template === "type1" && (
        <Type1Template
          avatar={data.avatar}
          nickname={data.nickname}
          recentMatches={data.statistic.recent_matches_history}
          faceitElo={data.statistic.faceit_elo}
          kdRatio={data.statistic.kd_ratio}
        />
      )}

      {template === "neo-brutalism" && (
        <NeoBrutalismTemplate
          winRate={data.statistic.win_rate}
          nickname={data.nickname}
          recentMatches={data.statistic.recent_matches_history}
          faceitElo={data.statistic.faceit_elo}
          kdRatio={data.statistic.kd_ratio}
        />
      )}
    </div>
  );
}
