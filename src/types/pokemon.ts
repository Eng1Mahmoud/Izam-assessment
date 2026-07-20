export interface PokemonListItem {
  name: string;
  url: string;
}

export interface PokemonListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: PokemonListItem[];
}

export interface PokemonCardData {
  id: number;
  name: string;
  sprite: string;
}

export interface PokemonStat {
  name: string;
  value: number;
}

export interface PokemonAbility {
  name: string;
  isHidden: boolean;
}

export interface PokemonDetail {
  id: number;
  name: string;
  sprite: string;
  height: number; // decimeters, as returned by the API
  weight: number; // hectograms, as returned by the API
  types: string[];
  stats: PokemonStat[];
  abilities: PokemonAbility[];
  baseExperience: number;
}
