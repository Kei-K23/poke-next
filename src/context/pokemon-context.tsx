"use client";

import { getAllPokemon, getPokemon } from "@/lib/pokemon-api";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";

export interface PokemonList {
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
      home: {
        front_default: string;
      };
      dream_world: {
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
  pokemonDetailsListForVote: Pokemon[];
  favoritePokemon: Pokemon[];
  isLoading: boolean;
  isLoadingForVote: boolean;
  hasMore: boolean;
  addFavorite: (pokemon: Pokemon) => void;
  removeFavorite: (pokemonId: number) => void;
  fetchMorePokemon: () => Promise<void>;
  fetchAllPokemon: () => Promise<void>;
}

// Create context
const PokemonContext = createContext<PokemonContextType | undefined>(undefined);

// Create provider
export const PokemonProvider = ({ children }: PokemonProviderProps) => {
  const [pokemonDetailsList, setPokemonDetailsList] = useState<Pokemon[]>([]);
  const [pokemonDetailsListForVote, setPokemonDetailsListForVote] = useState<
    Pokemon[]
  >([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingForVote, setIsLoadingForVote] = useState(false);
  const [favoritePokemon, setFavoritePokemon] = useState<Pokemon[]>([]);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);

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

  const fetchMorePokemon = useCallback(async () => {
    if (isLoading || !hasMore) return;

    try {
      setIsLoading(true);
      const pokemonList = await getAllPokemon(20, offset);
      if (pokemonList.length === 0) {
        setHasMore(false);
        return;
      }

      const newPokemonDetails = await Promise.all(
        pokemonList.map(async (pokemon) => {
          const pokemonDetail = await getPokemon(pokemon.name);
          return pokemonDetail;
        })
      );

      setPokemonDetailsList((prev) => {
        const uniqueNewPokemon = newPokemonDetails
          .filter(
            (pokemon): pokemon is Pokemon =>
              pokemon !== null && pokemon !== undefined
          ) // Ensure no null or undefined values
          .filter((pokemon) => !prev.some((p) => p.id === pokemon.id)); // Remove duplicates

        return [...prev, ...uniqueNewPokemon];
      });

      setOffset((prevOffset) => prevOffset + pokemonList.length);
    } catch (error) {
      console.log("Error when fetching pokemon data ", error);
    } finally {
      setIsLoading(false);
    }
  }, [offset, isLoading, hasMore]);

  // Add a function to fetch all Pokémon data
  const fetchAllPokemon = useCallback(async () => {
    try {
      setIsLoadingForVote(true);

      let allPokemonList: PokemonList[] = [];
      let currentOffset = 0;
      const limit = 100; // Fetch in chunks to optimize requests

      // Fetch Pokémon data until all are retrieved
      while (true) {
        const pokemonList = await getAllPokemon(limit, currentOffset);
        if (pokemonList.length === 0) break;

        allPokemonList = [...allPokemonList, ...pokemonList];
        currentOffset += limit;
      }

      // Fetch detailed data for all Pokémon
      const allPokemonDetails = await Promise.all(
        allPokemonList.map(async (pokemon) => {
          const pokemonDetail = await getPokemon(pokemon.name);
          return pokemonDetail;
        })
      );

      const uniquePokemonDetails = allPokemonDetails
        .filter(
          (pokemon): pokemon is Pokemon =>
            pokemon !== null && pokemon !== undefined
        ) // Ensure no null or undefined values
        .reduce<Pokemon[]>((unique, pokemon) => {
          if (!unique.some((p) => p.id === pokemon.id)) {
            unique.push(pokemon);
          }
          return unique;
        }, []); // Deduplicate Pokémon

      setPokemonDetailsListForVote(uniquePokemonDetails);
    } catch (error) {
      console.log("Error fetching all Pokémon data:", error);
    } finally {
      setIsLoadingForVote(false);
    }
  }, []);

  useEffect(() => {
    fetchMorePokemon();
  }, []);

  return (
    <PokemonContext.Provider
      value={{
        pokemonDetailsList,
        pokemonDetailsListForVote,
        isLoading,
        isLoadingForVote,
        favoritePokemon,
        hasMore,
        addFavorite,
        removeFavorite,
        fetchMorePokemon,
        fetchAllPokemon,
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
