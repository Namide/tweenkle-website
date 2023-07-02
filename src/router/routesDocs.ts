import MenuView from "../views/MenuView.vue";
import DocsInstallation from "../views/docs/InstallationView.vue";
import { RoutesName } from "./RoutesName";
import { description } from "../../twon/package.json";
import type { WebsiteRoute } from "./route.type";

export const routesDocs: WebsiteRoute = {
  path: "/doc",
  name: RoutesName.Docs,
  component: MenuView,

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
        name: "Installation",
        title: "Installation",
        description: "installation",
        group: "Getting started",
      },
    },
  ],
};
