import Camera from './camera.js';
import Entity from './entity.js';

export const setupMouseControl = (canvas: HTMLCanvasElement, entity: Entity, camera: Camera): void => {
    (window as any).camera = camera;

    ['mousedown', 'mousemove'].forEach(eventName => {
        let lastEvent: MouseEvent;
        canvas.addEventListener(eventName, (event: MouseEvent) => {
            if (event.buttons === 1) {
                entity.setVelocity(0, 0);
                entity.setPosition(
                    event.clientX + camera.pos.x,
                    event.clientY + camera.pos.y
                );
            } else if (
                lastEvent
                && lastEvent.type === 'mousemove'
                && lastEvent.buttons === 2
                && event.buttons === 2) {
                camera.setPosition(
                    camera.pos.x - (event.clientX - lastEvent.clientX),
                    camera.pos.y
                );


            }

            lastEvent = event;
        })
    });

    canvas.addEventListener('contextmenu', (event) => event.preventDefault())
}