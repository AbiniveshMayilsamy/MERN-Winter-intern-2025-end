import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function AdminDashboard() {
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    const savedQuizzes = localStorage.getItem("quizzes");
    if (savedQuizzes) {
      setQuizzes(JSON.parse(savedQuizzes));
    }
  }, []);

  const handleDelete = (id) => {
    const updatedQuizzes = quizzes.filter((quiz) => quiz.id !== id);
    setQuizzes(updatedQuizzes);
    localStorage.setItem("quizzes", JSON.stringify(updatedQuizzes));
  };

  return (
    <div className="container">
      <h2>Admin Dashboard</h2>
      <Link to="/admin/create" className="button button-success">
        Create New Quiz
      </Link>

      <h3 style={{ marginTop: "30px" }}>All Quizzes</h3>
      {quizzes.length === 0 ? (
        <p>No quizzes created yet</p>
      ) : (
        <ul className="quiz-list">
          {quizzes.map((quiz) => (
            <li key={quiz.id}>
              <div>
                <h3>{quiz.title}</h3>
                <p>Questions: {quiz.questions.length}</p>
              </div>
              <div className="admin-actions">
                <button
                  className="button button-danger"
                  onClick={() => handleDelete(quiz.id)}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default AdminDashboard;
