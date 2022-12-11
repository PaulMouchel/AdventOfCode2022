import { readFileSync } from 'fs';
import { Forest } from './Forest.js';

function syncReadFile(filename) {
    const contents = readFileSync(filename, 'utf-8');
    const arr = contents.split(/\r?\n/);
    return arr;
}
  
const fileLines = syncReadFile('./input.txt')

const forest = new Forest(fileLines)

const resut = forest.getBestScenicScore()

console.log({resut})
