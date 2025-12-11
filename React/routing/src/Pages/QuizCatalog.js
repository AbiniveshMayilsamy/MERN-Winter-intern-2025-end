import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const QuizCatalog = () => {
  const navigate = useNavigate();
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const response = await fetch("/quizzes.json");
        const data = await response.json();
        const localQuizzes = JSON.parse(localStorage.getItem("quizzes")) || [];
        const allQuizzes = [...data, ...localQuizzes.map(q => ({ ...q, source: "local" }))];
        setQuizzes(allQuizzes);
        console.log("All Quizzes:", allQuizzes);
      } catch (error) {
        console.log("Error:", error);
        const localQuizzes = JSON.parse(localStorage.getItem("quizzes")) || [];
        setQuizzes(localQuizzes);
      }
    };
    fetchQuizzes();
  }, []);

  return (
    <div style={{ padding: "20px", minHeight: "100vh", backgroundColor: "#FFF8DC" }}>
      <h2 style={{ textAlign: "center", marginBottom: "30px" }}>Quiz Catalog</h2>
      <div style={{ display: "grid", gap: "20px", gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", maxWidth: "1200px", margin: "auto" }}>
        {quizzes.map((quiz) => (
          <div key={quiz.id} style={{ backgroundColor: "white", border: "1px solid #ccc", padding: "20px", borderRadius: "10px", boxShadow: "0 2px 5px rgba(0,0,0,0.1)" }}>
            <h3>{quiz.title}</h3>
            <p>{quiz.description || "Test your knowledge"}</p>
            <p><strong>Questions:</strong> {quiz.questions?.length || quiz.questions || quiz.total_questions}</p>
            {quiz.category && <p><strong>Category:</strong> {quiz.category}</p>}
            <button onClick={() => navigate(`/quiz/quiz/${quiz.id}`)} style={{ width: "100%", padding: "10px 20px", backgroundColor: "#4CAF50", color: "white", border: "none", borderRadius: "5px", cursor: "pointer", marginTop: "10px" }}>
              Start Quiz
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuizCatalog;
