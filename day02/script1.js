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

const myMapTable = {
    X: "Rock",
    Y: "Paper",
    Z: "Scissors"
}

const winLoseTable = {
    Rock: {
        Rock: "Draw",
        Paper: "Lose",
        Scissors: "Win"
    },
    Paper: {
        Rock: "Win",
        Paper: "Draw",
        Scissors: "Lose"
    },
    Scissors: {
        Rock: "Lose",
        Paper: "Win",
        Scissors: "Draw"
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

const getRoundScore = (opponent, me) => {
    const opponentValue = opponentMapTable[opponent]
    const myValue = myMapTable[me]
    const matchResult = winLoseTable[myValue][opponentValue]
    return shapeScore[myValue] + matchScore[matchResult]
}

const finalScore = fileLines.reduce((acc, line) => {
    const [opponent, me] = line.split(" ")
    return acc + getRoundScore(opponent, me)
}, 0)

console.log(finalScore)