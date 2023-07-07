<script setup lang="ts">
import { computed } from "vue";
import CodePart from "@/components/CodePart.vue";
import ExampleMultiEase from "@/components/ExampleMultiEase.vue";

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
    ease: [easeInCirc, easeOutElastic, { ease: easeInOutExpo, duration: 2 }],
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
</script>

<template>
  <div class="prose">
    <h1 class="example-title">Tween path</h1>

    <p>Chain easing in one tween.</p>

    <p>Can be a list of easing:</p>

    <CodePart code="[ easeInCirc, easeOutElastic, easeInOutExpo ]" />

    <p>You can add proportional duration for each easing:</p>

    <CodePart
      code="[
  { ease: easeInCirc, duration: 2 },
  { ease: easeOutElastic, duration: 3 },
  { ease: easeInOutExpo, duration: 1 }
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

    <ExampleMultiEase />
  </div>
</template>

<style scoped></style>
