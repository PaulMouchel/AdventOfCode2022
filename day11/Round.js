export class Round {

    monkeysData
    roundNumber

    constructor(monkeysData, roundNumber) {
        this.monkeysData = monkeysData
        this.roundNumber = roundNumber
    }

    play() {
        this.monkeysData.forEach(monkey => {
            this.playMonkey(monkey)
        })
        console.log("END OF ROUND " + this.roundNumber)
        this.monkeysData.forEach(monkey => {
            console.log("Monkey " + monkey.monkeyNumber + ": " + monkey.startingItems.join(", "))
        })
        return this.monkeysData
    }

    playMonkey(monkey) {
        console.log("Monkey " + monkey.monkeyNumber)
        monkey.startingItems.forEach(item => {
            console.log("Monkey inspects an item with a worry level of  " + item)
            monkey.inspectdObjects++
            console.log("Old worry level : " + item)
            item = monkey.newEquals(item)
            console.log("New worry level : " + item)
            item = Math.trunc(item / 3)
            console.log("Monkey gets bored with item. Worry level is divided by 3 to " + item)
            if (item % monkey.divisibleBy === 0) {
                console.log("Current worry level is divisible by " + monkey.divisibleBy)
                this.monkeysData[monkey.ifTrueThrowToMonkey].startingItems.push(item)
                console.log("Item with worry level " + item + " is thrown to monkey " + monkey.ifTrueThrowToMonkey)
            } else {
                console.log("Current worry level is not divisible by " + monkey.divisibleBy)
                this.monkeysData[monkey.ifFalseThrowToMonkey].startingItems.push(item)
                console.log("Item with worry level " + item + " is thrown to monkey " + monkey.ifFalseThrowToMonkey)
            }
        })
        monkey.startingItems = []
    }
}