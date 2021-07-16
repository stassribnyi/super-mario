import { Vector } from './math.js';

export abstract class Trait {
    [key: string]: any;

    constructor(public name: string) { }

    abstract update(entity: Entity, deltaTime: number): void;
}

export default abstract class Entity {
    [key: string]: any;

    private readonly traits = new Map<Trait['name'], Trait>();

    readonly pos = new Vector(0, 0);
    readonly vel = new Vector(0, 0);

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