<template lang="pug">
  div
    die(
      v-for="(die, index) in dice",
      :range="die",
      :key="index")
</template>

<script>
import Die from '@/components/Die';

export default {
  name: 'Roller',
  components: {
    Die,
  },
  data() {
    return {
      dice: [
        4,
        6,
        8,
        10,
        12,
        20,
      ],
    };
  },
};
</script>

<style lang="scss">

</style>
