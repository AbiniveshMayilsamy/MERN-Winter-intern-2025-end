import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../Styles/Quiz.css";

function Quiz() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quiz, setQuiz] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);

  useEffect(() => {
    async function loadQuiz() {
      try {
        if (id === "1") {
          const res = await fetch("/Quiz.json");
          const data = await res.json();
          setQuiz({
            id: 1,
            title: data.title,
            questions: data.questions.map((q) => ({
              question: q.question,
              options: q.options,
              answer: q.options.indexOf(q.answer),
            })),
          });
        } else {
          const quizzes = JSON.parse(localStorage.getItem("quizzes")) || [];
          const found = quizzes.find((q) => q.id === parseInt(id));
          if (found) setQuiz(found);
        }
      } catch (err) {
        console.log("Error:", err);
      }
    }
    loadQuiz();
  }, [id]);

  function handleAnswer(optionIndex) {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = optionIndex;
    setAnswers(newAnswers);
  }

  function handleNext() {
    if (currentQuestion < quiz.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      const score = answers.reduce((acc, ans, idx) => {
        return ans === quiz.questions[idx].answer ? acc + 1 : acc;
      }, 0);
      const result = {
        quizId: quiz.id,
        quizTitle: quiz.title,
        score,
        total: quiz.questions.length,
        userName: localStorage.getItem("userName"),
        date: new Date().toISOString(),
      };
      const results = JSON.parse(localStorage.getItem("results")) || [];
      results.push(result);
      localStorage.setItem("results", JSON.stringify(results));
      navigate("/quiz/results");
    }
  }

  if (!quiz) return <div className="quiz-loading">Loading...</div>;

  const question = quiz.questions[currentQuestion];

  return (
    <div className="quiz-container">
      <h2>{quiz.title}</h2>
      <p className="quiz-progress">Question {currentQuestion + 1} of {quiz.questions.length}</p>
      <h3 className="quiz-question">{question.question}</h3>
      <div className="quiz-options">
        {question.options.map((option, idx) => (
          <button
            key={idx}
            onClick={() => handleAnswer(idx)}
            className={`quiz-option ${answers[currentQuestion] === idx ? 'selected' : ''}`}
          >
            {option}
          </button>
        ))}
      </div>
      <button onClick={handleNext} disabled={answers[currentQuestion] === undefined} className="quiz-next-btn">
        {currentQuestion < quiz.questions.length - 1 ? "Next" : "Submit"}
      </button>
    </div>
  );
}

export default Quiz;
