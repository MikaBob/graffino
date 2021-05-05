class Maze {
    width = 0;
    heigth = 0;
    entry = null;
    exit = null;
    density = 0;

    cells = null;
    path = null;

    constructor(width, height, start, end, density){
        this.width = width;
        this.height= height;
        this.entry = start;
        this.exit = end;
        this.density = density;

        this.path = [];
        this.cells = [this.width];
        for(let i = 0 ; i < this.width; i++){
            this.cells[i] = [this.height];
            for(let j = 0 ; j < this.height; j++){
                this.cells[i][j] = new Cell(i, j);
                if(Math.random() > this.density){
                    this.cells[i][j].type = Cell.TYPE_EMPTY;
                } else {
                    this.cells[i][j].type = Cell.TYPE_BRICK;
                }
            }
        }
        this.cells[this.entry.x][this.entry.y].type = Cell.TYPE_DOOR;
        this.cells[this.exit.x][this.exit.y].type = Cell.TYPE_DOOR;
    }

    draw(){
        for(let i = 0 ; i < this.width; i++){
            for(let j = 0 ; j < this.height; j++){
                this.cells[i][j].draw();
            }
        }
    }

    hasASolution(){
        let unExploredCells = [this.cells[this.entry.x][this.entry.y]],
            solutionFound = false,
            exploredCells = [],
            distance = 0;

        do {
            unExploredCells.forEach((currentCell) => {
                currentCell.distanceFromStart = distance;
                if(currentCell.x === this.exit.x && currentCell.y === this.exit.y){
                    exploredCells.push(currentCell);
                    solutionFound = true;
                }
                if(currentCell.x - 1 >= 0
                    && this.cells[currentCell.x - 1][currentCell.y].type !== Cell.TYPE_BRICK
                    && exploredCells.indexOf(this.cells[currentCell.x - 1][currentCell.y]) === -1
                ) {
                    unExploredCells.push(this.cells[currentCell.x - 1][currentCell.y]);
                }
                if(currentCell.x + 1 < this.width
                    && this.cells[currentCell.x + 1][currentCell.y].type !== Cell.TYPE_BRICK
                    && exploredCells.indexOf(this.cells[currentCell.x + 1][currentCell.y]) === -1
                ) {
                    unExploredCells.push(this.cells[currentCell.x + 1][currentCell.y]);
                }
                if(currentCell.y - 1 >= 0
                    && this.cells[currentCell.x][currentCell.y - 1].type !== Cell.TYPE_BRICK
                    && exploredCells.indexOf(this.cells[currentCell.x][currentCell.y - 1]) === -1
                ) {
                    unExploredCells.push(this.cells[currentCell.x][currentCell.y - 1]);
                }
                if(currentCell.y + 1 < this.height
                    && this.cells[currentCell.x][currentCell.y + 1].type !== Cell.TYPE_BRICK
                    && exploredCells.indexOf(this.cells[currentCell.x][currentCell.y + 1]) === -1
                ) {
                    unExploredCells.push(this.cells[currentCell.x][currentCell.y + 1]);
                }
                if(exploredCells.indexOf(currentCell) === -1)
                    exploredCells.push(currentCell);
                unExploredCells.splice(unExploredCells.indexOf(currentCell), 1);
            });
            distance++;
        } while (unExploredCells.length !== 0 && !solutionFound);

        console.log(exploredCells);
        this.getShortestWay(exploredCells);
        return solutionFound;
    }

    getShortestWay(cells){
        // start from the end
        // loop
        //      look for the adjacent cell that has a distanceFromStart lower than ours.
        //      add to this.path
        // endloop
        this.path = cells;
    }

    static validate(width, height, start, end, density){
        // @Todo validate parameters and return errors
        // 0 < width < MAZE_LIMIT same with height
        // start && end coordinate are valid,
        // etc...
        return true;
    }
}