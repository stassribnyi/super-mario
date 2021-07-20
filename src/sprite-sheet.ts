import { Animation } from './animation.js';

export default class SpriteSheet {
    private readonly tiles = new Map<string, [HTMLCanvasElement, HTMLCanvasElement]>();
    private readonly animations = new Map<string, Animation>();

    constructor(
        private image: HTMLImageElement,
        private width: number = 0,
        private height: number = 0
    ) { }

    getAnimation(name: string): undefined | Animation {
        return this.animations.get(name);
    }

    define(name: string, x: number, y: number, width: number, height: number): void {
        const bufferTypes = [false, true] as const;

        const buffers = bufferTypes.map(isMirrored => {
            const buffer = document.createElement('canvas');

            buffer.width = width;
            buffer.height = height;
            const context = buffer.getContext('2d');

            if (isMirrored) {
                context.scale(-1, 1);
                context.translate(-width, 0);
            }

            context.drawImage(
                this.image,
                x, y,
                width, height,
                0, 0,
                width, height
            );

            return buffer;
        }) as [HTMLCanvasElement, HTMLCanvasElement];

        this.tiles.set(name, buffers);
    }

    defineAnimation(name: string, animation: (distance: number) => string) {
        this.animations.set(name, animation);
    }

    defineTile(name: string, x: number, y: number): void {
        this.define(name, x * this.width, y * this.height, this.width, this.height)
    }

    draw(
        name: string,
        context: CanvasRenderingContext2D,
        x: number,
        y: number,
        isMirrored: boolean = false
    ): void {
        const bufferIndex = isMirrored ? 1 : 0;
        const buffer = this.tiles.get(name)[bufferIndex];

        context.drawImage(buffer, x, y)
    }

    drawAnimation(
        name: string,
        context: CanvasRenderingContext2D,
        x: number,
        y: number,
        duration: number
    ): void {
        const animation = this.animations.get(name);

        this.drawTile(animation(duration), context, x, y);
    }

    drawTile(
        name: string,
        context: CanvasRenderingContext2D,
        x: number,
        y: number,
        isMirrored: boolean = false
    ): void {
        this.draw(name, context, x * this.width, y * this.height, isMirrored);
    }

    hasAnimation(name: string): boolean {
        return this.animations.has(name);
    }
}