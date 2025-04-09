

function NextQuestion({ dispatch, answer, numQustions, index }) {
    if (answer === null) return null;
    if(index < numQustions - 1) 
    return (
        <div>
            <button className="btn btn-ui" onClick={() => dispatch({ type: "nextQuestion" })}>
                Next
            </button>
        </div>
        )
    if (index === numQustions - 1)
        return(
            <div>
                <button className="btn btn-ui" onClick={() => dispatch({ type: "finish" })}>
                    Finish
                </button>
            </div>
        )
}

export default NextQuestion
