import { useHead } from "@vueuse/head";
import { useRoute } from "vue-router";

export default () => {
  const route = useRoute();
  useHead({
    title: route.meta.title as string,
    meta: [
      {
        name: "description",
        content: route.meta.description as string,
      },
    ],
  });
};
