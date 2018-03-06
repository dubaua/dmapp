<template lang="pug">
  .draginput(@mousedown="wait", @mouseup="clear")
    .draginput__overlay(
      v-if="isDragging",
      @mouseup="clear",
      @mousemove="adjust",
    )
      .draginput__number {{value}}
      .draginput__helper(:style="helperStyle")
    input.draginput__input(v-model="value")
</template>

<script>
// function getSize(x, y) {
//   return Math.max(1600 - x, x, 900 - y, y);
// }

/* eslint-disable no-mixed-operators, no-console */
const ADJUST_DELAY = 150;

export default {
  name: "DragInput",
  props: {
    value: {
      default: 0,
      type: Number,
      required: true,
    },
    isLinear: {
      default: true,
      type: Boolean,
    },
    min: {
      default: 0,
      type: Number,
    },
    max: {
      default: 100,
      type: Number,
    },
  },
  data() {
    return {
      isDragging: false,
      timer: null,
      input: null,
      x: 0,
      y: 0
    };
  },
  computed: {
    helperStyle() {
      return `
        left: ${this.x}px;
        top: ${this.y}px;
        width: ${this.radius * 2}px;
        height: ${this.radius * 2}px;`;
    },
    radius() {
      const ww = window.innerWidth;
      const wh = window.innerHeight;
      if (this.isLinear) {
        return Math.max(ww - this.x, this.x, wh - this.y, this.y) - 32;
      }
      return (
        Math.min(Math.max(ww - this.x, this.x), Math.max(wh - this.y, this.y)) -
        16
      );
    }
  },
  methods: {
    wait(e) {
      console.log("wait");

      this.x = e.clientX;
      this.y = e.clientY;
      this.input = e.target;

      this.timer = setTimeout(() => {
        this.isDragging = true;
      }, ADJUST_DELAY);

      e.preventDefault();
    },
    clear(e) {
      console.log("clear");
      this.x = 0;
      this.y = 0;
      clearTimeout(this.timer);
      if (!this.isDragging) {
        this.input.focus();
      }
      this.isDragging = false;
      e.stopPropagation();
    },
    adjust(e) {
      const result = Math.floor(
        Math.sqrt(
          Math.abs(e.clientX - this.x) ** 2 + Math.abs(e.clientY - this.y) ** 2
        ) /
          this.radius *
          this.max
      );
      this.value = result > this.max ? this.max : result;
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
  }
  &__number {
    font-size: 80px;
    color: white;
    user-select: none;
  }
  &__helper {
    position: fixed;
    transform: translate(-50%, -50%);
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.03);
    border: 1px dashed rgba(255, 255, 255, 0.33);
    z-index: 1001;
  }
}
</style>
