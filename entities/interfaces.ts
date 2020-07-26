import { Pokemon } from "./pokemon";

export interface IPokemonsState {
  pokemons: Pokemon[];
  count: number;
  limit: number;
  nextUrl: string;
  searchFilter: string;
  selectedTypes: string[];
}

export interface IPokemonListResult {
  name: string;
  url: string;
}

export interface IEvolutionChain {
  species: {
    name: string;
    url: string;
  };
  isBaby: boolean;
  evolveTo: IEvolutionChain[];
}
