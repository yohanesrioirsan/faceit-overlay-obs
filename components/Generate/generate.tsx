"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Layout from "../layout/layout";
import { useFaceitRequest } from "@/hooks/useFaceitRequest";
import { Loader2 } from "lucide-react";
import ClassicTemplate from "../Template/classic";
import { SelectTemplate } from "./select-template";
import Type1Template from "../Template/type1";

export default function GenerateOverlay() {
  const [nickname, setNickname] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState<string>("classic");

  const { data, loading, error, fetchStats } = useFaceitRequest();

  const handleGenerate = () => {
    fetchStats(nickname);
  };

  return (
    <Layout>
      <div className="flex gap-3 mt-6">
        <Input
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          placeholder="s1mple / m0nesy / olofmeister"
          className="h-14 text-lg px-6"
        />

        <Button
          onClick={handleGenerate}
          className="h-14 px-8 text-lg bg-orange-500 hover:bg-orange-600"
          disabled={loading}
        >
          {loading && <Loader2 className="mr-2 h-5 w-5 animate-spin" />}
          {loading ? "Finding..." : "Find User"}
        </Button>
      </div>

      <div className="mt-3">
        {data && (
          <div className="flex flex-col">
            <div className="flex items-center gap-3 mt-3 mb-6">
              <p>Select Style:</p>
              <SelectTemplate
                value={selectedTemplate}
                onValueChange={setSelectedTemplate}
                className="h-14"
              />
              <Button className="bg-[#FF7A05] text-white hover:bg-[#FF7A05]/70 w-fit cursor-pointer ">
                How to use ?
              </Button>
            </div>
            {selectedTemplate === "classic" && (
              <ClassicTemplate
                nickname={data.nickname}
                recentMatches={data.statistic.recent_matches_history}
                skillLevel={data.statistic.skill_level}
                faceitElo={data.statistic.faceit_elo}
                kdRatio={data.statistic.kd_ratio}
                winRate={data.statistic.win_rate}
              />
            )}

            {selectedTemplate === "type1" && (
              <Type1Template
                avatar={data.avatar}
                nickname={data.nickname}
                recentMatches={data.statistic.recent_matches_history}
                faceitElo={data.statistic.faceit_elo}
                kdRatio={data.statistic.kd_ratio}
              />
            )}
          </div>
        )}
      </div>
    </Layout>
  );
}
