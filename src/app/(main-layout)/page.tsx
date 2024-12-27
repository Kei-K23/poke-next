"use client";
import { usePokemon } from "@/context/pokemon-context";

export default function Home() {
  const { pokemonDetailsList } = usePokemon();
  return (
    <ul>
      {pokemonDetailsList &&
        pokemonDetailsList?.map((p) => <li key={p.id}>{p.name}</li>)}
    </ul>
  );
}
