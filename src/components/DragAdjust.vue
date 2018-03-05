<template lang="pug">
  .draginput(@mousedown="startDrag")
    .draginput__overlay(
      v-if="isDragging",
      @mouseup="endDrag",
      @mousemove="adjust",
    )
      .draginput__number {{number}}
    input.draginput__input(v-model="number")
</template>

<script>
export default {
  name: "DragInput",
  props: {
    range: {
      default: 20,
      type: Number
    }
  },
  data() {
    return {
      number: 0,
      isDragging: false,
      startX: 0,
      startY: 0,
    };
  },
  methods: {
    startDrag(e) {
      // set start x, y
      this.startX = e.clientX;
      this.startY = e.clientY;
      // if user hold mouse/tap more than 150 ms - toggle dragging
      // else - set focus on input
      this.isDragging = true;
    },
    endDrag() {
      this.startX = 0;
      this.startY = 0;
      this.isDragging = false;
    },
    // if user move mouse - adjust our value
    adjust(e) {
      this.number = Math.floor((e.clientX - this.startX) / 10);
      // console.log(e);
    },
  }
};
</script>

<style lang="scss">
.draginput__overlay {
  background: rgba(0,0,0,.75);
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
.draginput__number {
  font-size: 80px;
  color: white;
  user-select: none;
}
</style>
