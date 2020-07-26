<template>
  <section class="section">
    <div class="loading" v-if="loading">
      <PokeballLoader />
    </div>
    <div class="columns" v-else>
      <div class="column is-7">
        <PokemonCard :pokemon="pokemon" :species="species" :isFocusedPokemon="true" />
      </div>
      <div class="column is-5">
        <div v-if="species && species.evolutionChain">
          <h2 class="subtitle">{{ species.evolutionChain.species.name }}'s Evolution chain</h2>
          <ul>
            <EvolutionChain
              :evolutionChain="species.evolutionChain"
              :currentPokemon="pokemon"
            />
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import PokeballLoader from '~/components/PokeballLoader.vue';
import EvolutionChain from '~/components/EvolutionChain.vue';

export default {
  components: {
    PokeballLoader,
    EvolutionChain
  },

  data() {
    return {
      species: undefined,
      loading: false
    };
  },

  async asyncData({ route, store }) {
    const pokemon = await store.dispatch('pokemons/fetchPokemon', route.params.id);
    return { pokemon };
  },

  async created() {
    this.loading = true;
    this.species = await this.$store.dispatch('pokemons/fetchPokemonSpecies', {pokemonId: this.pokemon.id, fetchEvolution: true});
    this.loading = false;
  }
}
</script>

<style>
  .card-header-title, .subtitle {
    text-transform: capitalize;
  }

  .loading {
    display: flex;
    justify-content: center;
  }
</style>
