<template lang="pug">
  .effect(@click="removeEffect") {{ title }}
</template>

<script>
/*
TODO: create edit, remove, save methods
 */
export default {
  name: 'Effect',
  props: {
    effect: {
      type: Object,
      required: true,
    },
  },
  computed: {
    autoTitle() {
      return 'Suka Jopa';
    },
    title() {
      return this.effect.title || this.autoTitle;
    },
  },
  methods: {
    removeEffect() {
      this.$emit('remove', 123);
    },
  },
};
</script>

<style lang="scss">
</style>
