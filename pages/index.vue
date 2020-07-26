<template>
  <section class="section">
    <b-field label="Search by name or ID">
      <b-input type="search" icon="magnify" v-model="search"></b-input>
    </b-field>
    <p v-if="search && !pokemons.length">
      No pokémons correspondig to '{{ search }}'.
      <a href="#" class="manual-load-more-pokemons" v-if="!preventLoadingMorePokemon" @click="loadMorePokemons">Load more pokémons</a>
    </p>
    <transition-group name="slide-fade" tag="div" class="columns is-multiline">
      <div v-for="pokemon in pokemons" :key="pokemon.id"
        class="column is-4-desktop is-3-widescreen is-half-tablet"
      >
        <PokemonCard :pokemon="pokemon" />
      </div>
    </transition-group>

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
      pokemons: 'pokemons/getPokemons',
      allPokemonArefetch: 'pokemons/allPokemonArefetch'
    }),

    preventLoadingMorePokemon() {
      return this.allPokemonArefetch || this.isLoading;
    },

    search: {
      set(searchFilter) {
        this.$store.commit('pokemons/SET_SEARCH_FILTER', searchFilter);
      },

      get() {
        return this.$store.getters['pokemons/searchFilter'];
      },
    }
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
