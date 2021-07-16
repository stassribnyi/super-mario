import { loadLevel } from './loaders.js';
import Timer from './timer.js';
import Keyboard, { KeyState } from './keyboard-state.js';
import { createMario } from './entities.js';

const canvas = document.getElementById('screen') as HTMLCanvasElement;
const context = canvas.getContext('2d');

Promise.all([
    createMario(),
    loadLevel('1-1')
]).then(([mario, level]) => {
    level.entities.add(mario);

    const gravity = 2000;

    mario.setPosition(74, 50);

    const input = new Keyboard();
    input.listenTo(window);
    input.addMapping('ArrowUp', (state) => {
        if (state === KeyState.Pressed) {
            mario.jump.start();
        } else {
            mario.jump.cancel();
        }
    });

    input.addMapping('ArrowLeft', (state) => {
        if (state === KeyState.Pressed) {
            mario.run.start('backward');
        } else {
            mario.run.cancel();
        }
    });

    input.addMapping('ArrowRight', (state) => {
        if (state === KeyState.Pressed) {
            mario.run.start('forward');
        } else {
            mario.run.cancel();
        }
    });

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
        mario.setVelocity(mario.vel.x, mario.vel.y + gravity * deltaTime);
    });

    timer.start();
}).catch(console.log)