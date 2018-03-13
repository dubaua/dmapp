<template lang="pug">
  tr
    td
      el-button(@click="$emit('my-event', combatant.card.path)", type="primary", size="mini") Card
    td {{combatant.name}}
    td
      input(type="number", v-model.number.lazy="combatant.initiative")
    td {{combatant.ac}}
    td {{combatant.fort}}
    td {{combatant.ref}}
    td {{combatant.will}}
    td
      input(type="number", v-model.number.lazy="combatant.thp")
    td
      input(type="number", v-model.number.lazy="combatant.hp")
    td
      el-switch(v-model="combatant.target")
    td
      el-switch(v-model="combatant.hit")
    td effects
</template>

<script>
export default {
  name: "Combatant",
  props: {
    combatant: {
      default: null,
      type: Object
    },
    showCard: {
      default: null,
      type: Function
    },
  }
};
</script>

<style lang="scss" scoped>
  input {
    max-width: 50px;
  }
</style>
