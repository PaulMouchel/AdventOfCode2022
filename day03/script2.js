const { readFileSync } = require('fs');

function syncReadFile(filename) {
    const contents = readFileSync(filename, 'utf-8');
    const arr = contents.split(/\r?\n/);
    return arr;
}
  
const fileLines = syncReadFile('./input.txt')

const getCommonValue = (group) => {
    for (let letter of group[0]) {
        if (group[1].includes(letter) && group[2].includes(letter)) return letter
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

const constituteGroups = (lines) => {
    const groups = []
    lines.forEach(line => {
        if (groups.length === 0 || groups[groups.length - 1].length >= 3) {
            groups.push([line])
        } else {
            groups[groups.length - 1].push(line)
        }
    })
    return groups
}

const finalScore = constituteGroups(fileLines).reduce((acc, group) => {
    const value = getCommonValue(group)
    return acc + getPriority(value)
}, 0)

console.log(finalScore)