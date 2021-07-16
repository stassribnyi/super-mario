import { loadLevel } from './loaders.js';
import Timer from './timer.js';
import { createMario } from './entities.js';
import { setupKeyboard } from './input.js';

const canvas = document.getElementById('screen') as HTMLCanvasElement;
const context = canvas.getContext('2d');

Promise.all([
    createMario(74, 50),
    loadLevel('1-1')
]).then(([mario, level]) => {
    level.entities.add(mario);

    const input = setupKeyboard(mario);
    input.listenTo(window);

    ['mousedown', 'mousemove'].forEach(eventName => {
        canvas.addEventListener(eventName, (event: MouseEvent) => {
            if (event.buttons === 1) {
                mario.setVelocity(0, 0);
                mario.setPosition(event.clientX, event.clientY);
            }
        })
    })

    const timer = new Timer();

    timer.setTick((deltaTime) => {
        level.update(deltaTime);
        level.draw(context);
    });

    timer.start();
}).catch(console.log)