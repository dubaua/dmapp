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
        label="Show Combatant Card",
        width="180",
        align="right")
        template(slot-scope="scope")
          el-button(
            @click="setCardUrl({ url: scope.row.card.path })",
            plain,
            type="primary") {{scope.row.name}}
      el-table-column(
        prop="initiative",
        label="Init",
        width="68",
        align="center")
        template(slot-scope="scope")
          drag-adjust(
            :value="scope.row.initiative",
            :min="0",
            :max="50",
            @input=`setInitiative({
              id: scope.row.id,
              value: $event})`)
            el-input(
              :value="scope.row.initiative",
              @change=`setInitiative({
                  id: scope.row.id,
                  value: $event})`)
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
          el-switch(
            :value="scope.row.target",
            @change="setTarget({id: scope.row.id, value: $event})",
            )
      el-table-column(
        prop="hit",
        label="Hit",
        width="50",
        align="center")
        template(slot-scope="scope")
          el-switch(
            :value="scope.row.hit",
            @change="setHit({id: scope.row.id, value: $event})",
            )
      el-table-column(
        prop="effects",
        label="Effects",
        align="left")
    .process-attack
      table
        tr
          th
          th Damage
          th Heal
          th Temp HP
          th Effects
        tr
          td Hit
          td
            drag-adjust(
              v-model="impact.hit.damage",
              :min="0",
              :max="100")
              el-input(v-model="impact.hit.damage")
          td
            drag-adjust(
              v-model="impact.hit.heal",
              :min="0",
              :max="100")
              el-input(v-model="impact.hit.heal")
          td
            drag-adjust(
              v-model="impact.hit.temporaryHP",
              :min="0",
              :max="100")
              el-input(v-model="impact.hit.temporaryHP")
          td
            el-button(type="text", icon="el-icon-plus") Add Effect on Hit
        tr
          td Miss
          td
            drag-adjust(
              v-model="impact.miss.damage",
              :min="0",
              :max="100")
              el-input(v-model="impact.miss.damage")
          td
            drag-adjust(
              v-model="impact.miss.heal",
              :min="0",
              :max="100")
              el-input(v-model="impact.miss.heal")
          td
            drag-adjust(
              v-model="impact.miss.temporaryHP",
              :min="0",
              :max="100")
              el-input(v-model="impact.miss.temporaryHP")
          td
            el-button(type="text", icon="el-icon-plus") Add Effect on Miss
      el-button(type="primary", @click="processAttack(impact)") Process Attack
</template>

<script>
import EffectConstructor from '@/components/EffectConstructor';
import DragAdjust from '@/components/ui/DragAdjust';
import { mapGetters, mapMutations, mapActions } from 'vuex';

export default {
  name: 'Tracker',
  components: {
    EffectConstructor,
    DragAdjust,
  },
  data() {
    return {
      impact: {
        hit: {
          damage: 0,
          heal: 0,
          temporaryHP: 0,
          effects: {},
        },
        miss: {
          damage: 0,
          heal: 0,
          temporaryHP: 0,
          effects: {},
        },
      },
    };
  },
  computed: {
    ...mapGetters('tracker', ['sortedCombatants']),
  },
  methods: {
    ...mapActions('tracker', ['processAttack']),
    ...mapMutations('tracker', ['setInitiative', 'setTarget', 'setHit', 'setCardUrl']),
  },
};
</script>

<style lang="scss">
@import "../styles/main.scss";

.tracker-cell {
  & .cell {
    padding: 0 5px;
    display: flex;
    align-items: center;
  }
  &.is-center {
    & .cell {
      justify-content: center;
    }
  }
  &.is-right {
    & .cell {
      justify-content: flex-end;
    }
  }
  &.is-left {
    & .cell {
      justify-content: flex-start;
    }
  }
}
</style>
