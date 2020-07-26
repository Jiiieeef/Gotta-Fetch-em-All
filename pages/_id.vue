<template>
  <section class="section">
    <div v-if="loading" class="loading">
      <PokeballLoader />
    </div>
    <div v-else class="columns">
      <div class="column is-7">
        <PokemonCard :pokemon="pokemon" :species="species" :is-focused-pokemon="shouldShowMoreInfo" />
      </div>
      <div class="column is-5">
        <div v-if="species && species.evolutionChain">
          <h2 class="subtitle">
            {{ species.evolutionChain.species.name }}'s Evolution chain
          </h2>
          <ul>
            <EvolutionChain
              :evolution-chain="species.evolutionChain"
              :current-pokemon="pokemon"
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

  async asyncData({ route, store, error }) {
    try {
      const pokemon = await store.dispatch('pokemons/fetchPokemon', route.params.id);
      return { pokemon };
    } catch (err) {
      error({ statusCode: 404, message: 'Pokémon not found' });
    }
  },

  data() {
    return {
      species: {},
      loading: false
    };
  },

  computed: {
    shouldShowMoreInfo() {
      return !!Object.keys(this.species).length;
    }
  },

  async created() {
    this.loading = true;
    try {
      this.species = await this.$store.dispatch('pokemons/fetchPokemonSpecies', { pokemonId: this.pokemon.id, fetchEvolution: true });
    } catch (err) {
      this.$buefy.snackbar.open({
        indefinite: true,
        message: `Could not get more informations about ${this.pokemon.name} species.`,
        type: 'is-danger',
        position: 'is-bottom'
      });
    }
    this.loading = false;
  }
};
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
