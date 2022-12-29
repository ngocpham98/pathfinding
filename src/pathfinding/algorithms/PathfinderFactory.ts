import Navigator from '../core/Navigator';
import PlusNavigator from '../core/PlusNavigator';
import AsteriskNavigator from '../core/AsteriskNavigator';
import {Point} from '../core/Components';
import {Grid} from '../core/Grid';
import {chebyshev, euclidean, HeuristicFunc, manhattan, nullHeuristic, octile} from './Heuristics';
import Pathfinder from './Pathfinder';
import AStarPathfinder from './AStar';
import BFSPathfinder from './BFS';
import DFSPathfinder from './DFS';
import BiAStarPathfinder from './BidirectionalAStar';
import BiBFSPathfinder from "./BidirectionalBFS";

const CREATE_NAVIGATOR: {[key: string]: ((grid: Grid) => Navigator)} = {
    'plus': (grid: Grid) => new PlusNavigator(grid),
    'asterisk': (grid: Grid) => new AsteriskNavigator(grid)
}

const CREATE_HEURISTIC: {[key: string]: (() => HeuristicFunc)} = {
    'manhattan': () => (a,b) => {
        return manhattan(a,b);
    },
    'euclidean': () => (a,b) => {
        return euclidean(a,b);
    },
    'chebyshev': () => (a,b) => {
        return chebyshev(a,b);
    },
    'octile': () => (a,b) => {
        return octile(a,b);
    },
    'null': () => (a,b) => {
        return nullHeuristic(a,b);
    }
}

const CREATE_PATHFINDER: {[key: string]: ((navigator: Navigator, heuristic: HeuristicFunc) => Pathfinder)} = {
    'dijkstra': (navigator) => {
        return new AStarPathfinder(navigator, (a,b) => {
            return nullHeuristic(a,b);
        });
    },
    'best-first': (navigator, heuristic) => {
        return new (class BestFirst extends AStarPathfinder {
            stepCost(currentPoint: Point, neighborPoint: Point) {
                return 0;
            }
        })(navigator, heuristic);
    },
    'a*': (navigator, heuristic) => {
        return new AStarPathfinder(navigator, heuristic);
    },
    'bfs': (navigator) => {
        return new BFSPathfinder(navigator);
    },
    'dfs': (navigator) => {
        return new DFSPathfinder(navigator);
    },
    'bi-a*': (navigator, heuristic) => {
        return new BiAStarPathfinder(navigator, heuristic);
    },
    'bi-dijkstra': (navigator) => {
        return new BiAStarPathfinder(navigator, (a,b) => {
            return nullHeuristic(a,b);
        });
    },
    'bi-bfs': (navigator) => {
        return new BiBFSPathfinder(navigator);
    }
}

class PathfinderFactory
{
    static usesHeuristic(algorithm: string) {
        return algorithm == 'a*' || algorithm == 'bi-a*' || algorithm == 'best-first';
    }

    static hasBidirectional(algorithm: string) {
        return CREATE_PATHFINDER['bi-' + algorithm] != null;
    }

    static getBidirectional(algorithm: string) {
        return 'bi-' + algorithm;
    }

    /**
     * Creates a pathfinder with a navigator with the right algorithm and heuristic
     * @param navigator
     * @param algorithm
     * @param heuristic
     */
    static getInstance(navigator: Navigator, algorithm: string, heuristic?: string) {
        const heuristicKey = heuristic != undefined ? heuristic : 'null';
        const createHeuristic = CREATE_HEURISTIC[heuristicKey.toLowerCase()];
        if(createHeuristic == null) {
            throw new Error('No such heuristic function exists')
        }
        const createPathfinder = CREATE_PATHFINDER[algorithm.toLowerCase()];
        if(createPathfinder == null) {
            throw new Error('No such algorithms algorithm exists')
        }
        return createPathfinder(navigator, createHeuristic());
    }

    /**
     * Creates a navigator from grid and navigator key
     * @param grid
     * @param key
     */
    static getNavigator(grid: Grid, key: string) {
        const createNavigator = CREATE_NAVIGATOR[key.toLowerCase()];
        if(createNavigator == null) {
            throw new Error('No such navigator pattern exists')
        }
        return createNavigator(grid);
    }
}

export default PathfinderFactory;

