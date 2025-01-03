import { Pokemon, usePokemon } from "@/context/pokemon-context";
import { cn, getTypeColor } from "@/lib/utils";
import { Heart, HeartOff } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Skeleton } from "./ui/skeleton";

interface PokemonCardProps {
  pokemon: Pokemon;
}

export default function PokemonCard({ pokemon }: PokemonCardProps) {
  const { addFavorite, removeFavorite, favoritePokemon } = usePokemon();
  const isAlreadyFavorite = favoritePokemon.some((p) => p.id === pokemon.id);

  return (
    <Link href={`/pokemon/${pokemon.id}`}>
      <div className="relative neo-brutalism-white p-4 transition-transform hover:scale-105 overflow-hidden">
        <button
          onClick={(e) => {
            e.preventDefault();
            if (isAlreadyFavorite) {
              removeFavorite(pokemon.id);
            } else {
              addFavorite(pokemon);
            }
          }}
          className={cn(
            "absolute top-2 right-2 z-10 p-2 rounded-full",
            isAlreadyFavorite
              ? "neo-brutalism-blue-active"
              : "neo-brutalism-pink"
          )}
        >
          {isAlreadyFavorite ? <HeartOff /> : <Heart />}
        </button>
        <div
          className="p-1 rounded-full absolute top-2 left-2 z-10"
          style={{
            backgroundColor: getTypeColor(pokemon.types[0].type.name),
          }}
        >
          <div className="size-7 relative">
            <Image
              src={`/icons/${pokemon.types[0].type.name}.svg`}
              alt={pokemon.types[0].type.name}
              fill
            />
          </div>
        </div>
        <div className="neo-brutalism aspect-square relative bg-[#FFE8E8]">
          <Image
            src={
              pokemon.sprites.other["official-artwork"].front_default ||
              pokemon.sprites.other["home"].front_default ||
              pokemon.sprites.other["dream_world"].front_default
            }
            alt={pokemon.name}
            className="w-full h-full object-contain"
            fill
          />
        </div>
        <div className="mt-4">
          <h3 className="text-lg capitalize font-bold">
            #{pokemon.id.toString().padStart(4, "0")} {pokemon.name}
          </h3>

          <p className="font-semibold text-muted-foreground">
            {pokemon.height} M, {pokemon.weight} KG, {pokemon.base_experience}{" "}
            XP
          </p>
          <div className="flex items-center gap-3 mt-3">
            {pokemon.types.map((t) => (
              <div
                key={t.type.name}
                style={{
                  backgroundColor: getTypeColor(t.type.name),
                }}
                className="neo-brutalism text-white capitalize px-2 font-semibold rounded-full"
              >
                {t.type.name}
              </div>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
}

export function PokemonCardSkeleton() {
  return (
    <div className="relative neo-brutalism-white p-4 transition-transform hover:scale-105 overflow-hidden">
      <div className="neo-brutalism aspect-square relative bg-[#FFE8E8]">
        <Skeleton className="w-full h-full" />
      </div>
      <div className="mt-4">
        <Skeleton className="h-6 w-3/4 mb-2" />
        <Skeleton className="h-4 w-full mb-3" />
        <div className="flex items-center gap-3 mt-3">
          <Skeleton className="h-6 w-16 rounded-full" />
          <Skeleton className="h-6 w-16 rounded-full" />
        </div>
      </div>
    </div>
  );
}
