import PuzzleResult from './components/PuzzleResult'
import { usePuzzles } from './hooks/usePuzzle'

import day_1_1 from './puzzles/day_1_1'
import day_1_2 from './puzzles/day_1_2'

import './App.sass'
import { useEffect, useState } from 'react'

const puzzlePairs: [ Puzzle, Puzzle? ][] = [
    [ day_1_1, day_1_2 ]
]

function App () {
    const [
        puzzle,
        puzzleResult,
        puzzleError,
        puzzleId,
        setPuzzleId,
        setPuzzleInput,
        timeToCompute,
    ] = usePuzzles(puzzlePairs)

    useEffect(() => {
        if (!window.location.hash) return

        const [ day, num ] = window.location.hash
            .replace('#', '')
            .split('.')
            .map((value) => parseInt(value) - 1)

        setPuzzleId([ day, num ])
    }, [])

    const [ inputValue, setInputValue ] = useState('')

    useEffect(() => {
        setInputValue(puzzle.input)
    }, [ puzzle ])

    useEffect(() => {
        setPuzzleInput(inputValue)
    }, [ inputValue ])

    const expectedResultKnown = inputValue === puzzle.input

    return (
        <>
            <aside>
                <header>
                    <small>Jordan Ranson's</small><br />
                    <strong>&lt;advent-of-code-2023&gt;</strong>
                </header>
                <section>
                    <ul>
                        {
                            puzzlePairs.map((_puzzlePair, dayNum) => (
                                <li key={dayNum}>
                                    Day {(dayNum + 1).toString().padStart(2, '0')}
                                    &nbsp;...&nbsp;
                                    <a 
                                        href={`#${dayNum + 1}.1`} 
                                        onClick={() => setPuzzleId([ dayNum, 0 ])}
                                        data-active={puzzleId[0] === dayNum && puzzleId[1] === 0}
                                    >
                                        01
                                    </a>
                                    &nbsp;
                                    <a 
                                        href={`#${dayNum + 1}.2`} 
                                        onClick={() => setPuzzleId([ dayNum, 1 ])}
                                        data-active={puzzleId[0] === dayNum && puzzleId[1] === 1}
                                    >
                                        02
                                    </a>
                                </li>
                            ))
                        }
                    </ul>
                </section>
            </aside>
            <main>
                <header>
                    View Project on&nbsp;
                    <a 
                        href='https://github.com/jordanranson/advent-of-code-2023' 
                        target='_blank' 
                        rel='noopener noreferrer'
                    >
                        GitHub
                    </a>
                </header>
                <section>
                    <h1>Day {puzzleId[0] + 1}, Puzzle {puzzleId[1] + 1}</h1>
                    <div>
                        <PuzzleResult
                            puzzleId={puzzleId}
                            result={puzzleResult}
                            expectedResult={puzzle.output}
                            expectedResultKnown={expectedResultKnown}
                            timeToCompute={timeToCompute}
                            error={puzzleError}
                        />
                    </div>
                    <br />
                    <div>
                        <p><small>Input</small></p>
                        <textarea
                            value={inputValue}
                            onChange={(event) => setInputValue(event.target.value)}
                            data-disabled={expectedResultKnown}
                        />
                    </div>
                </section>
            </main>
        </>
    )
}

export default App
