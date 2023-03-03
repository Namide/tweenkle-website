import HomeView from "../views/HomeView.vue";
import ExamplesView from "../views/ExamplesView.vue";
import ExamplesCubicBezierView from "../views/examples/CubicBezierView.vue";
import ExamplesDynamicTweenFollowView from "../views/examples/DynamicTweenFollowView.vue";
import ExamplesTweenChain from "../views/examples/TweenChainView.vue";
import SmoothPathView from "../views/examples/SmoothPathView.vue";
import DocsView from "../views/DocsView.vue";
import DocsCubicBezier from "../views/docs/CubicBezierView.vue";
import DocsDynamicTweenView from "../views/docs/DynamicTweenView.vue";
import DocsTweenView from "../views/docs/TweenView.vue";
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
      component: ExamplesCubicBezierView,
      meta: {
        name: "cubicBezier",
        title: "Cubic-Bezier",
        description: "description",
      },
    },
    {
      path: "dynamic-tween-2d",
      name: RoutesName.ExamplesDynamicTweenFollow,
      component: ExamplesDynamicTweenFollowView,
      meta: {
        name: "dynamic tween 2D",
        title: "Dynamic tween follow a 2D point",
        description: "description",
      },
    },
    {
      path: "chain-tween",
      name: RoutesName.ExamplesChainTween,
      component: ExamplesTweenChain,
      meta: {
        name: "Chain tweens",
        title: "Chain tweens",
        description: "description",
      },
    },
    {
      path: "smooth-path",
      name: RoutesName.ExamplesSmoothPath,
      component: SmoothPathView,
      meta: {
        name: "Smooth path",
        title: "Smooth path",
        description: "description",
      },
    },
  ],
};

export const docsRoutes: WebsiteRoute = {
  path: "/docs",
  name: RoutesName.Docs,
  component: DocsView,
  meta: {
    name: "Docs",
    title: "Documentation",
    description,
  },
  children: [
    {
      path: "cubic-bezier",
      name: RoutesName.DocsCubicBezier,
      component: DocsCubicBezier,
      meta: {
        name: "cubicBezier",
        title: "Cubic-Bezier",
        description: "description",
      },
    },
    {
      path: "tween",
      name: RoutesName.DocsTween,
      component: DocsTweenView,
      meta: {
        name: "Tween",
        title: "Tween",
        description: "description",
      },
    },
    {
      path: "dynamic-tween",
      name: RoutesName.DocsDynamicTween,
      component: DocsDynamicTweenView,
      meta: {
        name: "Dynamic Tween",
        title: "Dynamic tween",
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
  docsRoutes,
  exampleRoutes,
];

export default routes;
