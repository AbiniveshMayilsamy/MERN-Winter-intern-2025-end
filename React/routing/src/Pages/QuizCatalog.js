import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "../Styles/QuizCatalog.css";

function QuizCatalog() {
  const navigate = useNavigate();
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    async function loadQuizzes() {
      try {
        const res = await fetch("/quizzes.json");
        const data = await res.json();
        const saved = JSON.parse(localStorage.getItem("quizzes")) || [];
        setQuizzes([...data, ...saved]);
      } catch (err) {
        const saved = JSON.parse(localStorage.getItem("quizzes")) || [];
        setQuizzes(saved);
      }
    }
    loadQuizzes();
  }, []);

  return (
    <div className="catalog-container">
      <h2 className="catalog-title">Quiz Catalog</h2>
      <div className="catalog-grid">
        {quizzes.map((quiz) => (
          <div key={quiz.id} className="catalog-card">
            <h3>{quiz.title}</h3>
            <p>{quiz.description || "Test your knowledge"}</p>
            <p><strong>Questions:</strong> {quiz.questions?.length || quiz.questions || quiz.total_questions}</p>
            {quiz.category && <p><strong>Category:</strong> {quiz.category}</p>}
            <button onClick={() => navigate(`/quiz/${quiz.id}`)} className="start-button">Start Quiz</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default QuizCatalog;
