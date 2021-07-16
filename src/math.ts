type MatrixForEachHandler<T> = (x: number, y: number, value: T) => void;

export class Matrix<T> {
    readonly grid: Array<Array<T>> = [];

    set(x: number, y: number, value: T): void {
        if (!this.grid[x]) {
            this.grid[x] = [];
        }

        this.grid[x][y] = value;
    }

    get(x: number, y: number): T | undefined {
        const column = this.grid[x];

        if (!column) {
            return;
        }

        return column[y];
    }

    forEach(callback: MatrixForEachHandler<T>): void {
        this.grid.forEach((column, x) =>
            column.forEach((value, y) =>
                callback(x, y, value)
            )
        )
    }
}

export class Vector {
    constructor(public x: number, public y: number) { }

    set(x: number, y: number) {
        this.x = x;
        this.y = y;
    }
}