import HomeView from "../views/HomeView.vue";
import DocsView from "../views/DocsView.vue";
import DocsCubicBezier from "../views/docs/CubicBezierView.vue";
import DocsChainTween from "../views/docs/ChainTweenView.vue";
import DocsInstallation from "../views/docs/InstallationView.vue";
import DocsDynamicTweenView from "../views/docs/DynamicTweenView.vue";
import DocsTweenView from "../views/docs/TweenView.vue";
import DocsSmoothPathView from "../views/docs/SmoothPathView.vue";
import ErrorView from "../views/ErrorView.vue";
import { RoutesName } from "./RoutesName";
import type { Component } from "vue";
import { description } from "../../twon/package.json";

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
    {
      path: "smooth-path",
      name: RoutesName.DocsSmoothPath,
      component: DocsSmoothPathView,
      meta: {
        name: "Smooth path",
        title: "Smooth path",
        description: "description",
        group: "Path",
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
