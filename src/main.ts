import { createBackgroundLayer, createSpriteLayer, Position } from './layouts.js';
import { loadLevel } from './loaders.js';
import { loadBackgroundSprites, loadMarioSprites } from './sprites.js';
import Compositor from './compositor.js';

const canvas = document.getElementById('screen') as HTMLCanvasElement;
const context = canvas.getContext('2d');

Promise.all([
    loadBackgroundSprites(),
    loadMarioSprites(),
    loadLevel('1-1')
]).then(([bgSprites, marioSprite, { backgrounds }]) => {
    const backgroundLayer = createBackgroundLayer(backgrounds, bgSprites);

    const compositor = new Compositor();
    compositor.layers.push(backgroundLayer);

    const pos: Position = {
        x: 64,
        y: 64
    }

    const spriteLayer = createSpriteLayer(marioSprite, pos);
    compositor.layers.push(spriteLayer);

    const update = () => {
        compositor.draw(context);
        pos.x += 2;
        pos.y += 2;
        requestAnimationFrame(update);
    }

    update();
}).catch(console.log)