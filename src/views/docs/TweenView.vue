<script setup lang="ts">
import CodePart from "@/components/CodePart.vue";

const code = `import { Tween } from "twon"

const tween = new Tween(
  [
    5, // from value
    10 // to value
  ],
  {
    delay: 1000, // delay of 1 second before tween
    duration: 2000, // 2 seconds of animation
    ease: easeInOutCubic, // Cubic easing equation
  }
).on('update', console.log) // log on each frame

// or log once after 1.5 sec
setTimeout(() => {
  console.log(tween.getValue())
}, 1500)`;
</script>

<template>
  <div class="prose">
    <h1 class="example-title">Tween</h1>

    <CodePart :code="code" />
  </div>
</template>

<style scoped></style>
