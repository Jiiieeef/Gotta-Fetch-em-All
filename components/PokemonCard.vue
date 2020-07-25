<template>
  <div class="card">
    <header class="card-header">
      <p class="card-header-title">
        {{ pokemon.id }} {{ pokemon.name }}
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
  }
}
</script>


<style>
  .types .type:not(:last-child) {
    margin-right: 5px;
  }
</style>
