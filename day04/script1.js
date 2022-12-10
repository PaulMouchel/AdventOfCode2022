const { readFileSync } = require('fs');

function syncReadFile(filename) {
    const contents = readFileSync(filename, 'utf-8');
    const arr = contents.split(/\r?\n/);
    return arr;
}
  
const fileLines = syncReadFile('./input.txt')

const getPairs = (line) => {
    const pairs = line.split(",")
    return pairs.map(pair => pair.split("-").map(value => +value))
}

const onePairContainsTheOther = (pair1, pair2) => {
    if (pair1[0] <= pair2[0] && pair1[1] >= pair2[1]) return true
    if (pair1[0] >= pair2[0] && pair1[1] <= pair2[1]) return true
    return false
}

const finalScore = fileLines.reduce((acc, line) => {
    const [pair1, pair2] = getPairs(line)
    return onePairContainsTheOther(pair1, pair2) ? acc + 1 : acc
}, 0)

console.log(finalScore)