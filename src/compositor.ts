export type LayerDrawer = (context: CanvasRenderingContext2D) => void;

export default class Compositor {
    layers: Array<LayerDrawer> = [];

    draw(context: CanvasRenderingContext2D): void {
        this.layers.forEach(layer => layer(context));
    }
}