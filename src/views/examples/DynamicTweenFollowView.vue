<script setup lang="ts">
import CodePart from "@/components/CodePart.vue";
import GraphicTimeline from "@/components/GraphicTimeline.vue";
import { ref, computed, onMounted, onUnmounted } from "vue";
import { DynamicTween } from "../../../twon/src/tween/DynamicTween";

const mouse = { x: 0, y: 0 };

const area = ref<HTMLDivElement>();
const position = ref({ x: 0, y: 0 });

let changeTween: () => void;
let tween: DynamicTween<[number, number]>;
const graphicX = ref([position.value.x, position.value.x]);
const graphicY = ref([position.value.y, position.value.y]);

const pointTransform = computed(
  () =>
    `translateX(${position.value.x * 100}%) translateY(${
      position.value.y * 100
    }%)`
);

const onMouseMove = (event: MouseEvent) => {
  mouse.x = event.pageX;
  mouse.y = event.pageY;
};

onMounted(() => {
  tween = new DynamicTween([0.5, 0.5], {
    onUpdate: ([x, y]: number[]) => {
      position.value.x = x;
      position.value.y = y;
      graphicX.value[1] = x;
      graphicY.value[1] = y;
    },
  });

  changeTween = () => {
    const { left, top, width, height } =
      area.value?.getBoundingClientRect() || {
        left: 0,
        top: 0,
        width: 0,
        height: 0,
      };
    const x = (mouse.x - left) / width;
    const y = (mouse.y - top - window.scrollY) / height;
    graphicX.value[0] = x;
    graphicY.value[0] = y;
    tween.to([x, y]);
  };
});

onUnmounted(() => {
  tween.dispose();
});

const code = ref(`import { DynamicTween } from "twon";

const tween = new DynamicTween({
  from: [0, 0],
  to: [0.5, 0.5],
  onUpdate: console.log,
})

// Change position after 500ms
setTimeout(() => tween.to({ to: [x, y] }), 500)`);
</script>

<template>
  <div class="prose">
    <h1 class="example-title">Dynamic tween follow a 2D point</h1>

    <CodePart :code="code" />

    <div class="-mt-2 -ml-2 p-2 overflow-hidden">
      <div
        ref="area"
        class="w-full before:pt-[100%] before:relative before:block relative border"
        @mousemove="onMouseMove"
        @click="changeTween"
      >
        <div
          class="w-full h-full absolute top-0 left-0"
          :style="{ transform: pointTransform }"
        >
          <div
            class="w-4 h-4 absolute -top-2 -left-2 bg-primary rounded-full"
          ></div>
        </div>
      </div>
    </div>

    <GraphicTimeline :position="graphicX" :colors="['lightpink', 'crimson']" />

    <GraphicTimeline :position="graphicY" :colors="['aqua', 'darkblue']" />
  </div>
</template>

<style scoped></style>
