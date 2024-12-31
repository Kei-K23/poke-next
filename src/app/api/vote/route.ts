import { Pokemon } from "@/context/pokemon-context";
import { votePokemon } from "@/lib/pokemon-api";

export async function POST(request: Request) {
  try {
    const res = (await request.json()) as { winner: Pokemon; loser: Pokemon };
    const { winner, loser } = res;
    await votePokemon(winner, loser);

    return Response.json({ success: true });
  } catch (error) {
    console.error("Error voting: ", error);
    return Response.json({ success: false });
  }
}
