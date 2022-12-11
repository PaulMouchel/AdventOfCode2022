export class CPU {

    instructions
    register
    cycle
    history
    screen

    constructor(instructions) {
        this.register = 1
        this.instructions = instructions.map(instruction => instruction.split(" "))
        this.cycle = 1
        this.history = []
        this.screen = [
            new Array(40),
            new Array(40),
            new Array(40),
            new Array(40),
            new Array(40),
            new Array(40)
        ]
    }

    executeProgram() {
        this.instructions.forEach(instruction => {
            this.readInstruction(instruction)
        })
    }

    readInstruction(instruction) {
        const [command, arg] = instruction
        if (command === 'noop') {
            this.historize()
            this.draw()
            this.cycle++
        } else if (command === 'addx') {
            const value = +arg
            this.historize()
            this.draw()
            this.cycle++
            this.historize()
            this.draw()
            this.cycle++
            this.register += value
        }
    }

    historize() {
        this.history.push({
            cycle: this.cycle,
            register: this.register
        })
    }

    draw() {
        const row = Math.trunc((this.cycle - 1) / 40)
        const column = (this.cycle - 1) % 40
        const sprite = this.getSprite()
        this.screen[row][column] =sprite[column]
    }

    getSprite() {
        let emptySprite = ".........." + ".........." + ".........." + ".........."
        const begin = emptySprite.slice(0, this.register - 1)
        const end = emptySprite.slice(this.register + 2, 40)
        return begin + "###" + end
    }

    display() {
        this.screen.forEach(line => {
            console.log(line.join(""))
        })
    }

    getSignalStrength(cycle) {
        const registerValue = this.history.find(entry => entry.cycle === cycle).register
        return cycle * registerValue
    }
}