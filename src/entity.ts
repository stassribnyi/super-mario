import { Vector } from './math.js';

export enum ObstructSide {
    Top = 'top',
    Right = 'right',
    Bottom = 'bottom',
    Left = 'left'
}

export abstract class Trait {
    [key: string]: any;

    protected obstructHandler: (side: ObstructSide) => void;

    constructor(public name: string) { }

    abstract update(entity: Entity, deltaTime: number): void;

    obstruct(side: ObstructSide): void {
        this.obstructHandler?.(side);
    }
}

export default abstract class Entity {
    [key: string]: any;

    private readonly traits = new Map<Trait['name'], Trait>();

    readonly pos = new Vector(0, 0);
    readonly vel = new Vector(0, 0);
    readonly size = new Vector(0, 0);

    abstract draw(context: CanvasRenderingContext2D): void;

    addTrait(trait: Trait): void {
        this.traits.set(trait.name, trait)
        this[trait.name] = trait;
    }

    obstruct(side: ObstructSide): void {
        this.traits.forEach(trait => trait.obstruct(side));
    }

    setPosition(x: number, y: number): void {
        this.pos.set(x, y);
    }

    setVelocity(x: number, y: number): void {
        this.vel.set(x, y);
    }

    setSize(x: number, y: number): void {
        this.size.set(x, y);
    }

    update(deltaTime: number): void {
        this.traits.forEach(trait => trait.update(this, deltaTime))
    }
}