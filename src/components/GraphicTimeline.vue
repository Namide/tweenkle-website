<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import { useWindowSize } from "@vueuse/core";

// type Position = { x: number; y: number };

const { width } = useWindowSize();

const props = withDefaults(
  defineProps<{
    position: number[];
    colors: string[];
    height?: number;
  }>(),
  { height: 128 }
);

const canvasWidth = ref(0);

let ctx: CanvasRenderingContext2D | null;

const oldPosition = ref<number[]>(props.position);
const canvas = ref<HTMLCanvasElement>();

const draw = () => {
  if (ctx && canvas.value && oldPosition.value && props.position) {
    ctx.drawImage(canvas.value, -1, 0);
    ctx.fillStyle = "white";
    ctx.fillRect(canvasWidth.value - 1, 0, 2, props.height);
    for (let i = 0; i < props.position.length; i++) {
      ctx.beginPath();
      ctx.moveTo(canvasWidth.value - 1, oldPosition.value[i] * props.height);
      ctx.lineTo(canvasWidth.value, props.position[i] * props.height);
      ctx.strokeStyle = props.colors[i];
      ctx.closePath();
      ctx.stroke();
    }
    oldPosition.value = JSON.parse(JSON.stringify(props.position));
  }
};

const refresh = () => {
  if (ctx && canvas.value) {
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvasWidth.value, props.height);
    ctx.fill();
  }
};

watch(() => props.position, draw, { deep: true });

// useRafFn(draw);

watch(
  width,
  () => (canvasWidth.value = Math.round(canvas.value?.offsetWidth || 0))
);

watch(canvasWidth, refresh);

onMounted(() => {
  ctx = canvas.value?.getContext("2d") || null;
  canvasWidth.value = Math.round(canvas.value?.offsetWidth || 0);
  refresh();
});
</script>

<template>
  <canvas ref="canvas" :height="height" />
</template>

<style scoped></style>
