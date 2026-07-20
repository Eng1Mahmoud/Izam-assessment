import { useSuspenseInfiniteQuery } from "@tanstack/react-query";
import { fetchPokemonList } from "../api/pokemon";
import { pokemonKeys } from "./queryKeys";
import type { PokemonCardData } from "../types/pokemon";

const PAGE_SIZE = 20;

export function useLoadMorePokemon() {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useSuspenseInfiniteQuery({
      queryKey: pokemonKeys.infiniteList(),
      queryFn: ({ pageParam }) => fetchPokemonList(PAGE_SIZE, pageParam),
      initialPageParam: 0,
      getNextPageParam: (lastPage) => {
        if (!lastPage.next) return undefined;
        const url = new URL(lastPage.next);
        return Number(url.searchParams.get("offset"));
      },
    });

  const items: PokemonCardData[] = [];
  const seenIds = new Set<number>();
  for (const page of data.pages) {
    for (const item of page.items) {
      if (!seenIds.has(item.id)) {
        seenIds.add(item.id);
        items.push(item);
      }
    }
  }

  const totalCount = data.pages[0]?.count ?? 0;

  return {
    items,
    totalCount,
    hasMore: Boolean(hasNextPage),
    loadingMore: isFetchingNextPage,
    loadMore: () => fetchNextPage(),
  };
}
