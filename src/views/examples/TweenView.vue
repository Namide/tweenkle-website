<script setup lang="ts">
import { useWindowSize } from "@vueuse/core";
import { ref, onMounted, computed, watch } from "vue";
import { Tween } from "../../../tweenkle/src/tween/Tween";

const { width } = useWindowSize();

const area = ref<HTMLDivElement>();
const position = ref({ x: 0, y: 0 });
const areaSize = ref({ width: 0, height: 0 });

const pointTransform = computed(
  () =>
    `translateX(${position.value.x * 100}%) translateY(${
      position.value.y * 100
    }%)`
);

watch(
  () => ({ width: width.value, area }),
  () => {
    areaSize.value = {
      width: area.value?.offsetWidth || 0,
      height: area.value?.offsetHeight || 0,
    };
  },
  { deep: true, immediate: true }
);

onMounted(() => {
  const tween = new Tween({
    from: [0, 0],
    to: [0.5, 0.5],
    delay: 1000,
    duration: 2000,
    onUpdate: ([x, y]: number[]) => {
      position.value = { x, y };
    },
  });

  // eslint-disable-next-line no-new
  new Tween({
    from: [0.5, 0.5],
    to: [0, 1],
    delay: 3000,
    duration: 2000,
    timer: tween.timer,
    onUpdate: ([x, y]: number[]) => {
      position.value = { x, y };
    },
  });
});
</script>

<template>
  <div class="prose">
    <h1 class="example-title">Tween</h1>
    <div class="-mt-2 -ml-2 p-2 overflow-hidden">
      <div
        ref="area"
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
