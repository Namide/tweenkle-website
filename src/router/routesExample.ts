import MenuView from "../views/MenuView.vue";
import DocsCubicBezier from "../views/docs/CubicBezierView.vue";
import DocsMultiEase from "../views/docs/MultiEaseView.vue";
import DocsTimelineTween from "../views/docs/TimelineTweenView.vue";
import DocsDynamicTweenView from "../views/docs/DynamicTweenView.vue";
import DocsSimpleTweenView from "../views/docs/SimpleTweenView.vue";
import DocsTweenView from "../views/docs/TweenView.vue";
import DocsTweenPathView from "../views/docs/TweenPathView.vue";
import DocsSmoothPathView from "../views/docs/SmoothPathView.vue";
import { RoutesName } from "./RoutesName";
import { description } from "../../twon/package.json";
import type { WebsiteRoute } from "./route.type";

export const routesExamples: WebsiteRoute = {
  path: "/example",
  name: RoutesName.Examples,
  component: MenuView,

  meta: {
    name: "Examples",
    title: "Examples",
    description,
  },

  children: [
    {
      path: "tween",
      name: RoutesName.DocsTween,
      component: DocsTweenView,
      meta: {
        name: "Tween",
        title: "Tween",
        description: "description",
        group: "High level tween",
      },
    },
    {
      path: "tween-path",
      name: RoutesName.DocsTweenPath,
      component: DocsTweenPathView,
      meta: {
        name: "Tween with path",
        title: "Tween with path",
        description: "description",
        group: "High level tween",
      },
    },
    {
      path: "simple-tween",
      name: RoutesName.DocsSimpleTween,
      component: DocsSimpleTweenView,
      meta: {
        name: "Simple tween",
        title: "Simple tween",
        description: "description",
        group: "Low level tweens",
      },
    },
    {
      path: "timeline-tweens",
      name: RoutesName.DocsTimelineTween,
      component: DocsTimelineTween,
      meta: {
        name: "Timeline tween",
        title: "Timeline tween",
        description: "description",
        group: "Low level tweens",
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
        group: "Low level tweens",
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
      path: "multi-ease",
      name: RoutesName.DocsMultiEase,
      component: DocsMultiEase,
      meta: {
        name: "Multi easing",
        title: "Multi-Easing",
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
