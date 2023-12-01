// https://adventofcode.com/2023/day/1

// Input

const input = `two1nine
eightwothree
abcone2threexyz
xtwone3four
4nineeightseven2
zoneight234
7pqrstsixteen`

const output = '281'

// Utilities

const wordNumberMap: Record<string, string> = {
    'one': '1',
    'two': '2',
    'three': '3',
    'four': '4',
    'five': '5',
    'six': '6',
    'seven': '7',
    'eight': '8',
    'nine': '9',
}

// Puzzle

const puzzle: Puzzle = {
    input,
    output,
    
    async iterate (current) {
        const regexp = new RegExp(`(?=([0-9]|${Object.keys(wordNumberMap).join('|')}))`, 'g')

        const matches = Array.from(
            current.matchAll(regexp),
            value => wordNumberMap[value[1]] as string || value[1]
        )

        return matches[0] + matches[matches.length - 1]
    },

    resolve (result) {
        return result
            .map((value) => parseInt(value))
            .reduce((a, b) => a + b, 0)
            .toString()
    }
}

export default puzzle
