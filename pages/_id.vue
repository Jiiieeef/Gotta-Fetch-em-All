<template>
  <div>
    <div>{{ pokemon.name }} - {{ pokemon.id }}</div>
    <PokeballLoader v-if="!species" />
    <div v-else>
      <div>{{ description }}</div>
      <GenderBar :gender="species.getGenderPercentage()" />
      <div>{{ species.isBaby }}</div>
      <div>{{ species.generation }}</div>

      <div v-if="species.evolutionChain">
        Evolution chain {{ species.evolutionChain.species.name.toUpperCase() }}'s
        <ul>
          <EvolutionChain
            :evolutionChain="species.evolutionChain"
            :currentPokemon="pokemon"
          />
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import PokemonCard from '~/components/PokemonCard.vue';
import PokeballLoader from '~/components/PokeballLoader.vue';
import GenderBar from '~/components/GenderBar.vue';
import EvolutionChain from '~/components/EvolutionChain.vue';

export default {
  components: {
    PokeballLoader,
    GenderBar,
    EvolutionChain
  },

  data() {
    return {
      species: undefined
    };
  },

  computed: {
    description() {
      const description = this.species.descriptions.find(desc => desc.language.name === 'en');
      return description ? description.flavor_text : '';
    }
  },

  async asyncData({ route, store }) {
    const pokemon = await store.dispatch('pokemons/fetchPokemon', route.params.id);
    return { pokemon };
  },

  async created() {
    this.species = await this.$store.dispatch('pokemons/fetchPokemonSpecies', {pokemonId: this.pokemon.id, fetchEvolution: true});
  }
}
</script>

<style>
  .gender-bar-container {
    width: 100px;
  }
</style>
