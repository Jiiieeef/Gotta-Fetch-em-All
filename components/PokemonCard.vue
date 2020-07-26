<template>
  <div class="card" :class="{isFocusedPokemon}" @click="!isFocusedPokemon && goToPokemonDetail()">
    <header class="card-header">
      <p class="card-header-title">
        {{ pokemon.name }} ({{ pokemon.id }})
      </p>

      <span v-if="isFocusedPokemon && species.isBaby" class="card-header-icon">
        <b-tooltip :label="`${pokemon.name} is a baby.`" type="is-black">
          <span class="icon">
            🥚
          </span>
        </b-tooltip>
      </span>
    </header>
    <div class="card-content">
      <div class="media">
        <div class="media-left">
          <figure class="image is-96x96">
            <img v-if="pokemon.frontImage" :src="pokemon.frontImage" :alt="`${pokemon.name} front image`">
            <img v-else src="~assets/missigno.png" :alt="`${pokemon.name} front image`" :title="`No front image for ${pokemon.name}`">
          </figure>
        </div>
        <div class="media-content types">
          <p v-if="isFocusedPokemon">
            {{ description }}
          </p>

          <TagType v-for="(type, index) in pokemon.types" :key="`type-${index}`" :type="type" />
        </div>
      </div>
    </div>
    <footer v-if="isFocusedPokemon" class="card-footer">
      <div class="card-footer-item">
        <GenderBar :gender="species.getGenderPercentage()" />
      </div>
      <div class="card-footer-item">
        {{ generation }}
      </div>
    </footer>
  </div>
</template>

<script>
import TagType from './TagType';
import GenderBar from './GenderBar.vue';

import GENERATIONS from '~/entities/generations';

export default {
  name: 'PokemonCard',

  components: {
    TagType,
    GenderBar
  },

  props: {
    pokemon: {
      required: true,
      type: Object
    },
    species: {
      required: false,
      default: () => {},
      type: Object
    },
    isFocusedPokemon: {
      require: false,
      type: Boolean
    }
  },

  computed: {
    description() {
      if (!this.isFocusedPokemon) {
        return '';
      }
      const description = this.species.descriptions.find(desc => desc.language.name === 'en');
      return description ? description.flavor_text : '';
    },

    generation() {
      if (!this.isFocusedPokemon) {
        return '';
      }
      const genration = GENERATIONS[this.species.generation];
      return `Generation ${genration.id} - ${genration.region}`;
    }
  },

  methods: {
    goToPokemonDetail() {
      this.$router.push({
        path: `/${this.pokemon.id}`
      });
    }
  }
};
</script>

<style lang="scss" scoped>
  .card:not(.isFocusedPokemon) {
    cursor: pointer;
    transition: box-shadow 0.5s ease;

    &:hover {
      box-shadow: 0 10px 13px rgba(10, 10, 10, 0.1), 0 0 0 1px rgba(10, 10, 10, 0.1);
    }

    .card-header-title {
      text-transform: capitalize;
    }

    .types .type:not(:last-child) {
      margin-right: 5px;
    }
  }
</style>
