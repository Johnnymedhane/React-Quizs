function
    
    FinishedQuiz({points, maxPossiblePoints, highScore, dispatch}) {
    const avgScore = (points / maxPossiblePoints) * 100
    let emoji;
    if (avgScore === 100) emoji = '🎖️'
    if (avgScore >= 80 && avgScore < 100)  emoji = '🎉'
    if (avgScore >= 50 && avgScore < 80) emoji = '😊'
    if (avgScore >= 0 && avgScore < 50) emoji = '🤔'
    if (avgScore === 0) emoji = '🤦‍♀️'

    return (
        <>
        <p className="result">
            <span>{emoji}</span>   You Scored <strong>{points}</strong> out of {maxPossiblePoints}   ({Math.ceil(avgScore)}%)
        </p>
            <p className="highscore"> (Highscore: {highScore} points )
            </p>
            
            <button className="btn btn-ui" onClick={() => dispatch({ type: "restart" })}> 
                Restart Quiz
            </button>
            {/* <button className="btn btn-ui" onClick={() => window.location.reload()}> 
                Restart Quiz
            </button> */}
    
      </>
    )
}

export default FinishedQuiz
