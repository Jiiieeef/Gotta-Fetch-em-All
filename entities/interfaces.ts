import { Pokemon } from "./pokemon";

export interface IPokemonsState {
  pokemons: Pokemon[];
  count: number;
  limit: number;
  nextUrl: string;
}

export interface IPokemonListResult {
  name: string;
  url: string;
}
