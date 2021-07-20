import { loadLevel } from './loaders.js';
import Timer from './timer.js';
import { createMario } from './entities.js';
import { setupKeyboard } from './input.js';
// import { setupMouseControl } from './debug.js';

const canvas = document.getElementById('screen') as HTMLCanvasElement;
const context = canvas.getContext('2d');

Promise.all([
    createMario(74, 50),
    loadLevel('1-1')
]).then(([mario, [level, camera]]) => {
    level.entities.add(mario);

    const input = setupKeyboard(mario);
    input.listenTo(window);

    // setupMouseControl(canvas, mario, camera);

    const timer = new Timer();

    timer.setTick((deltaTime) => {
        if (mario.pos.x > 100) {
            camera.pos.x = mario.pos.x - 100;
        }

        level.update(deltaTime);
        level.draw(context, camera);
    });

    timer.start();
}).catch(console.log)