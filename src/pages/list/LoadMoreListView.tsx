import PokemonGrid from "../../components/PokemonGrid";
import { useLoadMorePokemon } from "../../hooks/useLoadMorePokemon";

function Spinner() {
  return (
    <svg
      className="h-4 w-4 animate-spin text-slate-400"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
      />
    </svg>
  );
}

export default function LoadMoreListView() {
  const { items, hasMore, loadingMore, loadMore } = useLoadMorePokemon();

  return (
    <>
      <PokemonGrid pokemons={items} />
      <div className="mt-8 flex flex-col items-center gap-2">
        {loadingMore ? (
          <div className="flex items-center gap-2 text-sm text-slate-400">
            <Spinner />
            <span>Loading more Pokémon…</span>
          </div>
        ) : hasMore ? (
          <button
            onClick={loadMore}
            className="rounded-full bg-slate-900 px-6 py-2 text-sm font-medium text-white transition-colors hover:bg-slate-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
          >
            Load More
          </button>
        ) : (
          <p className="text-xs text-slate-400">You've reached the end!</p>
        )}
        <p className="text-xs text-slate-400">Showing {items.length} Pokémon</p>
      </div>
    </>
  );
}
