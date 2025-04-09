import { useEffect, useReducer } from "react";
import Header from "./Header";
import Main from "./main";
import Loader from "./Loader";
import Error from "./Error";
import { StartScreen } from "./startScreen";
import Qestions from "./Qestions";
import NextQuestion from "./NextQuestion";
import Progress from "./Progress";
import FinishScreen from "./FinishScreen";
import TimeCounter from "./TimeCounter";
import Footer from "./Footer";

const SECS_PER_QUESTION = 20;

const initialState = {
  questions: [],
  // 'loading', 'error', 'ready', 'active', 'finished'
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  highScore: 0,
  time: null,

};


function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      return {
        ...state,
        questions: action.payload,
        status: "ready",
      };
    case "start":
      return {
        ...state,
        status: "active",
        time: state.questions.length * SECS_PER_QUESTION,
      };
    case "newAnswer":
      const question = state.questions.at(state.index);

      return {
        ...state,
        answer: action.payload,
        points: question.correctOption === action.payload ? state.points + question.points : state.points,
      };
    case "nextQuestion":
      return {
        ...state,
        index: state.index + 1,
        answer: null,
      };
    case "decreaseTime":
      return {
        ...state,
        time: state.time - 1,
        status: state.time === 0 ? "finished" : state.status,

      };
    case "finish":
      return {
        ...state,
        status: "finished",
        highScore: state.points > state.highScore ? state.points : state.highScore,
      };
    case "restart":
      return {
        ...initialState,
        status: "ready",
        questions: state.questions,
      }
      // return {
      //   ...state,
      //   status: "ready",
      //   index: 0,
      //   answer: null,
      //   points: 0,
      //   highScore: 0,
      // };
    case "dataFailed":
      return {
        ...state,
        status: "error",
      };
   
    default:
      throw new Error("Unknown action type");
  }
}

export default function App() { 



  const [{ questions, status, index, answer, points, highScore, time  }, dispatch] = useReducer(reducer, initialState);
  const numQuestions = questions.length;
  const maxProssiblePoints = questions.reduce((prev, curr) => prev + curr.points, 0); 
  


  useEffect(function () {
    fetch('http://localhost:9000/questions')
      .then(res => res.json())
      .then(data => dispatch({ type: 'dataReceived', payload: data }))
      .catch(err =>dispatch({ type: 'dataFailed' }))
  }, [])


  return (
    <div className="app">
      <Header />
      <Main>
       {status === 'loading' && <Loader />}
       {status === 'error' && <Error />}
        {status === 'ready' && <StartScreen numQuestions={numQuestions}
          dispatch={dispatch} />}
        {status === 'active' && (
          <> 
          <Progress index={index}
            numQuestions={numQuestions}
            points={points}
            maxProssiblePoints={maxProssiblePoints}
          answer={answer}/>
          <Qestions
          questions={questions[index]}
          answer={answer}
            dispatch={dispatch} />
          <Footer> 
           <TimeCounter
              dispatch={dispatch}
              time={time} />
            <NextQuestion
              dispatch={dispatch}
              answer={answer}
              numQustions={numQuestions}
              index={index} />
          </Footer>
          </>
        )}
        {status === 'finished' &&
          <FinishScreen points={points}
            maxPossiblePoints={maxProssiblePoints}
            highScore={highScore} dispatch={dispatch}/>}
      </Main>
      
    </div>
  )
}

// function Question({ numRef, questions }) {
  
//   return (
//     <div>
//       <h2>{questions[numRef].question}</h2>
//       <ul>
//         {questions[numRef].options.map((ans, index) => (
//           <li key={index}>{ans}</li>
//         ))}
//       </ul>
//     </div>
//   );
// }