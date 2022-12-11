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



const result = cpu.getSignalStrength(20) + cpu.getSignalStrength(60) + cpu.getSignalStrength(100) + cpu.getSignalStrength(140) + cpu.getSignalStrength(180) + cpu.getSignalStrength(220)



console.log({result})
