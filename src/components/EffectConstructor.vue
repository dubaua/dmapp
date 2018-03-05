<template lang="pug">
  .add-effect
    p Effect constructor
    p
      label(:for="'type_'+_uid") Effect Type:
      select(:id="'type_'+_uid", v-model='chosen_type')
        option(v-for='(type, index) in types', :value='index') {{type}}
    p
      input.input.input_full(v-model='effect_text', placeholder='Effect text')
    p
      label(:for="'def_'+_uid") Modify defences
      select(:id="'def_'+_uid", v-model="modifier")
        option(v-for="n in modifiers", :value="n") {{n}}
    p
      input(
        :id="'ac_'+_uid",
        v-model='isAffectAC',
        type='checkbox')
      label(:for="'ac_'+_uid") AC
      input(
        :id="'fort_'+_uid",
        v-model='isAffectFORT',
        type='checkbox')
      label(:for="'fort_'+_uid") Fort
      input(
        :id="'ref_'+_uid",
        v-model='isAffectREF',
        type='checkbox')
      label(:for="'ref_'+_uid") Ref
      input(
        :id="'will_'+_uid",
        v-model='isAffectWill',
        type='checkbox')
      label(:for="'will_'+_uid") Will
    p Here process aftereffect and fail
    //- p(v-if='chosen_type === 1')
    //-   | Until {{end_turn}} turn
    //- p(v-if='chosen_type === 2')
    //-   input.input.input_full(v-model='special', placeholder='Special condition')
</template>

<script>
// import Die from "@/components/Die";
import range from "lodash/range";

export default {
  name: "EffectConstructor",
  components: {
    // Die
  },
  data() {
    return {
      types: ["save ends", "temporary", "conditional"],
      chosen_type: 0,
      fail: null, // nested effect, if type of save ends
      aftereffect: null, // nested effect, if type of save ends
      endTurn: 0, // if type of temporary
      endCondition: "", // if type of conditional
      conditions: null,
      modifier: 0,
      isAffectAC: false,
      isAffectFORT: false,
      isAffectREF: false,
      isAffectWill: false,
      effect_text: ""
    };
  },
  computed: {
    modifiers() {
      return range(-10, 11);
    }
  }
  // mounted() {
  //   this.$nextTick(() => {
  //     console.log(range(-10, 10));
  //   });
  // }
};
</script>

<style lang="scss"></style>
