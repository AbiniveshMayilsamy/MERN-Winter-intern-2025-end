import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/Login.css";

function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  function handleSignUp(e) {
    e.preventDefault();
    localStorage.setItem("userRole", "student");
    localStorage.setItem("userName", email);
    navigate("/quiz");
  }

  return (
    <div className="login-wrapper">
      <div className="login-container">
        <h2>Sign Up</h2>
        <form onSubmit={handleSignUp}>
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
          <button type="submit" className="login-button">Sign Up</button>
        </form>
        <p>Already have an account? <a href="/">Login</a></p>
      </div>
    </div>
  );
}

export default SignUp;
