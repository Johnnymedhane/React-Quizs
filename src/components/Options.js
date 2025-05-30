import { useQuiz } from "../contexts/QuizContext";

function Options({ question }) {
    const { answer, dispatch } = useQuiz();
    const hasAnawer = answer !== null;
    return (
     <div className="options">
            {question.options.map((option, index) => (
                <button
                    className={`btn btn-option ${index === answer ? "answer" : ""}
                    ${hasAnawer ?
                            index === question.correctOption ? "correct" : "wrong"
                            : ""}`}
                    key={option}
                    disabled={hasAnawer}
                    onClick={() => dispatch({ type: "newAnswer", payload: index })}
                >
                        {option}
                    </button>
                ))}
            </div>
    )
}

export default Options
