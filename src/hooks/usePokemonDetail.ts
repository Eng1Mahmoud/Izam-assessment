import { useSuspenseQuery } from "@tanstack/react-query";
import { fetchPokemonDetail } from "../api/pokemon";
import { pokemonKeys } from "./queryKeys";

export function usePokemonDetail(id: string) {
  const { data } = useSuspenseQuery({
    queryKey: pokemonKeys.detail(id),
    queryFn: () => fetchPokemonDetail(id),
  });

  return { data };
}
