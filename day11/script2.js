import { readFileSync } from 'fs';
import { Jungle } from './JunglePart2.js';

function syncReadFile(filename) {
    const contents = readFileSync(filename, 'utf-8');
    const arr = contents.split(/\r?\n/);
    return arr;
}
  
const fileLines = syncReadFile('./input.txt')

new Jungle(fileLines)