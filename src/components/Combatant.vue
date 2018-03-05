<template lang="pug">
  tr
    td
      button(@click="$emit('my-event', combatant.card.path)") {{combatant.card.path}}
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
      input(type="checkbox", v-model="combatant.target")
    td
      input(type="checkbox", v-model="combatant.hit")
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

<style lang="scss"></style>
