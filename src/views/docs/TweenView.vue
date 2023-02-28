<script setup lang="ts">
import CodePart from "@/components/CodePart.vue";

const code = `import { Tween } from "tweenkle";

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
});`;
</script>

<template>
  <div class="prose">
    <h1 class="example-title">Tween</h1>

    <CodePart :code="code" />
  </div>
</template>

<style scoped></style>
