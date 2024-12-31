"use client";

import { pressStart2P } from "@/app/fonts";
import { Pokemon, usePokemon } from "@/context/pokemon-context";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Skeleton } from "../ui/skeleton";
import { toast } from "sonner";

export default function RoundestScreen() {
  const { fetchAllPokemon, pokemonDetailsListForVote, isLoadingForVote } =
    usePokemon();
  const [randomPokemon, setRandomPokemon] = useState<(Pokemon | null)[]>([
    null,
    null,
  ]);
  const [isVotingLoading, setIsVotingLoading] = useState(false);

  // Advanced shuffle using Fisher-Yates algorithm
  const shuffleArray = (array: Pokemon[]) => {
    const shuffled = [...array]; // Create a copy of the array to avoid mutating the original
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1)); // Random index between 0 and i
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]; // Swap elements
    }
    return shuffled;
  };

  // Function to pick two random Pokémon
  const pickRandomPokemon = () => {
    if (pokemonDetailsListForVote.length > 1) {
      const shuffled = shuffleArray(pokemonDetailsListForVote);
      setRandomPokemon([shuffled[0], shuffled[1]]);
    }
  };

  // Voting function
  const votePokemon = async (winner: Pokemon, loser: Pokemon) => {
    try {
      setIsVotingLoading(true);
      const res = await fetch("/api/vote", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          winner,
          loser,
        }),
      });
      if (!res.ok) {
        toast.error("Error voting");
      }
      const data = await res.json();
      if (data.success) {
        console.log(`Voted for: ${winner.name}, Against: ${loser.name}`);
      } else {
        toast.error("Error voting");
      }
    } catch (error) {
      toast.error("Error voting");
      console.error("Error voting:", error);
    } finally {
      setIsVotingLoading(false);
      pickRandomPokemon();
    }
  };

  useEffect(() => {
    fetchAllPokemon();
  }, [fetchAllPokemon]);

  useEffect(() => {
    if (pokemonDetailsListForVote.length > 1) {
      pickRandomPokemon();
    }
  }, [pokemonDetailsListForVote]);

  useEffect(() => {
    fetchAllPokemon();
  }, [fetchAllPokemon]);

  return (
    <div className="container mx-auto px-4">
      {isLoadingForVote ? (
        <div className="flex items-center justify-center w-full">
          <div className="flex items-center justify-center w-full h-full py-32 gap-x-5 md:gap-x-14 lg:gap-x-24">
            {[0, 1, 2].map((i) => {
              if (i === 1) {
                return (
                  <p
                    key={i}
                    className={cn(
                      pressStart2P.className,
                      "text-2xl md:text-5xl lg:text-6xl bg-gradient-to-r from-pink-500 to-yellow-500 bg-clip-text text-transparent"
                    )}
                  >
                    Vs
                  </p>
                );
              }
              return (
                <div
                  key={`loading-${i}`}
                  className="flex items-center justify-center flex-col"
                >
                  <Skeleton className="w-[200px] h-[200px] md:w-[300px] md:h-[300px] mb-4 rounded-lg" />
                  <Skeleton className="h-8 w-40 mb-3" />
                  <Skeleton className="h-10 w-24" />
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center w-full px-4">
          <div className="flex items-center justify-center w-full h-full py-32 gap-x-5 md:gap-x-14 lg:gap-x-24">
            {[randomPokemon[0], 1, randomPokemon[1]].map((p, i) => {
              if (i === 1) {
                return (
                  <p
                    key={i}
                    className={cn(
                      pressStart2P.className,
                      "text-2xl md:text-5xl lg:text-6xl bg-gradient-to-r from-pink-500 to-yellow-500 bg-clip-text text-transparent"
                    )}
                  >
                    Vs
                  </p>
                );
              }
              if (p && typeof p !== "number") {
                return (
                  <div
                    key={`${p.name}-${i}`}
                    className="flex items-center justify-center flex-col"
                  >
                    <Image
                      src={
                        p.sprites.other["official-artwork"].front_default ||
                        p.sprites.other["home"].front_default ||
                        p.sprites.other["dream_world"].front_default ||
                        "/Poke_Ball.webp"
                      }
                      alt={p.name}
                      width={300}
                      height={300}
                      className="mb-4 w-[200px] h-[200px] md:w-[300px] md:h-[300px]"
                    />

                    <h3 className="capitalize text-sm sm:text-base md:text-xl lg:text-2xl font-bold">
                      {p.name}
                    </h3>

                    <button
                      disabled={isVotingLoading}
                      className="mt-3 neo-brutalism-blue disabled:neo-brutalism-blue-active px-4 py-1 text-base lg:px-6 lg:py-1.5 lg:text-xl font-semibold"
                      onClick={async () => {
                        const loser = randomPokemon[i === 0 ? 1 : 0];

                        if (loser) {
                          await votePokemon(p, loser);
                        }
                      }}
                    >
                      Vote
                    </button>
                  </div>
                );
              }
            })}
          </div>
        </div>
      )}
    </div>
  );
}
