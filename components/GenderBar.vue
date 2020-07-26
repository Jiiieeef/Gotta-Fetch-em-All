<template>
  <div>
    <b-tooltip
      v-if="gender"
      :label="tooltipText"
      type="is-black"
    >
      <div class="gender-bar-container">
        <div class="value" :style="{width: `${gender}%`}" />
      </div>
    </b-tooltip>
    <span v-else class="genderless">Genderless</span>
  </div>
</template>

<script>
export default {
  name: 'GenderBar',

  props: {
    gender: {
      required: true,
      type: [Number, Boolean]
    }
  },

  computed: {
    tooltipText() {
      return `Male: ${100 - this.gender}% - Female: ${this.gender}%`;
    }
  }
};
</script>

<style lang="scss">
  .gender-bar-container {
    border-radius: 7px;
    overflow: hidden;
    position: relative;
    background: lightblue;
    height: 20px;
    width: 100px;

    .value {
      position: absolute;
      top: 0;
      bottom: 0;
      right: 0;
      background: pink;
    }
  }
</style>
