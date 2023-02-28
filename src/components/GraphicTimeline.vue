<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import { useRafFn } from "@vueuse/core";

// type Position = { x: number; y: number };

const props = defineProps<{
  position: number[];
  colors: string[];
}>();

const width = 512;
const height = 128;
let ctx: CanvasRenderingContext2D | null;

const oldPosition = ref<number[]>(props.position);
const canvas = ref<HTMLCanvasElement>();

const draw = () => {
  if (ctx && canvas.value && oldPosition.value && props.position) {
    ctx.drawImage(canvas.value, -1, 0);
    ctx.fillStyle = "white";
    ctx.fillRect(width - 1, 0, 1, height);
    for (let i = 0; i < props.position.length; i++) {
      ctx.beginPath();
      // console.log(oldPosition.value[i], props.position[i]);
      ctx.moveTo(width - 1, oldPosition.value[i] * height);
      ctx.lineTo(width, props.position[i] * height);
      ctx.strokeStyle = props.colors[i];
      ctx.closePath();
      ctx.stroke();
    }
    oldPosition.value = JSON.parse(JSON.stringify(props.position));
  }
};

useRafFn(draw);

// watch(() => props.position, draw, { deep: true });

onMounted(() => {
  ctx = canvas.value?.getContext("2d") || null;
  if (ctx) {
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, width, height);
    ctx.fill();
  }
});
</script>

<template>
  <canvas ref="canvas" :width="width" :height="height" />
</template>

<style scoped></style>
