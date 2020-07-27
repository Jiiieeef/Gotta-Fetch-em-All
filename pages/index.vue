<template>
  <section class="section">
    <Filters />

    <p v-if="(useFilters || selectedTypes.length) && !pokemons.length">
      No pokémons correspondig to your research.
      <a v-if="!preventLoadingMorePokemon" href="#" class="manual-load-more-pokemons" @click="loadMorePokemons">Load more pokémons</a>
    </p>

    <transition-group name="slide-fade" tag="div" class="columns is-multiline">
      <div
        v-for="pokemon in pokemons"
        :key="pokemon.id"
        class="column is-4-desktop is-3-widescreen is-half-tablet"
      >
        <PokemonCard :pokemon="pokemon" />
      </div>
    </transition-group>

    <div v-if="isLoading" class="loader-container">
      <PokeballLoader />
    </div>
  </section>
</template>

<script>
import { mapGetters } from 'vuex';

import Filters from '~/components/Filters.vue';
import PokemonCard from '~/components/PokemonCard.vue';
import PokeballLoader from '~/components/PokeballLoader.vue';

const SCROLL_OFFSET = 500;

export default {
  name: 'HomePage',

  components: {
    PokemonCard,
    PokeballLoader,
    Filters
  },

  data() {
    return {
      isLoading: false
    };
  },

  computed: {
    ...mapGetters({
      pokemons: 'pokemons/getPokemons',
      allPokemonArefetch: 'pokemons/allPokemonArefetch'
    }),

    preventLoadingMorePokemon() {
      return this.allPokemonArefetch || this.isLoading;
    },

    useFilters() {
      return this.$store.getters['pokemons/searchFilter'] ||
             this.$store.getters['pokemons/selectedTypes'];
    }
  },

  mounted() {
    document.addEventListener('scroll', this.onScroll);
  },

  destroyed() {
    document.removeEventListener('scroll', this.onScroll);
  },

  methods: {
    onScroll() {
      if (this.preventLoadingMorePokemon) {
        return;
      }

      if ((window.innerHeight + window.scrollY) >= (document.body.offsetHeight - SCROLL_OFFSET)) {
        this.loadMorePokemons();
      }
    },

    async loadMorePokemons() {
      this.isLoading = true;
      await this.$store.dispatch('pokemons/fetchPokemons');
      this.isLoading = false;
    }
  }
};
</script>

<style lang="scss">
  .loader-container {
    display: flex;
    justify-content: center;
  }

  .slide-fade-enter-active {
    transition: all .3s ease;
  }

  .slide-fade-enter, .slide-fade-leave-to {
    transform: translateX(10px);
    opacity: 0;
  }

  .manual-load-more-pokemons {
    font-weight: bold;
    cursor: pointer;
  }
</style>
