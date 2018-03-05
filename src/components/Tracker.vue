<template lang="pug">
  div
    table
      tr
        td card
        td name
        td initiative
        td ac
        td fort
        td ref
        td will
        td thp
        td hp
        td target
        td hit
        td effects
      combatant(
        v-for="combatant in sortedCombatants",
        :key="combatant.id",
        :combatant="combatant",
        @my-event="showCard")
    effect-constructor
</template>

<script>
import Combatant from "@/components/Combatant";
import EffectConstructor from "@/components/EffectConstructor";

// some commetn
export default {
  name: "Tracker",
  components: {
    Combatant,
    EffectConstructor
  },
  data() {
    return {
      combatants: [
        {
          id: 1,
          name: "Mob 1",
          initiative: 17,
          ac: 20,
          fort: 20,
          ref: 20,
          will: 20,
          thp: 0,
          hp: 50,
          target: false,
          hit: false,
          effects: [],
          card: {
            path: "url"
          }
        },
        {
          id: 2,
          name: "Mob 2",
          initiative: 8,
          ac: 20,
          fort: 20,
          ref: 20,
          will: 20,
          thp: 0,
          hp: 50,
          target: false,
          hit: false,
          effects: [],
          card: {
            path: "url"
          }
        },
        {
          id: 3,
          name: "Mob 3",
          initiative: 16,
          ac: 15,
          fort: 15,
          ref: 15,
          will: 15,
          thp: 0,
          hp: 25,
          target: false,
          hit: false,
          effects: [],
          card: {
            path: "url"
          }
        }
      ]
    };
  },
  computed: {
    sortedCombatants() {
      // slice to avoid mutation
      return this.combatants
        .slice(0)
        .sort((a, b) => b.initiative - a.initiative);
    },
    hit() {
      return this.targets.filter(combatant => combatant.hit);
    },
    miss() {
      return this.targets.filter(combatant => !combatant.hit);
    },
    targets() {
      return this.combatants.filter(combatant => combatant.target);
    }
  },
  methods: {
    showCard(url) {
      // eslint-disable-next-line
      console.log(url);
    }
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
table {
  border-collapse: collapse;

  & td {
    border: 1px solid #ccc;
    padding: 2px 5px;
  }
}
</style>
