import SquareGrid, {Grid} from '../core/Grid';
import {Point, Tile, TILE_CREATOR, TileType} from '../core/Components';

const LIMIT = 2;

interface Chamber
{
    topLeft: Point; //min
    bottomRight: Point; //max
}

class MazeGenerator
{
    protected grid: Grid;
    protected readonly onDraw: (tile: Tile) => void = (tile) => {};

    constructor(grid: Grid, onDraw?: (tile: Tile) => void) {
        this.grid = grid;
        if(onDraw != undefined) {
            this.onDraw = onDraw;
        }
    }

    /**
     * Performs the recursive division maze generation algorithm on the grid
     * by bisecting parts until the maze can no longer be bisected
     */
    generateMaze() {
        this.fillEmpty()
        for(let x = 0; x < this.grid.getWidth(); x++) {
            this.draw({
                point: {
                    x: x, y: 0
                },
                data: TILE_CREATOR[TileType.Solid]()
            });
        }
        for(let y = 0; y < this.grid.getHeight(); y++) {
            this.draw({
                point: {
                    x: this.grid.getWidth()-1, y: y
                },
                data: TILE_CREATOR[TileType.Solid]()
            });
        }
        for(let x = this.grid.getWidth()-1; x >= 0; x--) {
            this.draw({
                point: {
                    x: x, y: this.grid.getHeight()-1
                },
                data: TILE_CREATOR[TileType.Solid]()
            });
        }
        for(let y = this.grid.getHeight()-1; y >= 0; y--) {
            this.draw({
                point: {
                    x: 0, y: y
                },
                data: TILE_CREATOR[TileType.Solid]()
            });
        }
        this.divide({
            topLeft: {
                x: 1, y: 1
            },
            bottomRight: {
                x: this.grid.getWidth()-2,
                y: this.grid.getHeight()-2
            },
        });
    }

    /**
     * Draws a list of tiles to the grid
     * @param tiles
     */
    private drawArr(tiles: Tile[]) {
        for(let tile of tiles) {
            this.draw(tile);
        }
    }

    /**
     * Draws a tile to the grid
     * @param tile
     */
    private draw(tile: Tile) {
        this.grid.mutateTile(tile);
        this.onDraw(tile);
    }

    /**
     * Create a line between a region, with an open hole, in a chamber,
     * and call bisection algorithm on it, and call division algorithms on
     * its split chambers until no chambers can be bisected
     * @param chamber
     */
    divide(chamber: Chamber) {
        const width = widthOf(chamber);
        const height = heightOf(chamber);
        const min = chamber.topLeft;
        const max = chamber.bottomRight;
        if(divideWidth(width,height)) {
            if(width > LIMIT) {
                //calculate axis
                const randY = getRand(
                    min.y, max.y,
                );
                const randX = getMidPoint(
                    min.x, max.x
                );
                //create axis wall
                const toDraw: Tile[] = [];
                for(let y = min.y; y <= max.y; y++) {
                    toDraw.push({
                        point: {
                            x: randX, y: y
                        },
                        data: TILE_CREATOR[TileType.Solid]()
                    });
                }
                //create holes in axis wall
                let edgeBlocked = false;
                if(!this.grid.get({
                    x: randX, y: min.y-1
                }).data.isSolid) {
                    toDraw.push({
                        point: {
                            x: randX, y: min.y
                        },
                        data: TILE_CREATOR[TileType.Empty]()
                    });
                    edgeBlocked = true;
                }
                if(!this.grid.get({
                    x: randX, y: max.y+1
                }).data.isSolid) {
                    toDraw.push({
                        point: {
                            x: randX, y: max.y
                        },
                        data: TILE_CREATOR[TileType.Empty]()
                    });
                    edgeBlocked = true;
                }
                if(!edgeBlocked) {
                    toDraw.push({
                        point: {
                            x: randX, y: randY
                        },
                        data: TILE_CREATOR[TileType.Empty]()
                    });
                }
                this.drawArr(toDraw);
                //create children chambers and recurse
                const leftChamber = {
                    topLeft: chamber.topLeft,
                    bottomRight: {
                        x: randX-1,
                        y: chamber.bottomRight.y
                    },
                };
                const rightChamber = {
                    topLeft: {
                        x: randX+1,
                        y: chamber.topLeft.y
                    },
                    bottomRight: chamber.bottomRight,
                };
                this.divide(leftChamber);
                this.divide(rightChamber);
            }
        } else {
            if(height > LIMIT) {
                //calculate axis
                const randX = getRand(
                    min.x, max.x,
                );
                const randY = getMidPoint(
                    min.y, max.y
                );
                //draw axis wall
                const toDraw: Tile[] = [];
                for(let x = min.x; x <= max.x; x++) {
                    toDraw.push({
                        point: {
                            x: x, y: randY
                        },
                        data: TILE_CREATOR[TileType.Solid]()
                    });
                }
                //create holes in axis wall
                let edgeBlocked = false;
                if(!this.grid.get({
                    x: min.x-1, y: randY
                }).data.isSolid) {
                    toDraw.push({
                        point: {
                            x: min.x, y: randY
                        },
                        data: TILE_CREATOR[TileType.Empty]()
                    });
                    edgeBlocked = true;
                }
                if(!this.grid.get({
                    x: max.x+1, y: randY
                }).data.isSolid) {
                    toDraw.push({
                        point: {
                            x: max.x, y: randY
                        },
                        data: TILE_CREATOR[TileType.Empty]()
                    });
                    edgeBlocked = true;
                }
                if(!edgeBlocked) {
                    toDraw.push({
                        point: {
                            x: randX, y: randY
                        },
                        data: TILE_CREATOR[TileType.Empty]()
                    });
                }
                this.drawArr(toDraw);
                //create children chambers and recurse
                const topChamber = {
                    topLeft: chamber.topLeft,
                    bottomRight: {
                        x: chamber.bottomRight.x,
                        y: randY-1
                    },
                };
                const bottomChamber = {
                    topLeft: {
                        x: chamber.topLeft.x,
                        y: randY+1
                    },
                    bottomRight: chamber.bottomRight,
                };
                this.divide(topChamber);
                this.divide(bottomChamber);
            }
        }
    }

    /**
     * Fill a maze to be empty
     */
    fillEmpty() {
        for(let i = 0; i < this.grid.getWidth(); i++) {
            for(let j = 0; j < this.grid.getHeight(); j++) {
                this.grid.mutateTile({
                    point: {
                        x: i, y: j
                    },
                    data: TILE_CREATOR[TileType.Empty]()
                });
            }
        }
    }
}

function divideWidth(width: number, height: number) {
    return width >= height;
}

function widthOf(chamber: Chamber) {
    return chamber.bottomRight.x - chamber.topLeft.x + 1;
}

function heightOf(chamber: Chamber) {
    return chamber.bottomRight.y - chamber.topLeft.y + 1;
}

/**
 * Returns the 'midpoint' to be used
 * @param min
 * @param max
 */
function getMidPoint(min: number, max: number) {
    const range = max - min;
    if(range >= 20) {
        return ((min+max)/2) >> 0;
    } else if(range > 5) {
        const mid = ((min+max)/2) >> 0;
        const points = [mid, mid+1];
        return points[getRand(0,points.length-1)];
    } else {
        return getRand(min+1,max-1);
    }
}

/**
 * Generate a random number between min and max-1 then increment the number
 * if it is larger than or equal to excluded, inclusive for min and max
 * @param min
 * @param max
 * @param excluded
 */
function getRandEx(min: number, max: number, excluded: number) {
    let rand = getRand(min, max-1);
    return rand >= excluded ? ++rand : rand;
}

/**
 * Generate a random number between min and max, inclusive for min and max
 * @param min
 * @param max
 */
function getRand(min: number, max: number) {
    return Math.floor(Math.random() * (max+1-min) + min);
}

export default MazeGenerator;