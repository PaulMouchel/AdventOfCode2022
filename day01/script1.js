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

const max = calories.reduce((acc, val) => {
    return val > acc ? val : acc
}, 0)

console.log(max)