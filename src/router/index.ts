import HomeView from "../views/HomeView.vue";
import ExamplesView from "../views/ExamplesView.vue";
import ExamplesCubicBezierView from "../views/examples/CubicBezierView.vue";
import ExamplesDynamicTweenFollowView from "../views/examples/DynamicTweenFollowView.vue";
import SmoothPathView from "../views/examples/SmoothPathView.vue";
import DocsView from "../views/DocsView.vue";
import DocsCubicBezier from "../views/docs/CubicBezierView.vue";
import DocsChainTween from "../views/docs/ChainTweenView.vue";
import DocsInstallation from "../views/docs/InstallationView.vue";
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
    [key: string]: string;
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
      path: "installation",
      name: RoutesName.DocsInstallation,
      component: DocsInstallation,
      meta: {
        name: "installation",
        title: "Installation",
        description: "installation",
        group: "Getting started",
      },
    },
    {
      path: "tween",
      name: RoutesName.DocsTween,
      component: DocsTweenView,
      meta: {
        name: "Simple tween",
        title: "Simple tween",
        description: "description",
        group: "Tweens",
      },
    },
    {
      path: "chain-tweens",
      name: RoutesName.DocsChainTween,
      component: DocsChainTween,
      meta: {
        name: "Chain tween",
        title: "Chain tween",
        description: "description",
        group: "Tweens",
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
        group: "Tweens",
      },
    },
    {
      path: "cubic-bezier",
      name: RoutesName.DocsCubicBezier,
      component: DocsCubicBezier,
      meta: {
        name: "cubicBezier",
        title: "Cubic-Bezier",
        description: "description",
        group: "Equations",
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
