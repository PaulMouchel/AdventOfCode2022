export class Forest {

    trees
    visibleTrees
    topIndex
    leftIndex
    rightIndex
    bottomIndex

    constructor(fileLines) {
        this.trees = fileLines
        this.visibleTrees = 0
        this.topIndex = 0
        this.leftIndex = 0
        this.rightIndex = fileLines[0].length - 1
        this.bottomIndex = fileLines.length - 1
    }

    countVisibleTrees() {
        this.visibleTrees = 0
        for (let row in this.trees) {
            for (let column in this.trees[row]) {
                if (this.isVisibleTree(row, column)) this.visibleTrees++
            }
        }
    }

    isVisibleTree(row, column) {
        const treeValue = +this.trees[row][column]
        return (
            this.isVisibleFromTop(row, column, treeValue) || 
            this.isVisibleFromLeft(row, column, treeValue) || 
            this.isVisibleFromBottom(row, column, treeValue) || 
            this.isVisibleFromRight(row, column, treeValue)
        )
    }

    isVisibleFromTop(row, column, value) {
        if (+row === this.topIndex) return true
        for (let _row = +row - 1; _row >= this.topIndex; _row--) {
            if (+this.trees[_row][column] >= value) return false
        }
        return true
    }

    isVisibleFromLeft(row, column, value) {
        if (+column === this.leftIndex) return true
        for (let _column = +column - 1; _column >= this.leftIndex; _column--) {
            if (+this.trees[row][_column] >= value) return false
        }
        return true
    }

    isVisibleFromBottom(row, column, value) {
        if (+row === this.bottomIndex) return true
        for (let _row = +row + 1; _row <= this.bottomIndex; _row++) {
            if (+this.trees[_row][column] >= value) return false
        }
        return true
    }

    isVisibleFromRight(row, column, value) {
        if (+column === this.rightIndex) return true
        for (let _column = +column + 1; _column <= this.rightIndex; _column++) {
            if (+this.trees[row][_column] >= value) return false
        }
        return true
    }
}