<script setup lang="ts">
import type { WebsiteRoute } from "@/router/route.type";
import { useEventListener } from "@vueuse/core";
import { ref } from "vue";
import type { RouteRecordName } from "vue-router";

defineProps<{ route: WebsiteRoute }>();

const isOpen = ref(false);
const summary = ref<HTMLElement>();

useEventListener(window, "click", (event: Event) => {
  if (event.target !== summary.value && isOpen.value) {
    isOpen.value = false;
  }
});
</script>

<template>
  <li>
    <details :open="isOpen" @toggle="isOpen = $event.target.open">
      <summary ref="summary">{{ route.meta.name }}</summary>
      <ul class="p-2 bg-base-100 z-10 right-0">
        <li
          v-for="_route of route.children"
          :key="_route.name"
          :class="{ bordered: _route.name as unknown as RouteRecordName === $route.name }"
        >
          <router-link :to="_route" @click="isOpen = false">
            {{ _route.meta.name }}
          </router-link>
        </li>
      </ul>
    </details>

    <!-- <router-link
      :to="{ name: (route.children?.[0]?.name || route.name) as unknown as RouteRecordName }"
    >
      {{ route.meta.name }}
      <svg
        class="fill-current"
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
      >
        <path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" />
      </svg>
    </router-link> -->
    <!-- <ul class="p-2 bg-base-100 z-10 right-0">
      <li
        v-for="_route of route.children"
        :key="_route.name"
        :class="{ bordered: _route.name as unknown as RouteRecordName === $route.name }"
      >
        <router-link :to="_route">
          {{ _route.meta.name }}
        </router-link>
      </li>
    </ul> -->
  </li>
</template>

<style scoped>
li:has(> .router-link-exact-active) {
  @apply bordered;
}
</style>
