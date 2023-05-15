<script setup lang="ts">
import { onMounted, ref, computed } from "vue";
import CodePart from "@/components/CodePart.vue";
import { Tween } from "../../../twon/src/tween/Tween";
import { RoutesName } from "../../router/RoutesName";
import type { RouteRecordName } from "vue-router";

const stick = ref<HTMLDivElement>();
const progress = ref({ x: 0 });
const positionStyle = computed(() => ({
  transform: `translateX(${progress.value.x.toFixed(2)}%)`,
}));

const code = computed(
  () => `import { Tween } from "twon"

const progress = { x: 0 }

const tween = new Tween(
    progress,         // Object reference (can be array of number)
    { x: 100 }        // to value
    {
      delay: 1000,    // delay of 1 second before tween
      duration: 2000, // 2 seconds of animation
    }
  )
  .to(                // Chain a tween after
    { x: 50 },
    { duration: 1000 }
  )  

// Check the value after 1.5 sec
setTimeout(() => {
  console.log(progress.x)
}, 1500)`
);

let tween: Tween<{ x: number }> | null = null;

onMounted(() => {
  if (tween) {
    tween.dispose();
  }

  tween = new Tween(
    progress.value,
    { x: 100 },
    { delay: 1000, duration: 2000 }
  ).to({ x: 50 }, { duration: 1000 });
});
</script>

<template>
  <div class="prose">
    <h1 class="example-title">Tween</h1>

    <p>
      Auto refresh a reference (Object or Array) to simplify Tween usage. For
      example, it does not require to watch update event.
    </p>

    <CodePart :code="code" />

    <div class="w-full relative h-5 pr-5 overflow-hidden">
      <div :style="positionStyle" class="w-full h-full relative">
        <div
          class="w-5 h-full absolute bg-primary rounded-full"
          ref="stick"
        ></div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
