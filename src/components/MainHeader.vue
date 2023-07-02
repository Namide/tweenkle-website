<script setup lang="ts">
import SubMenu from "@/components/SubMenu.vue";
import routes from "@/router";
import { RoutesName } from "@/router/RoutesName";
import { routesDocs } from "@/router/routesDocs";
import { routesExamples } from "@/router/routesExample";
import { routesGuides } from "@/router/routesGuide";
import type { RouteRecordName } from "vue-router";

const homeRoute = routes.find(({ name }) => name === RoutesName.Home);

console.log(homeRoute);
</script>

<template>
  <header class="navbar bg-base-100">
    <div class="flex-1">
      <router-link
        :to="homeRoute?.path || '/'"
        class="btn btn-ghost normal-case text-xl"
      >
        <span class="text-primary">Tw</span
        ><!-- --><span class="text-secondary">on</span>
      </router-link>
    </div>

    <div class="flex-none">
      <ul class="menu menu-horizontal px-1">
        <li
          v-if="homeRoute"
          :class="{ bordered: homeRoute.name as unknown as RouteRecordName === $route.name }"
        >
          <router-link :to="homeRoute.path">{{
            homeRoute.meta.name
          }}</router-link>
        </li>

        <SubMenu :route="routesGuides">Guide</SubMenu>
        <SubMenu :route="routesExamples">Examples</SubMenu>
        <SubMenu :route="routesDocs">Doc</SubMenu>

        <li>
          <span class="!bg-transparent p-0">
            <a
              href="https://www.npmjs.com/package/twon"
              target="_blank"
              rel="noopener noreferrer"
              class="btn btn-circle btn-ghost !py-0"
            >
              <img src="@/assets/img/npm.svg" class="w-9 h-6" alt="NPM" />
            </a>
          </span>
        </li>
        <li>
          <span class="!bg-transparent p-0 mr-4">
            <a
              href="https://github.com/Namide/twon"
              target="_blank"
              rel="noopener noreferrer"
              class="btn btn-circle btn-ghost !py-0"
            >
              <img src="@/assets/img/github.svg" class="w-6 h-6" alt="Github" />
            </a>
          </span>
        </li>
      </ul>
    </div>
  </header>
</template>

<style scoped>
li:has(> .router-link-exact-active) {
  @apply bordered;
}
</style>
