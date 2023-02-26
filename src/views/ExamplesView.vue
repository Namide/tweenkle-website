<script setup lang="ts">
import { exampleRoutes } from "@/router";
import useUpdateHead from "@/composable/useUpdateHead";

useUpdateHead();
</script>

<template>
  <main class="flex-1 flex">
    <nav class="bg-base-200 hidden lg:block">
      <div class="max-h-screen my-6 overflow-y-scroll sticky top-0">
        <ul class="bg-base-200 menu menu-compact my-4 w-56">
          <li class="menu-title"><span>Examples</span></li>
          <li v-for="route of exampleRoutes.children" :key="route.name">
            <router-link :to="route">
              {{ route.meta.name }}
            </router-link>
          </li>
        </ul>
      </div>
    </nav>

    <article class="bg-base-100 flex-1 px-6 py-12 relative">
      <RouterView />
    </article>
  </main>
</template>

<style scoped>
.router-link-exact-active {
  @apply active;
}
</style>
