import React, { useEffect, useState } from "react";
import { CircleDot, Delete, Ruler, SortAsc, Weight, Zap } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Pokemon } from "@/context/pokemon-context";

const pokemonTypes = [
  "Normal",
  "Fire",
  "Water",
  "Electric",
  "Grass",
  "Ice",
  "Fighting",
  "Poison",
  "Ground",
  "Flying",
  "Psychic",
  "Bug",
  "Rock",
  "Ghost",
  "Dragon",
  "Dark",
  "Steel",
  "Fairy",
];

const pokemonAbilities = [
  "Overgrow",
  "Blaze",
  "Torrent",
  "Shield Dust",
  "Shed Skin",
  "Compound Eyes",
  "Swarm",
  "Keen Eye",
  "Run Away",
  "Intimidate",
  "Static",
  "Sand Veil",
  "Synchronize",
  "Levitate",
  "Pressure",
  "Adaptability",
  "Multiscale",
  "Sturdy",
  "Inner Focus",
  "Guts",
];

interface FilterProps {
  pokemonDetailsList: Pokemon[];
  searchQuery: string;
  setSearchResult: React.Dispatch<React.SetStateAction<Pokemon[]>>;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
}

export default function Filter({
  pokemonDetailsList,
  searchQuery,
  setSearchResult,
  setSearchQuery,
}: FilterProps) {
  const [selectedType, setSelectedType] = useState("");
  const [selectedAbility, setSelectedAbility] = useState("");
  const [selectedWeight, setSelectedWeight] = useState(0);
  const [selectedHeight, setSelectedHeight] = useState(0);
  const [sortOrder, setSortOrder] = useState("");

  const clearFilters = () => {
    setSearchQuery("");
    setSearchResult([]);
    setSelectedAbility("");
    setSelectedType("");
    setSelectedWeight(0);
    setSelectedHeight(0);
  };

  useEffect(() => {
    const filteredResult = pokemonDetailsList.filter((pokemon) => {
      const matchesName = pokemon.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesType = selectedType
        ? pokemon.types.some((t) => t.type.name === selectedType)
        : true;
      const matchesAbility = selectedAbility
        ? pokemon.abilities.some((a) => a.ability.name === selectedAbility)
        : true;
      const matchesWeight = selectedWeight
        ? pokemon.weight === selectedWeight
        : true;
      const matchesHeight = selectedHeight
        ? pokemon.height === selectedHeight
        : true;

      return (
        matchesName &&
        matchesType &&
        matchesAbility &&
        matchesWeight &&
        matchesHeight
      );
    });

    switch (sortOrder) {
      case "Ascending":
        setSearchResult(
          filteredResult.sort((a, b) => {
            return a.name.localeCompare(b.name, undefined, {
              sensitivity: "base",
            });
          })
        );
        break;
      case "Descending":
        setSearchResult(
          filteredResult.sort((a, b) => {
            return b.name.localeCompare(a.name, undefined, {
              sensitivity: "base",
            });
          })
        );
        break;
      default:
        setSearchResult(filteredResult);
        break;
    }
  }, [
    searchQuery,
    selectedType,
    selectedAbility,
    selectedWeight,
    selectedHeight,
    sortOrder,
    pokemonDetailsList,
  ]);

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-x-4">
        <Select
          value={selectedType}
          onValueChange={(value) => setSelectedType(value)}
        >
          <SelectTrigger className="neo-brutalism w-[150px] ring-0 border-0 focus-visible:ring-offset-0 focus-visible:ring-0">
            <div className="flex items-center gap-1">
              <CircleDot className="mr-1 size-4 text-muted-foreground" />
              <SelectValue placeholder="Types" />
            </div>
          </SelectTrigger>
          <SelectContent>
            {pokemonTypes.map((type, index) => (
              <SelectItem
                key={index}
                value={type.toLowerCase()}
                className="focus:bg-[#90E8FF] focus:text-black"
              >
                {type}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select
          value={selectedAbility}
          onValueChange={(value) => setSelectedAbility(value)}
        >
          <SelectTrigger className="neo-brutalism w-[150px] ring-0 border-0 focus-visible:ring-offset-0 focus-visible:ring-0">
            <div className="flex items-center gap-1">
              <Zap className="mr-1 size-4 text-muted-foreground" />
              <SelectValue placeholder="Ability" />
            </div>
          </SelectTrigger>
          <SelectContent>
            {pokemonAbilities.map((ability, index) => (
              <SelectItem
                key={index}
                value={ability.toLowerCase()}
                className="focus:bg-[#90E8FF] focus:text-black"
              >
                {ability}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <div className="w-[150px] relative neo-brutalism mx-auto">
          <Weight className="text-muted-foreground absolute top-1/2 size-4 -translate-y-1/2 left-2" />
          <input
            autoFocus
            type="number"
            className="placeholder:text-black placeholder:text-sm border-none outline-none w-full h-full pl-8 py-1"
            placeholder="Weight"
            onChange={(e) => setSelectedWeight(+e.target.value)}
          />
        </div>
        <div className="w-[150px] relative neo-brutalism mx-auto">
          <Ruler className="text-muted-foreground absolute top-1/2 size-4 -translate-y-1/2 left-2" />
          <input
            autoFocus
            type="number"
            className="placeholder:text-black placeholder:text-sm border-none outline-none w-full h-full pl-8 py-1"
            placeholder="Height"
            onChange={(e) => setSelectedHeight(+e.target.value)}
          />
        </div>
        <Select
          value={sortOrder}
          onValueChange={(value) => setSortOrder(value)}
        >
          <SelectTrigger className="neo-brutalism w-[150px] ring-0 border-0 focus-visible:ring-offset-0 focus-visible:ring-0">
            <div className="flex items-center gap-1">
              <SortAsc className="mr-1 size-4 text-muted-foreground" />
              <SelectValue placeholder="Sort Order" />
            </div>
          </SelectTrigger>
          <SelectContent>
            <SelectItem
              value={"Ascending"}
              className="focus:bg-[#90E8FF] focus:text-black"
            >
              Ascending
            </SelectItem>
            <SelectItem
              value={"Descending"}
              className="focus:bg-[#90E8FF] focus:text-black"
            >
              Descending
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
      <button
        onClick={clearFilters}
        className="neo-brutalism px-3 py-1.5 flex items-center gap-x-1"
      >
        <Delete /> Clear Filter
      </button>
    </div>
  );
}
