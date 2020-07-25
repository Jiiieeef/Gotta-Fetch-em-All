<template>
  <span class="type" :style="{'background-color': TYPES_COLOR_MAPPING[type]}">
    {{ type }}
  </span>
</template>

<script>
import TYPES_COLOR_MAPPING from '~/entities/typesColors';

export default {
  name: 'TagType',

  props: {
    type: {
      required: true,
      type: String
    }
  },

  data() {
    return {
      TYPES_COLOR_MAPPING: TYPES_COLOR_MAPPING
    };
  }
}
</script>

<style>
  span {
    border-radius: 3px;
    padding: 3px 5px;
    text-transform: capitalize;
    color: white;
  }
</style>
