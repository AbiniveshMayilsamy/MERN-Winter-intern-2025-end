import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  function handleLogin(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    setTimeout(() => {
      if (email === "admin@quiz.com" && password === "admin") {
        localStorage.setItem("userRole", "admin");
        localStorage.setItem("userName", "Admin");
        localStorage.setItem("loginTime", new Date().toISOString());
        navigate("/quiz/admin");
      } else if (email && password) {
        const users = JSON.parse(localStorage.getItem("users")) || [];
        const user = users.find(u => u.email === email && u.password === password);
        
        if (user) {
          localStorage.setItem("userRole", "student");
          localStorage.setItem("userName", user.name);
          localStorage.setItem("userEmail", email);
          localStorage.setItem("loginTime", new Date().toISOString());
          navigate("/quiz");
        } else {
          setError("Invalid email or password");
        }
      } else {
        setError("Please fill in all fields");
      }
      setLoading(false);
    }, 500);
  }

  return (
    <div className="login-wrapper">
      <div className="login-container">
        <div className="login-logo-section">
          <img src="/multi quiz portal.png" alt="Quiz Portal" className="login-logo-img" />
          <div className="login-logo-text">
            <h2>Quiz Portal</h2>
            <p>Test Your Knowledge</p>
          </div>
        </div>

        <div className="login-form-section">
          <div className="login-header">
            <h1>Welcome Back</h1>
            <p>Sign in to your account</p>
          </div>
          
          <form onSubmit={handleLogin}>
            <div className="form-group">
              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="login-input"
              />
            </div>
            
            <div className="form-group">
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="login-input"
              />
            </div>

            {error && <div className="error-message">{error}</div>}

            <button type="submit" className="login-button" disabled={loading}>
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <div className="login-footer">
            <p>Don't have an account? <a href="/signup">Sign Up</a></p>
            <div className="demo-credentials">
              <p>Demo Admin: admin@quiz.com / admin</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
