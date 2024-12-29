"use client";

import { useRef, useCallback } from "react";
import { Pokemon, usePokemon } from "@/context/pokemon-context";
import PokemonCard, { PokemonCardSkeleton } from "./pokemon-card";

interface PokemonGridContainerProps {
  filteredResult?: Pokemon[];
  isNotAllowObserver?: boolean;
}

export default function PokemonGridContainer({
  filteredResult,
  isNotAllowObserver = false,
}: PokemonGridContainerProps) {
  const { pokemonDetailsList, isLoading, fetchMorePokemon, hasMore } =
    usePokemon();
  const observer = useRef<IntersectionObserver | null>(null);

  const lastPokemonElementRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (isLoading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          fetchMorePokemon();
        }
      });
      if (node) observer.current.observe(node);
    },
    [isLoading, hasMore, fetchMorePokemon]
  );

  const displayedPokemon =
    filteredResult && filteredResult.length > 0
      ? filteredResult
      : pokemonDetailsList;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {displayedPokemon.map((pokemon, index) => (
        <div
          key={pokemon.id}
          ref={
            index === displayedPokemon.length - 1
              ? !isNotAllowObserver
                ? lastPokemonElementRef
                : null
              : null
          }
        >
          <PokemonCard pokemon={pokemon} />
        </div>
      ))}
      {isLoading &&
        [1, 2, 3, 4].map((i) => <PokemonCardSkeleton key={`skeleton-${i}`} />)}
    </div>
  );
}
