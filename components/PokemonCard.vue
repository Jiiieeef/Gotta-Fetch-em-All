<template>
  <div class="card" @click="goToPokemonDetail()">
    <header class="card-header">
      <p class="card-header-title">
        {{ pokemon.name }} ({{ pokemon.id }})
      </p>
    </header>
    <div class="card-content">
      <div class="media">
        <div class="media-left">
          <figure class="image is-96x96">
            <img :src="pokemon.frontImage">
          </figure>
        </div>
        <div class="media-content types">
          <TagType v-for="(type, index) in pokemon.types" :key="`type-${index}`" :type="type" />
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import TagType from './TagType';

export default {
  name: 'PokemonCard',

  components: {
    TagType
  },

  props: {
    pokemon: {
      required: true
    }
  },

  methods: {
    goToPokemonDetail() {
      this.$router.push({
        path: `/${this.pokemon.id}`
      });
    }
  }
}
</script>

<style lang="scss" scoped>
  .card {
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
