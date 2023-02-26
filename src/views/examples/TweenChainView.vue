<script setup lang="ts">
import CodePart from "@/components/CodePart.vue";
import { ref, onMounted, computed, onUnmounted } from "vue";
import { Tween } from "../../../tweenkle/src/tween/Tween";

const position = ref({ x: 0, y: 0 });
const pointTransform = computed(
  () =>
    `translateX(${position.value.x * 100}%) translateY(${
      position.value.y * 100
    }%)`
);
let tweenA: Tween<number[]>;
let tweenB: Tween<number[]>;

onMounted(() => {
  tweenA = new Tween({
    from: [0, 0],
    to: [0.5, 0.5],
    delay: 1000,
    duration: 2000,
    onUpdate: ([x, y]) => {
      position.value = { x, y };
    },
  });

  // eslint-disable-next-line no-new
  tweenB = new Tween({
    from: [0.5, 0.5],
    to: [0, 1],
    delay: 3000,
    duration: 2000,
    timer: tweenA.timer,
    onUpdate: ([x, y]) => {
      position.value = { x, y };
    },
  });
});

onUnmounted(() => {
  tweenA.dispose();
  tweenB.dispose();
});

const code = ref(`import { Tween } from "tweenkle";

const tween = new Tween({
  from: [0, 0],
  to: [0.5, 0.5],
  delay: 1000,
  duration: 2000,
  onUpdate: console.log
});

new Tween({
  from: [0.5, 0.5],
  to: [0, 1],
  delay: 3000,
  duration: 2000,
  // Use same timer to chain tweens
  timer: tween.timer,
  onUpdate: console.log
});`);
</script>

<template>
  <div class="prose">
    <h1 class="example-title">Tween</h1>

    <CodePart :code="code" />

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
