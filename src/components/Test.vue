<template lang="pug">
  div
    .test.test--1: drag-adjust(v-model="test1", :min="0", :max="20")
    .test.test--2: drag-adjust(v-model="test2", :min="100", :max="200")
</template>

<script>
import DragAdjust from "@/components/DragAdjust";

export default {
  name: "Test",
  components: {
    DragAdjust
  },
  data() {
    return {
      test1: 7,
      test2: 165,
    };
  }
};
</script>

<style lang="scss">
.test {
  display: inline-block;
  vertical-align: top;

  &--1 {
    margin-left: 20px;
    margin-top: 980px;
  }
  &--2 {
    margin-left: 450px;
    margin-top: 270px;
  }
}
</style>
