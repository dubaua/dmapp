<template lang="pug">
  //- ec stands for effect constructor
  .ec
    h1 Effect constructor
    .ec__row.ec__row--major
      .ec__row
        .ec__label Describe how effect ends
        el-radio-group(v-model="chosenType")
          el-radio-button(:label="0") Save ends
          el-radio-button(:label="1") Temporary
          el-radio-button(:label="2") Conditional
      .ec__row(
        v-if="chosenType === types.SAVE_ENDS || chosenType === types.CONDITIONAL")
        .ec__label Ongoing
        drag-adjust(
          v-model="ongoingDamage",
          :min="0",
          :max="25")
          el-input(v-model="ongoingDamage")
        .ec__label damage
      .ec__row(
        v-if="chosenType === types.SAVE_ENDS || chosenType === types.CONDITIONAL")
        .ec__label Regeneration of
        drag-adjust(
          v-model="regeneration",
          :min="0",
          :max="25")
          el-input(v-model="regeneration")
      .ec__row(v-if="chosenType === types.SAVE_ENDS")
        el-button(type="text") Add Fail Effect
        el-button(type="text") Add Aftereffect
      .ec__row(v-if="chosenType === types.TEMPORARY")
        .ec__label Lasts until
        el-radio-group(v-model="untilTheEndOfTurn")
          el-radio-button(:label="true") the end
          el-radio-button(:label="false") the start
        .ec__label of
        el-radio-group(v-model="untilTheTargetsTurn")
          el-radio-button(:label="true") the target's
          el-radio-button(:label="false") the caster's
        .ec__label turn
      .ec__row(v-if="chosenType === types.CONDITIONAL")
        el-input(
          v-model="endCondition",
          placeholder="Describe the end condition",
          class="ec__text-input")
    .ec__row.ec__row--major
      el-input(v-model="effectText", placeholder="Effect text")
    .ec__row.ec__row--major
      el-checkbox-group(
        v-model="followingConditionsIds",
        class="el-checkbox-group--flex",
        )
        el-checkbox(
          v-for="condition in conditions",
          :label="condition.id",
          border,
          :key="condition.id") {{condition.title}}
    .ec__row.ec__row--major
      drag-adjust(
        v-model="defenseModifier",
        :min="-10",
        :max="10",
        :disabled="isDefenseModifierDisabled")
        el-input(v-model="defenseModifier", :disabled="isDefenseModifierDisabled")
      el-checkbox(
        v-for="(value, key, index) in affectedDefenses",
        v-model="affectedDefenses[key]",
        @change="handleCheckDefense",
        border,
        class="el-checkbox--compact",
        :key="index") {{ key.toUpperCase() }}
      el-checkbox(
        :indeterminate="isDefensesIndeterminate",
        v-model="allDefensesChecked",
        @change="handleChangeAllDefenses"
        class="el-checkbox--compact") {{ allDefensesChecked ? 'Uncheck all' : 'Check all'}}
    .ec__row.ec__row--major
      el-button(type="text") Cancel
      el-button(type="success", @click="submitEffect") Submit effect
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
      chosenType: 0,

      // if save ends so we can add aftereffect and fail effect
      fail: [],
      aftereffect: [],

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

      affectedDefenses: {
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
  computed: {
    effect() {
      return {
        ...this.$data
      };
    },
    isDefenseModifierDisabled() {
      return !this.isDefensesIndeterminate && !this.allDefensesChecked;
    },
  },
  watch: {
    followingConditionsIds: "processFollowingConditions"
  },
  methods: {
    handleChangeAllDefenses(newValue) {
      Object.keys(this.affectedDefenses).map(key =>
        Vue.set(this.affectedDefenses, key, newValue)
      );
      this.isDefensesIndeterminate = false;
    },
    handleCheckDefense() {
      const defenseKeys = Object.keys(this.affectedDefenses);
      const checkedCount = defenseKeys.filter(key => this.affectedDefenses[key])
        .length;
      this.allDefensesChecked = checkedCount === defenseKeys.length;
      this.isDefensesIndeterminate =
        checkedCount > 0 && checkedCount < defenseKeys.length;
    },
    processFollowingConditions(conditionIds) {
      conditionIds.forEach((conditionId) => {
        // eslint-disable-next-line consistent-return
        CONDITIONS[conditionId].chained.forEach((chainedConditionId) => {
          if (this.followingConditionsIds.indexOf(chainedConditionId) === -1) {
            // TODO if already petrified, it can to not fall prone
            if (
              chainedConditionId === 12 &&
              this.followingConditionsIds.indexOf(11) !== -1
            ) {
              return false;
            }
            this.followingConditionsIds.push(chainedConditionId);
          }
        });
      });
    },
    submitEffect() {
      console.log(this.effect);
    }
  }
};
</script>

<style lang="scss">
@import "../styles/element-variables.scss";

$spacing: 8px;

.ec {
  overflow: hidden;

  &__row {
    display: flex;
    flex-wrap: wrap;
    align-items: center;

    & > * {
      margin-right: $spacing;
    }

    & > :only-child {
      margin-right: 0;
    }

    &--major {
      margin: $spacing 0;
    }
  }

  &__label {
    font-size: 12px;
    color: $--color-text-regular;
    line-height: 14px;
  }

  &__text-input {
    max-width: 300px;
  }
}
// TODO move to separate file. or create theme.

.el-checkbox-group--flex {
  display: flex;
  flex-wrap: wrap;
  margin: -$spacing / 2 !important;

  & .el-checkbox {
    flex-grow: 1;
    margin: $spacing / 2;
    max-width: 170px;
  }

  & .el-checkbox.is-bordered + .el-checkbox.is-bordered {
    margin-left: $spacing / 2;
  }


}

.el-checkbox--compact {
  margin-left: 0 !important;
}

</style>
