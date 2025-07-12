import React, { useState, useEffect } from "react";
import "./homepage.css";

const Register = ({ navigateHome }) => {
  const [darkMode, setDarkMode] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // ✅ Added this line

  useEffect(() => {
    document.body.className = darkMode ? "dark" : "light";
  }, [darkMode]);

  const validatePassword = (pwd) => {
    if (pwd.length < 8) return "Password must be at least 8 characters.";
    if (!/[A-Z]/.test(pwd))
      return "Password must contain at least one uppercase letter.";
    if (!/[a-z]/.test(pwd))
      return "Password must contain at least one lowercase letter.";
    if (!/[0-9]/.test(pwd)) return "Password must contain at least one digit.";
    if (!/[^A-Za-z0-9]/.test(pwd))
      return "Password must contain at least one special character.";
    return "";
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const validationMsg = validatePassword(password);

    if (!username.trim()) {
      setError("Username is required.");
      return;
    }
    if (validationMsg) {
      setError(validationMsg);
      return;
    }

    try {
      setError("");
      setLoading(true); // ✅ Safe to call now

      const res = await fetch("http://localhost:8000/api/register/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (res.status === 201) {
        alert("✅ Registration successful! Redirecting to login...");
        navigateHome();
      } else {
        setError(data.error || "Something went wrong.");
      }
    } catch (err) {
      setError("Failed to connect to the server.");
    } finally {
      setLoading(false); // ✅ Safe to call now
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
          onSubmit={handleRegister}
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
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        {error && (
          <div style={{ color: "red", marginTop: "1rem", textAlign: "center" }}>
            {error}
          </div>
        )}
      </div>
    </div>
  );
};

export default Register;
