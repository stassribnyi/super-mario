import { Vector } from './math.js';

export abstract class Trait {
    [key: string]: any;

    constructor(public name: string) { }

    abstract update(entity: Entity, deltaTime: number): void;
}

export default abstract class Entity {
    [key: string]: any;

    private traits = new Map<Trait['name'], Trait>();

    pos = new Vector(0, 0);
    vel = new Vector(0, 0);

    abstract draw(context: CanvasRenderingContext2D): void;

    addTrait(trait: Trait): void {
        this.traits.set(trait.name, trait)
        this[trait.name] = trait;
    }

    setPosition(x: number, y: number): void {
        this.pos.set(x, y);
    }

    setVelocity(x: number, y: number): void {
        this.vel.set(x, y);
    }

    update(deltaTime: number): void {
        this.traits.forEach(trait => trait.update(this, deltaTime))
    }
}