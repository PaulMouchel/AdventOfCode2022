import { readFileSync } from 'fs';
import { Jungle } from './Jungle.js';

function syncReadFile(filename) {
    const contents = readFileSync(filename, 'utf-8');
    const arr = contents.split(/\r?\n/);
    return arr;
}
  
const fileLines = syncReadFile('./input.txt')

const jungle = new Jungle(fileLines)

const result = ""

console.log({result})
