import FavoriteScreen from "@/components/screen/favorite-screen";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Favorite | PokéNext",
  description: "Add Pokémon to your favorites list for quick access",
  openGraph: {
    title: "Favorite | PokéNext",
    description: "Add Pokémon to your favorites list for quick access",
  },
};

export default function FavoritePage() {
  return <FavoriteScreen />;
}
