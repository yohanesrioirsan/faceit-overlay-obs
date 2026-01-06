import { NextResponse } from "next/server";

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

    if (!getPlayersDetails.ok) {
      throw new Error("Error while getting the players details");
    }

    if (!playerDetails?.games?.cs2) {
      return NextResponse.json({
        message: "No Faceit CS2 Stats Found!",
      });
    }

    // Get Player Statistic
    const getPlayersStatistic = await fetch(
      `${API_ENDPOINT}/players/${playerDetails?.player_id}/stats/cs2`,
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

    // Get Players Recent W / L
    const playersHistory = playersStatistic.lifetime["Recent Results"].map(
      (item: string) => (item == "1" ? "W" : "L")
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
