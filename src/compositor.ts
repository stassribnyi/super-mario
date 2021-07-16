export type LayerDrawer = (context: CanvasRenderingContext2D) => void;

export default class Compositor {
    private readonly layers = new Set<LayerDrawer>();

    addLayer(layer: LayerDrawer) {
        this.layers.add(layer);
    }

    removeLayer(layer: LayerDrawer) {
        this.layers.delete(layer);
    }

    draw(context: CanvasRenderingContext2D): void {
        this.layers.forEach(layer => layer(context));
    }
}