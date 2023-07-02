import type { Component } from "vue";
import type { RoutesName } from "./RoutesName";

export type WebsiteRoute = {
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
