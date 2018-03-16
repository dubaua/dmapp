<template lang="pug">
  .effect-constructor
    h1 Effect constructor
    .container
      .row.middle-xs
        .col-xs-3
          el-radio-group(v-model="chosen_type")
            el-radio-button(:label="0") Save ends
            el-radio-button(:label="1") Temporary
            el-radio-button(:label="2") Conditional
        template(v-if="chosen_type === 0 || chosen_type === 2")
          .col-xs-2 Ongoing damage
          .col-xs-1
            drag-adjust(
              v-model="ongoingDamage",
              :min="0",
              :max="25")
              el-input(v-model="ongoingDamage")
          .col-xs-2 Regeneration
          .col-xs-1
            drag-adjust(
              v-model="regeneration",
              :min="0",
              :max="25")
              el-input(v-model="regeneration")
        .col-xs-3(v-if="chosen_type === 0")
          el-button Add Fail Effect
          el-button Add Aftereffect

    p
      el-input(v-model='effect_text', placeholder='Effect text')

    p Modify defenses
    drag-adjust(
      v-model="defenseModifier",
      :min="-10",
      :max="10")
      el-input(v-model="defenseModifier")
    el-checkbox(
      v-model="affectDefence.ac",
      @change="handleCheckDefense",
      border) AC
    el-checkbox(
      v-model="affectDefence.fort",
      @change="handleCheckDefense",
      border) Fort
    el-checkbox(
      v-model="affectDefence.ref",
      @change="handleCheckDefense",
      border) Ref
    el-checkbox(
      v-model="affectDefence.will",
      @change="handleCheckDefense",
      border) Will
    el-checkbox(
      :indeterminate="isDefensesIndeterminate",
      v-model="allDefensesChecked",
      @change="handleChangeAllDefenses") {{ allDefensesChecked ? 'Uncheck all' : 'Check all'}}

    el-button Cancel
    el-button(type="success") Submit effect
</template>

<script>
/* eslint-disable no-console */
// import Die from "@/components/Die";
import Vue from "vue";
import EFFECT_TYPES from "@/enums/effectEndTypes";
import DragAdjust from "@/components/ui/DragAdjust";

export default {
  name: "EffectConstructor",
  components: {
    DragAdjust
  },
  data() {
    return {
      types: EFFECT_TYPES,
      chosen_type: 0,

      // if save ends so we can add aftereffect and fail effect
      fail: null,
      aftereffect: null,

      // if temporary we can adjust end turn
      endTurn: 0,

      // if conditional we should set end condition
      endCondition: "",

      // here we set conditions than effect cause
      conditions: null,
      // and custom text
      effect_text: "",

      ongoingDamage: 0,
      regeneration: 0,

      affectDefence: {
        ac: true,
        fort: true,
        ref: true,
        will: true
      },
      allDefensesChecked: true,
      isDefensesIndeterminate: false,
      defenseModifier: 0
    };
  },
  methods: {
    handleChangeAllDefenses(newValue) {
      Object.keys(this.affectDefence).map(key =>
        Vue.set(this.affectDefence, key, newValue)
      );
      this.isDefensesIndeterminate = false;
    },
    handleCheckDefense() {
      const defenseKeys = Object.keys(this.affectDefence);
      const checkedCount = defenseKeys.filter(key => this.affectDefence[key])
        .length;
      this.allDefensesChecked = checkedCount === defenseKeys.length;
      this.isDefensesIndeterminate =
        checkedCount > 0 && checkedCount < defenseKeys.length;
    }
  }
};
</script>

<style lang="scss">
.effect-constructor {
  padding: 16px 32px;
}
</style>
