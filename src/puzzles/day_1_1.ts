// https://adventofcode.com/2023/day/1

// Input

const input = `1abc2
pqr3stu8vwx
a1b2c3d4e5f
treb7uchet`

const output = '142'

// Puzzle

const puzzle: Puzzle = {
    input,
    output,
    
    async iterate (current) {
        const value = current
            .replace(/[^0-9]/g, '')

        return value.charAt(0) + value.charAt(value.length - 1)
    },

    resolve (result) {
        return result
            .map((value) => parseInt(value))
            .reduce((a, b) => a + b, 0)
            .toString()
    }
}

export default puzzle
