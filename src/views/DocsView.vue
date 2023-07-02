<script setup lang="ts">
import { computed } from "vue";
import useUpdateHead from "@/composable/useUpdateHead";
import { routesDocs } from "@/router/routesDocs";

useUpdateHead();

const menuList = computed(() => {
  return (
    routesDocs.children
      ?.reduce(
        (list, { meta }) =>
          list.indexOf(meta.group) < 0 ? [...list, meta.group] : list,
        [] as string[]
      )
      .map(
        (group) =>
          routesDocs.children?.filter((route) => route.meta.group === group) ||
          []
      ) || []
  );
});
</script>

<template>
  <main class="flex-1 flex">
    <nav class="bg-base-200 hidden lg:block">
      <div class="max-h-screen my-6 overflow-y-scroll sticky top-0">
        <ul class="bg-base-200 menu menu-compact my-4 w-56">
          <template v-for="list of menuList" :key="list[0].meta.group">
            <li class="menu-title">
              <span>{{ list[0].meta.group }}</span>
            </li>
            <li v-for="route of list" :key="route.name">
              <router-link :to="route">
                {{ route.meta.name }}
              </router-link>
            </li>
          </template>
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
