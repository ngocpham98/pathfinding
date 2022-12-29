import GridView from './src/view/GridView';
import AlgorithmsSettings from './src/view/AlgorithmsSettings';
import GridHandler from './src/view/GridHandler';
import DraggablePanel from './src/view/DraggablePanel';
import {bindDropDown} from './src/view/AlgorithmsDropDown';

//create the Grid UI and Controller
const size = window.innerWidth;
const mobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i
    .test(navigator.userAgent);
let tilesX = mobile ? round(size/44) : round(size/25);
if(tilesX < 10) {
    tilesX = 10;
} else if(tilesX > 100) {
    tilesX = 100;
}
(document.getElementById('width-slider') as HTMLInputElement).value = String(tilesX);
document.getElementById('width-text')!.innerText = String(tilesX);

//create the grid view
const gridMargins = {
    left: 20,
    right: 20,
    top: document.getElementById('topbar')!.clientHeight +
        document.getElementById('info-margin')!.clientHeight + 5,
    bottom: 0
}
const gridView = new GridView(tilesX, gridMargins, {
    grid: document.getElementById('grid')!,
    bg: document.getElementById('bg')!,
    svg: document.getElementById('svg')!
});

//establish UI interaction and events handlers
const settings = new AlgorithmsSettings({
    
    aStarButton: document.getElementById('a*')!,
    bfsButton: document.getElementById('bfs')!,
    dfsButton: document.getElementById('dfs')!,
    bestFirstButton: document.getElementById('best-first')!,
    algorithmText: document.getElementById('alg-drop-down-text')!,
    manhattanRadio: document.getElementById('manhattan') as HTMLInputElement,
    euclideanRadio: document.getElementById('euclidean') as HTMLInputElement,
    chebyshevRadio: document.getElementById('chebyshev') as HTMLInputElement,
    octileRadio: document.getElementById('octile') as HTMLInputElement,
    diagonalsCheckBox: document.getElementById('diagonals-checkbox') as HTMLInputElement,
    bidirectionalCheckBox: document.getElementById('bidirectional-checkbox') as HTMLInputElement,
    visualizeCheckBox: document.getElementById('alg-visual-checkbox') as HTMLInputElement,
    speedSlider: document.getElementById('speed-slider') as HTMLInputElement,
    speedText: document.getElementById('speed-text')!
});
const draggable = new DraggablePanel({
    openButton: document.getElementById('settings-button')!,
    closeButton: document.getElementById('x-button')!,
    draggable: document.getElementById('draggable')!,
    draggableContent: document.getElementById('draggable-content')!,
    draggableContainer: document.getElementById('draggable-container')!
});
const gridHandler = new GridHandler(gridView, settings, {
    visualizeButton: document.getElementById('go-button')!,
    mazeButton: document.getElementById('maze-button')!,
    timeText: document.getElementById('time')!,
    lengthText: document.getElementById('len')!
});

//bind drop downs
bindDropDown();

//bind algorithms settings
settings.bindButtons();
settings.bindSettings();
settings.bindSlider();

//bind solver and maze generator
gridHandler.bindVisualizeButton()
gridHandler.bindMazeButton();

//make the toolbar draggable
draggable.bindDrag();

//grid view event
gridView.setOnTileDragged(() => {
    if(gridView.isVisualize()) {
        gridView.clearVisualization();
        gridHandler.doPathfinding();
    }
});

//allow for clearing path/grid
document.getElementById('clr-tiles')!.onclick = () => {
    gridHandler.resetGeneration();
    gridHandler.resetVisual();
    gridView.clear();
    gridView.setVisualize(false);
}
document.getElementById('clr-path')!.onclick = () => {
    if(!gridHandler.isGenerating()) {
        gridHandler.resetVisual();
    }
    gridView.clearVisualization();
    gridView.setVisualize(false);
}

//allow for resize grid
const widthSlider = document.getElementById('width-slider')!;
let width = (widthSlider as HTMLInputElement).value;
widthSlider.oninput = () => {
    width = (widthSlider as HTMLInputElement).value;
    document.getElementById('width-text')!.innerText = width;
}

widthSlider.onchange = () => {
    gridHandler.resetGeneration();
    gridHandler.resetVisual();
    gridView.resize(Number.parseInt(width));
}

function round5(x: number) {
    return Math.ceil(x/5)*5;
}

function round(x: number) {
    return Math.round(x);
}