export function StartScreen({ numQuestions, dispatch }) {
  return (
    <div className="start">
      <h2> Welcome to The React Quiz!</h2>
      <h3>{numQuestions} question to test your React master</h3>
      <button className="btn btn-ui" onClick={() => dispatch({ type: "start" })}>
        Let's start the quiz
      </button>
    </div>
  );
}