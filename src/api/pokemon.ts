import type {
  PokemonCardData,
  PokemonDetail,
  PokemonListResponse,
} from "../types/pokemon";

// Interface for the result of fetching a page of Pokémon
export interface FetchPokemonPageResult {
  items: PokemonCardData[];
  count: number;
  next: string | null;
  previous: string | null;
}

const BASE_URL = import.meta.env.VITE_API_URL || "https://pokeapi.co/api/v2";

/** Extracts the numeric Pokémon id from its PokeAPI resource URL. */
function idFromUrl(url: string): number {
  const match = url.match(/\/pokemon\/(\d+)\/?$/);
  return match ? Number(match[1]) : 0;
}

// get pokemon image url by id from github repos instead fetch from pokeapi url for better performance
function spriteUrl(id: number): string {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
}

// handle response with throw error if response is not ok
async function handleResponse<T>(res: Response): Promise<T> {
  if (!res.ok) {
    throw new Error(`Request failed with status ${res.status}`);
  }
  return res.json() as Promise<T>;
}

/** Fetches a page of Pokémon and maps it into the shape the UI needs. */
export async function fetchPokemonList(
  limit: number,
  offset: number
): Promise<FetchPokemonPageResult> {
  const res = await fetch(`${BASE_URL}/pokemon?limit=${limit}&offset=${offset}`);
  const data = await handleResponse<PokemonListResponse>(res);

  const items: PokemonCardData[] = data.results.map((item) => {
    const id = idFromUrl(item.url);
    return {
      id,
      name: item.name,
      sprite: spriteUrl(id),
    };
  });

  return {
    items,
    count: data.count,
    next: data.next,
    previous: data.previous,
  };
}

export async function fetchPokemonDetail(id: number | string): Promise<PokemonDetail> {
  const res = await fetch(`${BASE_URL}/pokemon/${id}`);
  const data = await handleResponse<any>(res);

  return {
    id: data.id,
    name: data.name,
    sprite:
      data.sprites?.other?.["official-artwork"]?.front_default ??
      data.sprites?.front_default ??
      spriteUrl(data.id),
    height: data.height,
    weight: data.weight,
    types: data.types.map((t: any) => t.type.name),
    stats: data.stats.map((s: any) => ({
      name: s.stat.name,
      value: s.base_stat,
    })),
    abilities: data.abilities.map((a: any) => ({
      name: a.ability.name,
      isHidden: a.is_hidden,
    })),
    baseExperience: data.base_experience,
  };
}
