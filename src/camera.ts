import { Vector } from './math.js';

export default class Camera {
    readonly pos = new Vector(0, 0)

    setPosition(x: number, y: number): void {
        this.pos.set(x, y);
    }
}