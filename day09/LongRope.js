import { Point } from "./Point.js"

export class LongRope {

    positions
    tailPositionsHistory

    constructor(lenght) {
        this.positions = []
        const startPosition = { x: 0, y: 0}
        for (let i = 0; i < lenght; i++) {
            this.positions.push(
                new Point({...startPosition})
            )
        }
        for (let i = 1; i < lenght; i++) {
            this.positions[i].previousPoint = this.positions[i - 1]
        }
        for (let i = 0; i < lenght - 1; i++) {
            this.positions[i].nextPoint = this.positions[i + 1]
        }
        
        this.tailPositionsHistory = [ {...startPosition} ]
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
            this.historize(this.positions[this.positions.length - 1])
        }
        
    }

    moveHead(direction) {
        switch(direction) {
            case 'U':
                this.positions[0].moveUp()
                break;
            case 'R':
                this.positions[0].moveRight()
                break;
            case 'D':
                this.positions[0].moveDown()
                break;
            case 'L':
                this.positions[0].moveLeft()
                break;
        }
        this.positions[0].nextPointFollowing()
    }

    historize(tailPosition) {
        const position = this.tailPositionsHistory.find(position => position.x === tailPosition.position.x && position.y === tailPosition.position.y)
        if (!position) {
            this.tailPositionsHistory.push({...tailPosition.position})
        }
    }
}