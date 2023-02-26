import HomeView from "../views/HomeView.vue";
import DocView from "../views/DocView.vue";
import ExamplesView from "../views/ExamplesView.vue";
import CubicBezierView from "../views/examples/CubicBezierView.vue";
import DynamicTweenFollowView from "../views/examples/DynamicTweenFollowView.vue";
import { RoutesName } from "./RoutesName";
import type { Component } from "vue";
import { description } from "../../tweenkle/package.json";

type WebsiteRoute = {
  path: string;
  name: RoutesName;
  component: Component;
  meta: {
    name: string;
    title: string;
    description: string;
  };
  children?: WebsiteRoute[];
};

export const exampleRoutes: WebsiteRoute = {
  path: "/examples",
  name: RoutesName.Examples,
  component: ExamplesView,
  meta: {
    name: "Examples",
    title: "Examples",
    description,
  },
  children: [
    {
      path: "cubic-bezier",
      name: RoutesName.ExamplesCubicBezier,
      component: CubicBezierView,
      meta: {
        name: "cubicBezier",
        title: "Cubic-Bezier",
        description: "description",
      },
    },
    {
      path: "dynamic-tween-2d",
      name: RoutesName.ExamplesDynamicTweenFollow,
      component: DynamicTweenFollowView,
      meta: {
        name: "dynamic tween 2D",
        title: "Dynamic tween follow a 2D point",
        description: "description",
      },
    },
  ],
};

const routes: WebsiteRoute[] = [
  {
    path: "/",
    name: RoutesName.Home,
    component: HomeView,
    meta: {
      name: "name",
      title: "title",
      description: "description",
    },
  },
  {
    path: "/docs",
    name: RoutesName.Docs,
    component: DocView,
    meta: {
      name: "name",
      title: "title",
      description: "description",
    },
  },
  exampleRoutes,
];

export default routes;
