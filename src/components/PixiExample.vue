<script setup lang="ts">
import * as PIXI from "pixi.js";
import { DynamicTween } from "../../twon/src/tween/DynamicTween";
import { onMounted, onUnmounted, ref } from "vue";
import { useMouse } from "@vueuse/core";
import { easeInOutExpo, linear } from "../../twon/src/easing/easing";
import { Tween } from "../../twon/src/tween/Tween";

let app: PIXI.Application;
const { x, y } = useMouse();

const canvas = ref<HTMLCanvasElement>();
let dynamicTweens: DynamicTween<number[]>[] = [];
let tweens: Tween<any>[] = [];

onMounted(() => {
  app = new PIXI.Application({
    background: "#1099bb",
    resizeTo: canvas.value,
    view: canvas.value,
  });
  const sprites = new PIXI.ParticleContainer(10000, {
    // scale: true,
    position: true,
    // rotation: true,
    // uvs: true,
    // alpha: true,
  });

  app.stage.addChild(sprites);

  // create an array to store all the sprites
  // const maggots: {
  //   sprite: PIXI.Sprite;
  //   tween: DynamicTween<number[]>;
  // }[] = [];

  // Rectangle
  const graphic = new PIXI.Graphics();
  graphic.lineStyle(4, 0xffffff);
  // graphic.beginFill(0xde3249);
  graphic.drawRect(-10, -10, 10, 10);
  graphic.endFill();

  let texture = app.renderer.generateTexture(graphic);
  const dudeBase = new PIXI.Sprite(texture);

  const totalDynamicSprites = 100; // app.renderer instanceof PIXI.Renderer ? 10000 : 100;
  const totalSimpleSprites = 1000; // app.renderer instanceof PIXI.Renderer ? 10000 : 100;

  tweens = [];
  for (let i = 0; i < totalSimpleSprites; i++) {
    const sprite = new PIXI.Sprite(dudeBase.texture);

    sprite.anchor.set(0.5);
    sprite.x = Math.random() * app.screen.width;
    sprite.y = Math.random() * app.screen.height;

    sprite.tint =
      (Math.floor(Math.random() * 0xff) << 16) |
      (Math.floor(Math.random() * 0xff) << 8) |
      Math.floor(Math.random() * 0xff);

    const tween = new Tween(
      sprite.position as { x: number; y: number },
      [
        {
          x: Math.random() * app.screen.width,
          y: Math.random() * app.screen.height,
        },
        {
          x: Math.random() * app.screen.width,
          y: Math.random() * app.screen.height,
        },
        {
          x: Math.random() * app.screen.width,
          y: Math.random() * app.screen.height,
        },
      ],
      {
        duration: Math.random() * 2000 + 3000,
        ease: linear,
        timeline: {
          loop: true,
        },
        path: {
          loop: true,
          step: 4,
        },
      }
    );
    tweens.push(tween);

    // maggots.push({
    //   sprite,
    //   tween,
    // });
    sprites.addChild(sprite);
  }

  dynamicTweens = [];
  for (let i = 0; i < totalDynamicSprites; i++) {
    const sprite = new PIXI.Sprite(dudeBase.texture);

    sprite.anchor.set(0.5);
    sprite.x = Math.random() * app.screen.width;
    sprite.y = Math.random() * app.screen.height;

    sprite.tint =
      (Math.floor(Math.random() * 0xff) << 16) |
      (Math.floor(Math.random() * 0xff) << 8) |
      Math.floor(Math.random() * 0xff);

    const tween = new DynamicTween([sprite.x, sprite.y], {
      duration: Math.random() * 1000 + 500,
      ease: easeInOutExpo,
    }).on("update", ([x, y]: number[]) => {
      sprite.x = x;
      sprite.y = y;
    });
    tween.to([
      Math.random() * app.screen.width,
      Math.random() * app.screen.height,
    ]);
    dynamicTweens.push(tween);

    // maggots.push({
    //   sprite,
    //   tween,
    // });
    sprites.addChild(sprite);
  }
  // create a bounding box box for the little maggots
  // const dudeBoundsPadding = 100;
  // const dudeBounds = new PIXI.Rectangle(
  //   -dudeBoundsPadding,
  //   -dudeBoundsPadding,
  //   app.screen.width + dudeBoundsPadding * 2,
  //   app.screen.height + dudeBoundsPadding * 2
  // );

  // let tick = 0;

  app.ticker.add(() => {
    // iterate through the sprites and update their position
    // for (let i = 0; i < maggots.length; i++) {
    //   const dude = maggots[i];
    //   // dude.scale.y = 0.95 + Math.sin(tick + dude.offset) * 0.05;
    //   // dude.direction += dude.turningSpeed * 0.01;
    //   // dude.x += Math.random() - 0.5; // Math.sin(dude.direction) * (dude.speed * dude.scale.y);
    //   // dude.y += Math.random() - 0.5; // Math.cos(dude.direction) * (dude.speed * dude.scale.y);
    //   // dude.rotation = Math.random(); // -dude.direction + Math.PI;
    //   // wrap the maggots
    //   // if (dude.x < dudeBounds.x) {
    //   //   dude.x += dudeBounds.width;
    //   // } else if (dude.x > dudeBounds.x + dudeBounds.width) {
    //   //   dude.x -= dudeBounds.width;
    //   // }
    //   // if (dude.y < dudeBounds.y) {
    //   //   dude.y += dudeBounds.height;
    //   // } else if (dude.y > dudeBounds.y + dudeBounds.height) {
    //   //   dude.y -= dudeBounds.height;
    //   // }
    // }
    // // increment the ticker
    // tick += 0.1;
  });
});

const move = () => {
  const offsetY = canvas.value?.getBoundingClientRect().top || 0;
  const w = 250;
  const getTranslate = () => (Math.random() ** 4 - Math.random() ** 4) * w;
  dynamicTweens.forEach((tween) => {
    tween.to([getTranslate() + x.value, getTranslate() + y.value - offsetY]);
  });
};

onUnmounted(() => {
  dynamicTweens.forEach((tween) => tween.dispose());
  tweens.forEach((tween) => tween.dispose());
  app.destroy(true);
});
</script>

<template>
  <canvas ref="canvas" class="w-full h-[60vh]" @click="move"></canvas>
</template>

<style scoped></style>
