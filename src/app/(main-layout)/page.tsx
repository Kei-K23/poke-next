import PokemonGridContainer from "@/components/pokemon-grid-container";

export default function Home() {
  return (
    <div className="space-y-8 container mx-auto px-4 py-8">
      <div className="text-center max-w-2xl mx-auto neo-brutalism-pink p-8">
        <h2 className="mb-2 text-4xl font-bold">Welcome to PokéNext</h2>
        <p>Explore the world of Pokémon with our modern Pokédex</p>
      </div>
      <PokemonGridContainer />
    </div>
  );
}
