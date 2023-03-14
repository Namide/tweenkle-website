<script setup lang="ts">
import CodePart from "@/components/CodePart.vue";
import DynamicTween2D from "@/components/DynamicTween2D.vue";

const code1 = `import { DynamicTween } from "twon";

const tween = new DynamicTween([0, 0]) // 2 dimention position
  .on("update", console.log)

// Change position after 500ms
setTimeout(() =>
  tween.to([
    Math.random(),
    Math.random()
  ]),
  500
)`;

const code2 = `import {
  DynamicTween,
  easeInOutCubic,
  easeInOutCubic 
} from "twon/src/easing/easing"

// 3D object position
let position3D = { x: 145, y: 325, z: 952 }

// Create the dynamic tween
const tween = new DynamicTween(
    [ position3D.x, position3D.y, position3D.z ],
    {
      duration: 750, // 0.75 seconds of animation
      ease: easeInOutCubic // Cubic easing equation
    }
  )
  .on("update", ([x, y, z]) => {
    position3D.x = x;
    position3D.y = y;
    position3D.z = z;
  })

// Change position after 3 seconds
setTimeout(() => tween.to([35, 78, 90]), 3000)

// Change position after 3.5 seconds
setTimeout(
  () =>
  tween.to(
    [32, 54, 87],
    { 
      duration: 1000, // Use 1 seconds for this change
      ease: easeInOutCirc // Use circle easing for this change
    }
  ),
  3500
)`;
</script>

<template>
  <div class="prose">
    <h1 class="example-title">Dynamic tween follow a 2D point</h1>

    <CodePart :code="code1" />

    <DynamicTween2D />

    <CodePart :code="code2" />
  </div>
</template>

<style scoped></style>
