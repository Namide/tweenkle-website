import MenuView from "../views/MenuView.vue";
import { RoutesName } from "./RoutesName";
import { description } from "../../twon/package.json";
import type { WebsiteRoute } from "./route.type";

import EasingView from "@/views/guide/Easing.vue";
import GettingStartedView from "@/views/guide/GettingStarted.vue";
import PathView from "@/views/guide/Path.vue";
import TweensView from "@/views/guide/Tweens.vue";
import WhenUseTwonView from "@/views/guide/WhenUseTwon.vue";
import WhyTwonView from "@/views/guide/WhyTwon.vue";

export const routesGuides: WebsiteRoute = {
  path: "/guide",
  name: RoutesName.Guides,
  component: MenuView,

  meta: {
    name: "Guide",
    title: "Guide",
    description,
  },

  children: [
    {
      path: "why",
      name: RoutesName.GuidesWhyTwon,
      component: WhyTwonView,
      meta: {
        name: "Why use Twon?",
        title: "Why use Twon?",
        description: "description",
        group: "Introduction",
      },
    },
    {
      path: "when",
      name: RoutesName.GuidesWhenUseTwon,
      component: WhenUseTwonView,
      meta: {
        name: "When use Twon?",
        title: "When use Twon and when not use Twon?",
        description: "description",
        group: "Introduction",
      },
    },
    {
      path: "getting-started",
      name: RoutesName.GuidesGettingStarted,
      component: GettingStartedView,
      meta: {
        name: "Getting started",
        title: "Getting started",
        description: "description",
        group: "Introduction",
      },
    },
    {
      path: "tweens",
      name: RoutesName.GuidesTweens,
      component: TweensView,
      meta: {
        name: "Tween types",
        title: "Tween types",
        description: "description",
        group: "Concept",
      },
    },
    {
      path: "easing",
      name: RoutesName.GuidesEasing,
      component: EasingView,
      meta: {
        name: "Easing list",
        title: "Easing list",
        description: "description",
        group: "Concept",
      },
    },
    {
      path: "path",
      name: RoutesName.GuidesPath,
      component: PathView,
      meta: {
        name: "Path types",
        title: "Path types",
        description: "description",
        group: "Concept",
      },
    },
  ],
};
