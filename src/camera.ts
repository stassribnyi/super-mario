import { Vector } from './math.js';

export default class Camera {
    readonly pos = new Vector(0, 0);
    readonly size = new Vector(256, 224);

    constructor(size = new Vector(256, 224)) {
        this.setSize(size.x, size.y);
    }

    setPosition(x: number, y: number): void {
        this.pos.set(x, y);
    }

    setSize(x: number, y: number): void {
        this.size.set(x, y);
    }
}