import Entity from './entity.js'
import KeyboardState, { KeyState } from './keyboard-state.js';

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

    input.addMapping('ArrowLeft', (state) => {
        if (state === KeyState.Pressed) {
            entity?.run.start('backward');

            return;
        }

        entity?.run.cancel();
    });

    input.addMapping('ArrowRight', (state) => {
        if (state === KeyState.Pressed) {
            entity?.run.start('forward');

            return;
        }

        entity?.run.cancel();
    });

    return input;
}