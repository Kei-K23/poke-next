import { getPokemonRankings } from "@/lib/pokemon-api";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import React from "react";
import Image from "next/image";
import { Progress } from "@/components/ui/progress";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Leaderboard | PokéNext",
  description: "See the rankings of Pokémon based on user votes",
  openGraph: {
    title: "Leaderboard | PokéNext",
    description: "See the rankings of Pokémon based on user votes",
  },
};

export default async function LeaderboardPage() {
  const pokemonRanking = await getPokemonRankings();

  return (
    <div className="container mx-auto py-10 px-4">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader className="bg-gray-200">
            <TableRow>
              <TableHead className="w-[100px]">Rank</TableHead>
              <TableHead>Pokémon</TableHead>
              <TableHead>Win Rate</TableHead>
              <TableHead>Loss Rate</TableHead>
              <TableHead className="text-left">Total Votes</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {pokemonRanking.map((p, i) => {
              const winRate = (p.wins / p.rounds) * 100;
              const lossRate = (p.losses / p.rounds) * 100;
              return (
                <TableRow key={`${p.name}-${i}`}>
                  <TableCell className="font-medium text-base">
                    #{i + 1}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <Image
                        src={p.imageUrl}
                        alt={p.name}
                        width={50}
                        height={50}
                        style={{ imageRendering: "pixelated" }}
                        className="rounded-full"
                        loading="eager"
                      />
                      <span className="text-base capitalize">{p.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="w-full max-w-[200px]">
                      <div className="flex flex-col lg:flex-row justify-between mb-1">
                        <span className="lg:text-sm lg:font-medium">
                          {winRate.toFixed(1)}%
                        </span>
                        <span className="hidden lg:block">
                          {p.wins} {p.wins >= 1 ? "wins" : "win"}
                        </span>
                      </div>
                      <Progress
                        value={winRate}
                        className="h-2 bg-gray-300"
                        indicatorClassName="bg-green-500"
                      />
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="w-full max-w-[200px]">
                      <div className="flex flex-col lg:flex-row justify-between mb-1">
                        <span className="lg:text-sm lg:font-medium">
                          {lossRate.toFixed(1)}%
                        </span>
                        <span className="hidden lg:block">
                          {p.wins} {p.wins >= 1 ? "loss" : "losses"}
                        </span>
                      </div>
                      <Progress
                        value={lossRate}
                        className="h-2 bg-gray-300"
                        indicatorClassName="bg-red-500"
                      />
                    </div>
                  </TableCell>
                  <TableCell className="text-left">
                    {p.rounds.toLocaleString()}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
