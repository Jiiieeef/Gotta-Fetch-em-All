<template>
  <section>
    <b-collapse :open="false" aria-id="showFilters">
      <button slot="trigger" class="button is-primary" aria-controls="showFilters">
        Toggle filters
      </button>
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
    </b-collapse>
  </section>
</template>

<script>
import TYPES_COLOR_MAPPING from '~/entities/typesColors';

export default {
  name: 'Filters',

  computed: {
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

  methods: {
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
  section {
    margin-bottom: 10px;

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
  }
</style>
