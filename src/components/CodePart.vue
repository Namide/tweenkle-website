<script setup lang="ts">
import { ref, watch } from "vue";
import { getHighlighter } from "shiki";

let raf: number;

const props = withDefaults(defineProps<{ code: string; language?: string }>(), {
  language: "js",
});

const colorizedCode = ref(`<pre><code>${props.code}</code></pre>`);

if (!import.meta.env.SSR) {
  const highlighter = getHighlighter({
    theme: "monokai",
    langs: ["javascript"],
    paths: {
      wasm: `${import.meta.env.BASE_URL}shiki`,
      themes: `${import.meta.env.BASE_URL}shiki/themes`,
      languages: `${import.meta.env.BASE_URL}shiki/languages`,
    },
  });
  watch(
    () => props.code,
    () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(async () => {
        highlighter.then((highlighter) => {
          colorizedCode.value = highlighter.codeToHtml(props.code, {
            lang: props.language,
          });
        });
      });
    },
    { immediate: true }
  );
}
</script>

<template>
  <div v-html="colorizedCode"></div>
</template>

<style scoped>
:deep(pre) {
  background-color: var(--tw-prose-pre-bg) !important;
}
</style>
