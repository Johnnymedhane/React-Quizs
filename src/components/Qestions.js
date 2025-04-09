
import Options from './Options';

function Qestions({ questions, answer, dispatch }) {
   
  
    return (
        <div>
            <h4 > {questions.question}</h4>
            <Options question={questions}
                answer={answer}
                dispatch={dispatch} />

        </div>
    )
}

export default Qestions
