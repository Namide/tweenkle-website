<script setup lang="ts">
import { docsRoutes, exampleRoutes } from "@/router";
</script>

<template>
  <header class="navbar bg-base-100">
    <div class="flex-1">
      <router-link to="/" class="btn btn-ghost normal-case text-xl">
        <span class="text-primary">Tween</span
        ><!-- --><span class="text-secondary">kle</span>
      </router-link>
    </div>
    <div class="flex-none">
      <ul class="menu menu-horizontal px-1">
        <!-- <li :class="{ bordered: '/examples/cubic-bezier' === $route.path }">
          <router-link to="/examples/cubic-bezier">Examples</router-link>
        </li> -->

        <!-- Docs -->
        <li tabindex="0">
          <router-link
            :to="{ name: docsRoutes.children?.[0].name as unknown as string }"
          >
            Docs
            <svg
              class="fill-current"
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
            >
              <path
                d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z"
              />
            </svg>
          </router-link>
          <ul class="p-2 bg-base-100 z-10">
            <li
              v-for="route of docsRoutes.children"
              :key="route.name"
              :class="{ bordered: route.name as unknown as string === $route.name }"
            >
              <router-link :to="route">
                {{ route.meta.name }}
              </router-link>
            </li>
          </ul>
        </li>

        <!-- Examples -->
        <li tabindex="0">
          <router-link
            :to="{ name: exampleRoutes.children?.[0].name as unknown as string }"
          >
            Examples
            <svg
              class="fill-current"
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
            >
              <path
                d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z"
              />
            </svg>
          </router-link>
          <ul class="p-2 bg-base-100 z-10">
            <li
              v-for="route of exampleRoutes.children"
              :key="route.name"
              :class="{ bordered: route.name as unknown as string === $route.name }"
            >
              <router-link :to="route">
                {{ route.meta.name }}
              </router-link>
            </li>
          </ul>
        </li>
        <li><a>Item 3</a></li>
      </ul>
    </div>
  </header>
</template>

<style scoped>
li:has(> .router-link-exact-active) {
  @apply bordered;
}
</style>
