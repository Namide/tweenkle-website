import { ViteSSG } from "vite-ssg";
import App from "./App.vue";
import routes from "./router";
import "highlight.js/styles/monokai-sublime.css";
import hljs from "highlight.js/lib/core";
import javascript from "highlight.js/lib/languages/javascript";
import hljsVuePlugin from "@highlightjs/vue-plugin/src/vue";

import "./assets/main.css";

import type { RouteRecordRaw } from "vue-router";

hljs.registerLanguage("javascript", javascript);

export const createApp = ViteSSG(
  App,
  { routes: routes as unknown as RouteRecordRaw[] },
  ({ app, router, routes, isClient, initialState }) => {
    app.use(hljsVuePlugin);
  }
);
