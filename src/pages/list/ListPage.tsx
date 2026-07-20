import { useState } from "react";
import { useSearchParams } from "react-router";
import ViewToggle, { type ViewMode } from "../../components/ViewToggle";
import QueryBoundary from "../../components/QueryBoundary";
import PokemonGrid from "../../components/PokemonGrid";
import PaginatedListView from "./PaginatedListView";
import LoadMoreListView from "./LoadMoreListView";

const SKELETON_COUNT = 20;

const MODE_COPY: Record<ViewMode, { subtitle: string; bgClass: string }> = {
  pagination: {
    subtitle: "Discover and explore Pokémon with page controls",
    bgClass: "bg-gradient-pagination",
  },
  loadMore: {
    subtitle: "Discover and explore Pokémon with infinite scroll",
    bgClass: "bg-gradient-infinite",
  },
};

export default function ListPage() {
  const [mode, setMode] = useState<ViewMode>("pagination");
  const [searchParams, setSearchParams] = useSearchParams();
  const page = Math.max(1, Number(searchParams.get("page") ?? "1") || 1);

  const setPage = (next: number) => {
    setSearchParams(next <= 1 ? {} : { page: String(next) });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const { subtitle, bgClass } = MODE_COPY[mode];

  return (
    <div className={`min-h-screen ${bgClass}`}>
      <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
        <header className="mb-8 text-center">
          <h1 className="text-2xl font-bold text-slate-800">⚡ Pokédex</h1>
          <p className="mt-1 text-sm text-slate-500">{subtitle}</p>
          <div className="mt-4 flex justify-center">
            <ViewToggle mode={mode} onChange={setMode} />
          </div>
        </header>

        <QueryBoundary
          key={mode}
          fallback={<PokemonGrid pokemons={[]} skeletonCount={SKELETON_COUNT} />}
        >
          {mode === "pagination" ? (
            <PaginatedListView page={page} onPageChange={setPage} />
          ) : (
            <LoadMoreListView />
          )}
        </QueryBoundary>
      </div>
    </div>
  );
}
