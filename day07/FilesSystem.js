export class FilesSystem {

    currentPath
    files
    directories

    constructor() {
        this.files = []
        this.currentPath = ""
        this.directories = []
    }

    moveOut() {
        const lastIndex = this.currentPath.slice(0, -1).lastIndexOf("/")
        this.currentPath = this.currentPath.slice(0, lastIndex + 1)
    }

    moveIn(target) {
        this.currentPath += `${target}/`
    }

    moveTo(target) {
        this.currentPath = target
    }

    indexFile({ fileName, size }) {
        const file = this.files.find(file => file.fileName === fileName && file.path === this.currentPath)
        if (!file) {
            this.files.push({
                fileName,
                size,
                path: this.currentPath
            })
        }
    }

    buildDirectoriesList() {
        this.directories = [...new Set(this.files.map(file => file.path))].map(directory => this.getDirectorySize(directory))
    }

    getDirectorySize(path) {
        const filesList = this.files.filter(file => file.path.startsWith(path))
        const totalSize = filesList.reduce((acc, val) => {
            return acc + +val.size
        }, 0)
        return { directory: path, size: totalSize }
    }

    getDirectoriesSizeOfAtMost(maxSize) {
        return this.directories.filter(directory => directory.size <= maxSize)
    }

    getSizeSum(directories) {
        return directories.reduce((acc, val) => {
            return acc + val.size
        }, 0)
    }
}