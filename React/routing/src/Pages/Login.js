import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  function handleLogin(e) {
    e.preventDefault();
    if (email === "admin@quiz.com" && password === "admin") {
      localStorage.setItem("userRole", "admin");
      navigate("/quiz/admin");
    } else {
      localStorage.setItem("userRole", "user");
      localStorage.setItem("userName", email);
      navigate("/quiz");
    }
  }

  return (
    <div className="login-wrapper">
      <div className="login-container">
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="login-input"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="login-input"
          />
          <button type="submit" className="login-button">Login</button>
        </form>
        <p>Don't have an account? <a href="/signup">Sign Up</a></p>
        <p style={{ fontSize: "12px", color: "gray" }}>Admin: admin@quiz.com / admin</p>
      </div>
    </div>
  );
}

export default Login;
