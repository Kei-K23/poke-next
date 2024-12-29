import type { Metadata } from "next";
import "./globals.css";
import { PokemonProvider } from "@/context/pokemon-context";
import { geistMono, geistSans, pressStart2P } from "./fonts";

export const metadata: Metadata = {
  title: "PokéNext",
  description: "PokéNext",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${pressStart2P.variable} antialiased`}
      >
        <PokemonProvider>{children}</PokemonProvider>
      </body>
    </html>
  );
}
