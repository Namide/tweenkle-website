<script setup lang="ts">
import CodePart from "@/components/CodePart.vue";

const code = `import { cubicBezier } from "tweenkle"

const easing = cubicBezier()

console.log(easing(0.5))
// trace`;
</script>

<template>
  <div class="prose">
    <h1 class="example-title">Cubic-bezier</h1>

    <p>
      <CodePart :code="code" />
    </p>
  </div>
</template>

<style scoped></style>
