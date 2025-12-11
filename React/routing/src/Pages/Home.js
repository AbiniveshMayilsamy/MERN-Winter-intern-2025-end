import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import QuizCard from "../Components/QuizCard";
import "../Styles/Home.css";

const Home = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quizzes, setQuizzes] = useState([]);
  const [selectedQuiz, setSelectedQuiz] = useState(null);

  // Load all quizzes on mount
  useEffect(() => {
    async function loadQuizzes() {
      try {
        const res = await fetch("/quizzes.json");
        const data = await res.json();
        setQuizzes(data);
        console.log("Quizzes:", data);
      } catch (err) {
        console.log("Error:", err);
      }
    }
    loadQuizzes();
  }, []);

  // Load specific quiz when id changes
  useEffect(() => {
    if (!id) return;
    
    async function loadQuizDetail() {
      try {
        const res = await fetch(`/quiz-${id}.json`);
        const data = await res.json();
        setSelectedQuiz(data);
        console.log("Quiz Detail:", data);
      } catch (err) {
        // Fallback to default quiz
        const res = await fetch("/Quiz.json");
        const data = await res.json();
        setSelectedQuiz(data);
      }
    }
    loadQuizDetail();
  }, [id]);

  function handleQuizClick(quizId) {
    navigate(`/${quizId}`);
  }

  return (
    <div className="home-container">
      <h1 className="home-title">Quiz Portal Home</h1>
      {!id && (
        <div>
          <h2>Available Quizzes:</h2>
          <div className="quiz-grid">
            {quizzes.map((item) => (
              <QuizCard key={item.id} quiz={item} onClick={handleQuizClick} />
            ))}
          </div>
        </div>
      )}
      {id && selectedQuiz && (
        <div className="quiz-detail-container">
          <button onClick={() => navigate("/")} className="back-button">Back to Home</button>
          <h2>Page ID: {id}</h2>
          <h3>{selectedQuiz.title}</h3>
          <pre className="quiz-data">
            {JSON.stringify(selectedQuiz, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
};

export default Home;
