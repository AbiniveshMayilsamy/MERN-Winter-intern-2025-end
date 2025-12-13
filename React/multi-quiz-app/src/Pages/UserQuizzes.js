import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function UserQuizzes() {
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    const savedQuizzes = localStorage.getItem("quizzes");
    if (savedQuizzes) {
      setQuizzes(JSON.parse(savedQuizzes));
    }
  }, []);

  return (
    <div className="container">
      <h2>Available Quizzes</h2>
      {quizzes.length === 0 ? (
        <p>No quizzes available</p>
      ) : (
        <ul className="quiz-list">
          {quizzes.map((quiz) => (
            <li key={quiz.id}>
              <div>
                <h3>{quiz.title}</h3>
                <p>Questions: {quiz.questions.length}</p>
              </div>
              <Link to={`/user/quiz/${quiz.id}`} className="button">
                Start Quiz
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default UserQuizzes;
