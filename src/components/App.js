import { useEffect, useReducer } from "react";
import Header from "./Header";
import Main from "./main";
import Loader from "./Loader";
import Error from "./Error";
import { StartScreen } from "./startScreen";
import Questions from "./Questions";
import NextQuestion from "./NextQuestion";
import Progress from "./Progress";
import FinishScreen from "./FinishScreen";
import TimeCounter from "./TimeCounter";
import Footer from "./Footer";
import { useQuiz } from "../contexts/QuizContext";



export default function App() { 

  const { status } = useQuiz();

  


 


  return (
    <div className="app">
      <Header />
      <Main>
       {status === 'loading' && <Loader />}
       {status === 'error' && <Error />}
        {status === 'ready' && <StartScreen 
           />}
        {status === 'active' && (
          <> 
          <Progress />
          <Questions />
          <Footer> 
           <TimeCounter />
            <NextQuestion  />
          </Footer>
          </>
        )}
        {status === 'finished' &&
          <FinishScreen  />}
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