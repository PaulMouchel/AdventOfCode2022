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
        // console.log("END OF ROUND " + this.roundNumber)

        return this.monkeysData
    }

    playMonkey(monkey) {
        monkey.startingItems.forEach(item => {
            monkey.inspectdObjects++
            item = item % monkey.commonModulo
            item = monkey.newEquals(item)

            // console.log("New worry level : " + item)
            if (item % monkey.divisibleBy === 0) {
                this.monkeysData[monkey.ifTrueThrowToMonkey].startingItems.push(item)
            } else {
                this.monkeysData[monkey.ifFalseThrowToMonkey].startingItems.push(item)
            }
        })
        monkey.startingItems = []
    }
}