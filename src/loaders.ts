export type BackgroundRange = [number, number, number, number];

export interface Background {
    readonly tile: string;
    readonly ranges: Array<BackgroundRange>
}
export interface Level {
    readonly backgrounds: Array<Background>
}

export const loadImage =
    (url: string): Promise<HTMLImageElement> =>
        new Promise(resolve => {
            const image = new Image();

            image.addEventListener('load', () => resolve(image));
            image.src = url;
        });

export const loadLevel =
    (level: string): Promise<Level> =>
        fetch(`/public/levels/${level}.json`)
            .then((response) => response.json());
