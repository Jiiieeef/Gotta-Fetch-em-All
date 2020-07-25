<template>
  <div>
    <div>{{ pokemon.name }} - {{ pokemon.id }}</div>
    <PokeballLoader v-if="!species" />
    <div v-else>
      <div>{{ species.descriptions && species.descriptions[0].flavor_text }} </div>
      <GenderBar :gender="species.getGenderPercentage()" />
      <div>{{ species.isBaby }}</div>
      <div>{{ species.generation }}</div>
      <div>{{ species.evolution_chain }}</div>
    </div>
  </div>
</template>

<script>
import PokemonCard from '~/components/PokemonCard.vue';
import PokeballLoader from '~/components/PokeballLoader.vue';
import GenderBar from '~/components/GenderBar.vue';

export default {
  components: {
    PokeballLoader,
    GenderBar
  },

  data() {
    return {
      species: undefined
    };
  },

  async asyncData({ route, store }) {
    const pokemon = await store.dispatch('pokemons/fetchPokemon', route.params.id);
    return { pokemon };
  },

  async created() {
    this.species = await this.$store.dispatch('pokemons/fetchPokemonSpecies', this.pokemon.id);
  }
}
</script>

<style>
  .gender-bar-container {
    width: 100px;
  }
</style>
