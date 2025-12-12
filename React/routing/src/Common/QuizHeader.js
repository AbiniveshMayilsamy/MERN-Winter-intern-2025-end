import { NavLink, useNavigate } from "react-router-dom";
import "../Styles/QuizHeader.css";

function QuizHeader() {
  const navigate = useNavigate();
  const userRole = localStorage.getItem("userRole");

  function handleLogout() {
    localStorage.removeItem("userRole");
    localStorage.removeItem("userName");
    localStorage.removeItem("currentQuizStudent");
    navigate("/");
  }

  function handleLogoClick() {
    if (userRole === "admin") {
      navigate("/quiz/admin");
    } else {
      navigate("/quiz");
    }
  }

  return (
    <header className="quiz-header">
      <div className="quiz-header-content">
        <img
          src="/multi quiz portal.png"
          alt="Quiz Portal"
          onClick={handleLogoClick}
          className="quiz-header-logo"
        />
        <nav className="quiz-header-nav">
          {userRole === "admin" ? (
            <>
              <NavLink to="/quiz/admin" className="quiz-header-link">Create Quiz</NavLink>
              <NavLink to="/quiz/leaderboard" className="quiz-header-link">Leaderboard</NavLink>
            </>
          ) : (
            <>
              <NavLink to="/quiz" className="quiz-header-link">Home</NavLink>
              <NavLink to="/quiz/leaderboard" className="quiz-header-link">Leaderboard</NavLink>
            </>
          )}
          <button onClick={handleLogout} className="quiz-header-logout">Logout</button>
        </nav>
      </div>
    </header>
  );
}

export default QuizHeader;
