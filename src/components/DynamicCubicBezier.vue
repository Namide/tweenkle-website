<script setup lang="ts">
import { ref, watch, onMounted, computed } from "vue";
import {
  cubicBezier,
  defaultCubicBezier,
} from "../../twon/src/easing/cubicBezier";
import { useWindowSize, useDraggable } from "@vueuse/core";
import { name } from "../../twon/package.json";
import useUpdateHead from "@/composable/useUpdateHead";
import CodePart from "@/components/CodePart.vue";

const { width } = useWindowSize();

const gripSize = 16;
const margin = { top: 0.25, bottom: 0.25 };

let ctx: CanvasRenderingContext2D | null;
const size = ref(0);

useUpdateHead();

const canvas = ref<HTMLCanvasElement>();
const prev = ref<HTMLButtonElement>();
const next = ref<HTMLButtonElement>();

const x1 = ref("0.52");
const y1 = ref("0.11");
const x2 = ref("0.45");
const y2 = ref("0.95");
const steps = ref("100");

let cubic = cubicBezier(
  Number(x1.value),
  Number(y1.value),
  Number(x2.value),
  Number(y2.value),
  Number(steps.value)
);

useDraggable(prev, {
  onMove(position) {
    const rect = canvas.value?.getBoundingClientRect();
    if (rect) {
      x1.value = ((position.x + gripSize / 2 - rect.left) / size.value).toFixed(
        3
      );
      y1.value = (
        1 -
        (position.y - margin.top * size.value + gripSize / 2 - rect.top) /
          size.value
      ).toFixed(3);
    }
  },
});

useDraggable(next, {
  onMove(position) {
    const rect = canvas.value?.getBoundingClientRect();
    if (rect) {
      x2.value = ((position.x + gripSize / 2 - rect.left) / size.value).toFixed(
        3
      );
      y2.value = (
        1 -
        (position.y - margin.top * size.value + gripSize / 2 - rect.top) /
          size.value
      ).toFixed(3);
    }
  },
});

const getFullHeight = () =>
  Math.round(size.value * (1 + margin.top + margin.bottom));

const updateSize = () => {
  if (canvas.value) {
    size.value = canvas.value.offsetWidth;
    canvas.value.width = size.value;
    canvas.value.height = getFullHeight();
  }
};

const updateDraw = () => {
  if (ctx) {
    const posList: number[][] = [];
    console.time("cubic");
    for (let i = 0; i < size.value + 1; i++) {
      const x = i / size.value;
      const y = cubic(x);
      posList.push([x, y]);
    }
    console.timeEnd("cubic");

    ctx.clearRect(0, 0, size.value, getFullHeight());

    ctx.beginPath();
    ctx.setLineDash([]);
    for (let i = 0; i < posList.length; i++) {
      const [x, y] = posList[i];
      if (i === 0) {
        ctx.moveTo(
          x * size.value,
          (1 - y) * size.value + margin.top * size.value
        );
      } else {
        ctx.lineTo(
          x * size.value,
          (1 - y) * size.value + margin.top * size.value
        );
      }
    }
    ctx.strokeStyle = "black";
    ctx.stroke();

    ctx.beginPath();
    ctx.setLineDash([5, 5]);
    ctx.moveTo(0, size.value + margin.top * size.value);
    ctx.lineTo(
      Number(x1.value) * size.value,
      (1 - Number(y1.value)) * size.value + margin.top * size.value
    );
    ctx.strokeStyle = "#999";
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(size.value, margin.top * size.value);
    ctx.lineTo(
      Number(x2.value) * size.value,
      (1 - Number(y2.value)) * size.value + margin.top * size.value
    );
    ctx.stroke();
  }
};

const updateInput = () => {
  cubic = cubicBezier(
    Number(x1.value),
    Number(y1.value),
    Number(x2.value),
    Number(y2.value),
    Number(steps.value)
  );
  updateDraw();
};

watch(x1, updateInput);
watch(y1, updateInput);
watch(x2, updateInput);
watch(y2, updateInput);
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

const easing = cubicBezier(${x1.value}, ${y1.value}, ${x2.value}, ${y2.value}${
    Number(steps) !== defaultCubicBezier.steps ? `, ${steps.value}` : ""
  })

console.log(easing(0.5))
// trace ${cubic(0.5)}`
);

watch(width, update);
</script>

<template>
  <div>
    <div class="relative flex gap-4">
      <div class="relative w-1/2">
        <canvas ref="canvas" class="w-full"></canvas>
        <button
          ref="prev"
          :style="{
            bottom: 0,
            left: 0,
            transform: `translateX(${Number(x1) * size}px) translateY(${
              -Number(y1) * size
            }px) translateX(${-gripSize / 2}px) translateY(${
              -margin.bottom * size
            }px) translateY(${gripSize / 2}px)`,
            width: `${gripSize}px`,
            height: `${gripSize}px`,
          }"
          class="absolute bg-primary rounded-full btn-outline"
        ></button>
        <button
          ref="next"
          :style="{
            bottom: 0,
            left: 0,
            transform: `translateX(${Number(x2) * size}px) translateY(${
              -Number(y2) * size
            }px) translateX(${-gripSize / 2}px) translateY(${
              -margin.bottom * size
            }px) translateY(${gripSize / 2}px)`,
            width: `${gripSize}px`,
            height: `${gripSize}px`,
          }"
          class="absolute bg-secondary rounded-full btn-outline"
        ></button>
      </div>
      <div class="flex flex-col gap-2 justify-center items-center flex-1">
        <div class="flex">
          <span class="form-control mr-2">
            <label class="input-group input-group-xs">
              <span class="bg-primary text-primary-content px-2">x1</span>
              <input
                v-model="x1"
                type="text"
                placeholder="x1"
                class="input input-bordered input-primary w-14 px-1 h-auto"
              />
            </label>
          </span>
          <span class="form-control mr-2">
            <label class="input-group input-group-xs">
              <span class="bg-primary text-primary-content px-2">y1</span>
              <input
                v-model="y1"
                type="text"
                placeholder="y1"
                class="input input-bordered input-primary w-14 px-1 h-auto"
              />
            </label>
          </span>
        </div>
        <div class="flex">
          <span class="form-control mr-2">
            <label class="input-group input-group-xs">
              <span class="bg-secondary text-secondary-content px-2">x2</span>
              <input
                v-model="x2"
                type="text"
                placeholder="x2"
                class="input input-bordered w-14 px-1 h-auto"
              />
            </label>
          </span>
          <span class="form-control mr-2">
            <label class="input-group input-group-xs">
              <span class="bg-secondary text-secondary-content px-2">y2</span>
              <input
                v-model="y2"
                type="text"
                placeholder="y2"
                class="input input-bordered w-14 px-1 h-auto"
              />
            </label>
          </span>
        </div>
        <span class="form-control">
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
      </div>
    </div>
    <p>
      <CodePart :code="code" />
    </p>
  </div>
</template>

<style scoped></style>
