<script setup lang="ts">
import { onMounted, ref, computed } from "vue";
import CodePart from "@/components/CodePart.vue";
import { Tween } from "../../../twon/src/tween/Tween";
import { RoutesName } from "../../router/RoutesName";
import type { RouteRecordName } from "vue-router";
import {
  easeInBounce,
  easeInCirc,
  easeInElastic,
  easeInOutCirc,
  easeInOutExpo,
  easeOutBounce,
  easeOutCirc,
  easeOutElastic,
} from "../../../twon/src/easing/easing";

const stick = ref<HTMLDivElement>();
const progress = ref({ x: 0, y: 0 });
const positionStyle = computed(() => ({
  transform: `translateX(${progress.value.x.toFixed(
    2
  )}%) translateY(${progress.value.y.toFixed(2)}%)`,
}));

const code = computed(
  () => `import { Tween, easeInBounce } from "twon"

const progress = { x: 0, y: 0 }

const tween = new Tween(
  progress.value,
  [
    { x: 100, y: 0 },
    { x: 100, y: 100 },
    { x: 0, y: 100 },
  ],
  {
    duration: 4000,
    ease: [easeInCirc, easeOutElastic, { ease: easeInOutExpo, time: 2 }],
    timeline: {
      loop: true,
    },
    path: {
      checkpoint: false,
      loop: true,
    },
  }
);`
);

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
      ease: [easeInCirc, easeOutElastic, { ease: easeInOutExpo, time: 2 }],
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
  <div class="prose">
    <h1 class="example-title">Tween path</h1>

    <p>Chain easing in one tween.</p>

    <p>Can be a list of easing:</p>

    <CodePart code="[ easeInCirc, easeOutElastic, easeInOutExpo ]" />

    <p>You can add proportional time for each easing:</p>

    <CodePart
      code="[
  { ease: easeInCirc, time: 2 },
  { ease: easeOutElastic, time: 3 },
  { ease: easeInOutExpo, time: 1 }
]"
    />

    <p>You can add proportional value for each easing:</p>

    <CodePart
      code="[
  { ease: easeInCirc, value: 2 },
  { ease: easeOutElastic, value: 3 },
  { ease: easeInOutExpo, value: 1 }
]"
    />

    <p>Full example with Tween</p>

    <CodePart :code="code" />

    <div class="w-full relative overflow-hidden">
      <div class="pt-[100%] relative w-full"></div>
      <div class="absolute w-full h-full top-0 left-0 pr-5 pb-5">
        <div :style="positionStyle" class="w-full h-full relative">
          <div
            class="w-5 h-5 absolute bg-primary rounded-full"
            ref="stick"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
