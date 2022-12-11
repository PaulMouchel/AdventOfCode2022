import { readFileSync } from 'fs';
import { CPU } from './Cpu.js';

function syncReadFile(filename) {
    const contents = readFileSync(filename, 'utf-8');
    const arr = contents.split(/\r?\n/);
    return arr;
}
  
const fileLines = syncReadFile('./input.txt')

const cpu = new CPU(fileLines)
cpu.executeProgram()

cpu.display()
