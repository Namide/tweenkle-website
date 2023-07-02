<script setup lang="ts">
import * as PIXI from "pixi.js";
import { onMounted, onUnmounted, ref } from "vue";

let app: PIXI.Application;
const canvas = ref<HTMLCanvasElement>();

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
  const maggots: PIXI.Sprite[] = [];

  // Rectangle
  const graphic = new PIXI.Graphics();
  graphic.lineStyle(4, 0xffffff);
  // graphic.beginFill(0xde3249);
  graphic.drawRect(-10, -10, 10, 10);
  graphic.endFill();

  let texture = app.renderer.generateTexture(graphic);
  const dudeBase = new PIXI.Sprite(texture);

  const totalSprites = app.renderer instanceof PIXI.Renderer ? 10000 : 100;

  for (let i = 0; i < totalSprites; i++) {
    // create a new Sprite

    const dude = new PIXI.Sprite(dudeBase.texture);

    // const dude = PIXI.Sprite.from("https://pixijs.com/assets/maggot_tiny.png");

    // set the anchor point so the texture is centerd on the sprite
    dude.anchor.set(0.5);

    // different maggots, different sizes
    dude.scale.set(0.8 + Math.random() * 0.3);

    // scatter them all
    dude.x = Math.random() * app.screen.width;
    dude.y = Math.random() * app.screen.height;

    dude.tint =
      (Math.floor(Math.random() * 0xff) << 16) |
      (Math.floor(Math.random() * 0xff) << 8) |
      Math.floor(Math.random() * 0xff);

    // // create a random direction in radians
    // dude.direction = Math.random() * Math.PI * 2;

    // // this number will be used to modify the direction of the sprite over time
    // dude.turningSpeed = Math.random() - 0.8;

    // // create a random speed between 0 - 2, and these maggots are slooww
    // dude.speed = (2 + Math.random() * 2) * 0.2;

    // dude.offset = Math.random() * 100;

    // finally we push the dude into the maggots array so it it can be easily accessed later
    maggots.push(dude);

    sprites.addChild(dude);
  }

  // create a bounding box box for the little maggots
  const dudeBoundsPadding = 100;
  const dudeBounds = new PIXI.Rectangle(
    -dudeBoundsPadding,
    -dudeBoundsPadding,
    app.screen.width + dudeBoundsPadding * 2,
    app.screen.height + dudeBoundsPadding * 2
  );

  let tick = 0;

  app.ticker.add(() => {
    // iterate through the sprites and update their position
    for (let i = 0; i < maggots.length; i++) {
      const dude = maggots[i];

      // dude.scale.y = 0.95 + Math.sin(tick + dude.offset) * 0.05;
      // dude.direction += dude.turningSpeed * 0.01;
      dude.x += Math.random() - 0.5; // Math.sin(dude.direction) * (dude.speed * dude.scale.y);
      dude.y += Math.random() - 0.5; // Math.cos(dude.direction) * (dude.speed * dude.scale.y);
      // dude.rotation = Math.random(); // -dude.direction + Math.PI;

      // wrap the maggots
      if (dude.x < dudeBounds.x) {
        dude.x += dudeBounds.width;
      } else if (dude.x > dudeBounds.x + dudeBounds.width) {
        dude.x -= dudeBounds.width;
      }

      if (dude.y < dudeBounds.y) {
        dude.y += dudeBounds.height;
      } else if (dude.y > dudeBounds.y + dudeBounds.height) {
        dude.y -= dudeBounds.height;
      }
    }

    // increment the ticker
    tick += 0.1;
  });
});

onUnmounted(() => {
  app.destroy(true);
});
</script>

<template>
  <canvas ref="canvas" class="w-full h-[60vh]"></canvas>
</template>

<style scoped></style>
