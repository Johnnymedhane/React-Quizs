import { createContext, useContext, useEffect, useReducer,  } from "react";


const QuizContext = createContext();
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
    questions: action.payload.questions,
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



function QuizProvider ({children}) {

    
    const [
        { questions, status, index, answer, points, highScore, time }, dispatch
    ] = useReducer(reducer, initialState);
      const numQuestions = questions.length;
    const maxPossiblePoints = questions?.reduce((prev, curr) => prev + curr.points, 0);
    
   // fetch('http://localhost:9000/questions')
     useEffect(function () {
     fetch('https://raw.githubusercontent.com/Johnnymedhane/React-Quizs/main/data/questions.json')
      .then(res => res.json())
       .then(data => {
         dispatch({ type: 'dataReceived', payload: data })
           console.log("Fetched questions:", data); 
       })
      .catch(err =>dispatch({ type: 'dataFailed' }))
  }, [])

    return (
        <QuizContext.Provider value={{
            questions,
            status,
            index,
            answer,
            points,
            highScore,
            time,
            numQuestions,
            maxPossiblePoints,
            dispatch,
        }}>
            {children}
        </QuizContext.Provider>
    )
    
}
 function useQuiz() {
    const context = useContext(QuizContext);
    if (!context) {
        throw new Error("useQuiz must be used within a QuizProvider");
    }
    return context;
}

export { QuizProvider,useQuiz };