const { readFileSync } = require('fs');

function syncReadFile(filename) {
    const contents = readFileSync(filename, 'utf-8');
    const arr = contents.split(/\r?\n/);
    return arr;
}
  
const fileLines = syncReadFile('./input.txt')

const calories = fileLines.join("+").split("++").map(value => {
    return value.split("+").reduce((acc, val) => {
        return acc + Number(val)
    }, 0)
})

const top3 = calories.sort((a, b) => b - a).slice(0, 3)

const result = top3.reduce((acc, val) => acc + val, 0)

console.log(result)