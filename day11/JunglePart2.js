import { Round } from "./RoundPart2.js"

export class Jungle {

    monkeys

    constructor(fileLines) {
        const inputsByMonkey = this.splitInputsByMonkey(fileLines)
        const monkeyObjects = this.calculateCommonModulo(this.inputsByMonkeyToObjects(inputsByMonkey))
        
        for (let roundNumber = 1; roundNumber <= 10000; roundNumber++) {
            const round = new Round(monkeyObjects, roundNumber)
            this.monkeys = round.play()
        }
        console.log(this.monkeys.map(o => o.inspectdObjects))
        console.log(this.getmonkeyBusinessLevel(this.monkeys))
        
    }

    getmonkeyBusinessLevel(monkeys) {
        const inspectdObjects = monkeys.map(monkey => monkey.inspectdObjects).sort((a,b) => b - a)
        return inspectdObjects[0] * inspectdObjects[1]
    }

    splitInputsByMonkey(fileLines) {
        const inputs = [[]]
        fileLines.forEach(line => {
            if (line !== "") {
                inputs[inputs.length - 1].push(line)
            } else {
                inputs.push([])
            }
        })
        return inputs
    }

    calculateCommonModulo(monkeyObjects) {
        const divisibles = monkeyObjects.map(o => o.divisibleBy)
        const commonModulo = divisibles.reduce((acc, val) => {
            return acc * val
        }, 1)
        return monkeyObjects.map(o => ({...o, commonModulo}))
    }

    inputsByMonkeyToObjects(inputsByMonkey) {
        return inputsByMonkey.map(monkeyData => {
            return {
                monkeyNumber: +monkeyData[0].split("Monkey ")[1].split(":")[0],
                startingItems: monkeyData[1].split("Starting items: ")[1].split(", ").map(num => +num),
                newEquals: this.getFunction(monkeyData[2].split(" = ")[1]),
                divisibleBy: +monkeyData[3].split("divisible by ")[1],
                ifTrueThrowToMonkey: +monkeyData[4].split("throw to monkey ")[1],
                ifFalseThrowToMonkey: +monkeyData[5].split("throw to monkey ")[1],
                inspectdObjects: 0
            }
        })
    }

    getFunction(operation) {
        const [first, operator, second] = operation.split(" ")

        if (operator === '+') {
            if (first === 'old') {
                if (second === 'old') {
                    //old + old
                    return (old) => old + old
                } else {
                    //old + number
                    return (old) => old + Number(second)
                }
            } else {
                //number + old
                return (old) => Number(first) + old
            }
        } else {
            if (first === 'old') {
                if (second === 'old') {
                    //old * old
                    return (old) => old * old
                } else {
                    //old * number
                    return (old) => old * Number(second)
                }
            } else {
                //number * old
                return (old) => Number(first) * old
            }
        }
    }
}