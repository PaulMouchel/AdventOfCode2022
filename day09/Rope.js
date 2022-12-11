export class Rope {

    start
    headPosition
    tailPosition
    tailPositionsHistory

    constructor() {
        this.start = { x: 0, y: 0}
        this.headPosition = { x: 0, y: 0}
        this.tailPosition = { x: 0, y: 0}
        this.tailPositionsHistory = [ {...this.tailPosition} ]
    }

    followInstructions(fileLines) {
        fileLines.forEach(line => {
            this.followInstruction(line)
        });
    }

    followInstruction(line) {
        const [direction, quantity] = line.split(" ")
        for (let times = 0; times < quantity; times++) {
            this.moveHead(direction)
        }
    }

    moveHead(direction) {
        switch(direction) {
            case 'U':
                this.moveUp()
                break;
            case 'R':
                this.moveRight()
                break;
            case 'D':
                this.moveDown()
                break;
            case 'L':
                this.moveLeft()
                break;
        }
    }

    moveUp() {
        this.headPosition.y += 1
        if (this.isTailTooFar()) {
            this.tailPosition.x = this.headPosition.x
            this.tailPosition.y = this.headPosition.y - 1
            this.historize(this.tailPosition)
        }
    }

    moveRight() {
        this.headPosition.x += 1
        if (this.isTailTooFar()) {
            this.tailPosition.x = this.headPosition.x - 1
            this.tailPosition.y = this.headPosition.y
            this.historize(this.tailPosition)
        }
    }

    moveDown() {
        this.headPosition.y -= 1
        if (this.isTailTooFar()) {
            this.tailPosition.x = this.headPosition.x
            this.tailPosition.y = this.headPosition.y + 1
            this.historize(this.tailPosition)
        }
    }

    moveLeft() {
        this.headPosition.x -= 1
        if (this.isTailTooFar()) {
            this.tailPosition.x = this.headPosition.x + 1
            this.tailPosition.y = this.headPosition.y
            this.historize(this.tailPosition)
        }
    }

    isTailTooFar() {
        const deltaX = Math.abs(this.headPosition.x - this.tailPosition.x)
        const deltaY = Math.abs(this.headPosition.y - this.tailPosition.y)
        return deltaX > 1 || deltaY > 1
    }

    historize(tailPosition) {
        const position = this.tailPositionsHistory.find(position => position.x === tailPosition.x && position.y === tailPosition.y)
        if (!position) {
            this.tailPositionsHistory.push({...tailPosition})
        }
    }
}