<script setup lang="ts">
import { ref, watch, onMounted, computed } from "vue";
import { SmoothPath } from "../../../tweenkle/src/path/SmoothPath";
import { useWindowSize } from "@vueuse/core";
import { name } from "../../../tweenkle/package.json";
import useUpdateHead from "@/composable/useUpdateHead";
import CodePart from "@/components/CodePart.vue";

const { width } = useWindowSize();

let ctx: CanvasRenderingContext2D | null;

const size = ref(0);
const canvas = ref<HTMLCanvasElement>();
const steps = ref("4");

useUpdateHead();

const pathBase = [
  [0, 0],
  [0.25, 0.25],
  [0.25, 0.1],
  [0.5, 0.4],
  /* [0.1, 0.1],
  [0.4, 0.1],
  [0.4, 0.4],
  [0.1, 0.4], */
];

let path = SmoothPath(pathBase, {
  step: Number(steps.value),
  keepEnd: false,
  keepStart: false,
  loop: false,
});

const updateSize = () => {
  if (canvas.value) {
    size.value = canvas.value.offsetWidth;
    canvas.value.width = size.value;
    canvas.value.height = size.value;
  }
};

const updateDraw = () => {
  if (ctx) {
    ctx.clearRect(0, 0, size.value, size.value);
    ctx.beginPath();
    const count = 100;
    for (let i = 0; i < count + 1; i++) {
      const [x, y] = path(i / count);

      if (i === 0) {
        ctx.moveTo(x * size.value, y * size.value);
      } else {
        ctx.lineTo(x * size.value, y * size.value);
      }
    }
    ctx.strokeStyle = "black";
    ctx.stroke();
  }
};

const updateInput = () => {
  path = SmoothPath(pathBase, {
    step: Number(steps.value),
    keepEnd: false,
    keepStart: false,
    loop: false,
  });
  updateDraw();
};

watch(steps, updateInput);

const update = () => {
  updateSize();
  updateDraw();
};

onMounted(() => {
  ctx = canvas.value?.getContext("2d") || null;
  update();
});

const code = computed(
  () => `import { cubicBezier } from "${name}"

const path = SmoothPath(
    ${JSON.stringify(pathBase)},
    { step: ${steps.value}, keepEnd: false, keepStart: false, loop: true }
  )

console.log(path(0.5))
// trace ${path(0.5)}`
);

watch(width, update);
</script>

<template>
  <div class="prose">
    <h1 class="example-title">Smooth path</h1>

    <p>
      <CodePart :code="code" />

      <span class="form-control !inline-flex">
        <label class="input-group input-group-xs">
          <span class="bg-accent text-accent-content px-2">steps</span>
          <input
            v-model="steps"
            type="text"
            placeholder="steps"
            class="input input-bordered w-14 px-1 h-auto input-accent"
          />
        </label>
      </span>
    </p>

    <div class="relative">
      <canvas ref="canvas" class="w-full"></canvas>
    </div>
  </div>
</template>

<style scoped></style>
