const { readFileSync } = require('fs');

function syncReadFile(filename) {
    const contents = readFileSync(filename, 'utf-8');
    const arr = contents.split(/\r?\n/);
    return arr;
}
  
const fileLines = syncReadFile('./input.txt')

const getCompartments = (line) => {
    const length = line.length
    const half = length / 2
    const firstHalf = line.slice(0, half)
    const secondHalf = line.slice(half, length)
    return [firstHalf, secondHalf]
}

const getCommonValue = (compartement1, compartment2) => {
    for (let letter of compartement1) {
        if (compartment2.includes(letter)) return letter
    }
}

const isLowerCase = (value) => {
    return value.toLowerCase() === value
}

const getPriority = (value) => {
    if (isLowerCase(value)) {
        return value.charCodeAt(0) - 96
    } 
    return value.charCodeAt(0) - 38
}

const finalScore = fileLines.reduce((acc, line) => {
    const [compartement1, compartment2] = getCompartments(line)
    const value = getCommonValue(compartement1, compartment2)
    return acc + getPriority(value)
}, 0)

console.log(finalScore)