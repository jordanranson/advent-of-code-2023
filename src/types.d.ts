interface Puzzle {
    input: string
    output: string
    iterate: (current: string, iteration: number, lines: string[], result: string[]) => Promise<string>
    resolve: (result: string[]) => string
}
