<script setup lang="ts">
import { computed } from "vue";
import useUpdateHead from "@/composable/useUpdateHead";
import routes from "@/router";
import { useRoute, type RouteRecordName } from "vue-router";

const route = useRoute();

useUpdateHead();

const parentRoute = computed(() => route.matched[0]);

const menuList = computed(() => {
  return (
    parentRoute.value.children
      ?.reduce(
        (list, { meta }) =>
          list.indexOf(meta?.group as string) < 0
            ? [...list, String(meta?.group)]
            : list,
        [] as string[]
      )
      .map(
        (group) =>
          routes
            .find(
              (route) =>
                (route.name as unknown as RouteRecordName) ===
                parentRoute.value.name
            )
            ?.children?.filter((route) => route.meta.group === group) || []
      ) || []
  );
});
</script>

<template>
  <main class="flex-1 flex">
    <nav class="bg-base-200 hidden lg:block">
      <div class="max-h-screen my-6 overflow-y-scroll sticky top-0">
        <h1 class="my-1 mx-6 text-lg font-bold">{{ parentRoute.meta.name }}</h1>
        <ul class="bg-base-200 menu menu-compact my-4 w-56">
          <template v-for="list of menuList" :key="list[0].meta.group">
            <li>
              <h2 class="menu-title">{{ list[0].meta.group }}</h2>
              <ul>
                <li v-for="route of list" :key="route.name">
                  <router-link :to="route">
                    {{ route.meta.name }}
                  </router-link>
                </li>
              </ul>
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
