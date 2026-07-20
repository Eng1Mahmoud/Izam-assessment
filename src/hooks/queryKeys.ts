export const pokemonKeys = {
  all: ["pokemon"] as const,
  paginatedList: (page: number) =>
    [...pokemonKeys.all, "paginated-list", page] as const,
  infiniteList: () => [...pokemonKeys.all, "infinite-list"] as const,
  detail: (id: string | number) =>
    [...pokemonKeys.all, "detail", id] as const,
};
