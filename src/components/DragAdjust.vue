<template lang="pug">
  .draginput(@mousedown="supposeAdjastment", @mouseup="clear")
    .draginput__overlay(
      v-if="isAdjusting",
      @mouseup="clear",
      @mousemove="adjust",
    )
      .draginput__number {{temporaryValue}}
      .draginput__helper(:style="helperStyle")
    input.draginput__input(v-model="value")
</template>

<script>
/* eslint-disable no-mixed-operators, no-console */
// const ADJUST_DELAY = 250;

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
    onUpdate: {
      type: Function,
      default: ()=>{}
    }
  },
  data() {
    return {
      isAdjusting: false,
      // isTicking: false,
      // requestId: null,
      // inputEl: null,
      // start: null,
      x: 0,
      y: 0,
      temporaryValue: this.min
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
    supposeAdjastment(e) {
      console.log("supposeAdjastment");
      this.x = e.clientX;
      this.y = e.clientY;
      // this.inputEl = e.target;
      // // start count. if counted to ADJUST DELAY -> start adjusting, else focus
      // this.start = performance.now();
      // this.isTicking = true;
      // this.requestId = requestAnimationFrame(this.startCount);
      this.isAdjusting = true;
      e.preventDefault();
    },
    // startCount(time) {
    //   console.log("tick");

    //   // определить, сколько прошло времени с начала анимации
    //   const timePassed = time - this.start;
    //   // если время анимации не закончилось - запланировать ещё кадр
    //   if (this.isTicking && timePassed < ADJUST_DELAY) {
    //     requestAnimationFrame(this.startCount);
    //   }
    //   if (this.isTicking && timePassed >= ADJUST_DELAY) {
    //     this.stopCount();
    //     this.isAdjusting = true;
    //   }
    // },
    // stopCount() {
    //   this.isTicking = false;
    //   cancelAnimationFrame(this.requestId);
    // },
    clear(e) {
      console.log("clear", this.onUpdate);
      this.x = 0;
      this.y = 0;
      // if(!this.isAdjusting) {
      //   this.inputEl.focus();
      // }
      this.isAdjusting = false;
      // this.stopCount();
      this.$emit(this.onUpdate, this.temporaryValue);
      e.stopPropagation();
    },
    getLengthByCoords(x2, x1, y2, y1) {
      return Math.sqrt(Math.abs(x2 - x1) ** 2 + Math.abs(y2 - y1) ** 2);
    },
    adjust(e) {
      console.log(this.radius);
      const result = Math.floor(
        this.min +
          this.getLengthByCoords(e.clientX, this.x, e.clientY, this.y) /
            this.radius *
            (this.max - this.min)
      );
      this.temporaryValue = result > this.max ? this.max : result;
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
    background: rgba(255, 255, 255, 0.05);
    z-index: 1001;
  }
}
</style>
