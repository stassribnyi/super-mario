type TickHandler = (deltaTime: number) => void;

export default class Timer {
    private tick: TickHandler;
    private accumulatedTime = 0;
    private lastTime = 0;

    constructor(private deltaTime: number = 1 / 60) { }

    start() {
        this.enqueue();
    }

    setTick(tick: TickHandler) {
        this.tick = tick;
    }

    private updateProxy = (time: number = 0) => {
        this.accumulatedTime += (time - this.lastTime) / 1000;

        while (this.accumulatedTime > this.deltaTime) {
            this.tick?.(this.deltaTime)
            this.accumulatedTime -= this.deltaTime;
        }

        this.lastTime = time;

        this.enqueue();
    }

    private enqueue() {
        requestAnimationFrame(this.updateProxy);
    }
}