<script setup lang="ts">
import { ref, watch, onMounted, computed } from "vue";
import { ErodeSmoothPath } from "../../twon/src/path/ErodeSmoothPath";
import { AnchorSmoothPath } from "../../twon/src/path/AnchorSmoothPath";
import { useWindowSize } from "@vueuse/core";
import { name } from "../../twon/package.json";
import CodePart from "@/components/CodePart.vue";

const gripSize = 16;

const { width } = useWindowSize();

let ctx: CanvasRenderingContext2D | null;

const size = ref(0);
const canvas = ref<HTMLCanvasElement>();
const steps = ref("4");
const smoothStart = ref(false);
const smoothEnd = ref(false);
const smoothLoop = ref(true);
const equation = ref<typeof ErodeSmoothPath | typeof AnchorSmoothPath>(
  AnchorSmoothPath
);

const pathBase = ref([
  [0.25, 0.75],
  [0.75, 0.75],
  [0.75, 0.25],
  [0.25, 0.25],
]);

const smoothPath = computed(() =>
  equation.value(pathBase.value, {
    step: Number(steps.value),
    keepEnd: smoothEnd.value,
    keepStart: smoothStart.value,
    loop: smoothLoop.value,
  })
);

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
    const count = 100 * pathBase.value.length;
    for (let i = 0; i < count + 1; i++) {
      const [x, y] = smoothPath.value(i / count);

      if (i === 0) {
        ctx.moveTo(x * size.value, (1 - y) * size.value);
      } else {
        ctx.lineTo(x * size.value, (1 - y) * size.value);
      }
    }
    ctx.strokeStyle = "black";
    ctx.stroke();
  }
};

const update = () => {
  updateSize();
  updateDraw();
};

onMounted(() => {
  ctx = canvas.value?.getContext("2d") || null;
  update();
});

const code = computed(
  () => `import { ${
    equation.value === ErodeSmoothPath ? "ErodeSmoothPath" : "AnchorSmoothPath"
  } } from "${name}"

const path = ${
    equation.value === ErodeSmoothPath ? "ErodeSmoothPath" : "AnchorSmoothPath"
  }(
  ${JSON.stringify(
    pathBase.value.map(([a, b]) => [Number(a.toFixed(3)), Number(b.toFixed(3))])
  )},
  { step: ${steps.value}, keepEnd: false, keepStart: false, loop: true }
)

console.log(path(0.5))
// trace ${JSON.stringify(smoothPath.value(0.5))}`
);

const startDrag = (id: number) => {
  let startDrag = [] as number[];
  const onMove = (event: MouseEvent) => {
    if (startDrag.length > 0) {
      pathBase.value[id][0] += (event.clientX - startDrag[0]) / size.value;
      pathBase.value[id][1] -= (event.clientY - startDrag[1]) / size.value;
    }

    startDrag = [event.clientX, event.clientY];
  };

  window.document.body.addEventListener("mousemove", onMove);

  const dispose = () => {
    window.document.body.removeEventListener("mousemove", onMove);
    window.document.body.removeEventListener("mouseup", dispose);
  };

  window.document.body.addEventListener("mouseup", dispose);
};

watch(width, update);

watch([size, smoothPath], updateDraw, {
  immediate: true,
  deep: true,
});
</script>

<template>
  <div>
    <CodePart :code="code" />

    <div>
      <!-- <div
        class="!inline-flex form-control mr-4 mb-4"
        v-for="(point, i) of pathBase"
        :key="i"
      >
        <label class="input-group">
          <input
            type="text"
            placeholder="0.01"
            class="input input-bordered input-sm w-20"
            v-model.number="point[0]"
          />
          <input
            type="text"
            placeholder="0.01"
            class="input input-bordered input-sm w-20"
            v-model.number="point[1]"
          />
        </label>
      </div> -->

      <!-- Equation -->
      <select
        v-model="equation"
        class="select select-bordered select-sm mr-4 mb-4"
      >
        <option :value="ErodeSmoothPath">Erode</option>
        <option :value="AnchorSmoothPath">Anchor</option>
      </select>

      <!-- Steps -->
      <label class="!inline-flex w-auto input-group input-group-sm mr-4 mb-4">
        <input
          v-model="steps"
          type="text"
          placeholder="steps"
          class="input text-right input-bordered w-14 px-1 h-auto input-accent"
        />
        <span class="bg-accent text-accent-content px-2">steps</span>
      </label>

      <div class="!inline-flex form-control mr-4 mb-4">
        <label class="label cursor-pointer">
          <span class="label-text mr-2">Loop</span>
          <input type="checkbox" v-model="smoothLoop" class="checkbox" />
        </label>
      </div>

      <div v-if="!smoothLoop" class="!inline-flex form-control mr-4 mb-4">
        <label class="label cursor-pointer">
          <span class="label-text mr-2">Start</span>
          <input type="checkbox" v-model="smoothStart" class="checkbox" />
        </label>
      </div>

      <div v-if="!smoothLoop" class="!inline-flex form-control mr-4 mb-4">
        <label class="label cursor-pointer">
          <span class="label-text mr-2">End</span>
          <input type="checkbox" v-model="smoothEnd" class="checkbox" />
        </label>
      </div>

      <!-- + / - -->
      <div class="!inline-flex btn-group btn-group-horizontal mr-4 mb-4">
        <button class="btn btn-sm" @click="pathBase.pop()">-</button>
        <button
          class="btn btn-sm"
          @click="pathBase.push([Math.random(), Math.random()])"
        >
          +
        </button>
      </div>
    </div>

    <div class="relative">
      <canvas ref="canvas" class="w-full border rounded-md"></canvas>

      <button
        ref="next"
        :style="{
          bottom: 0,
          left: 0,
          transform: `translateX(${point[0] * size}px) translateY(${
            -point[1] * size
          }px) translateX(${-gripSize / 2}px) translateY(${gripSize / 2}px)`,
          width: `${gripSize}px`,
          height: `${gripSize}px`,
        }"
        class="absolute bg-secondary rounded-full btn-outline"
        @mousedown="startDrag(i)"
        v-for="(point, i) of pathBase"
        :key="i"
      ></button>
    </div>
  </div>
</template>

<style scoped></style>
