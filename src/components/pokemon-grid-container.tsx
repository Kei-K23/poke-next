"use client";

import { usePokemon } from "@/context/pokemon-context";
import PokemonCard from "./pokemon-card";

export default function PokemonGridContainer() {
  const { pokemonDetailsList } = usePokemon();
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {pokemonDetailsList.map((pokemon) => (
        <div key={pokemon.id}>
          <PokemonCard pokemon={pokemon} />
        </div>
      ))}
    </div>
  );
}
