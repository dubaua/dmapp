<template lang="pug">
  .die
    button(@click="roll(range)") {{ result || range }}
    .log
      .log__entry(v-for="entry in log") {{ entry }}
</template>

<script>
export default {
  name: "Die",
  props: {
    range: {
      default: 20,
      type: Number
    }
  },
  data() {
    return {
      result: this.range,
      log: []
    };
  },
  methods: {
    roll(range) {
      const result = Math.floor(Math.random() * range) + 1;
      this.log.unshift(result);
      this.result = result;
    }
  }
};
</script>

<style lang="scss">
.die {
  display: flex;
  align-items: baseline;
}
.log {
  display: flex;

  &__entry {
    margin-right: 0.4em;
  }
}
</style>
