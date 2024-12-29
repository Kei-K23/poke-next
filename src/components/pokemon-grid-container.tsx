"use client";

import { Pokemon, usePokemon } from "@/context/pokemon-context";
import PokemonCard, { PokemonCardSkeleton } from "./pokemon-card";

interface PokemonGridContainerProps {
  filteredResult?: Pokemon[];
}

export default function PokemonGridContainer({
  filteredResult,
}: PokemonGridContainerProps) {
  const { pokemonDetailsList, isLoading } = usePokemon();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {isLoading
        ? [1, 2, 3, 4, 5, 6, 7, 8].map((i) => <PokemonCardSkeleton key={i} />)
        : filteredResult && filteredResult?.length > 0
        ? filteredResult.map((pokemon) => (
            <div key={pokemon.id}>
              <PokemonCard pokemon={pokemon} />
            </div>
          ))
        : pokemonDetailsList.map((pokemon) => (
            <div key={pokemon.id}>
              <PokemonCard pokemon={pokemon} />
            </div>
          ))}
    </div>
  );
}
