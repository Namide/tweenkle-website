<script setup lang="ts">
import CodePart from "@/components/CodePart.vue";
import { name } from "../../../tweenkle/package.json";

const code = `// Import the library
import { Tween } from "tweenkle"

new Tween(
  [10, 50],   // from 10 to 50 
  {     
    duration: 1000,         // in 1 second (1000ms)
    onUpdate: console.log   // display on each frame
  }
);`;
</script>

<template>
  <div class="prose">
    <h1 class="example-title">Installation</h1>

    <p>Install {{ name }} on your project with NPM.</p>

    <CodePart :code="`npm install ${name}`" />

    <p>Use it by import and create tween.</p>

    <CodePart :code="code" />
  </div>
</template>

<style scoped></style>
