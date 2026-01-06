"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Layout from "../layout/layout";
import { useFaceitRequest } from "@/hooks/useFaceitRequest";
import { Loader2 } from "lucide-react";
import dynamic from "next/dynamic";
import ClassicTemplate from "../Template/classic";
import { SelectTemplate } from "./select-template";
import Type1Template from "../Template/type1";

const HowToUse = dynamic(() => import("./tutorial"), {
  ssr: false,
});

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
        {error && error.includes("No Faceit CS2 Stats Found") && (
          <div className="mt-4 p-3 bg-amber-500/10 border border-amber-500/30 rounded-lg">
            <h2 className="text-sm font-semibold text-amber-400 mb-1">
              ⚠️ User Not Found
            </h2>
            <p className="text-xs text-gray-300 leading-relaxed">
              User was not found or doesn&apos;t have CS2 stats on FACEIT.
              Please check the spelling and make sure the player has played CS2
              matches.
            </p>
          </div>
        )}

        {data && (
          <div className="flex flex-col">
            <div className="flex items-center gap-3 mt-3 mb-6">
              <p>Select Style:</p>
              <SelectTemplate
                value={selectedTemplate}
                onValueChange={setSelectedTemplate}
                className="h-14"
              />
              <HowToUse
                trigger={
                  <Button className="bg-[#FF7A05] text-white hover:bg-[#FF7A05]/70 w-fit cursor-pointer">
                    How to use ?
                  </Button>
                }
                nickname={data.nickname}
                selectedTemplate={selectedTemplate}
              />
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
