"use client";

import PokemonGridContainer from "@/components/pokemon-grid-container";
import { usePokemon } from "@/context/pokemon-context";

export default function FavoritePage() {
  const { favoritePokemon } = usePokemon();

  return (
    <div className="space-y-8 container mx-auto px-4 py-8">
      <div className="text-center max-w-2xl mx-auto neo-brutalism-blue p-8">
        <h2 className="mb-2 text-4xl font-bold">Your Favorite Pokémon</h2>
      </div>
      {favoritePokemon.length > 0 ? (
        <PokemonGridContainer filteredResult={favoritePokemon} />
      ) : (
        <p className="text-center mt-4">No favorite Pokémon found.</p>
      )}
    </div>
  );
}
