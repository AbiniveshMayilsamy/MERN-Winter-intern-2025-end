import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import Home from "./Pages/Home";
import UserQuizzes from "./Pages/UserQuizzes";
import TakeQuiz from "./Pages/TakeQuiz";
import Results from "./Pages/Results";
import AdminDashboard from "./Pages/AdminDashboard";
import AdminCreateQuiz from "./Pages/AdminCreateQuiz";

function App() {
  return (
    <Router>
      <div className="app">
        <nav className="navbar">
          <h1>Quiz App</h1>
          <div className="nav-links">
            <Link to="/">Home</Link>
          </div>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/user/quizzes" element={<UserQuizzes />} />
          <Route path="/user/quiz/:id" element={<TakeQuiz />} />
          <Route path="/user/results/:id" element={<Results />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/create" element={<AdminCreateQuiz />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
