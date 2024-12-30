import { pressStart2P } from "@/app/fonts";
import { Skeleton } from "@/components/ui/skeleton";
import { getTwoRandomPokemon, votePokemon } from "@/lib/pokemon-api";
import { cn } from "@/lib/utils";
import { Metadata } from "next";
import { revalidatePath } from "next/cache";
import Image from "next/image";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Roundest | PokéNext",
  description: "Participate in voting to select the 'roundest' Pokémon",
  openGraph: {
    title: "Roundest | PokéNext",
    description: "Participate in voting to select the 'roundest' Pokémon",
  },
};

function VoteContentLoading() {
  return (
    <div className="flex items-center justify-center w-full">
      <div className="flex items-center justify-center w-full h-full py-32 gap-x-5 md:gap-x-14 lg:gap-x-24">
        {[0, 1, 2].map((i) => {
          if (i === 1) {
            return (
              <p
                key={i}
                className={cn(
                  pressStart2P.className,
                  "text-2xl md:text-5xl lg:text-6xl bg-gradient-to-r from-pink-500 to-yellow-500 bg-clip-text text-transparent"
                )}
              >
                Vs
              </p>
            );
          }
          return (
            <div
              key={`loading-${i}`}
              className="flex items-center justify-center flex-col"
            >
              <Skeleton className="w-[300px] h-[300px] mb-4 rounded-lg" />
              <Skeleton className="h-8 w-40 mb-3" />
              <Skeleton className="h-10 w-24" />
            </div>
          );
        })}
      </div>
    </div>
  );
}

async function VoteContent() {
  const randomPokemon = await getTwoRandomPokemon();

  return (
    <div className="flex items-center justify-center w-full px-4">
      <div className="flex items-center justify-center w-full h-full py-32 gap-x-5 md:gap-x-14 lg:gap-x-24">
        {[randomPokemon[0], 1, randomPokemon[1]].map((p, i) => {
          if (i === 1) {
            return (
              <p
                key={i}
                className={cn(
                  pressStart2P.className,
                  "text-2xl md:text-5xl lg:text-6xl bg-gradient-to-r from-pink-500 to-yellow-500 bg-clip-text text-transparent"
                )}
              >
                Vs
              </p>
            );
          }
          if (p && typeof p !== "number") {
            return (
              <div
                key={`${p.name}-${i}`}
                className="flex items-center justify-center flex-col"
              >
                <Image
                  src={
                    p.sprites.other["official-artwork"].front_default ||
                    p.sprites.other["home"].front_default ||
                    p.sprites.other["dream_world"].front_default
                  }
                  alt={p.name}
                  width={300}
                  height={300}
                  className="mb-4"
                />
                <h3 className="capitalize text-base md:text-xl lg:text-2xl font-bold">
                  {p.name}
                </h3>
                <form>
                  <button
                    className="mt-3 neo-brutalism-blue px-4 py-1 text-base lg:px-6 lg:py-1.5 lg:text-xl font-semibold"
                    formAction={async () => {
                      "use server";
                      const loser = randomPokemon[i === 0 ? 1 : 0];

                      if (loser) {
                        votePokemon(p, loser);
                      }
                      revalidatePath("/roundest");
                    }}
                  >
                    Vote
                  </button>
                </form>
              </div>
            );
          }
        })}
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <div className="container mx-auto px-4">
      <Suspense fallback={<VoteContentLoading />}>
        <VoteContent />
      </Suspense>
    </div>
  );
}
