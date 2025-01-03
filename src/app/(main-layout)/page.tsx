import PokemonGridContainer from "@/components/pokemon-grid-container";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home | PokéNext",
  description: "Explore the world of Pokémon with our modern Pokédex",
  openGraph: {
    title: "Home | PokéNext",
    description: "Explore the world of Pokémon with our modern Pokédex",
  },
};

export default function Home() {
  return (
    <div className="space-y-8 container mx-auto px-4 py-8">
      <div className="text-center max-w-2xl mx-auto neo-brutalism-pink p-4 lg:p-8">
        <h2 className="mb-2 text-xl md:text-2xl lg:text-4xl font-bold">
          Welcome to PokéNext
        </h2>
        <p>Explore the world of Pokémon with our modern Pokédex</p>
      </div>
      <PokemonGridContainer />
    </div>
  );
}
