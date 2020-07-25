<template>
  <section class="section">
    <h1>Hello trainer!</h1>

    <div class="columns is-multiline">
      <div v-for="pokemon in pokemons" :key="pokemon.id"
        class="column is-4-desktop is-3-widescreen is-half-tablet"
      >
        <PokemonCard :pokemon="pokemon" />
      </div>
    </div>
  </section>
</template>

<script>
import { mapGetters } from 'vuex';
import PokemonCard from '~/components/PokemonCard.vue';

export default {
  name: 'HomePage',

  components: {
    PokemonCard
  },

  computed: {
    ...mapGetters({
      pokemons: 'pokemons/getPokemons'
    })
  },

  async created() {
    await this.$store.dispatch('pokemons/fetchPokemons');
  }
}
</script>
