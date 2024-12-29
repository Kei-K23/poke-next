import { getPokemonRankings } from "@/lib/pokemon-api";
import React from "react";

export default async function LeaderboardPage() {
  const pokemonRanking = await getPokemonRankings();
  return (
    <div>
      <div className="p-4 bg-gray-100 rounded-lg shadow-lg">
        <table className="w-full table-auto border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="border px-4 py-2">Rank</th>
              <th className="border px-4 py-2">Pokemon</th>
              <th className="border px-4 py-2">Wins</th>
              <th className="border px-4 py-2">Losses</th>
              <th className="border px-4 py-2">Rounds</th>
            </tr>
          </thead>
          <tbody>
            {pokemonRanking.map((entry, index) => (
              <tr key={entry.name}>
                <td className="border px-4 py-2">{index + 1}</td>
                <td className="border px-4 py-2 capitalize">{entry.name}</td>
                <td className="border px-4 py-2">{entry.wins}</td>
                <td className="border px-4 py-2">{entry.losses}</td>
                <td className="border px-4 py-2">{entry.rounds}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
