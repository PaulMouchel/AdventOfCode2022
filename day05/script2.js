const { readFileSync } = require('fs');

function syncReadFile(filename) {
    const contents = readFileSync(filename, 'utf-8');
    const arr = contents.split(/\r?\n/);
    return arr;
}
  
const fileLines = syncReadFile('./input.txt')

const splitSchemaAndInstructionsLines = (fileLines) => {
    const index = fileLines.indexOf("")
    const schema = fileLines.slice(0, index)
    const instructions = fileLines.slice(index + 1, fileLines.length)
    return [schema, instructions]
}

const getSchemaLineInArrayForm = (schemaLine) => {
    const returnValue = []
    schemaLine.split("").forEach((letter, index) => {
        if ((index - 3)%4 !== 0) {
            if (returnValue.length === 0 || returnValue[returnValue.length - 1].length >= 3) {
                returnValue.push([letter])
            } else {
                returnValue[returnValue.length - 1].push(letter)
            }
        }
    })
    return returnValue.map(value => value[1] === ' ' ? null : value[1])
}

const getDataFromSchema = (schema) => {
    const lines = schema.map(line => getSchemaLineInArrayForm(line))
    const quantityOfColumns = lines[0].length
    const returnValue = []
    for (let column = 0; column < quantityOfColumns; column++) {
        returnValue.push([])
    } 
    for (let column = 0; column < quantityOfColumns; column++) {
        for (let row = 0; row < lines.length - 1; row++) {
            const value = lines[row][column]
            if (value) returnValue[column].push(value)
        }
    } 
    return returnValue
}

const getDataFromInstructions = (instructions) => {
    return instructions
            .map(line => line.split(" "))
            .map(line => ({move: +line[1], from: +line[3], to: +line[5]}))
}

const playInstructions = (schema, instructions) => {
    instructions.forEach(instruction => {
        const fromColumn = schema[instruction.from - 1]
        const quantity = instruction.move
        const movingCrates = fromColumn.slice(0, quantity)
        const remainingCrates = fromColumn.slice(quantity, fromColumn.length)
        schema[instruction.from - 1] = remainingCrates
        schema[instruction.to - 1] = [...movingCrates, ...schema[instruction.to - 1]]
    })

    return schema
}

const [schema, instructions] = splitSchemaAndInstructionsLines(fileLines)
const schemaData = getDataFromSchema(schema)
const instructionsData = getDataFromInstructions(instructions)

const newSchema = playInstructions(schemaData, instructionsData)

const result = newSchema.map(value => value[0]).join("")


console.log(result)