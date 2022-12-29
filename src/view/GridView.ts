import SquareGrid, {Grid} from '../pathfinding/core/Grid';
import {createTile, Point, Tile, TileType} from '../pathfinding/core/Components';
import {Node} from '../pathfinding/algorithms/Node';

const SOLID_COLOR = 'rgb(45, 48, 54)';

const COLOR_MAPPING: {[key in TileType]: string} = {
    [TileType.Empty]: 'transparent',
    [TileType.Solid]: SOLID_COLOR
}

const BORDER_MAPPING: {[key in TileType]: string} = {
    [TileType.Empty]: 'rgb(122, 164, 188)',
    [TileType.Solid]: SOLID_COLOR
}

const CLOSED_NODE = 'rgb(198, 237, 238)';
const OPEN_NODE = 'rgb(191, 248, 159)';
const EMPTY_NODE = 'white';
const INITIAL_COLOR = 'rgb(131, 217, 52)';
const GOAL_COLOR = 'rgb(203, 75, 14)';
const LINE_COLOR = 'black';

export const TILE_CLASS = 'tile';
export const BUFFER_CLASS = 'buffer';

const NULL_POINT =  {
    x: -1, y: -1
};

/**
 * Represents a GridView UI Set.
 */
export interface GridViewUI
{
    readonly bg: HTMLElement;
    readonly grid: HTMLElement;
    readonly svg: HTMLElement;
}

/**
 * Represents margins for the GridView
 */
export interface Margins
{
    readonly top: number;
    readonly bottom: number;
    readonly left: number;
    readonly right: number;
}

/**
 * A class that creates a grid, controls it, and creates a viewport for it on the browser
 */
class GridView
{
    private viewUI: GridViewUI;
    private margins: Margins;

    private gridTiles!: HTMLDivElement[][];
    private bgTiles!: HTMLDivElement[][];
    private grid!: Grid;

    private initial!: Point;
    private goal!: Point;

    private lastPoint: Point = NULL_POINT;
    private goalTile: TileType;

    private pointerTile: TileType;
    private disable!: boolean;
    private mouseDown0!: boolean;
    private mouseDown2!: boolean;
    private draggingInitial!: boolean;
    private draggingGoal!: boolean;

    private tilesX: number;
    private tilesY!: number;
    private tileWidth!: number;

    private onTilesDragged: () => void = () => {};
    private isVisualized!: boolean;

    constructor(tilesX: number, margins: Margins, viewUI: GridViewUI) {
        this.margins = margins;
        this.viewUI = viewUI;
        //initialize tile mouse pointer will create
        this.pointerTile = TileType.Solid;
        //create grid viewpoint and link it to grid in memory
        this.tilesX = tilesX;
        this.init();
        this.goalTile = this.getTileType(this.goal);
    }

    private initMouse() {
        this.disable = false;
        this.mouseDown0 = false;
        this.mouseDown2 = false;
        this.draggingInitial = false;
        this.draggingGoal = false;
    }

    /**
     * Initializes the grid view to a specific number of tiles on X axis
     */
    private init() {
        this.setVisualize(false);
        this.initMouse();
        //set up grid
        const grid = this.viewUI.grid;
        const width = (window.innerWidth) - this.margins.left - this.margins.right;
        grid.style.width = String(width) + 'px';
        this.tileWidth = roundStep(width/this.tilesX, 0.2);
        this.tilesY = Math.floor(((window.innerHeight - this.margins.top - this.margins.bottom))/this.tileWidth);
        this.grid = new SquareGrid(this.tilesX, this.tilesY);
        //set up grid bg
        const bg = this.viewUI.bg;
        bg.style.width = String(width) + 'px';
        //create grids and arrays
        this.gridTiles = this.makeTiles(grid, 'transparent');
        this.bgTiles = this.makeTiles(bg, 'white');
        //initialize the positions of initial and goal tiles and render
        this.initial = {
            x: ((this.tilesX-1)/3) >> 0, y: ((this.tilesY-1)/3) >> 0
        }
        this.goal = {
            x: (2*(this.tilesX-1)/3) >> 0, y: (2*(this.tilesY-1)/3) >> 0
        }
        this.renderPoints();
        //create svg canvas
        const svg = this.viewUI.svg;
        svg.style.width = String(width + this.margins.right) + 'px';
        //set mouse listeners
        this.bindListeners(svg);
        this.bindMobileListeners(svg);
    }

    getInitial() {
        return this.initial;
    }

    getGoal() {
        return this.goal;
    }

    getGrid() {
        return this.grid;
    }

    setPointer(type: TileType) {
        this.pointerTile = type;
    }

    setOnTileDragged(onTileDragged: () => void) {
        this.onTilesDragged = onTileDragged;
    }

    isVisualize() {
        return this.isVisualized;
    }

    setVisualize(visual: boolean) {
        this.isVisualized = visual;
    }

    /**
     * Creates colored tiles on the grid html element an returns references to them in an array
     * @param grid
     * @param color
     */
    private makeTiles(grid: HTMLElement, color: string) {
        const tiles = [];
        for(let y = 0; y < this.tilesY; y++) {
            let htmlTilesRow: HTMLDivElement[] = [];
            for(let x = 0; x < this.tilesX; x++) {
                const tile = createTileDiv(
                    this.tileWidth,
                    { x: x, y: y },
                    color
                );
                const top = y * this.tileWidth;
                const left = x * this.tileWidth;
                tile.style.top = top + 'px';
                tile.style.left = left + 'px';
                htmlTilesRow.push(tile);
                grid.appendChild(tile);
            }
            tiles.push(htmlTilesRow);
        }
        for(let x = 0; x < this.tilesX; x++) {
            tiles[this.tilesY-1][x].style.borderBottomWidth = '1px';
        }
        for(let y = 0; y < this.tilesY; y++) {
            tiles[y][this.tilesX-1].style.borderRightWidth = '1px';
        }
        return tiles;
    }

    /**
     * Bind all listeners to a specified HtmlElement
     * @param element
     */
    private bindListeners(element: HTMLElement) {
        element.addEventListener('contextmenu', e =>
            e.preventDefault()
        );
        element.addEventListener('mousedown', e => {
            e.preventDefault();
            let bounds = element.getBoundingClientRect();
            this.onPress(e.clientX - bounds.left, e.clientY - bounds.top, e.button);
        });
        element.addEventListener('mouseup', e => {
            e.preventDefault();
            if(e.button == 0) {
                this.draggingGoal = false;
                this.draggingInitial = false;
                this.mouseDown0 = false;
            } else if(e.button == 2) {
                this.mouseDown2 = false;
            }
            this.lastPoint = NULL_POINT;
        });
        element.addEventListener('mousemove', e => {
            let bounds = element.getBoundingClientRect();
            this.onDrag(e.clientX - bounds.left, e.clientY - bounds.top);
        });
        element.addEventListener('mouseleave', e => {
            e.preventDefault();
            this.draggingGoal = false;
            this.draggingInitial = false;
            this.mouseDown0 = false;
            this.mouseDown2 = false;
            this.lastPoint = NULL_POINT;
        });
    }

    /**
     * Bind all listeners for mobile devices to a specified HtmlElement
     * @param element
     */
    private bindMobileListeners(element: HTMLElement) {
        element.addEventListener('touchstart', e => {
            const touch = e.touches[0] || e.changedTouches[0];
            e.preventDefault();
            const bounds = element.getBoundingClientRect();
            this.onTouch(touch.clientX - bounds.left, touch.clientY - bounds.top);
        });
        element.addEventListener('touchend', e => {
            e.preventDefault();
            this.draggingGoal = false;
            this.draggingInitial = false;
            this.mouseDown0 = false;
            this.mouseDown2 = false;
            this.lastPoint = NULL_POINT;
        });
        element.addEventListener('touchmove', e => {
            const touch = e.touches[0] || e.changedTouches[0];
            const bounds = element.getBoundingClientRect();
            this.onDrag(touch.clientX - bounds.left, touch.clientY - bounds.top);
        }, true);
        element.addEventListener('touchcancel', e => {
            e.preventDefault();
            this.draggingGoal = false;
            this.draggingInitial = false;
            this.mouseDown0 = false;
            this.mouseDown2 = false;
            this.lastPoint = NULL_POINT;
        });
    }

    /**
     * Re-renders the initial and goal points onto the grid, needs to be called whenever
     * the points are changed
     */
    private renderPoints() {
        this.gridTiles[this.initial.y][this.initial.x].style.backgroundColor
            = INITIAL_COLOR;
        this.gridTiles[this.goal.y][this.goal.x].style.backgroundColor
            = GOAL_COLOR;
    }

    /**
     * Converts real screen x,y coordinates into
     * a 2d point position on the grid
     * @param xCoordinate
     * @param yCoordinate
     */
    private calculatePoint(xCoordinate: number, yCoordinate: number) {
        return {
            x: Math.floor(xCoordinate/this.tileWidth),
            y: Math.floor(yCoordinate/this.tileWidth)
        }
    }

    /**
     * Convert 2d position on grid to real screen coordinates
     * @param point
     */
    private calculateCoordinate(point: Point) {
        return {
            x: point.x * this.tileWidth + this.tileWidth/2,
            y: point.y * this.tileWidth + this.tileWidth/2
        }
    }

    /**
     * Checks if a node is visualized on UI (open or closed)
     * @param point
     */
    private isVisualizedNode(point: Point) {
        return this.isClosedNode(point) || this.isOpenNode(point);
    }

    /**
     * Checks if a node is closed on UI
     * @param point
     */
    private isClosedNode(point: Point) {
        return this.bgTiles[point.y][point.x].style.backgroundColor === CLOSED_NODE;
    }

    /**
     * Checks if a node is open on UI
     * @param point
     */
    private isOpenNode(point: Point) {
        return this.bgTiles[point.y][point.x].style.backgroundColor === OPEN_NODE;
    }

    /**
     * Checks if a node is visualized, then changes the tile to empty if it isn't
     * @param point
     */
    private erasePoint(point: Point) {
        this.mutateTile(point,TileType.Empty);
    }

    /**
     * Responds to the event thrown at screen coordinates on press
     * @param xCoordinate
     * @param yCoordinate
     * @param button
     */
    private onPress(xCoordinate: number, yCoordinate: number, button: number) {
        const point = this.calculatePoint(xCoordinate,yCoordinate);
        this.lastPoint = point;
        if(button == 0) {
            this.mouseDown0 = true;
            if(pointsEqual(point,this.initial)) {
                this.draggingInitial = true;
            } else if(pointsEqual(point,this.goal)) {
                this.draggingGoal = true;
            } else if(!this.disable) {
                this.mutateTile(point,this.pointerTile);
            }
        } else if(button == 2) {
            this.mouseDown2 = true;
            if(!pointsEqual(point,this.initial) && !pointsEqual(point,this.goal) && !this.disable) {
                this.erasePoint(point);
            }
        }
    }

    /**
     * Responds to the event thrown at screen coordinates on touch
     * @param xCoordinate
     * @param yCoordinate
     */
    private onTouch(xCoordinate: number, yCoordinate: number) {
        const point = this.calculatePoint(xCoordinate,yCoordinate);
        this.lastPoint = point;
        if(pointsEqual(point,this.initial)) {
            this.mouseDown0 = true;
            this.draggingInitial = true;
        } else if(pointsEqual(point,this.goal)) {
            this.mouseDown0 = true;
            this.draggingGoal = true;
        } else if(!this.grid.get(point).data.isSolid) {
            this.mouseDown0 = true;
            if(!this.disable) {
                this.mutateTile(point,this.pointerTile);
            }
        } else {
            this.mouseDown2 = true;
            if(!pointsEqual(point,this.initial) && !pointsEqual(point,this.goal) && !this.disable) {
                this.erasePoint(point);
            }
        }
    }

    /**
     * Responds to the event thrown at screen coordinates on drag/move
     * @param xCoordinate
     * @param yCoordinate
     */
    private onDrag(xCoordinate: number, yCoordinate: number) {
        const point = this.calculatePoint(xCoordinate,yCoordinate);
        if(pointsEqual(point, this.lastPoint)) {
            return;
        }
        this.lastPoint = point;
        if(this.mouseDown0) {
            if(this.draggingInitial) {
                this.moveInitial(point);
                this.onTilesDragged();
            } else if(this.draggingGoal) {
                this.moveGoal(point);
                this.onTilesDragged();
            } else if(!pointsEqual(point,this.initial) && !pointsEqual(point,this.goal) && !this.disable) {
                this.mutateTile(point,this.pointerTile);
            }
        } else if(this.mouseDown2) {
            if(!pointsEqual(point,this.initial) && !pointsEqual(point,this.goal) && !this.disable) {
                this.erasePoint(point);
            }
        }
    }

    /**
     * Moves initial to a new point
     * @param point
     */
    moveInitial(point: Point) {
        if(this.grid.inBounds(point) && !pointsEqual(this.goal, point)  && !this.disable) {
            this.mutateTile(this.initial, this.getTileType(this.initial));
            this.gridTiles[point.y][point.x].style.borderColor
                = BORDER_MAPPING[TileType.Empty];
            this.gridTiles[point.y][point.x].style.backgroundColor
                = INITIAL_COLOR;
            this.initial = point;
        }
    }

    /**
     * Moves goal to a new point
     * @param point
     */
    moveGoal(point: Point) {
        if(this.grid.inBounds(point) && !pointsEqual(this.initial, point) && !this.disable) {
            this.mutateTile(this.goal, this.goalTile);
            this.goalTile = this.getTileType(point);
            this.mutateTile(point, TileType.Empty);
            this.gridTiles[point.y][point.x].style.backgroundColor
                = GOAL_COLOR;
            this.goal = point;
        }
    }

    /**
     * Gets the tile type (solid or not) at a position
     */
    getTileType(point: Point) {
        return this.grid.get(point).data.isSolid ? TileType.Solid : TileType.Empty;
    }

    /**
     * Mutates a tile at a given point, to a tile type
     * @param point
     * @param t
     */
    mutateTile(point: Point, t: TileType) {
        if(this.grid.inBounds(point)) {
            this.grid.mutate(
                point, createTile(t)
            );
            this.gridTiles[point.y][point.x].style.backgroundColor
                = COLOR_MAPPING[t];
            this.gridTiles[point.y][point.x].style.borderColor
                = BORDER_MAPPING[t];
        }
    }

    /**
     * Clear the grid's tiles and background visualization
     */
    clear() {
        for(let y = 0; y < this.tilesY; y++) {
            for(let x = 0; x < this.tilesX; x++) {
                const point = {
                    x: x, y: y
                }
                this.mutateTile(point, TileType.Empty);
            }
        }
        this.moveInitial(this.initial);
        this.moveGoal(this.goal);
        this.goalTile = this.getTileType(this.goal);
        this.clearVisualization();
    }

    /**
     * Draw lines through point
     * @param tiles to draw through
     */
    drawLines(tiles: Tile[]) {
        const svg = this.viewUI.svg;
        tiles.unshift(this.grid.get(this.initial));
        for(let i = 0; i < tiles.length-1; i++) {
            const first = tiles[i].point;
            const second = tiles[i+1].point;
            const line = createLine(this.calculateCoordinate(first),
                this.calculateCoordinate(second));
            svg.appendChild(line);
        }
    }

    /**
     * Visualizes the opening of a point
     * @param point
     */
    visualizeOpenPoint(point: Point) {
        if(!pointsEqual(point,this.initial) && !pointsEqual(point,this.goal)) {
            this.bgTiles[point.y][point.x].style.backgroundColor =
                OPEN_NODE;
        }
    }

    /**
     * Visualizes the closing of a point (green)
     * @param point
     */
    visualizeClosedPoint(point: Point) {
        if(!pointsEqual(point,this.initial) && !pointsEqual(point,this.goal)) {
            this.bgTiles[point.y][point.x].style.backgroundColor =
                CLOSED_NODE;
        }
    }

    /**
     * Visualizes the generation of open nodes
     * @param nodes
     */
    visualizeGeneration(nodes: Node[]) {
        for(let node of nodes) {
            this.visualizeOpenPoint(node.tile.point);
        }
    }

    /**
     * Visualizes the closure of a node
     * @param node
     */
    visualizeClosedNode(node: Node) {
        this.visualizeClosedPoint(node.tile.point);
    }

    /**
     * Removes all visualized tiles
     */
    clearVisualization() {
        for(let y = 0; y < this.tilesY; y++) {
            for (let x = 0; x < this.tilesX; x++) {
                this.bgTiles[y][x].style.backgroundColor =
                    EMPTY_NODE;
            }
        }
        this.clearSvg();
    }

    /**
     * Clears all lines from the grid viewport
     */
    clearSvg() {
        const svg = this.viewUI.svg;
        while (svg.hasChildNodes()) {
            svg.removeChild(svg.lastChild!);
        }
    }

    /**
     * Disables/Enables all button listeners
     */
    toggleDisable() {
        this.disable = !this.disable;
    }

    /**
     * Disables/Enables all button listeners
     */
    enabled() {
        this.disable = false;
    }

    /**
     * Disables/Enables all button listeners
     */
    disabled() {
        this.disable = true;
    }

    /**
     * Completely remove the grid viewport
     */
    delete() {
        clearElements(this.viewUI.grid);
        clearElements(this.viewUI.bg);
        this.clearSvg();
    }

    /**
     * Resizes grid to specified number of tilesX
     * @param tilesX
     */
    resize(tilesX: number) {
        this.delete();
        this.tilesX = tilesX;
        this.init();
    }
}

function pointsEqual(point1: Point, point2: Point) {
    return point1.x == point2.x && point1.y == point2.y;
}

/**
 * Clear all child elements from parent element
 * @param element
 */
function clearElements(element: HTMLElement) {
    while (element.hasChildNodes()) {
        element.removeChild(element.lastChild!);
    }
}

/**
 * Create an svg line element from coordinate1 to coordinate2
 * @param coordinate1
 * @param coordinate2
 */
function createLine(coordinate1: {x: number, y: number}, coordinate2: {x: number, y: number}) {
    let line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line.setAttributeNS(null,'x1', String(coordinate1.x));
    line.setAttributeNS(null,'y1', String(coordinate1.y));
    line.setAttributeNS(null,'x2', String(coordinate2.x));
    line.setAttributeNS(null,'y2', String(coordinate2.y));
    line.setAttributeNS(null,'style', 'stroke:' + LINE_COLOR + ';stroke-width:2');
    line.setAttributeNS(null,'class', 'line');
    return line;
}

/**
 * Creates a tile to be rendered in the DOM
 * @param width of the side of the tile
 * @param point tile is linked to
 * @param color
 */
function createTileDiv(width: number, point: Point, color: string) {
    const tile = document.createElement('div');
    tile.className = TILE_CLASS;
    tile.style.backgroundColor = color;
    tile.style.width = String(width) + 'px';
    tile.style.height = String(width) + 'px';
    return tile;
}

function round(x: number) {
    return +(x).toFixed(1);
}

function roundStep(value: number, step: number) {
    step || (step = 1.0);
    const inv = 1.0 / step;
    return Math.round(value * inv) / inv;
}

export default GridView;