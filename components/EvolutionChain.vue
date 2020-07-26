<template>
  <li :class="{hasEvolution: evolutionChain.evolveTo.length}">
    <span class="pokemon-name">
      {{ evolutionChain.species.name }}
    </span>

    <ul v-if="evolutionChain.evolveTo.length">
      <EvolutionChain
        v-for="evolution in evolutionChain.evolveTo" :key="evolution.species.name"
        :evolutionChain="evolution"
      />
    </ul>
  </li>
</template>

<script>
export default {
  name: 'EvolutionChain',

  props: {
    evolutionChain: {
      required: true
    }
  }
}
</script>

<style lang="scss">
  li.hasEvolution ul {
    margin-left: 5px;
  }
</style>
