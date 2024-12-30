import PokemonDetail from "@/components/pokemon-detail";
import { Metadata } from "next";

interface PokemonDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export const metadata: Metadata = {
  title: "Pokémon | PokéNext",
  description: "Show th detail information about the Pokémon",
  openGraph: {
    title: "Pokémon | PokéNext",
    description: "Show th detail information about the Pokémon",
  },
};

export default async function PokemonDetailPage({
  params,
}: PokemonDetailPageProps) {
  const { id } = await params;

  return <PokemonDetail id={id} />;
}
