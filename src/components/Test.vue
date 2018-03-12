<template lang="pug">
  div
    .chaos.chaos--2: drag-adjust(v-bind="val1")
    .chaos.chaos--3: drag-adjust(v-bind="val2")
</template>

<script>
/* eslint-disable no-mixed-operators, no-console */
import Vue from "vue";
import DragAdjust from "@/components/DragAdjust";

export default {
  name: "Test",
  components: {
    DragAdjust
  },
  data() {
    return {
      val1: {
        value: 15,
        min: 0,
        max: 20,
        isLinear: true,
        update: (newValue) => {
          console.log(newValue);
          Vue.set(this.val1, "value", newValue);
        }
      },
      val2: {
        value: 150,
        min: 100,
        max: 200,
        isLinear: false,
        update: (newValue) => {
          console.log(newValue);
          Vue.set(this.val2, "value", newValue);
        }
      }
    };
  }
};
</script>

<style lang="scss">
.chaos {
  position: fixed;
  z-index: 1;
  display: inline-block;

  &--2 {
    left: 20px;
    top: 980px;
  }
  &--3 {
    left: 450px;
    top: 270px;
  }
}
</style>
