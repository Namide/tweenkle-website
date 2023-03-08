<script setup lang="ts">
import CodePart from "@/components/CodePart.vue";
import DynamicCubicBezier from "@/components/DynamicCubicBezier.vue";

const code = `import { cubicBezier } from "tweenkle"

const easing = cubicBezier()

console.log(easing(0.5))
// trace`;
</script>

<template>
  <div class="prose">
    <h1 class="example-title">Cubic-bezier</h1>

    <p>You can create custom easing with the cubic bezier tool.</p>

    <CodePart :code="code" />

    <h2>Test cubic bezier</h2>
    <p>
      <a
        href="https://en.wikipedia.org/wiki/B%C3%A9zier_curve#Cubic_B.C3.A9zier_curves"
        >Cubic bezier</a
      >
      is a curve line define by two
      <span class="text-primary">control</span>&nbsp;
      <span class="text-secondary">points</span>.<br />Test it by move the grabs
      or the values below.<br />
    </p>
    <p>
      The
      <span class="text-accent-content bg-accent px-1 rounded-lg">step</span>
      value change the accuracy of the curve.
    </p>
    <DynamicCubicBezier />
  </div>
</template>

<style scoped></style>
