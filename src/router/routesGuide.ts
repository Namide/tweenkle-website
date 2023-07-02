import DocsView from "../views/DocsView.vue";
import { RoutesName } from "./RoutesName";
import { description } from "../../twon/package.json";
import type { WebsiteRoute } from "./route.type";

export const routesGuides: WebsiteRoute = {
  path: "/guide",
  name: RoutesName.Guides,
  component: DocsView,

  meta: {
    name: "Guides",
    title: "Guides",
    description,
  },

  children: [],
};
