import { readFileSync } from 'fs';
import { Terminal } from './Teminal.js'
import { FilesSystem } from './FilesSystem.js'

function syncReadFile(filename) {
    const contents = readFileSync(filename, 'utf-8');
    const arr = contents.split(/\r?\n/);
    return arr;
}
  
const fileLines = syncReadFile('./input.txt')

const fileSystem = new FilesSystem()
const terminal = new Terminal(fileSystem)

fileLines.forEach(line => {
    terminal.readLine(line)
})
fileSystem.buildDirectoriesList()

const smallDirectories = fileSystem.getDirectoriesSizeOfAtMost(100000)

const resut = fileSystem.getSizeSum(smallDirectories)

console.log({resut})
