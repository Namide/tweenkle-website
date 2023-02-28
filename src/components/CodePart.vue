<script setup lang="ts">
withDefaults(defineProps<{ code: string; language?: string }>(), {
  language: "javascript",
});
</script>

<template>
  <highlightjs :language="language" :code="code" />
</template>

<style scoped>
:deep(pre) {
  background-color: var(--tw-prose-pre-bg) !important;
}
</style>
