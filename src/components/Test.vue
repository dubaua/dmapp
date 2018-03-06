<template lang="pug">
  div
    .chaos.chaos--1: drag-adjust(:value="0", :min="0", :max="100", :isLinear="false")
    .chaos.chaos--2: drag-adjust(:value="15", :min="10", :max="20", :isLinear="false")
    .chaos.chaos--3: drag-adjust(:value="200", :min="100", :max="555", :isLinear="false")
    .chaos.chaos--4: drag-adjust(:value="0", :min="0", :max="100", :isLinear="false")
    .chaos.chaos--5: drag-adjust(:value="0", :min="0", :max="100", :isLinear="false")
    .chaos.chaos--6: drag-adjust(:value="0", :min="0", :max="100", :isLinear="false")
    .chaos.chaos--7: drag-adjust(:value="0", :min="0", :max="100", :isLinear="false")
    .chaos.chaos--8: drag-adjust(:value="0", :min="0", :max="100", :isLinear="false")
</template>

<script>
import DragAdjust from "@/components/DragAdjust";

export default {
  name: "Test",
  components: {
    DragAdjust
  }
};
</script>

<style lang="scss">
.chaos {
  position: fixed;
  z-index: 1;
  display: inline-block;

  &--1 {
    left: 150px;
    top: 90px;
  }
  &--2 {
    left: 20px;
    top: 980px;
  }
  &--3 {
    left: 450px;
    top: 270px;
  }
  &--4 {
    left: 600px;
    top: 960px;
  }
  &--5 {
    left: 750px;
    top: 0;
  }
  &--6 {
    right: 0;
    top: 540px;
  }
  &--7 {
    left: 1050px;
    top: 630px;
  }
  &--8 {
    right: 30px;
    top: 920px;
  }
}
</style>
