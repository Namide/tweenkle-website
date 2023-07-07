<script setup lang="ts">
import { onMounted, ref, computed } from "vue";
import { Tween } from "../../twon/src/tween/Tween";
import {
  easeInCirc,
  easeInOutExpo,
  easeOutElastic,
} from "../../twon/src/easing/easing";

const stick = ref<HTMLDivElement>();
const progress = ref({ x: 0, y: 0 });
const positionStyle = computed(() => ({
  transform: `translateX(${progress.value.x.toFixed(
    2
  )}%) translateY(${progress.value.y.toFixed(2)}%)`,
}));

let tween: Tween<{ x: number; y: number }> | null = null;

onMounted(() => {
  if (tween) {
    tween.dispose();
  }

  tween = new Tween(
    progress.value,
    [
      { x: 100, y: 0 },
      { x: 100, y: 100 },
      { x: 0, y: 100 },
    ],
    {
      duration: 4000,
      ease: [easeInCirc, easeOutElastic, { ease: easeInOutExpo, duration: 2 }],
      timeline: {
        loop: true,
      },
      path: {
        checkpoint: false,
        loop: true,
      },
    }
  );
});
</script>

<template>
  <div class="w-full relative overflow-hidden">
    <div class="pt-[100%] relative w-full"></div>
    <div class="absolute w-full h-full top-0 left-0 pr-5 pb-5">
      <div :style="positionStyle" class="w-full h-full relative">
        <div class="w-5 h-5 absolute bg-primary rounded-full" ref="stick"></div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
