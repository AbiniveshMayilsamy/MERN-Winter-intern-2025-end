import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../Styles/Login.css";

function QuizAuth() {
  const { id } = useParams();
  const [name, setName] = useState("");
  const [rollNo, setRollNo] = useState("");
  const [quiz, setQuiz] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function loadQuiz() {
      if (id === "1") {
        const res = await fetch("/Quiz.json");
        const data = await res.json();
        setQuiz({ id: 1, title: data.title, className: "General" });
      } else {
        const quizzes = JSON.parse(localStorage.getItem("quizzes")) || [];
        const found = quizzes.find(q => q.id === parseInt(id));
        setQuiz(found);
      }
    }
    loadQuiz();
  }, [id]);

  function validateRollNo(roll) {
    const pattern = /^\d{2}[A-Za-z]{2,3}\d{3}$/;
    return pattern.test(roll);
  }

  function handleAuth(e) {
    e.preventDefault();
    
    if (!validateRollNo(rollNo)) {
      alert("Invalid Roll Number! Format: 2 digits + 2-3 letters + 3 digits (e.g., 23CSE045)");
      return;
    }

    if (!quiz) {
      alert("Quiz not found!");
      return;
    }

    const studentClass = rollNo.substring(2, rollNo.length - 3).toUpperCase();
    
    if (quiz.className && quiz.className !== "General" && quiz.className !== studentClass) {
      alert(`This quiz is only for ${quiz.className} class! Your class: ${studentClass}`);
      return;
    }

    localStorage.setItem("currentQuizStudent", JSON.stringify({ name, rollNo }));
    navigate(`/quiz/start/${id}`);
  }

  if (!quiz) return <div className="quiz-loading">Loading...</div>;

  return (
    <div className="login-wrapper">
      <div className="login-container">
        <h2>Quiz Authentication</h2>
        <h3>{quiz.title}</h3>
        <p style={{ marginBottom: "20px" }}>Class: {quiz.className}</p>
        <form onSubmit={handleAuth}>
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="login-input"
          />
          <input
            type="text"
            placeholder="Roll Number (e.g., 23CSE045)"
            value={rollNo}
            onChange={(e) => setRollNo(e.target.value.toUpperCase())}
            required
            className="login-input"
          />
          <button type="submit" className="login-button">Start Quiz</button>
        </form>
        <button onClick={() => navigate("/quiz")} style={{ marginTop: "10px", background: "none", border: "none", color: "#2196F3", cursor: "pointer" }}>Back to Catalog</button>
      </div>
    </div>
  );
}

export default QuizAuth;
