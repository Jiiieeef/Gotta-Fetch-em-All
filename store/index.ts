import { Dispatch } from 'vuex';

export const actions = {
  async nuxtServerInit ({dispatch}: { dispatch: Dispatch }) {
    await dispatch('pokemons/fetchPokemons');
  }
};
