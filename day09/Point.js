export class Point {

    position
    previousPoint
    nextPoint

    constructor(position) {
        this.position = position
    }

    moveUp() {
        this.position.y += 1
    }

    moveRight() {
        this.position.x += 1
    }

    moveDown() {
        this.position.y -= 1
    }

    moveLeft() {
        this.position.x -= 1
    }

    nextPointFollowing() {
        if (this.nextPoint) {
            this.nextPoint.follow(this)
        }
    }

    follow(previousPoint) {
        if (this.isTooFar(previousPoint)) {
            const deltaX = previousPoint.position.x - this.position.x
            const deltaY = previousPoint.position.y - this.position.y

            if (deltaX > 0) this.moveRight()
            if (deltaX < 0) this.moveLeft()
            if (deltaY > 0) this.moveUp()
            if (deltaY < 0) this.moveDown()

            this.nextPointFollowing()
        }
    }

    isTooFar(previousPoint) {
        const deltaX = Math.abs(this.position.x - previousPoint.position.x)
        const deltaY = Math.abs(this.position.y - previousPoint.position.y)
        return deltaX > 1 || deltaY > 1
    }
    
}