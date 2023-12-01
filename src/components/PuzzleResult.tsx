import { HTMLAttributes } from 'react'

import './PuzzleResult.sass'

interface PuzzleResultProps extends HTMLAttributes<HTMLDivElement> {
    puzzleId: [ number, number ]
    result: string
    expectedResult: string
    expectedResultKnown: boolean
    timeToCompute: number
    error?: string
}

export default function (props: PuzzleResultProps) {
    return (
        <div className='PuzzleResult'>
            {
                props.error
                    ? (
                        <>
                            <small>Error</small>
                            <br />
                            <p>{props.error}</p>
                        </>
                    )
                    : (
                        props.expectedResultKnown
                            ? (
                                <>
                                    {
                                        props.result === props.expectedResult
                                            ? <small className='--success'>Expected Result</small>
                                            : <small className='--error'>Unexpected Result</small>
                                    }                                
                                    <br />
                                    <div>
                                        <p>
                                            expected<br />
                                            <span>= <strong>{props.expectedResult}</strong></span>
                                        </p>
                                        <p>
                                            output<br />
                                            <span>= <strong>{props.result}</strong></span>
                                        </p>
                                    </div>
                                </>
                            )
                            : (
                                <>
                                    <small className='--warning'>Unknown Result</small>
                                    <br />
                                    <div>
                                        <p>
                                            output<br />
                                            <span>= <strong>{props.result}</strong></span>
                                        </p>
                                    </div>
                                </>
                            )
                    )
            }
            <footer>
                <a 
                    href={`https://github.com/jordanranson/advent-of-code-2023/blob/main/src/puzzles/day_${props.puzzleId[0] + 1}_${props.puzzleId[1] + 1}.ts`}
                    target='_blank'
                    rel='noopener noreferrer'
                >
                    View Solution
                </a>
                <aside>
                    computed in {props.timeToCompute}ms
                </aside>
            </footer>
        </div>
    )
}
