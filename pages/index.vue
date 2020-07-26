<template>
  <section class="section">
    <b-field label="Search by name or ID">
      <b-input v-model="search" type="search" icon="magnify" />
    </b-field>

    <b-field label="Select types (only two types can be selected at once)">
      <div class="types-container">
        <span
          v-for="type in types"
          :key="type"
          :class="{selected: selectedTypes.includes(type)}"
          class="type"
          @click="onClickType(type)"
        >
          <TagType :type="type" />
        </span>
      </div>
    </b-field>

    <p v-if="(search || selectedTypes.length) && !pokemons.length">
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

import PokemonCard from '~/components/PokemonCard.vue';
import PokeballLoader from '~/components/PokeballLoader.vue';
import TYPES_COLOR_MAPPING from '~/entities/typesColors';

const SCROLL_OFFSET = 500;

export default {
  name: 'HomePage',

  components: {
    PokemonCard,
    PokeballLoader
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

    search: {
      set(searchFilter) {
        this.$store.commit('pokemons/SET_SEARCH_FILTER', searchFilter);
      },

      get() {
        return this.$store.getters['pokemons/searchFilter'];
      }
    },

    selectedTypes() {
      return this.$store.getters['pokemons/selectedTypes'];
    },

    types() {
      return Object.keys(TYPES_COLOR_MAPPING);
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
    },

    onClickType(type) {
      let selectedTypes = [...this.selectedTypes];

      if (selectedTypes.includes(type)) {
        selectedTypes = selectedTypes.filter(_type => _type !== type);
      } else {
        if (selectedTypes.length === 2) {
          selectedTypes.shift();
        }

        selectedTypes.push(type);
      }

      this.$store.commit('pokemons/SET_SELECTED_TYPES', selectedTypes);
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

  .types-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin-bottom: 15px;

    .type {
      cursor: pointer;
      margin-right: 10px;
      margin-bottom: 10px;

      &.selected, &:hover {
        span {
          border: 1px solid black;
        }
      }
    }
  }

</style>
