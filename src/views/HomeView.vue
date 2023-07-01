<script setup lang="ts">
import useUpdateHead from "@/composable/useUpdateHead";
import { defineAsyncComponent } from "vue";
// const PixiExample = () => import("@/components/PixiExample.vue");

const PixiExample = import.meta.env.SSR
  ? null
  : defineAsyncComponent(() => import("@/components/PixiExample.vue"));

useUpdateHead();
</script>

<template>
  <main class="flex-1">
    Test
    <template v-if="PixiExample">
      <PixiExample></PixiExample>
    </template>
  </main>
</template>

<style scoped></style>
