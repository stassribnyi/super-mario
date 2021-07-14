export const loadImage =
    (url: string): Promise<HTMLImageElement> =>
        new Promise(resolve => {
            const image = new Image();

            image.addEventListener('load', () => resolve(image));
            image.src = url;
        });

export const loadLevel =
    (level: string): Promise<{
        backgrounds: Array<{
            tile: string;
            ranges: Array<[number, number, number, number]>
        }>
    }> =>
        fetch(`/public/levels/${level}.json`)
            .then((response) => response.json());
