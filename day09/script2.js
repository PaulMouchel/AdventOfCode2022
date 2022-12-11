import { readFileSync } from 'fs';
import { LongRope } from './LongRope.js';

function syncReadFile(filename) {
    const contents = readFileSync(filename, 'utf-8');
    const arr = contents.split(/\r?\n/);
    return arr;
}
  
const fileLines = syncReadFile('./input.txt')

const rope = new LongRope(10)
rope.followInstructions(fileLines)

const result = rope.tailPositionsHistory.length

console.log({result})
