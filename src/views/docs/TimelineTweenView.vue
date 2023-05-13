<script setup lang="ts">
import CodePart from "@/components/CodePart.vue";
import { ref, onMounted, computed, onUnmounted } from "vue";
import { TimelineTween } from "../../../twon/src/tween/TimelineTween";

const position = ref({ x: 0, y: 0 });
const pointTransform = computed(
  () =>
    `translateX(${position.value.x * 100}%) translateY(${
      position.value.y * 100
    }%)`
);
let tween: TimelineTween<[number, number]>;

onMounted(() => {
  tween = new TimelineTween(
    [
      [0, 0],
      [0.5, 0.5],
    ] as [number, number][],
    {
      delay: 1000,
      duration: 2000,
    }
  )
    .to([0, 1], {
      duration: 2000,
    })
    .on("update", ([x, y]: [number, number]) => {
      position.value = { x, y };
    });
});

onUnmounted(() => {
  tween.dispose();
});

const toCode = ref(`import { TimelineTween } from "twon";

new TimelineTween(
    [
      [0, 0], // from 2D position
      [0.5, 0.5], // to 2D position
    ],
    {
      delay: 1000,
      duration: 2000
    }
  )
  .to(
    [0, 1], // to 2D position
    {
      duration: 2000
    }
  )
  .on("update", console.log);`);
</script>

<template>
  <div class="prose">
    <h1 class="example-title">Timeline tweens</h1>

    <p>Add new position to chain after the tween</p>

    <CodePart :code="toCode" />

    <div class="-mt-2 -ml-2 p-2 overflow-hidden">
      <div
        class="w-full before:pt-[100%] before:relative before:block relative border"
      >
        <div
          class="w-full h-full absolute top-0 left-0"
          :style="{ transform: pointTransform }"
        >
          <div
            class="w-4 h-4 absolute -top-2 -left-2 bg-primary rounded-full"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
