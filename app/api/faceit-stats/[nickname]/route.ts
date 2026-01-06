import { NextResponse } from "next/server";

interface MatchItem {
  match_id: string;
  finished_at: number;
}

interface PlayerStats {
  player_id: string;
  nickname: string;
  player_stats: {
    Result?: string;
    [key: string]: string | undefined;
  };
}

interface TeamStats {
  team_id: string;
  players: PlayerStats[];
}

interface MatchStatsData {
  rounds?: Array<{
    teams: TeamStats[];
  }>;
}

export async function GET(
  request: Request,
  {
    params,
  }: {
    params: Promise<{ nickname: string }>;
  }
) {
  const API_KEY = process.env.FACEIT_API_KEY || "";
  const API_ENDPOINT = "https://open.faceit.com/data/v4";

  try {
    const { nickname } = await params;

    // Get Player Details
    const getPlayersDetails = await fetch(
      `${API_ENDPOINT}/players?nickname=${nickname}&game=cs2`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${API_KEY}`,
        },
      }
    );

    const playerDetails = await getPlayersDetails.json();

    if (!playerDetails?.games?.cs2) {
      return NextResponse.json({
        status: 404,
        message: "No Faceit CS2 Stats Found!",
      });
    }

    if (!getPlayersDetails.ok) {
      throw new Error("Error while getting the players details");
    }

    const playerId = playerDetails?.player_id;

    // Get Player Statistic
    const getPlayersStatistic = await fetch(
      `${API_ENDPOINT}/players/${playerId}/stats/cs2`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${API_KEY}`,
        },
      }
    );

    const playersStatistic = await getPlayersStatistic.json();

    if (!getPlayersStatistic.ok) {
      throw new Error("Error while getting the players statistic");
    }

    // Get Player Match History
    const getMatchHistory = await fetch(
      `${API_ENDPOINT}/players/${playerId}/history?game=cs2&from=0&offset=0&limit=50`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${API_KEY}`,
        },
      }
    );

    const matchHistory = await getMatchHistory.json();

    // Calculate today's stats
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);
    const todayTimestamp = Math.floor(todayStart.getTime() / 1000);

    let todayWins = 0;
    let todayLosses = 0;

    if (matchHistory?.items) {
      // Filter today's matches
      const todayMatches = matchHistory.items.filter(
        (match: MatchItem) => match.finished_at >= todayTimestamp
      );

      // Count wins and losses
      for (const match of todayMatches) {
        try {
          const matchStats = await fetch(
            `${API_ENDPOINT}/matches/${match.match_id}/stats`,
            {
              method: "GET",
              headers: {
                Authorization: `Bearer ${API_KEY}`,
              },
            }
          );

          const matchStatsData: MatchStatsData = await matchStats.json();

          // Find player's result in the match
          let playerFound = false;
          const rounds = matchStatsData?.rounds || [];

          for (const round of rounds) {
            const teams = round?.teams || [];
            for (const team of teams) {
              const player = team.players.find(
                (p: PlayerStats) => p.player_id === playerId
              );

              if (player) {
                playerFound = true;
                const result = player.player_stats?.Result || "0";

                if (result === "1") {
                  todayWins++;
                } else {
                  todayLosses++;
                }
                break;
              }
            }
            if (playerFound) break;
          }
        } catch (matchErr) {
          console.error(`Error fetching match ${match.match_id}:`, matchErr);
        }
      }
    }

    // Get Players Recent W / L
    const playersHistory = playersStatistic.lifetime["Recent Results"].map(
      (item: string) => (item === "1" ? "W" : "L")
    );

    // Return All The Data
    return NextResponse.json({
      status: 200,
      data: {
        nickname: playerDetails?.nickname,
        avatar: playerDetails?.avatar,
        statistic: {
          recent_matches_history: playersHistory,
          kd_ratio: playersStatistic?.lifetime["Average K/D Ratio"],
          win_rate: playersStatistic?.lifetime["Win Rate %"],
          faceit_elo: playerDetails?.games?.cs2?.faceit_elo,
          skill_level: playerDetails?.games?.cs2?.skill_level,
          today: {
            wins: todayWins,
            losses: todayLosses,
            matches_played: todayWins + todayLosses,
          },
        },
      },
    });
  } catch (err) {
    console.log(err);
    return NextResponse.json({
      message: "Internal Error",
      status: 500,
    });
  }
}
