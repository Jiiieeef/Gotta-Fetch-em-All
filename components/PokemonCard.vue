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
        <div class="media-content">
          <ul>
            <li v-for="(type, index) in pokemon.types" :key="`type-${index}`">{{ type }}</li>
          </ul>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  name: 'PokemonCard',

  props: {
    pokemon: {
      required: true
    }
  }
}
</script>
