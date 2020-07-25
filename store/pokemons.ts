import { Commit , ActionTree, GetterTree, MutationTree } from 'vuex';

import { RootState } from '.';
import { IPokemonsState, IPokemonListResult } from '~/entities/interfaces';
import { Pokemon } from '~/entities/pokemon';
import { PokemonSpecies } from '~/entities/pokemonSpecies';

export const state = (): IPokemonsState => ({
  pokemons: [],
  count: 0,
  limit: 100,
  nextUrl: ''
});

export const getters: GetterTree<IPokemonsState, RootState> = {
  getPokemons: (state: IPokemonsState) => state.pokemons,
  allPokemonArefetch: (state: IPokemonsState) => state.pokemons.length === state.count
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

  async fetchPokemon({ }, pokemonId: number) {
    const pokemon = await this.$axios.$get(`${process.env.API_BASE_URL}/pokemon/${pokemonId}`);

    return Pokemon.fromJson(pokemon);
  },

  async fetchPokemonSpecies({ }, pokemonId: number) {
    const species = await this.$axios.$get(`${process.env.API_BASE_URL}/pokemon-species/${pokemonId}`);

    return PokemonSpecies.fromJson(species);
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
  }
};
