import { loadLevel } from './loaders.js';
import Timer from './timer.js';
import { createMario } from './entities.js';
import { setupKeyboard } from './input.js';
import Camera from './camera.js';
import { setupMouseControl } from './debug.js';

const canvas = document.getElementById('screen') as HTMLCanvasElement;
const context = canvas.getContext('2d');

Promise.all([
    createMario(74, 50),
    loadLevel('1-1')
]).then(([mario, [level, camera]]) => {
    level.entities.add(mario);

    const input = setupKeyboard(mario);
    input.listenTo(window);

    setupMouseControl(canvas, mario, camera);

    const timer = new Timer();

    timer.setTick((deltaTime) => {
        // camera.pos.x = mario.pos.x - Math.floor(camera.size.x / 2);
        level.update(deltaTime);
        level.draw(context, camera);
    });

    timer.start();
}).catch(console.log)