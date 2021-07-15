import { Vector } from './math.js';

export default abstract class Entity {
    pos = new Vector(0, 0);
    vel = new Vector(0, 0);

    abstract update(deltaTime: number): void;
    abstract draw(context: CanvasRenderingContext2D): void;

    setPosition(x: number, y: number): void {
        this.pos.set(x, y);
    }

    setVelocity(x: number, y: number): void {
        this.vel.set(x, y);
    }
}