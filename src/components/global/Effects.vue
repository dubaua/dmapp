<template lang="pug">
  .effects
    effect(
      v-for="(effect, index) in effects",
      :effect="effect",
      :key="index")
</template>

<script>
export default {
  name: 'Effects',
  props: {
    effects: {
      type: [Array, Object],
      required: true,
    },
  },
  methods: {},
};
</script>

<style lang="scss">
.effects {
  display: flex;
  flex-wrap: wrap;
}
</style>
