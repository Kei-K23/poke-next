"use client";
import { useState } from "react";
import PokemonGridContainer from "@/components/pokemon-grid-container";
import { Pokemon, usePokemon } from "@/context/pokemon-context";
import { Search } from "lucide-react";
import Filter from "@/components/filter";

export default function SearchScreen() {
  const { pokemonDetailsList } = usePokemon();
  const [searchResult, setSearchResult] =
    useState<Pokemon[]>(pokemonDetailsList);
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="space-y-8 container mx-auto px-4 py-8">
      <div className="text-center max-w-2xl mx-auto neo-brutalism-blue p-4 lg:p-8">
        <h2 className="mb-2 text-xl md:text-2xl lg:text-4xl font-bold">
          Search PokéNext
        </h2>
        <p>Search for your favorite Pokémon by name</p>
      </div>
      <div className="max-w-sm relative neo-brutalism mx-auto">
        <Search className="absolute top-1/2 -translate-y-1/2 left-2" />
        <input
          autoFocus
          type="text"
          className="border-none outline-none w-full h-full pl-10 py-2"
          placeholder="Search PokéNext..."
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <Filter
        pokemonDetailsList={pokemonDetailsList}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        setSearchResult={setSearchResult}
      />
      {searchResult.length > 0 ? (
        <PokemonGridContainer filteredResult={searchResult} />
      ) : (
        <p className="text-center mt-4">No Pokémon found.</p>
      )}
    </div>
  );
}
