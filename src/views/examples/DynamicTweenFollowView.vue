<script setup lang="ts">
import { DynamicTween } from "../../../tweenkle/src/tween/DynamicTween";

const SIDE_VW = 75;
const mouse = { x: 0, y: 0 };

const section = document.createElement("section");
section.setAttribute(
  "style",
  `
  width: ${SIDE_VW}vw;
  height: ${SIDE_VW}vw;
  position: relative;
  border: 1px solid black;
  margin-bottom: 64px;
`
);
section.addEventListener("mousemove", (event: MouseEvent) => {
  mouse.x = event.pageX;
  mouse.y = event.pageY;
});

document.body.appendChild(section);

const point = document.createElement("div");
point.setAttribute(
  "style",
  `
  width: 16px;
  height: 16px;
  position: absolute;
  top: -8px;
  left: -8px;
  border-radius: 100%;
  background: #F07;
`
);
section.appendChild(point);

document.body.appendChild(section);

const tween = new DynamicTween({
  from: [0, 0],
  to: [0.5, 0.5],
  msPerUnit: 2000,
  onUpdate: ([x, y]: number[]) => {
    point.style.transform = `translateX(${x * SIDE_VW}vw) translateY(${
      y * SIDE_VW
    }vw)`;
  },
});

section.addEventListener("click", () => {
  const { left, top, width, height } = section.getBoundingClientRect();
  const x = (mouse.x - left) / width;
  const y = (mouse.y - top) / height;
  tween.change({ to: [x, y] });
});

setTimeout(() => {
  console.log(tween);
}, 2000);
</script>

<template>
  <div class="prose">
    <h1 class="example-title">Dynamic tween follow 2D points</h1>

    <p>
      <CodePart :code="code" />

      <span class="form-control !inline-flex mr-2">
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
      <span class="form-control !inline-flex mr-2">
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
      <span class="form-control !inline-flex mr-2">
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
      <span class="form-control !inline-flex mr-2">
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
      <!--  -->
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
  </div>
</template>

<style scoped></style>
