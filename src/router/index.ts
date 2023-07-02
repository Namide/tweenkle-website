import HomeView from "../views/HomeView.vue";
import ErrorView from "../views/ErrorView.vue";
import { RoutesName } from "./RoutesName";
import type { Component } from "vue";
import { routesDocs } from "./routesDocs";
import { routesExamples } from "./routesExample";
import { routesGuides } from "./routesGuide";

type WebsiteRoute = {
  path: string;
  name: RoutesName;
  component: Component;

  meta: {
    name: string;
    title: string;
    description: string;
    [key: string]: string;
  };

  children?: WebsiteRoute[];
};

const routes: WebsiteRoute[] = [
  {
    path: "/",
    name: RoutesName.Home,
    component: HomeView,
    meta: {
      name: "Home",
      title: "Homepage",
      description: "description",
    },
  },
  routesGuides,
  routesExamples,
  routesDocs,
  {
    path: "/:pathMatch(.*)*",
    name: RoutesName.NotFound,
    component: ErrorView,
    meta: {
      name: "name",
      title: "title",
      description: "description",
    },
  },
];

export default routes;
