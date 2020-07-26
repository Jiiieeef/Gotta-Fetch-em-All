<template>
  <li :class="{hasEvolution: evolutionChain.evolveTo.length}">
    <PokemonCard :pokemon="pokemon" v-if="pokemon" />

    <ul v-if="evolutionChain.evolveTo.length">
      <EvolutionChain
        v-for="evolution in evolutionChain.evolveTo" :key="evolution.species.name"
        :evolutionChain="evolution"
        :currentPokemon="currentPokemon"
      />
    </ul>
  </li>
</template>

<script>
import PokemonCard from '~/components/PokemonCard.vue';

export default {
  name: 'EvolutionChain',

  props: {
    evolutionChain: {
      required: true
    },
    currentPokemon: {
      required: true
    }
  },

  data() {
    return {
      pokemon: {}
    };
  },

  async created() {
    if (this.currentPokemon.name === this.evolutionChain.species.name) {
      this.pokemon = this.currentPokemon;
    } else {
      const species = await this.$store.dispatch('pokemons/fetchPokemonSpecies', {pokemonId: this.evolutionChain.species.name});
      this.pokemon = await this.$store.dispatch('pokemons/fetchPokemon', species.id);
    }
  }
}
</script>

<style lang="scss">
  li.hasEvolution ul {
    margin-left: 5px;
  }
</style>
