<template lang="pug">
  //- ec stands for effect constructor
  .ec
    h1 Effect constructor
    .ec__row.ec__row--major
      .ec__row
        .ec__label Describe how effect ends
        el-radio-group(v-model="effect.chosenType")
          el-radio-button(:label="0") Save ends
          el-radio-button(:label="1") Temporary
          el-radio-button(:label="2") Conditional
      .ec__row(
        v-if="effect.chosenType === types.SAVE_ENDS || effect.chosenType === types.CONDITIONAL")
        .ec__label Ongoing
        drag-adjust(
          v-model="effect.ongoingDamage",
          :min="0",
          :max="25")
          el-input(v-model="effect.ongoingDamage")
        .ec__label damage
      .ec__row(
        v-if="effect.chosenType === types.SAVE_ENDS || effect.chosenType === types.CONDITIONAL")
        .ec__label Regeneration of
        drag-adjust(
          v-model="effect.regeneration",
          :min="0",
          :max="25")
          el-input(v-model="effect.regeneration")
      .ec__row(v-if="effect.chosenType === types.SAVE_ENDS")
        el-button(type="text", icon="el-icon-plus") Add Fail Effect
        el-button(type="text", icon="el-icon-plus") Add Aftereffect
      .ec__row(v-if="effect.chosenType === types.TEMPORARY")
        .ec__label Lasts until
        el-radio-group(v-model="effect.untilTheEndOfTurn")
          el-radio-button(:label="true") the end
          el-radio-button(:label="false") the start
        .ec__label of
        el-radio-group(v-model="effect.untilTheTargetsTurn")
          el-radio-button(:label="true") the target's
          el-radio-button(:label="false") the caster's
        .ec__label turn
      .ec__row(v-if="effect.chosenType === types.CONDITIONAL")
        el-input(
          v-model="effect.endCondition",
          placeholder="Describe the end condition",
          class="ec__text-input")
    .ec__row.ec__row--major
      el-input(v-model="effect.effectDescription", placeholder="Effect description")
    .ec__row.ec__row--major
      el-checkbox-group(
        v-model="effect.conditions",
        class="el-checkbox-group--flex",
        )
        el-checkbox(
          v-for="condition in conditions",
          :label="condition.id",
          border,
          :key="condition.id") {{condition.title}}
        el-button(
          type="text",
          icon="el-icon-close",
          @click="resetConditions") Reset conditions
    .ec__row.ec__row--major
      drag-adjust(
        v-model="effect.defenseModifier",
        :min="-10",
        :max="10",
        :disabled="isDefenseModifierDisabled")
        el-input(v-model="effect.defenseModifier", :disabled="isDefenseModifierDisabled")
      el-checkbox(
        v-for="(value, key, index) in effect.affectedDefenses",
        v-model="effect.affectedDefenses[key]",
        @change="handleCheckDefense",
        border,
        class="el-checkbox--compact",
        :key="index") {{ key.toUpperCase() }}
      el-checkbox(
        :indeterminate="effect.isDefensesIndeterminate",
        v-model="effect.allDefensesChecked",
        @change="handleChangeAllDefenses"
        class="el-checkbox--compact") {{ effect.allDefensesChecked ? 'Uncheck all' : 'Check all'}}
    .ec__row.ec__row--major
      el-button(type="text") Cancel
      el-button(type="success", @click="submitEffect") Submit effect
</template>

<script>
/* eslint-disable no-console */
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
      conditions: CONDITIONS.properties,
      effect: {
        chosenType: 0,
        fail: [],
        aftereffect: [],
        untilTheEndOfTurn: true,
        untilTheTargetsTurn: true,
        endCondition: "",
        effectDescription: "",
        ongoingDamage: 0,
        regeneration: 0,
        conditions: [],
        affectedDefenses: {
          ac: true,
          fort: true,
          ref: true,
          will: true
        },
        allDefensesChecked: true,
        isDefensesIndeterminate: false,
        defenseModifier: 0
      },
      endTurn: 0
    };
  },
  computed: {
    isDefenseModifierDisabled() {
      return (
        !this.effect.isDefensesIndeterminate && !this.effect.allDefensesChecked
      );
    }
  },
  watch: {
    "effect.conditions": "processChainedConditions"
  },
  methods: {
    handleChangeAllDefenses(newValue) {
      Object.keys(this.effect.affectedDefenses).map(key =>
        Vue.set(this.effect.affectedDefenses, key, newValue)
      );
      this.effect.isDefensesIndeterminate = false;
    },
    handleCheckDefense() {
      const defenseKeys = Object.keys(this.effect.affectedDefenses);
      const checkedCount = defenseKeys.filter(
        key => this.effect.affectedDefenses[key]
      ).length;
      this.effect.allDefensesChecked = checkedCount === defenseKeys.length;
      this.effect.isDefensesIndeterminate =
        checkedCount > 0 && checkedCount < defenseKeys.length;
    },
    processChainedConditions(conditionIds) {
      conditionIds.forEach((conditionId) => {
        CONDITIONS.properties[conditionId].chained.forEach(
          // eslint-disable-next-line consistent-return
          (chainedConditionId) => {
            // do not add existed condition
            if (
              this.effect.conditions.indexOf(chainedConditionId) ===
              -1
            ) {
              // if already petrified do not add prone condution
              if (
                this.effect.conditions.indexOf(
                  CONDITIONS.PETRIFIED
                ) !== -1 &&
                chainedConditionId === CONDITIONS.PRONE
              ) {
                return false;
              }
              this.effect.conditions.push(chainedConditionId);
            }
          }
        );
      });
    },
    resetConditions() {
      this.effect.conditions.splice(0, this.effect.conditions.length);
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

  & .el-button {
    margin: $spacing / 2;
  }
}

.el-checkbox--compact {
  margin-left: 0 !important;
}
</style>
