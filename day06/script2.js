const { readFileSync } = require('fs');

function syncReadFile(filename) {
    const contents = readFileSync(filename, 'utf-8');
    const arr = contents.split(/\r?\n/);
    return arr;
}
  
const fileLines = syncReadFile('./input.txt')

const input = fileLines[0]

let sequence = ""

const allFourCharactersDiferents = (sequence) => {
    if (sequence.length !== 14) return false
    const set = [...new Set(sequence.split(""))]
    return set.length === 14
}

for (let i = 0; i < input.length; i++) {
    if (sequence.length < 14) {
        sequence = sequence + input[i]
    } else {
        sequence = sequence.slice(1, sequence.length) + input[i]
    }
    if (allFourCharactersDiferents(sequence)) {
        console.log(i + 1)
        break;
    }
}

