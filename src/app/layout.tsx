import type { Metadata } from "next";
import "./globals.css";
import { PokemonProvider } from "@/context/pokemon-context";
import { geistMono, geistSans, pressStart2P } from "./fonts";

export const metadata: Metadata = {
  title: "PokéNext",
  description: "Explore the world of Pokémon with our modern Pokédex",
  keywords: ["web app", "pokénext", "PokéNext", "Pokémon"],
  authors: [{ name: "Kei" }],
  creator: "Kei",
  publisher: "Kei",
  openGraph: {
    title: "PokéNext",
    description: "Explore the world of Pokémon with our modern Pokédex",
    url: "https://www.myamazingwebapp.com",
    siteName: "PokéNext",
    images: [
      {
        url: "https://www.myamazingwebapp.com/og-image.jpg",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "PokéNext",
    description: "Explore the world of Pokémon with our modern Pokédex",
    creator: "@Kei_Katherin",
    images: ["https://www.myamazingwebapp.com/twitter-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
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
