import { useEffect, useState } from 'react'

type UsePuzzlesReturnValue = [ 
    puzzle: Puzzle, 
    result: string, 
    error: string, 
    puzzleId: [ number, number ],
    setPuzzleId: (puzzleId: [ number, number ]) => void,
    setPuzzleInput: (puzzleInput: string) => void,
    timeToCompute: number
]

export function usePuzzles (puzzlePairs: [ Puzzle, Puzzle? ][]): UsePuzzlesReturnValue {
    const [ puzzleId, setPuzzleId ] = useState<[ number, number ]>([ 0, 0 ])
    const [ currentPuzzle, setCurrentPuzzle ] = useState<Puzzle>(puzzlePairs[0][0])
    const [ puzzleInput, setPuzzleInput ] = useState<string>('')
    const [ puzzleResult, setPuzzleResult ] = useState<string>('')
    const [ timeToCompute, setTimeToCompute ] = useState<number>(0)
    const [ error, setError ] = useState<string>('')

    useEffect(() => {
        const [ dayNum, puzzleNum ] = puzzleId
        setPuzzleInput(puzzlePairs[dayNum][puzzleNum]!.input)
        setCurrentPuzzle(puzzlePairs[dayNum][puzzleNum]!)
    }, [ puzzleId ])

    useEffect(() => {
        (async () => {
            const now = performance.now()

            try {
                const lines = puzzleInput
                    .split('\n')
                    .map((line) => line.trim())
                    .filter((line) => !!line)

                const result: string[] = []

                for (let i = 0; i < lines.length; i++) {
                    const value = await currentPuzzle.iterate(lines[i], i, lines, result)
                    result.push(value)
                }

                setError('')
                setPuzzleResult(currentPuzzle.resolve(result))
            } catch (err: any) {
                setError(err.message)
            }
            
            setTimeToCompute(performance.now() - now)
        })()
    }, [ currentPuzzle, puzzleInput ])

    return [
        currentPuzzle,
        puzzleResult,
        error,
        puzzleId,
        setPuzzleId,
        setPuzzleInput,
        timeToCompute,
    ]
}
