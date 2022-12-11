export class Terminal {

    lastInstruction
    fileSystem

    constructor(fileSystem) {
        this.fileSystem = fileSystem
    }

    readLine(line) {
        const splitedLine = line.split(" ")
        if (splitedLine[0] === '$') {
            const [dollar, instruction, args] = splitedLine
            this.command(instruction, args)
        } else {
            const [size, fileName] = splitedLine
            if (size !== 'dir')
                this.result({ size, fileName })
        }
    }

    command(instruction, args) {
        this.lastInstruction = instruction
        
        if (instruction === 'cd') {
            if (args === '..') {
                this.fileSystem.moveOut()
            } else if (args === '/') {
                this.fileSystem.moveTo('/')
            } else {
                this.fileSystem.moveIn(args)
            }
        }
    }

    result({ fileName, size }) {
        if (this.lastInstruction === 'ls') {
            this.fileSystem.indexFile({ fileName, size })
        }
    }
}