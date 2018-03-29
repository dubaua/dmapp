<template lang="pug">
  .die
    el-button(@click="roll(range)", type="primary") {{ result || range }}
    .log
      .log__entry(v-for="entry in log") {{ entry }}
</template>

<script>
const LOG_LENGTH = 10;

export default {
  name: 'Die',
  props: {
    range: {
      default: 20,
      type: Number,
    },
  },
  data() {
    return {
      result: this.range,
      log: [],
    };
  },
  methods: {
    roll(range) {
      const result = this.randomUpTo(range);
      this.addToLog(result);
      this.updateResult(result);
    },
    randomUpTo(range) {
      return Math.floor(Math.random() * range) + 1;
    },
    updateResult(result) {
      this.result = result;
    },
    addToLog(entry) {
      if (this.log.length === LOG_LENGTH) {
        this.log.pop();
      }
      this.log.unshift(entry);
    },
  },
};
</script>

<style lang="scss">
.die {
  display: flex;
  align-items: baseline;

  & button {
    min-width: 32px;
    text-align: center;
  }
}
.log {
  display: flex;

  &__entry {
    margin-right: 0.4em;
  }
}
</style>
