import { pressStart2P } from "@/app/fonts";
import { getTwoRandomPokemon, votePokemon } from "@/lib/pokemon-api";
import { cn } from "@/lib/utils";
import { revalidatePath } from "next/cache";
import Image from "next/image";

export default async function RoundestPage() {
  const randomPokemon = await getTwoRandomPokemon();

  return (
    <div className="flex items-center justify-center w-full">
      <div className="flex items-center justify-center w-full h-full py-32 gap-x-24">
        {[randomPokemon[0], 1, randomPokemon[1]].map((p, i) => {
          if (i === 1) {
            return (
              <p
                key={i}
                className={cn(
                  pressStart2P.className,
                  "text-5xl bg-gradient-to-r from-pink-500 to-yellow-500 bg-clip-text text-transparent"
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
                  src={p.sprites.other["official-artwork"].front_default}
                  alt={p.name}
                  width={300}
                  height={300}
                  className="mb-4"
                />
                <h3 className="capitalize text-2xl font-bold">{p.name}</h3>
                <form>
                  <button
                    className="mt-3 neo-brutalism-blue px-6 py-1.5 text-xl font-semibold"
                    formAction={async () => {
                      "use server";
                      const loser = randomPokemon[i === 0 ? 1 : 0];

                      if (loser) {
                        votePokemon(p.name, loser?.name);
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
