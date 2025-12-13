import React, { useState, useEffect } from "react";
import { useParams, useLocation, Link } from "react-router-dom";

function Results() {
  const { id } = useParams();
  const location = useLocation();
  const [result, setResult] = useState(null);

  useEffect(() => {
    if (location.state && location.state.result) {
      setResult(location.state.result);
    } else {
      const results = JSON.parse(localStorage.getItem("results") || "[]");
      const foundResult = results.find((r) => r.quizId === parseInt(id));
      setResult(foundResult);
    }
  }, [id, location]);

  if (!result) {
    return (
      <div className="container">
        <p>No results found</p>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="results">
        <h2>Quiz Completed!</h2>
        <p>
          <strong>Quiz: {result.quizTitle}</strong>
        </p>
        <p>
          <strong>
            Your Score: {result.score} / {result.totalQuestions}
          </strong>
        </p>
        <p>
          <strong>Percentage: {result.percentage}%</strong>
        </p>
        <p>
          <strong>Completed: {result.timestamp}</strong>
        </p>
      </div>

      <div style={{ marginTop: "20px" }}>
        <Link to="/user/quizzes" className="button">
          Back to Quizzes
        </Link>
        <Link to="/" className="button" style={{ marginLeft: "10px" }}>
          Home
        </Link>
      </div>
    </div>
  );
}

export default Results;
