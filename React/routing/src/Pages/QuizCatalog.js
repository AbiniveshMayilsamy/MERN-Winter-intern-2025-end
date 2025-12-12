import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "../Styles/QuizCatalog.css";

function QuizCatalog() {
  const navigate = useNavigate();
  const [quizzesByClass, setQuizzesByClass] = useState({});

  useEffect(() => {
    async function loadQuizzes() {
      try {
        const jsonQuizzes = [];
        
        const res1 = await fetch("/Quiz.json");
        const data1 = await res1.json();
        jsonQuizzes.push({
          id: 1,
          title: data1.title,
          description: "General Knowledge Test",
          questions: data1.total_questions,
          total_questions: data1.total_questions,
          timeLimit: 30,
          className: "General"
        });

        const res2 = await fetch("/quiz-2.json");
        const data2 = await res2.json();
        jsonQuizzes.push({
          id: 2,
          title: data2.title,
          description: "Science Knowledge Test",
          questions: data2.total_questions,
          total_questions: data2.total_questions,
          timeLimit: 30,
          className: "General"
        });

        const res3 = await fetch("/quiz-3.json");
        const data3 = await res3.json();
        jsonQuizzes.push({
          id: 3,
          title: data3.title,
          description: "History Knowledge Test",
          questions: data3.total_questions,
          total_questions: data3.total_questions,
          timeLimit: 30,
          className: "General"
        });
        
        const saved = JSON.parse(localStorage.getItem("quizzes")) || [];
        const allQuizzes = [...jsonQuizzes, ...saved];
        
        const grouped = allQuizzes.reduce((acc, quiz) => {
          const className = quiz.className || "General";
          if (!acc[className]) acc[className] = [];
          acc[className].push(quiz);
          return acc;
        }, {});
        
        setQuizzesByClass(grouped);
      } catch (err) {
        console.log("Error loading JSON:", err);
        const saved = JSON.parse(localStorage.getItem("quizzes")) || [];
        const grouped = saved.reduce((acc, quiz) => {
          const className = quiz.className || "General";
          if (!acc[className]) acc[className] = [];
          acc[className].push(quiz);
          return acc;
        }, {});
        setQuizzesByClass(grouped);
      }
    }
    loadQuizzes();
  }, []);

  return (
    <div className="catalog-container">
      <h2 className="catalog-title">Quiz Catalog</h2>
      
      {Object.keys(quizzesByClass).length === 0 ? (
        <p style={{ textAlign: "center" }}>No quizzes available. Admin can create quizzes.</p>
      ) : (
        Object.keys(quizzesByClass).map(className => (
          <div key={className} style={{ marginBottom: "40px" }}>
            <h3 style={{ marginBottom: "20px", borderBottom: "2px solid #333", paddingBottom: "10px" }}>{className} Class</h3>
            <div className="catalog-grid">
              {quizzesByClass[className].map((quiz) => (
                <div key={quiz.id} className="catalog-card">
                  <h3>{quiz.title}</h3>
                  <p>{quiz.description || "Test your knowledge"}</p>
                  <p><strong>Questions:</strong> {quiz.questions?.length || quiz.questions || quiz.total_questions}</p>
                  <p><strong>Time Limit:</strong> {quiz.timeLimit || 30}s per question</p>
                  {quiz.className && <p><strong>Class:</strong> {quiz.className}</p>}
                  <button onClick={() => navigate(`/quiz/auth/${quiz.id}`)} className="start-button">Start Quiz</button>
                </div>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default QuizCatalog;
