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

const isIn = (value, pair) => {
    return value >= pair[0] && value <= pair[1]
}

const onePairOverlapTheOther = (pair1, pair2) => {
    if (isIn(pair1[0], pair2)) return true
    if (isIn(pair1[1], pair2)) return true
    if (isIn(pair2[0], pair1)) return true
    if (isIn(pair2[1], pair1)) return true
    return false
}

const finalScore = fileLines.reduce((acc, line) => {
    const [pair1, pair2] = getPairs(line)
    return onePairOverlapTheOther(pair1, pair2) ? acc + 1 : acc
}, 0)

console.log(finalScore)