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

const numberWords = [
    'zero',
    'one',
    'two',
    'three',
    'four',
    'five',
    'six',
    'seven',
    'eight',
    'nine',
]

// Puzzle

const puzzle: Puzzle = {
    input,
    output,
    
    async iterate (current) {
        const regexp = new RegExp(`(?=([0-9]|${numberWords.join('|')}))`, 'g')

        const matches = Array.from(
            current.matchAll(regexp),
            value => (
                !!Number(value[1]) 
                    ? value[1] 
                    : numberWords
                        .indexOf(value[1])
                        .toString()
            )
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
