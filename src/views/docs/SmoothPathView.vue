<script setup lang="ts">
import SmoothPath from "@/components/SmoothPath.vue";
import useUpdateHead from "@/composable/useUpdateHead";

useUpdateHead();
</script>

<template>
  <div class="prose">
    <h1 class="example-title">Smooth path</h1>

    <SmoothPath />
  </div>
</template>

<style scoped></style>
