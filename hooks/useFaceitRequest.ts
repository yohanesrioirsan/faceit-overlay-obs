import { useState, useCallback } from "react";
import axios from "axios";

interface RecentMatch {
  [key: string]: any;
}

interface FaceitStatistic {
  recent_matches_history: RecentMatch[];
  kd_ratio: string;
  win_rate: string;
  faceit_elo: number;
  skill_level: number;
}

interface FaceitData {
  nickname: string;
  avatar: string;
  statistic: FaceitStatistic;
}

interface FaceitResponse {
  status: number;
  data?: FaceitData;
  message?: string;
}

export function useFaceitRequest() {
  const [data, setData] = useState<FaceitData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchStats = useCallback(async (nickname: string) => {
    setLoading(true);
    setError(null);
    // Don't clear data - preserve existing data during refresh to prevent flickering

    try {
      const response = await axios.get<FaceitResponse>(
        `/api/faceit-stats/${nickname}`
      );
      
      // Check if the response indicates an error (status 404 or 500)
      if (response.data.status === 404 || response.data.status === 500) {
        setError(response.data.message || "Failed to fetch Faceit stats");
        // Keep existing data on error so overlay doesn't disappear
      } else if (response.data.data) {
        setData(response.data.data);
        setError(null); // Clear any previous errors on success
      } else {
        setError("Unexpected response format");
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to fetch Faceit stats");
      // Keep existing data on error so overlay doesn't disappear
    } finally {
      setLoading(false);
    }
  }, []);

  const reset = () => {
    setData(null);
    setError(null);
    setLoading(false);
  };

  return {
    data,
    loading,
    error,
    fetchStats,
    reset,
  };
}
