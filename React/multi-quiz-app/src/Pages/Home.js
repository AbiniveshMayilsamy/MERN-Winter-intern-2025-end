import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="container">
      <div className="home-section">
        <h1>Welcome to Quiz App</h1>
        <p style={{ marginBottom: "30px", fontSize: "18px" }}>
          Choose your role to continue
        </p>
        <div className="home-buttons">
          <Link to="/user/quizzes" className="button button-success">
            Take a Quiz
          </Link>
          <Link to="/admin/dashboard" className="button button-danger">
            Admin Panel
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
