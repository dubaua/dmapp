<template lang="pug">
  div
    el-table(
      :data="sortedCombatants",
      style="width: 100%",
      stripe,
      header-cell-class-name="tracker-cell",
      cell-class-name="tracker-cell")
      el-table-column(
        fixed="left",
        prop="name",
        label="Combatant",
        width="180",
        align="right")
        template(slot-scope="scope")
          el-button(
            @click="showCard(scope.row.card.path)",
            plain,
            type="primary") {{scope.row.name}}
      el-table-column(
        prop="initiative",
        label="Init",
        width="68",
        align="center")
        template(slot-scope="scope")
          drag-adjust(
            v-model="scope.row.initiative",
            :min="0",
            :max="50")
            el-input(v-model="scope.row.initiative")
      el-table-column(
        prop="ac",
        label="AC",
        width="42",
        align="center")
      el-table-column(
        prop="fort",
        label="FORT",
        width="42",
        align="center")
      el-table-column(
        prop="ref",
        label="REF",
        width="42",
        align="center")
      el-table-column(
        prop="will",
        label="WILL",
        width="42",
        align="center")
      el-table-column(
        prop="thp",
        label="THP",
        width="42",
        align="center")
      el-table-column(
        prop="hp",
        label="HP",
        width="42",
        align="center")
      el-table-column(
        prop="target",
        label="Target",
        width="50",
        align="center")
        template(slot-scope="scope")
          el-switch(v-model="scope.row.target")
      el-table-column(
        prop="hit",
        label="Hit",
        width="50",
        align="center")
        template(slot-scope="scope")
          el-switch(v-model="scope.row.hit")
      el-table-column(
        prop="effects",
        label="Effects")
    el-button Process attack

</template>

<script>
import EffectConstructor from "@/components/EffectConstructor";
import DragAdjust from "@/components/ui/DragAdjust";

// some commetn
export default {
  name: "Tracker",
  components: {
    EffectConstructor,
    DragAdjust
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
      ],
      hitResults: {
        damage: 0,
        heal: 0,
        temporaryHP: 0,
        effects: {},
      },
      missResults: {
        damage: 0,
        heal: 0,
        temporaryHP: 0,
        effects: {},
      },
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
  }
};
</script>

<style lang="scss">
@import "../styles/main.scss";

.tracker-cell {
  & .cell {
    padding: 0 5px;
  }
}
</style>
