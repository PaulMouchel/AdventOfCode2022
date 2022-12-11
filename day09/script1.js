import { readFileSync } from 'fs';
import { Rope } from './Rope.js';

function syncReadFile(filename) {
    const contents = readFileSync(filename, 'utf-8');
    const arr = contents.split(/\r?\n/);
    return arr;
}
  
const fileLines = syncReadFile('./input.txt')

const rope = new Rope()
rope.followInstructions(fileLines)

const resut = rope.tailPositionsHistory.length

console.log({resut})
