import { ViteSSG } from "vite-ssg";
import App from "./App.vue";
import routes from "./router";

import "./assets/main.css";
import type { RouteRecordRaw } from "vue-router";

export const createApp = ViteSSG(
  App,
  { routes: routes as unknown as RouteRecordRaw[] },
  ({ app, router, routes, isClient, initialState }) => {
    // app.use(VueHighlightJS);
  }
);
