"use client";

import { Pokemon, usePokemon } from "@/context/pokemon-context";
import PokemonCard from "./pokemon-card";

interface PokemonGridContainerProps {
  filteredResult?: Pokemon[];
}

export default function PokemonGridContainer({
  filteredResult,
}: PokemonGridContainerProps) {
  const { pokemonDetailsList } = usePokemon();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {filteredResult && filteredResult?.length > 0
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
