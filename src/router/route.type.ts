import type { Component } from "vue";
import type { RoutesName } from "./RoutesName";

export type WebsiteRouteMeta = {
  name: string;
  title: string;
  description: string;
  [key: string]: string;
};

export type WebsiteRoute = {
  path: string;
  name: RoutesName;
  component: Component;

  meta: WebsiteRouteMeta;

  children?: WebsiteRoute[];
};
