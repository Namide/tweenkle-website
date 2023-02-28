<script setup lang="ts">
import CodePart from "@/components/CodePart.vue";

const code = `import { DynamicTween } from "tweenkle";

const tween = new DynamicTween({
  from: [0, 0],
  to: [0.5, 0.5],
  onUpdate: console.log,
})

// Change position after 500ms
setTimeout(() => tween.change({ to: [x, y] }), 500)`;
</script>

<template>
  <div class="prose">
    <h1 class="example-title">Dynamic tween follow a 2D point</h1>

    <CodePart :code="code" />
  </div>
</template>

<style scoped></style>
