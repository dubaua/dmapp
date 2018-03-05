<template lang="pug">
  div
    tracker
    roller
    drag-adjust
</template>

<script>
import Tracker from "@/components/Tracker";
import Roller from "@/components/Roller";
import DragAdjust from "@/components/DragAdjust";

export default {
  name: "HelloWorld",
  components: {
    Tracker,
    Roller,
    DragAdjust,
  },
  data() {
    return {
      msg: "Welcome to Your Vue.js App"
    };
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

</style>
