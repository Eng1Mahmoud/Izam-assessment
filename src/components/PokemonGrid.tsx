import type { PokemonCardData } from "../types/pokemon";
import PokemonCard from "./PokemonCard";
import CardSkeleton from "./CardSkeleton";

interface Props {
  pokemons: PokemonCardData[];
  skeletonCount?: number;
}

export default function PokemonGrid({ pokemons, skeletonCount = 0 }: Props) {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4">
      {pokemons.map((p) => (
        <PokemonCard key={p.id} pokemon={p} />
      ))}
      {Array.from({ length: skeletonCount }).map((_, i) => (
        <CardSkeleton key={`skeleton-${i}`} />
      ))}
    </div>
  );
}
