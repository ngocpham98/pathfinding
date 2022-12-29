import {Point} from '../core/Components';

/**
 * A simple data structure that keeps track of whether keys have been added to it
 */
export class HashSet
{
    private map: {[key: string]: boolean} = {};

    add(key: string) {
        this.map[key] = true;
    }

    remove(key: string) {
        this.map[key] = false;
    }

    has(key: string) {
        return this.map[key];
    }

    clear() {
        this.map = {};
    }
}

/**
 * A simple data structure that stores a type at a key
 */
export class HashTable<Value>
{
    private map: {[key: string]: Value | undefined} = {};

    add(key: string, data: Value) {
        this.map[key] = data;
    }

    remove(key: string) {
        this.map[key] = undefined;
    }

    get(key: string) {
        return this.map[key];
    }

    has(key: string) {
        return this.map[key] != undefined;
    }

    clear() {
        this.map = {};
    }
}

/**
 * Serialize point into a unique string
 * @param point
 */
export function stringify(point: Point) {
    return 'x' + point.x + 'y' + point.y;
}