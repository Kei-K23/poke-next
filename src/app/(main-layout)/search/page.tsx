import { Metadata } from "next";
import SearchScreen from "@/components/screen/search-screen";

export const metadata: Metadata = {
  title: "Search | PokéNext",
  description: "Search for Pokémon by name, type, or other attributes",
  openGraph: {
    title: "Search | PokéNext",
    description: "Search for Pokémon by name, type, or other attributes",
  },
};

export default function SearchPage() {
  return <SearchScreen />;
}
