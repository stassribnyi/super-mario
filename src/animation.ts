export type Animation = (distance: number) => string
export type CreateAnimation = (frames: Array<string>, frameLength: number) => Animation

export const createAnimation: CreateAnimation = (frames, frameLength) => (distance) => {
    const frameIndex = Math.floor((distance / frameLength) % frames.length);

    return frames[frameIndex];
}
