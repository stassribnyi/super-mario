import { createBackgroundLayer, createSpriteLayer } from './layouts.js';
import { loadLevel } from './loaders.js';
import { loadBackgroundSprites } from './sprites.js';
import Compositor from './compositor.js';
import Timer from './timer.js';
import { createMario } from './entities.js';

const canvas = document.getElementById('screen') as HTMLCanvasElement;
const context = canvas.getContext('2d');


Promise.all([
    loadBackgroundSprites(),
    createMario(),
    loadLevel('1-1')
]).then(([bgSprites, mario, { backgrounds }]) => {
    const backgroundLayer = createBackgroundLayer(backgrounds, bgSprites);
    const spriteLayer = createSpriteLayer(mario);

    const compositor = new Compositor();
    compositor.addLayer(backgroundLayer);
    compositor.addLayer(spriteLayer);

    const gravity = 30;

    mario.setPosition(64, 160);
    mario.setVelocity(200, -600);

    const timer = new Timer();

    timer.setTick((deltaTime) => {
        compositor.draw(context);
        mario.update(deltaTime);
        mario.vel.y += gravity;
    });

    timer.start();
}).catch(console.log)