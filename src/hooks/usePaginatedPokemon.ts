import { useSuspenseQuery } from "@tanstack/react-query";
import { fetchPokemonList } from "../api/pokemon";
import { pokemonKeys } from "./queryKeys";

const PAGE_SIZE = 20;

export function usePaginatedPokemon(page: number) {
  const { data } = useSuspenseQuery({
    queryKey: pokemonKeys.paginatedList(page),
    queryFn: () => fetchPokemonList(PAGE_SIZE, (page - 1) * PAGE_SIZE),
  });

  const totalPages = Math.max(1, Math.ceil(data.count / PAGE_SIZE));

  return {
    items: data.items,
    totalCount: data.count,
    totalPages,
    pageSize: PAGE_SIZE,
  };
}
