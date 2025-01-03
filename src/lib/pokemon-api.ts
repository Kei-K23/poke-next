import { Pokemon, PokemonList } from "@/context/pokemon-context";
import { prisma } from "./db";
import config from "./config";

export const getAllPokemon = async (
  limit = 150,
  offset = 0
): Promise<PokemonList[]> => {
  const res = await fetch(
    `${config.BASE_POKEMON_API_V2}/pokemon?limit=${limit}&offset=${offset}`
  );

  if (!res.ok) {
    return [];
  }

  const data = await res.json();
  if (data.results.length > 0) {
    return data.results as PokemonList[];
  } else {
    return [];
  }
};

export const getPokemon = async (name: string): Promise<Pokemon | null> => {
  const res = await fetch(`${config.BASE_POKEMON_API_V2}/pokemon/${name}`);

  if (!res.ok) {
    return null;
  }

  const data = await res.json();
  return data;
};

export const votePokemon = async (votedFor: Pokemon, votedAgainst: Pokemon) => {
  if (!votedFor || !votedAgainst) {
    throw new Error(
      "Invalid Pokemon data: votedFor or votedAgainst is null or undefined."
    );
  }

  const votedForImageUrl =
    votedFor.sprites?.other?.["official-artwork"]?.front_default;
  const votedAgainstImageUrl =
    votedAgainst.sprites?.other?.["official-artwork"]?.front_default;

  if (!votedForImageUrl || !votedAgainstImageUrl) {
    throw new Error("Missing image URLs for the selected Pokémon.");
  }

  await prisma.vote.create({
    data: {
      votedFor: votedFor.name,
      votedAgainst: votedAgainst.name,
      votedForImageUrl,
      votedAgainstImageUrl,
    },
  });
};

export const getPokemonRankings = async () => {
  const votes = await prisma.vote.findMany();

  // Use a map to aggregate the data
  const rankings: Record<
    string,
    {
      name: string;
      wins: number;
      losses: number;
      rounds: number;
      imageUrl: string;
    }
  > = {};

  votes.forEach((vote) => {
    const { votedFor, votedForImageUrl, votedAgainst, votedAgainstImageUrl } =
      vote;

    // Add wins for the votedFor Pokémon
    if (!rankings[votedFor]) {
      rankings[votedFor] = {
        name: votedFor,
        wins: 0,
        losses: 0,
        rounds: 0,
        imageUrl: votedForImageUrl,
      };
    }
    rankings[votedFor].wins += 1;
    rankings[votedFor].rounds += 1;

    // Add losses for the votedAgainst Pokémon
    if (!rankings[votedAgainst]) {
      rankings[votedAgainst] = {
        name: votedAgainst,
        wins: 0,
        losses: 0,
        rounds: 0,
        imageUrl: votedAgainstImageUrl,
      };
    }
    rankings[votedAgainst].losses += 1;
    rankings[votedAgainst].rounds += 1;
  });

  // Convert the map to a sorted array
  const sortedRankings = Object.values(rankings).sort(
    (a, b) => b.wins - a.wins || a.losses - b.losses
  ); // Sort by wins, then losses

  return sortedRankings;
};
