export class CPU {

    instructions
    register
    cycle
    history

    constructor(instructions) {
        this.register = 1
        this.instructions = instructions.map(instruction => instruction.split(" "))
        this.cycle = 1
        this.history = []
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
            this.cycle++
        } else if (command === 'addx') {
            const value = +arg
            this.historize()
            this.cycle++
            this.historize()
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

    getSignalStrength(cycle) {
        const registerValue = this.history.find(entry => entry.cycle === cycle).register
        return cycle * registerValue
    }
}