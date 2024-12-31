import RoundestScreen from "@/components/screen/roundest-screen";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Roundest | PokéNext",
  description: "Participate in voting to select the 'roundest' Pokémon",
  openGraph: {
    title: "Roundest | PokéNext",
    description: "Participate in voting to select the 'roundest' Pokémon",
  },
};

export default function Home() {
  return <RoundestScreen />;
}
