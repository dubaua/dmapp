<template lang="pug">
  .add-effect
    p Effect constructor
    p End condition:
    el-radio-group(v-model="chosen_type", size="mini")
      el-radio-button(label="0") Save ends
      el-radio-button(label="1") Temporary
      el-radio-button(label="2") Conditional
    p
      input.input.input_full(v-model='effect_text', placeholder='Effect text')

    p Modify defenses
    el-slider(
      v-model="defenseModifier",
      :min="-10",
      :max="10",
      show-input)
    el-checkbox(v-model="affectDefence.ac", @change="handleCheckDefense", border) AC
    el-checkbox(v-model="affectDefence.fort", @change="handleCheckDefense", border) Fort
    el-checkbox(v-model="affectDefence.ref", @change="handleCheckDefense", border) Ref
    el-checkbox(v-model="affectDefence.will", @change="handleCheckDefense", border) Will
    el-checkbox(
      :indeterminate="isDefensesIndeterminate",
      v-model="allDefensesChecked",
      @change="handleChangeAllDefenses") {{ allDefensesChecked ? 'Uncheck all' : 'Check all'}}

    p Ongoing damage
    el-slider(
      v-model="ongoingDamage",
      :min="0",
      :max="25",
      show-input)

    p Regeneration
    el-slider(
      v-model="regeneration",
      :min="0",
      :max="25",
      show-input)
    p Here process aftereffect and fail
    //- p(v-if='chosen_type === 1')
    //-   | Until {{end_turn}} turn
    //- p(v-if='chosen_type === 2')
    //-   input.input.input_full(v-model='special', placeholder='Special condition')
    el-button Cancel
    el-button(type="success") Submit effect
</template>

<script>
/* eslint-disable no-console */
// import Die from "@/components/Die";
import Vue from "vue";
import EFFECT_TYPES from "@/enums/effectEndTypes";

export default {
  name: "EffectConstructor",
  components: {
    // Die
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
      defenseModifier: 0,
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

<style lang="scss"></style>
