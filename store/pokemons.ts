import { Commit , ActionTree, GetterTree, MutationTree } from 'vuex';

import { RootState } from '.';
import { IPokemonsState, IPokemonListResult } from '~/entities/interfaces';
import { Pokemon } from '~/entities/pokemon';
import { PokemonSpecies } from '~/entities/pokemonSpecies';

export const state = (): IPokemonsState => ({
  pokemons: [],
  count: 0,
  limit: 100,
  nextUrl: '',
  searchFilter: '',
  selectedTypes: []
});

export const getters: GetterTree<IPokemonsState, RootState> = {
  getPokemons: (state: IPokemonsState) => {
    if (!state.searchFilter && !state.selectedTypes.length) {
      return state.pokemons;
    }

    const searchFilter = state.searchFilter.toLowerCase();
    return state.pokemons.filter((pokemon: Pokemon) =>
      (
        pokemon.name.toLowerCase().includes(searchFilter)
        || pokemon.id.toString().includes(searchFilter)
      ) && state.selectedTypes.every((type: string) => pokemon.types.includes(type))
    );
  },
  allPokemonArefetch: (state: IPokemonsState) => state.pokemons.length === state.count,
  searchFilter: (state: IPokemonsState) => state.searchFilter,
  selectedTypes: (state: IPokemonsState) => state.selectedTypes
};

export const actions: ActionTree<IPokemonsState, RootState>  = {
  async fetchPokemons({ state, commit }: { state: IPokemonsState, commit: Commit }) {
    const result = state.nextUrl
      ? await this.$axios.$get(state.nextUrl)
      : await this.$axios.$get(`${process.env.API_BASE_URL}/pokemon?limit=${state.limit}`);

    commit('SET_COUNT', result.count);
    commit('SET_NEXT_URL', result.next);

    const pokemonsListResult = Object.values(result.results) as IPokemonListResult[];
    const pokemonsPromises = pokemonsListResult.map((pokemon: IPokemonListResult) => this.$axios.$get(pokemon.url));
    const pokemonsResult = await Promise.all(pokemonsPromises);

    commit('ADD_POKEMONS', pokemonsResult);
  },

  async fetchPokemon(context, pokemonId: number) {
    const pokemon = await this.$axios.$get(`${process.env.API_BASE_URL}/pokemon/${pokemonId}`);

    return Pokemon.fromJson(pokemon);
  },

  async fetchPokemonSpecies({ dispatch }, { pokemonId, fetchEvolution }: { pokemonId: number | string, fetchEvolution: boolean}) {
    const species = await this.$axios.$get(`${process.env.API_BASE_URL}/pokemon-species/${pokemonId}`);
    let json = species;

    if (fetchEvolution) {
      const evolutionChain = await dispatch('fetchEvolutionChain', species.evolution_chain.url);
      json = {
        ...json,
        evolution_chain: evolutionChain
      };
    }

    const pokemon = PokemonSpecies.fromJson(json);

    return pokemon;
  },

  async fetchEvolutionChain(context, evolutionChainUrl: string) {
    const evolutionChain = await this.$axios.$get(evolutionChainUrl);

    return PokemonSpecies.evolutionChainParser(evolutionChain);
  }
};

export const mutations: MutationTree<IPokemonsState> = {
  SET_COUNT(state: IPokemonsState, count: number) {
    state.count = count;
  },

  SET_NEXT_URL(state: IPokemonsState, nextUrl: string) {
    state.nextUrl = nextUrl;
  },

  ADD_POKEMONS(state: IPokemonsState, pokemons: any[]) {
    const pkmns = pokemons.map(pkmn => Pokemon.fromJson(pkmn));
    state.pokemons.push(...pkmns);
  },

  SET_SEARCH_FILTER(state: IPokemonsState, searchFilter: string) {
    state.searchFilter = searchFilter;
  },

  SET_SELECTED_TYPES(state: IPokemonsState, selectedTypes: string[]) {
    state.selectedTypes = [...selectedTypes];
  }
};
