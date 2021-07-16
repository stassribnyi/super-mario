export default class SpriteSheet {
    private readonly tiles = new Map<string, HTMLCanvasElement>();

    constructor(private image: HTMLImageElement, private width: number, private height: number) { }

    define(name: string, x: number, y: number, width: number, height: number): void {
        const buffer = document.createElement('canvas');

        buffer.width = width;
        buffer.height = height;
        buffer
            .getContext('2d')
            .drawImage(
                this.image,
                x, y,
                width, height,
                0, 0,
                width, height
            );

        this.tiles.set(name, buffer);
    }

    defineTile(name: string, x: number, y: number): void {
        this.define(name, x * this.width, y * this.height, this.width, this.height)
    }

    draw(name: string, context: CanvasRenderingContext2D, x: number, y: number): void {
        const buffer = this.tiles.get(name);

        context.drawImage(buffer, x, y)
    }

    drawTile(name: string, context: CanvasRenderingContext2D, x: number, y: number): void {
        this.draw(name, context, x * this.width, y * this.height);
    }
}