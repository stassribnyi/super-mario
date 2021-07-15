import { createBackgroundLayer, createSpriteLayer } from './layouts.js';
import { loadLevel } from './loaders.js';
import { loadBackgroundSprites } from './sprites.js';
import Compositor from './compositor.js';
import Timer from './timer.js';
import Keyboard, { KeyState } from './keyboard-state.js';
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

    const gravity = 2000;

    mario.setPosition(74, 50);

    const input = new Keyboard();
    input.listenTo(window);
    input.addMapping('Space', (state) => {
        if (state === KeyState.Pressed) {
            mario.jump.start();
        } else {
            mario.jump.cancel();
        }
    })

    const timer = new Timer();

    timer.setTick((deltaTime) => {
        mario.update(deltaTime);
        compositor.draw(context);
        mario.vel.y += gravity * deltaTime;
    });

    timer.start();
}).catch(console.log)