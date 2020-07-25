<template>
  <section class="section" >
    <div class="columns is-multiline">
      <div v-for="pokemon in pokemons" :key="pokemon.id"
        class="column is-4-desktop is-3-widescreen is-half-tablet"
      >
        <PokemonCard :pokemon="pokemon" />
      </div>
    </div>

    <div class="loader-container" v-if="isLoading" >
      <PokeballLoader />
    </div>
  </section>
</template>

<script>
import { mapGetters } from 'vuex';
import PokemonCard from '~/components/PokemonCard.vue';
import PokeballLoader from '~/components/PokeballLoader.vue';

const SCROLL_OFFSET = 500;

export default {
  name: 'HomePage',

  data() {
    return {
      isLoading: false
    };
  },

  components: {
    PokemonCard,
    PokeballLoader
  },

  computed: {
    ...mapGetters({
      pokemons: 'pokemons/getPokemons'
    })
  },

  methods: {
    onScroll() {
      if (!this.isLoading && (window.innerHeight + window.scrollY) >= (document.body.offsetHeight - SCROLL_OFFSET)) {
        this.loadMorePokemons();
      }
    },

    async loadMorePokemons() {
      this.isLoading = true;
      await this.$store.dispatch('pokemons/fetchPokemons');
      this.isLoading = false;
    }
  },

  mounted() {
    document.addEventListener('scroll', this.onScroll);
  },

  destroyed() {
    document.removeEventListener('scroll', this.onScroll);
  }
}
</script>

<style>
  .loader-container {
    display: flex;
    justify-content: center;
  }
</style>
