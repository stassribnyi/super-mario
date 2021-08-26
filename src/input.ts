import Entity from './entity.js'
import KeyboardState, { KeyState } from './keyboard-state.js';
import { Direction } from './traits/index.js';

export const setupKeyboard = (entity: Entity) => {
    const input = new KeyboardState();

    input.addMapping('ArrowUp', (state) => {
        if (state === KeyState.Pressed) {
            entity?.jump.start();

            return;
        }

        entity?.jump.cancel();
    });

    input.addMapping('Space', (state) => {
        if (state === KeyState.Pressed) {
            entity?.jump.start();

            return;
        }

        entity?.jump.cancel();
    });

    input.addMapping('ShiftLeft', (state) => {
        if (state === KeyState.Pressed) {
            entity.run.dragFactor = 1 / 5000;

            return;
        }

        entity.run.dragFactor = 1 / 1000;
    });


    input.addMapping('ArrowLeft', (state) => {
        if (state === KeyState.Pressed) {
            entity?.run.start(Direction.Backward);

            return;
        }

        entity?.run.cancel();

        input.repeatIfPressed(['ArrowRight']);
    });

    input.addMapping('ArrowRight', (state) => {
        if (state === KeyState.Pressed) {
            entity?.run.start(Direction.Forward);

            return;
        }

        entity?.run.cancel();

        input.repeatIfPressed(['ArrowLeft']);
    });

    return input;
}