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
        .col-xs-6(v-if="chosen_type === 1")
          | Until the
          el-radio-group(v-model="untilTheEndOfTurn")
            el-radio-button(:label="true") end
            el-radio-button(:label="false") start
          | of
          el-radio-group(v-model="untilTheTargetsTurn")
            el-radio-button(:label="true") target's
            el-radio-button(:label="false") caster's
          | turn
        .col-xs-3(v-if="chosen_type === 2")
          el-input(v-model="endCondition", placeholder="Describe the end condition")
    p
      el-input(v-model="effectText", placeholder="Effect text")

    el-checkbox-group(
      v-model="followingConditionsIds",
      class="el-checkbox-group--flex",
      )
      el-checkbox-button(
        v-for="condition in conditions",
        :label="condition.id",
        class="el-checkbox-button--grow",
        :key="condition.id") {{condition.title}}

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
import CONDITIONS from "@/enums/conditions";
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
      untilTheEndOfTurn: true,
      untilTheTargetsTurn: true,

      // if conditional we should set end condition
      endCondition: "",

      // here we set conditions than effect cause
      conditions: CONDITIONS,
      followingConditionsIds: [],
      // and custom text
      effectText: "",

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
  watch: {
    followingConditionsIds: "processFollowingConditions"
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
    },
    processFollowingConditions(conditionIds) {
      console.log(conditionIds);
      conditionIds.forEach((conditionId) => {
        // eslint-disable-next-line consistent-return
        CONDITIONS[conditionId].chained.forEach((chainedConditionId) => {
          if (this.followingConditionsIds.indexOf(chainedConditionId) === -1) {
            // TODO if already petrified, it can to not fall prone
            if (chainedConditionId === 12 && this.followingConditionsIds.indexOf(11) !== -1) {
              return false;
            }
            this.followingConditionsIds.push(chainedConditionId);
          }
        });
      });
    }
  },
};
</script>

<style lang="scss">
.effect-constructor {
  padding: 16px 32px;
}
// TODO move to separate file. or create theme.
.el-checkbox-group--flex {
  display: flex;
  flex-wrap: wrap;
  padding-top: 1px;
}

.el-checkbox-button--grow {
  display: block;
  flex-grow: 1;
  max-width: 140px;
  margin-top: -1px;
  & .el-checkbox-button__inner {
    border-left: 1px;
    display: block;
  }
}
</style>
