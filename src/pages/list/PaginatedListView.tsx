import PokemonGrid from "../../components/PokemonGrid";
import Pagination from "../../components/Pagination";
import { usePaginatedPokemon } from "../../hooks/usePaginatedPokemon";

interface Props {
  page: number;
  onPageChange: (page: number) => void;
}

export default function PaginatedListView({ page, onPageChange }: Props) {
  const { items, totalPages } = usePaginatedPokemon(page);

  return (
    <>
      <PokemonGrid pokemons={items} />
      <div className="mt-8 flex flex-col items-center gap-2">
        <Pagination page={page} totalPages={totalPages} onChange={onPageChange} />
        <p className="text-xs text-slate-400">
          Page {page} of {totalPages} ({items.length} Pokémon shown)
        </p>
      </div>
    </>
  );
}
