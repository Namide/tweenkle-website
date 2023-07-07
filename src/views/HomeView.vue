<script setup lang="ts">
import CodePart from "@/components/CodePart.vue";
import ExampleMultiEase from "@/components/ExampleMultiEase.vue";
import useUpdateHead from "@/composable/useUpdateHead";
import { RoutesName } from "@/router/RoutesName";
import type { RouteRecordName } from "vue-router";
// import { defineAsyncComponent } from "vue";

// const PixiExample = import.meta.env.SSR
//   ? null
//   : defineAsyncComponent(() => import("@/components/PixiExample.vue"));

const exampleCode = `import { Tween } from "twon"

const progress = { x: 0 }

const tween = new Tween(
    progress,         // Object reference (can be array of number)
    { x: 100 }        // to value
    {
      delay: 1000,    // delay of 1 second before tween
      duration: 2000, // 2 seconds of animation
    }
  )
  .to(                // Chain a tween after
    { x: 50 },
    { duration: 1000 }
  )`;

useUpdateHead();
</script>

<template>
  <main class="flex-1">
    <div
      class="bg-base-200 bg-gradient-to-br from-secondary hero text-secondary-content to-accent"
    >
      <div class="hero-content text-center">
        <div class="max-w-md my-20">
          <h1 class="font-extrabold mb-2 md:text-6xl text-4xl">Twon</h1>
          <p></p>
          <p class="leading-7 py-6" style="text-wrap: balance">
            Tween js/ts library with timeline, cubic bezier, path and multi
            easing support.
            <!-- <span class="badge badge-ghost">simple</span>,
            <span class="badge badge-ghost">fast</span> and
            <span class="badge badge-ghost">lightweight</span><br />
            support <span class="badge badge-ghost">browser</span> and
            <span class="badge badge-ghost">Node.js</span> -->
          </p>
          <div class="max-w-xs mx-auto">
            <div class="relative">
              <ExampleMultiEase />
            </div>
          </div>
          <div class="flex gap-5 justify-center mt-10">
            <router-link
              :to="{ name: RoutesName.Guides as unknown as RouteRecordName }"
              class="btn btn-lg btn-primary"
              >Guide
              <svg
                class="ml-2"
                fill="#fff"
                width="10"
                height="10"
                viewBox="0 0 24 24"
              >
                <path
                  d="m13.025 1-2.847 2.828 6.176 6.176H0v3.992h16.354l-6.176 6.176L13.025 23 24 12z"
                ></path>
              </svg>
            </router-link>
          </div>
        </div>
      </div>
    </div>

    <div class="max-w-4xl mx-auto px-5 py-20 w-full prose">
      <h2 class="text-5xl text-center">Getting started</h2>
      <p>Install Twon on your project with NPM</p>
      <CodePart code="npm install twon" />
      <p>Example of code</p>
      <CodePart :code="exampleCode" />
    </div>

    <section class="bg-neutral py-20 text-neutral-content">
      <div
        class="flex flex-wrap gap-12 justify-center max-w-4xl mx-auto px-5 text-center w-full"
      >
        <div class="max-w-sm md:max-w-[calc(50%-30px)] w-full">
          <h3 class="mb-3 mr-2 text-4xl">
            <span class="align-bottom text-[0.9em]">🛣️</span> Path
          </h3>
          <p class="md:w-10/12 mx-auto opacity-60 text-base">
            Use path to create complex values changements and auto smooth path
            if you need.
          </p>
        </div>

        <div class="max-w-sm md:max-w-[calc(50%-30px)] w-full">
          <h3 class="mb-3 text-4xl">
            <span class="mr-2">
              <svg
                class="align-bottom h-[1em] inline-block w-[1em]"
                viewBox="0 0 512 512"
              >
                <rect fill="#3178c6" height="512" rx="50" width="512"></rect>
                <rect fill="#3178c6" height="512" rx="50" width="512"></rect>
                <path
                  clip-rule="evenodd"
                  d="M316.939 407.424v50.061c8.138 4.172 17.763 7.3 28.875 9.386S368.637 470 380.949 470c11.999 0 23.397-1.147 34.196-3.442 10.799-2.294 20.268-6.075 28.406-11.342 8.138-5.266 14.581-12.15 19.328-20.65S470 415.559 470 403.044c0-9.074-1.356-17.026-4.069-23.857s-6.625-12.906-11.738-18.225c-5.112-5.319-11.242-10.091-18.389-14.315s-15.207-8.213-24.18-11.967c-6.573-2.712-12.468-5.345-17.685-7.9-5.217-2.556-9.651-5.163-13.303-7.822-3.652-2.66-6.469-5.476-8.451-8.448-1.982-2.973-2.974-6.336-2.974-10.091 0-3.441.887-6.544 2.661-9.308s4.278-5.136 7.512-7.118c3.235-1.981 7.199-3.52 11.894-4.615 4.696-1.095 9.912-1.642 15.651-1.642 4.173 0 8.581.313 13.224.938 4.643.626 9.312 1.591 14.008 2.894a97.514 97.514 0 0 1 13.694 4.928c4.434 1.982 8.529 4.276 12.285 6.884v-46.776c-7.616-2.92-15.937-5.084-24.962-6.492S415.797 238 404.112 238c-11.895 0-23.163 1.278-33.805 3.833s-20.006 6.544-28.093 11.967c-8.086 5.424-14.476 12.333-19.171 20.729-4.695 8.395-7.043 18.433-7.043 30.114 0 14.914 4.304 27.638 12.912 38.172 8.607 10.533 21.675 19.45 39.204 26.751 6.886 2.816 13.303 5.579 19.25 8.291s11.086 5.528 15.415 8.448c4.33 2.92 7.747 6.101 10.252 9.543 2.504 3.441 3.756 7.352 3.756 11.733 0 3.233-.783 6.231-2.348 8.995s-3.939 5.162-7.121 7.196-7.147 3.624-11.894 4.771c-4.748 1.148-10.303 1.721-16.668 1.721-10.851 0-21.597-1.903-32.24-5.71-10.642-3.806-20.502-9.516-29.579-17.13zM232.78 284.082H297V243H118v41.082h63.906V467h50.874z"
                  fill="#fff"
                  fill-rule="evenodd"
                ></path>
              </svg>
            </span>
            Typescript support
          </h3>
          <p class="md:w-10/12 mx-auto opacity-60 text-base">
            Fully coded in Typescript to take advantage of typing.
          </p>
        </div>

        <div class="max-w-sm md:max-w-[calc(50%-30px)] w-full">
          <h3 class="mb-3 text-4xl">
            <span class="align-bottom mr-2 text-[0.7em]">🪡</span> Fine-grained
            control
          </h3>
          <p class="md:w-10/12 mx-auto opacity-60 text-base">
            All the options allow you to precisely parameterize the
            calculations.
          </p>
        </div>

        <div class="max-w-sm md:max-w-[calc(50%-30px)] w-full">
          <h3 class="mb-3 mr-2 text-4xl">
            <span class="align-bottom text-[0.9em]">
              <img
                src="../assets/img/curve-icon.svg"
                alt="curve"
                width="36"
                height="36"
                class="w-9 h-9 inline-block"
              />
            </span>
            Multi easing
          </h3>
          <p class="md:w-10/12 mx-auto opacity-60 text-base">
            Standard easing equation, cubic bezier generator and multi easing
            composition.
          </p>
        </div>
      </div>
    </section>

    <section class="bg-base-100 py-20 text-base-content w-full">
      <div
        class="flex flex-wrap gap-12 justify-center max-w-4xl mx-auto px-5 text-center w-full"
      >
        <div class="max-w-sm w-full">
          <h2 class="mb-10 text-5xl">Support</h2>
          <p class="leading-10 text-2xl">
            <span class="text-primary">Firefox</span> 47+<br />
            <span class="text-primary">Chrome</span> 54+<br />
            <span class="text-primary">Edge</span> 14+<br />
            <span class="text-primary">Opera</span> 41+<br />
            <span class="text-primary">Safari MacOS</span> 10.1+<br />
            <span class="text-primary">Webview Android</span> 114+<br />
            <span class="text-primary">Samsung Internet</span> 6.2+<br />
            <span class="text-primary">Safari iOS</span> 10.3+<br />
            <span class="line-through opacity-60">Internet Explorer</span>
          </p>
        </div>
      </div>
    </section>

    <!-- <template v-if="PixiExample">
      <PixiExample></PixiExample>
    </template> -->
  </main>
</template>

<style scoped></style>
