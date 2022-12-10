const { readFileSync } = require('fs');

function syncReadFile(filename) {
    const contents = readFileSync(filename, 'utf-8');
    const arr = contents.split(/\r?\n/);
    return arr;
}
  
const fileLines = syncReadFile('./input.txt')

const opponentMapTable = {
    A: "Rock",
    B: "Paper",
    C: "Scissors"
}

const matchResultMapTable = {
    X: "Lose",
    Y: "Draw",
    Z: "Win"
}

const winLoseTable = {
    Rock: {
        Draw: "Rock",
        Win: "Paper",
        Lose: "Scissors"
    },
    Paper: {
        Lose: "Rock",
        Draw: "Paper",
        Win: "Scissors"
    },
    Scissors: {
        Win: "Rock",
        Lose: "Paper",
        Draw: "Scissors"
    }
}

const matchScore = {
    Lose: 0,
    Draw: 3,
    Win: 6
}

const shapeScore = {
    Rock: 1,
    Paper: 2,
    Scissors: 3
}

const getRoundScore = (opponent, matchResult) => {
    const opponentValue = opponentMapTable[opponent]
    const result = matchResultMapTable[matchResult]
    const myValue = winLoseTable[opponentValue][result]
    return shapeScore[myValue] + matchScore[result]
}

const finalScore = fileLines.reduce((acc, line) => {
    const [opponent, me] = line.split(" ")
    return acc + getRoundScore(opponent, me)
}, 0)

console.log(finalScore)