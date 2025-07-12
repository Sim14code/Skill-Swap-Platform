import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./homepage.css";

const Login = ({ navigateHome }) => {
  const [darkMode, setDarkMode] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    document.body.className = darkMode ? "dark" : "light";
  }, [darkMode]);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!username.trim() || !password) {
      setError("Please enter both username and password.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const res = await fetch("http://localhost:8000/api/login/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (res.status === 200 && data.access) {
        localStorage.setItem("access_token", data.access);
        localStorage.setItem("refresh_token", data.refresh);
        alert("✅ Login successful! Redirecting...");
        navigateHome();
      } else {
        setError(data.error || "Login failed.");
      }
    } catch (err) {
      setError("Server error or network issue.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="homepage-container">
      <header className="header">
        <h1 className="logo">🔄 Skill Swap Platform</h1>
        <div className="header-actions">
          <button
            className="theme-toggle"
            onClick={() => setDarkMode(!darkMode)}
          >
            {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
          </button>
          <button className="login-btn" onClick={navigateHome}>
            🏠 Home
          </button>
        </div>
      </header>

      <div
        className="search-bar"
        style={{ maxWidth: 400, margin: "2rem auto" }}
      >
        <form
          className="search-form"
          style={{ flexDirection: "column", gap: "1.5rem" }}
          onSubmit={handleLogin}
        >
          <input
            type="text"
            className="search-input"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="password"
            className="search-input"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            className="search-btn"
            style={{ width: "100%" }}
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {error && (
          <div style={{ color: "red", marginTop: "1rem", textAlign: "center" }}>
            {error}
          </div>
        )}

        <div style={{ textAlign: "center", marginTop: "1rem" }}>
          <button
            className="login-btn"
            style={{ width: "100%" }}
            onClick={() => navigate("/register")}
          >
            Register Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
