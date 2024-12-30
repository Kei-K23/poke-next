"use client";

import { usePokemon } from "@/context/pokemon-context";
import { getTypeColor } from "@/lib/utils";
import Image from "next/image";
import {
  Activity,
  ChevronLeft,
  ChevronRight,
  Ruler,
  Weight,
} from "lucide-react";
import { Progress } from "./ui/progress";
import { useRouter } from "next/navigation";

interface PokemonDetailProps {
  id: string;
}

export default function PokemonDetail({ id }: PokemonDetailProps) {
  const { pokemonDetailsList } = usePokemon();
  const router = useRouter();

  const pokemonIndex = pokemonDetailsList.findIndex((p) => p.id === +id);
  const pokemon = pokemonDetailsList[pokemonIndex];

  if (!pokemon) {
    return null;
  }

  const handleNextPokemon = () => {
    const nextIndex = (pokemonIndex + 1) % pokemonDetailsList.length; // Loop back to the first Pokémon
    const nextPokemon = pokemonDetailsList[nextIndex];
    router.push(`/pokemon/${nextPokemon.id}`); // Navigate to the next Pokémon's page
  };

  const handlePrevPokemon = () => {
    const prevIndex =
      (pokemonIndex - 1 + pokemonDetailsList.length) %
      pokemonDetailsList.length; // Loop back to the last Pokémon
    const prevPokemon = pokemonDetailsList[prevIndex];
    router.push(`/pokemon/${prevPokemon.id}`); // Navigate to the previous Pokémon's page
  };

  return (
    <div
      className="h-full w-full"
      style={{
        backgroundColor: getTypeColor(pokemon.types[0].type.name),
      }}
    >
      <div className="container mx-auto pt-4 px-4 flex items-center gap-x-4 justify-between">
        <button className="neo-brutalism-white" onClick={handlePrevPokemon}>
          <ChevronLeft />
        </button>
        <button className="neo-brutalism-white" onClick={handleNextPokemon}>
          <ChevronRight />
        </button>
      </div>
      <div className="container mx-auto px-4 py-10 flex flex-col lg:flex-row gap-20 w-full">
        <div className="text-white w-full space-y-8">
          <h3 className="text-xl md:text-3xl lg:text-5xl capitalize font-bold">
            #{pokemon.id.toString().padStart(4, "0")} <br /> {pokemon.name}
          </h3>
          <div className="w-full flex flex-col md:flex-row justify-between gap-6">
            <div>
              <h3 className="text-base md:text-2xl font-semibold mb-2">
                Abilities
              </h3>
              <div className="flex items-center gap-3">
                {pokemon.abilities.map((a) => (
                  <div
                    key={a.ability.name}
                    className="neo-brutalism text-white capitalize px-3 py-1 font-semibold rounded-full"
                  >
                    {a.ability.name}
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-base md:text-2xl font-semibold mb-2">
                Types
              </h3>
              <div className="flex items-center gap-3">
                {pokemon.types.map((t) => (
                  <div
                    key={t.type.name}
                    style={{
                      backgroundColor: getTypeColor(t.type.name),
                    }}
                    className="neo-brutalism text-white capitalize px-3 py-1 font-semibold rounded-full"
                  >
                    {t.type.name}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="space-y-4">
            {pokemon.stats.map((stat, index) => (
              <div key={`${stat.stat}-${stat.base_stat}-${index}`}>
                <div className="flex items-center gap-x-3 text-base md:text-xl font-semibold mb-2">
                  <span className="capitalize">{stat.stat.name}</span>
                  <span>{stat.base_stat}</span>
                </div>
                <Progress value={stat.base_stat} />
              </div>
            ))}
          </div>
          <div className="text-black flex flex-wrap gap-4">
            <div className="neo-brutalism-white p-2 lg:p-4 font-semibold">
              <p className="flex items-center gap-x-1 mb-2">
                <Ruler />
                HEIGHT
              </p>
              <span className="text-base lg:text-xl">{pokemon.height} M</span>
            </div>
            <div className="neo-brutalism-white p-2 lg:p-4 font-semibold">
              <p className="flex items-center gap-x-1 mb-2">
                <Weight /> WEIGHT
              </p>
              <span className="text-base lg:text-xl">{pokemon.weight} KG</span>
            </div>
            <div className="neo-brutalism-white p-2 lg:p-4 font-semibold">
              <p className="flex items-center gap-x-1 mb-2">
                <Activity /> BASE XP
              </p>
              <span className="text-base lg:text-xl">
                {pokemon.base_experience} XP
              </span>
            </div>
          </div>
        </div>
        <div className="relative w-full flex items-center justify-center">
          <Image
            src={
              pokemon?.sprites.other["official-artwork"].front_default ||
              pokemon?.sprites.other["home"].front_default ||
              pokemon?.sprites.other["dream_world"].front_default
            }
            alt={pokemon?.name}
            width={400}
            height={400}
            className="object-contain z-10 relative size-[200px] md:size-[300px] lg:size-[400px]"
          />
          <Image
            src={`/icons/${pokemon?.types[0].type.name}.svg`}
            alt={pokemon?.types[0].type.name || "pokemon type icon"}
            width={500}
            height={500}
            className="object-contain absolute top-1/2 -translate-y-1/2 size-[250px] md:size-[400px] lg:size-[500px]"
          />
        </div>
      </div>
    </div>
  );
}
