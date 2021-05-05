class Cell {
    x = 0;
    y = 0;
    type = null;
    distanceFromStart = 0;

    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.type = Cell.TYPE_EMPTY;
    }

    draw(){
        strokeWeight(0);
        fill(color(127, 127, 127));
        square(this.y * Cell.SIZE, this.x * Cell.SIZE, Cell.SIZE);

        if(this.type === Cell.TYPE_EMPTY) {
            fill(color(255, 255, 255));
        } else if (this.type === Cell.TYPE_BRICK) {
            fill(color(0, 0, 0));
        } else if (this.type === Cell.TYPE_PATH) {
            fill(color(0, 255, 0));
        } else if (this.type === Cell.TYPE_BLOCKED) {
            fill(color(255, 0, 0));
        } else if (this.type === Cell.TYPE_DOOR) {
            fill(color(0, 0, 255));
        } else {
            console.error("Unexcpected Cell type: "+this.type);
        }
        // switch x and y because of p5's coordinate system ><
        square(this.y * Cell.SIZE+1, this.x * Cell.SIZE+1, Cell.SIZE-1);
    }

    isEmpty(){
        return this.type === Cell.TYPE_EMPTY;
    }

    static get SIZE() { return 10; }
    static get TYPE_EMPTY() { return 0; }
    static get TYPE_BRICK() { return 1; }
    static get TYPE_PATH() { return 2; }
    static get TYPE_BLOCKED() { return 3; }
    static get TYPE_DOOR() { return 4; }
}