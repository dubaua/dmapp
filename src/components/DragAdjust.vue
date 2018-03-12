<template lang="pug">
  .draginput(@mousedown="supposeAdjastment", @mouseup="clear", @mouseleave="clear")
    .draginput__overlay(
      v-if="isAdjusting",
      @mouseup="clear",
      @mousemove="adjust",
    )
      .draginput__number {{temporaryValue}}
      .draginput__circle.draginput__center(:style="helperStyle(3)")
      .draginput__circle.draginput__fader(:style="helperStyle(faderRadius)")
      .draginput__circle.draginput__limiter(:style="helperStyle(limiterRadius)")
    input.draginput__input(v-model="value")
</template>

<script>
/* eslint-disable no-mixed-operators, no-console */
import throttle from "lodash/throttle";

const ADJUST_DELAY = 150;

export default {
  name: "DragInput",
  props: {
    value: {
      default: 0,
      type: Number,
      required: true
    },
    isLinear: {
      default: true,
      type: Boolean
    },
    min: {
      default: 0,
      type: Number
    },
    max: {
      default: 100,
      type: Number
    },
    update: {
      type: Function,
      default: () => {}
    }
  },
  data() {
    return {
      isAdjusting: false,
      timeoutId: null,
      inputEl: null,
      centerX: 0,
      centerY: 0,
      faderX: 0,
      faderY: 0
    };
  },
  computed: {
    limiterRadius() {
      const ww = window.innerWidth;
      const wh = window.innerHeight;
      if (this.isLinear) {
        return (
          Math.max(
            ww - this.centerX,
            this.centerX,
            wh - this.centerY,
            this.centerY
          ) - 32
        );
      }
      return (
        Math.min(
          Math.max(ww - this.centerX, this.centerX),
          Math.max(wh - this.centerY, this.centerY)
        ) - 16
      );
    },
    faderRadius() {
      const faderRadius = this.getRadiusByCoords(this.faderX, this.faderY);
      return faderRadius > this.limiterRadius
        ? this.limiterRadius
        : faderRadius;
    },
    temporaryValue() {
      const result = Math.floor(
        this.min +
          this.getRadiusByCoords(this.faderX, this.faderY) /
            this.limiterRadius *
            (this.max - this.min)
      );
      return result > this.max ? this.max : result;
    }
  },
  methods: {
    helperStyle(radius) {
      return `
        left: ${this.centerX}px;
        top: ${this.centerY}px;
        width: ${radius * 2}px;
        height: ${radius * 2}px;`;
    },
    supposeAdjastment(e) {
      const x = e.clientX;
      const y = e.clientY;
      this.centerX = x;
      this.faderX = x;
      this.centerY = y;
      this.faderY = y;

      this.inputEl = e.target;

      this.timeoutId = setTimeout(this.activate, ADJUST_DELAY);
      e.preventDefault();
    },
    activate() {
      this.isAdjusting = true;
      this.resetTimer();
    },
    resetTimer() {
      clearTimeout(this.timeoutId);
      this.timeoutId = null;
    },
    clear(e) {
      this.centerX = 0;
      this.centerY = 0;
      this.faderX = 0;
      this.faderY = 0;
      this.isAdjusting = false;

      if (this.timeoutId) this.inputEl.focus();
      this.inputEl = null;

      this.resetTimer();
      // this.$emit(this.update, this.temporaryValue);
      if (e) e.stopPropagation();
    },
    getRadiusByCoords(x, y) {
      return Math.sqrt(
        Math.abs(x - this.centerX) ** 2 + Math.abs(y - this.centerY) ** 2
      );
    },
    // eslint-disable-next-line func-names
    adjust: throttle(function (e) {
      this.faderX = e.clientX;
      this.faderY = e.clientY;
    }, 16)
  }
};
</script>

<style lang="scss">
.draginput {
  &__overlay {
    background: rgba(0, 0, 0, 0.75);
    z-index: 1000;
    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: default;
    overflow: hidden;
  }
  &__number {
    font-size: 80px;
    color: white;
    user-select: none;
  }
  &__input {
    cursor: pointer;
  }
  &__circle {
    position: absolute;
    transform: translate(-50%, -50%);
    border-radius: 50%;
    z-index: 1001;
  }
  &__center {
    background: white;
  }
  &__fader {
    background: rgba(255, 255, 255, 0.05);
  }
  &__limiter {
    border: 1px solid white;
  }
}
</style>
