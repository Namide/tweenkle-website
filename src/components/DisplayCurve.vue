<script setup lang="ts">
import { ref, onMounted } from "vue";

const props = withDefaults(
  defineProps<{
    equation: (progress: number) => number;
    width?: number;
    height?: number;
    color?: string;
    margin?: number;
  }>(),
  {
    width: 200,
    height: 180,
    margin: 40,
    color: "#000",
  }
);

// type Position = { x: number; y: number };

// const { width } = useWindowSize();

// const props = withDefaults(
//   defineProps<{
//     position: number[];
//     colors: string[];
//     height?: number;
//   }>(),
//   { height: 128 }
// );

// const canvasWidth = ref(0);

let ctx: CanvasRenderingContext2D | null;

// const oldPosition = ref<number[]>(props.position);
const canvas = ref<HTMLCanvasElement>();

// const refresh = () => {
//   if (ctx && canvas.value) {
//     ctx.fillStyle = "white";
//     ctx.fillRect(0, 0, props.width, props.height);
//     ctx.fill();
//   }
// };

const draw = () => {
  if (ctx && canvas.value) {
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, props.width, props.height);
    ctx.fill();

    const height = props.height - 2 * props.margin;
    const step = 2;
    ctx.beginPath();
    ctx.moveTo(0, height - props.equation(0) * height + props.margin);

    for (let x = step; x <= props.width; x += step) {
      ctx.lineTo(
        x,
        height - props.equation(x / props.width) * height + props.margin
      );
    }

    ctx.strokeStyle = props.color;
    ctx.stroke();
  }
};

onMounted(() => {
  ctx = canvas.value?.getContext("2d") || null;
  draw();
});
</script>

<template>
  <canvas ref="canvas" :width="width" :height="height" />
</template>

<style scoped></style>
