"use client";
import { config } from "@/lib/config";
import { createContext, useContext, useEffect, useState } from "react";

interface PokemonList {
  name: string;
  url: string;
}

// Pokemon Interface
export interface Pokemon {
  id: number;
  name: string;
  abilities: Array<{
    ability: {
      name: string;
    };
  }>;
  types: Array<{
    type: {
      name: string;
    };
  }>;
  sprites: {
    other: {
      "official-artwork": {
        front_default: string;
      };
    };
  };
  stats: Array<{
    base_stat: number;
    stat: {
      name: string;
    };
  }>;
  height: number;
  weight: number;
  base_experience: number;
}

interface PokemonProviderProps {
  children: React.ReactNode;
}

interface PokemonContextType {
  pokemonDetailsList: Pokemon[];
  favoritePokemon: Pokemon[];
  isLoading: boolean;
  addFavorite: (pokemon: Pokemon) => void;
  removeFavorite: (pokemonId: number) => void;
}

// Create context
const PokemonContext = createContext<PokemonContextType | undefined>(undefined);

// Create provider
export const PokemonProvider = ({ children }: PokemonProviderProps) => {
  const [pokemonDetailsList, setPokemonDetailsList] = useState<Pokemon[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [favoritePokemon, setFavoritePokemon] = useState<Pokemon[]>([]);

  // Load favorites from localStorage on mount
  useEffect(() => {
    const storedFavorites = localStorage.getItem("poke_next_favoritePokemon");
    if (storedFavorites) {
      setFavoritePokemon(JSON.parse(storedFavorites));
    }
  }, []);

  // Sync favorites to localStorage
  useEffect(() => {
    localStorage.setItem(
      "poke_next_favoritePokemon",
      JSON.stringify(favoritePokemon)
    );
  }, [favoritePokemon]);

  const addFavorite = (pokemon: Pokemon) => {
    setFavoritePokemon((prev) => {
      if (!prev.some((fav) => fav.id === pokemon.id)) {
        return [...prev, pokemon];
      }
      return prev;
    });
  };

  const removeFavorite = (pokemonId: number) => {
    setFavoritePokemon((prev) =>
      prev.filter((pokemon) => pokemon.id !== pokemonId)
    );
  };

  const getAllPokemon = async (
    limit = 150,
    offset = 0
  ): Promise<PokemonList[]> => {
    const res = await fetch(
      `${config.BASE_POKEMON_API_V2}/pokemon?limit=${limit}&offset=${offset}`
    );

    if (!res.ok) {
      return [];
    }

    const data = await res.json();
    return data.results as PokemonList[];
  };

  const getPokemon = async (name: string): Promise<Pokemon | null> => {
    const res = await fetch(`${config.BASE_POKEMON_API_V2}/pokemon/${name}`);

    if (!res.ok) {
      return null;
    }

    const data = await res.json();
    return data;
  };

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        const pokemonList = await getAllPokemon();
        pokemonList.forEach(async (pokemon) => {
          const pokemonDetail = await getPokemon(pokemon.name);
          if (
            pokemonDetail &&
            !pokemonDetailsList.some((p) => p.id === pokemonDetail.id)
          ) {
            setPokemonDetailsList((prev) => [...prev, pokemonDetail]);
          }
        });
      } catch (error) {
        setIsLoading(true);
        console.log("Error when fetching pokemon data ", error);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  return (
    <PokemonContext.Provider
      value={{
        pokemonDetailsList,
        isLoading,
        favoritePokemon,
        addFavorite,
        removeFavorite,
      }}
    >
      {children}
    </PokemonContext.Provider>
  );
};

export const usePokemon = (): PokemonContextType => {
  const context = useContext(PokemonContext);
  if (!context) {
    throw new Error("usePokemon must be used within a PokemonProvider");
  }
  return context;
};
