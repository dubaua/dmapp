<template lang="pug">
  .draginput(
    @mousedown="supposeAdjastment",
    @touchstart="supposeAdjastment",
    @mouseup="clear",
    @mouseleave="clear",
    @touchend="clear",
    @touchcancel="clear",
  )
    .draginput__overlay(
      v-if="isAdjusting",
      @mousemove="adjust",
      @mouseup="submit",
      @mouseleave="submit",
    )
      .draginput__number {{temporaryValue}}
      .draginput__circle.draginput__center(:style="circleStyle(3)")
      .draginput__circle.draginput__fader(:style="circleStyle(faderRadius)")
      .draginput__circle.draginput__limiter(:style="circleStyle(limiterRadius)")
    input.draginput__input(v-model="value")
</template>

<script>
/* eslint-disable no-mixed-operators, no-console */

// time to hold touch or mouse to show overlay
const ADJUST_DELAY = 150;
const LIMITER_MARGIN = 32;

export default {
  name: "DragInput",
  props: {
    value: {
      default: 0,
      type: Number,
      required: true
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
      temporaryValue: this.min,
      isAdjusting: false,
      timeoutId: null,
      inputEl: null,
      center: {
        x: 0,
        y: 0
      },
      fader: {
        x: 0,
        y: 0
      }
    };
  },
  computed: {
    limiterRadius() {
      const ww = window.innerWidth;
      const wh = window.innerHeight;
      return (
        Math.max(
          ww - this.center.x,
          this.center.x,
          wh - this.center.y,
          this.center.y
        ) - LIMITER_MARGIN
      );
    },
    faderRadius() {
      const faderRadius = this.getRadiusByCoords(this.fader.x, this.fader.y);
      return faderRadius > this.limiterRadius
        ? this.limiterRadius
        : faderRadius;
    }
  },
  methods: {
    supposeAdjastment(e) {
      const { x, y } = this.getEventCoords(e);
      this.setCenter(x, y);
      this.setFader(x, y);

      this.inputEl = e.target;

      this.setTimer(this.activate, ADJUST_DELAY);
      e.preventDefault();
    },
    activate() {
      this.addTouchListeners();
      this.isAdjusting = true;
      this.resetTimer();
    },
    adjust(e) {
      requestAnimationFrame(() => {
        const { x, y } = this.getEventCoords(e);
        this.fader.x = x;
        this.fader.y = y;
        this.temporaryValue = Math.min(
          this.max,
          Math.floor(
            this.min +
              this.getRadiusByCoords(x, y) /
                this.limiterRadius *
                (this.max - this.min)
          )
        );
      });
    },
    submit(e) {
      this.$emit("input", this.temporaryValue);
      this.clear(e);
    },
    clear(e) {
      this.removeTouchListeners();

      this.isAdjusting = false;

      if (this.timeoutId) this.inputEl.focus();
      this.inputEl = null;

      this.resetTimer();

      this.setCenter(0, 0);
      this.setFader(0, 0);

      if (e) e.stopPropagation();
    },
    setTimer(callback, delay) {
      this.timeoutId = setTimeout(callback, delay);
    },
    resetTimer() {
      clearTimeout(this.timeoutId);
      this.timeoutId = null;
    },
    setCenter(x, y) {
      this.center = { x, y };
    },
    setFader(x, y) {
      this.fader = { x, y };
    },
    addTouchListeners() {
      document.addEventListener("touchmove", this.adjust, false);
      document.addEventListener("touchend", this.submit, false);
      document.addEventListener("touchcancel", this.submit, false);
    },
    removeTouchListeners() {
      document.removeEventListener("touchmove", this.adjust, false);
      document.removeEventListener("touchend", this.submit, false);
      document.removeEventListener("touchcancel", this.submit, false);
    },
    getEventCoords(e) {
      const x = e.targetTouches ? e.targetTouches[0].clientX : e.clientX;
      const y = e.targetTouches ? e.targetTouches[0].clientY : e.clientY;
      return { x, y };
    },
    getRadiusByCoords(x, y) {
      return Math.sqrt(
        Math.abs(x - this.center.x) ** 2 + Math.abs(y - this.center.y) ** 2
      );
    },
    circleStyle(radius) {
      return `
        left: ${this.center.x}px;
        top: ${this.center.y}px;
        width: ${radius * 2}px;
        height: ${radius * 2}px;`;
    }
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
