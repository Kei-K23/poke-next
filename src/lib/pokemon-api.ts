import { Pokemon, PokemonList } from "@/context/pokemon-context";
import { config } from "./config";
import { prisma } from "./db";

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
  return data.results as PokemonList[];
};

export const getPokemon = async (name: string): Promise<Pokemon | null> => {
  const res = await fetch(`${config.BASE_POKEMON_API_V2}/pokemon/${name}`);

  if (!res.ok) {
    return null;
  }

  const data = await res.json();
  return data;
};

export const getTwoRandomPokemon = async () => {
  const allPokemon = await getAllPokemon(100000, 0);
  const shuffled = allPokemon.sort(() => 0.5 - Math.random());

  // Get the first two Pokémon from the shuffled list
  const selectedPokemon = shuffled.slice(0, 2);

  // Fetch details for the selected Pokémon
  const randomPokemonDetail = await Promise.all(
    selectedPokemon.map(async (p) => {
      const pokemonDetail = await getPokemon(p.name);
      return pokemonDetail; // Include only if pokemonDetail is not null
    })
  );

  return randomPokemonDetail.filter(Boolean);
};

export const votePokemon = async (votedFor: string, votedAgainst: string) => {
  await prisma.vote.create({
    data: {
      votedFor,
      votedAgainst,
    },
  });
};
