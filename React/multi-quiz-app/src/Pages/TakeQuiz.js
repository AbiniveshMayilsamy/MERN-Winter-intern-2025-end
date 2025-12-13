import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

function TakeQuiz() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quiz, setQuiz] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedQuizzes = localStorage.getItem("quizzes");
    if (savedQuizzes) {
      const quizzes = JSON.parse(savedQuizzes);
      const foundQuiz = quizzes.find((q) => q.id === parseInt(id));
      setQuiz(foundQuiz);
      setLoading(false);
    }
  }, [id]);

  const handleAnswerChange = (value) => {
    setAnswers({
      ...answers,
      [currentQuestion]: value,
    });
  };

  const handleNext = () => {
    if (currentQuestion < quiz.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSubmit = () => {
    let score = 0;
    quiz.questions.forEach((question, index) => {
      if (answers[index] === question.correctAnswer) {
        score++;
      }
    });

    const result = {
      quizId: parseInt(id),
      quizTitle: quiz.title,
      score: score,
      totalQuestions: quiz.questions.length,
      percentage: Math.round((score / quiz.questions.length) * 100),
      timestamp: new Date().toLocaleString(),
    };

    const results = JSON.parse(localStorage.getItem("results") || "[]");
    results.push(result);
    localStorage.setItem("results", JSON.stringify(results));

    navigate(`/user/results/${id}`, { state: { result } });
  };

  if (loading)
    return (
      <div className="container">
        <p>Loading...</p>
      </div>
    );
  if (!quiz)
    return (
      <div className="container">
        <p>Quiz not found</p>
      </div>
    );

  const question = quiz.questions[currentQuestion];

  return (
    <div className="container">
      <h2>{quiz.title}</h2>
      <p style={{ marginBottom: "20px", color: "#666" }}>
        Question {currentQuestion + 1} of {quiz.questions.length}
      </p>

      <div className="quiz-options">
        <h3 style={{ marginBottom: "15px" }}>{question.question}</h3>
        {question.options.map((option, index) => (
          <div key={index} className="option">
            <input
              type="radio"
              id={`option-${index}`}
              name="answer"
              value={option}
              checked={answers[currentQuestion] === option}
              onChange={(e) => handleAnswerChange(e.target.value)}
            />
            <label htmlFor={`option-${index}`}>{option}</label>
          </div>
        ))}
      </div>

      <div style={{ marginTop: "20px" }}>
        <button
          className="button"
          onClick={handlePrevious}
          disabled={currentQuestion === 0}
        >
          Previous
        </button>

        {currentQuestion < quiz.questions.length - 1 ? (
          <button className="button" onClick={handleNext}>
            Next
          </button>
        ) : (
          <button className="button button-success" onClick={handleSubmit}>
            Submit Quiz
          </button>
        )}
      </div>
    </div>
  );
}

export default TakeQuiz;
