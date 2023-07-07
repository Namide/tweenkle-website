<script setup lang="ts">
import { computed } from "vue";
import * as Easing from "../../../twon/src/easing/easing";
import DisplayCurve from "../../components/DisplayCurve.vue";
import DynamicCubicBezier from "@/components/DynamicCubicBezier.vue";
import CodePart from "@/components/CodePart.vue";
import { multiEasing } from "../../../twon/src/easing/multiEasing";
import { cubicBezier } from "../../../twon/src/easing/cubicBezier";

const easings = computed(() =>
  Object.keys(Easing).map((name) => ({
    name,
    curve: Easing[name as keyof typeof Easing],
  }))
);
</script>

<template>
  <div class="prose max-w-none">
    <h1 class="example-title">Easing</h1>
    <p>Twon offers you 3 types of easing:</p>
    <h2>Cubic bezier</h2>
    <DynamicCubicBezier />
    <h2>Equations</h2>
    <div>
      <CodePart
        code="import { easeOutExpo } from twon
  
console.log(easeOutExpo(0.5))
// trace 0.96875"
      />
    </div>
    <div class="flex flex-wrap gap-5">
      <div
        v-for="ease of easings"
        :key="ease.name"
        class="relative inline-block border pt-5 rounded-xl overflow-hidden"
      >
        <DisplayCurve :equation="ease.curve"></DisplayCurve>
        <strong class="absolute top-4 right-5">{{ ease.name }}</strong>
      </div>
    </div>

    <h2>Multi easing</h2>

    <p>
      You can combine easing with multi easing. Each part of multi easing
      combine an easing with his relative duration and his relative maximum
      value.
    </p>

    <div class="flex items-center gap-5">
      <div class="relative inline-block border pt-5 rounded-xl overflow-hidden">
        <DisplayCurve
          :equation="
            multiEasing(cubicBezier(0.4, 0, 1, 0.2), Easing.easeOutElastic)
          "
        ></DisplayCurve>
        <strong class="absolute top-4 right-5"></strong>
      </div>
      <CodePart
        code="import { easeOutExpo } from twon

// Combine two easing
const ease = multiEasing(
  cubicBezier(0.4, 0, 1, 0.2), // Custom cubic bezier
  Easing.easeOutElastic        // Equation
)"
      />
    </div>

    <div class="flex items-center gap-5">
      <div class="relative inline-block border pt-5 rounded-xl overflow-hidden">
        <DisplayCurve
          :equation="
            multiEasing(
              { ease: cubicBezier(0.4, 0, 1, 0.2), value: 3, duration: 2 },
              Easing.easeOutElastic
            )
          "
        ></DisplayCurve>
        <strong class="absolute top-4 right-5"></strong>
      </div>
      <CodePart
        code="import { easeOutExpo } from twon

// Combine two easing
const ease = multiEasing(
  // Custom cubic bezier with 3x more value
  // than other and 2x more duration than other
  {
    ease: cubicBezier(0.4, 0, 1, 0.2),
    value: 3,
    duration: 2
  },
  Easing.easeOutElastic // Equation
)"
      />
    </div>
  </div>
</template>

<style scoped></style>
