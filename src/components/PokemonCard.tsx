import { Link } from "react-router";
import type { PokemonCardData } from "../types/pokemon";

interface Props {
  pokemon: PokemonCardData;
}

function formatId(id: number): string {
  return `#${String(id).padStart(3, "0")}`;
}

function capitalize(name: string): string {
  return name.charAt(0).toUpperCase() + name.slice(1);
}

export default function PokemonCard({ pokemon }: Props) {
  return (
    <Link
      to={`/pokemon/${pokemon.id}`}
      className="group flex flex-col rounded-xl bg-white p-4 shadow-card ring-1 ring-slate-900/5 transition-transform hover:-translate-y-0.5 hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
    >
      <div className="flex aspect-square items-center justify-center rounded-lg bg-slate-50">
        <img
          src={pokemon.sprite}
          alt={pokemon.name}
          loading="lazy"
          className="h-4/5 w-4/5 object-contain transition-transform group-hover:scale-105"
        />
      </div>
      <p className="mt-3 truncate text-sm font-semibold text-slate-800 text-center">
        {capitalize(pokemon.name)}
      </p>
      <p className="text-xs text-slate-400 text-center">{formatId(pokemon.id)}</p>
    </Link>
  );
}
