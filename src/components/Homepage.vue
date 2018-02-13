<template lang="pug">
  div
    tracker
    roller
</template>

<script>
import Tracker from "@/components/Tracker";
import Roller from "@/components/Roller";

export default {
  name: "HelloWorld",
  components: {
    Tracker,
    Roller
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
