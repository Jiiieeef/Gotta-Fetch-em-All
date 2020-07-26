<template>
  <li :class="{hasEvolution: evolutionChain.evolveTo.length}">
    <PokemonCard v-if="pokemon" :pokemon="pokemon" />

    <ul v-if="evolutionChain.evolveTo.length">
      <EvolutionChain
        v-for="evolution in evolutionChain.evolveTo"
        :key="evolution.species.name"
        :evolution-chain="evolution"
        :current-pokemon="currentPokemon"
      />
    </ul>
  </li>
</template>

<script>

export default {
  name: 'EvolutionChain',

  props: {
    evolutionChain: {
      required: true,
      type: Object
    },
    currentPokemon: {
      required: true,
      type: Object
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
      const species = await this.$store.dispatch('pokemons/fetchPokemonSpecies', { pokemonId: this.evolutionChain.species.name });
      this.pokemon = await this.$store.dispatch('pokemons/fetchPokemon', species.id);
    }
  }
};
</script>

<style lang="scss">
  li.hasEvolution ul {
    margin-left: 5px;
  }

  .card {
    margin-bottom: 15px;
  }
</style>
