import React, { useState, useEffect } from 'react';
import './homepage.css';

const Login = ({ navigateHome }) => {
  const [darkMode, setDarkMode] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    document.body.className = darkMode ? 'dark' : 'light';
  }, [darkMode]);

  const handleLogin = (e) => {
    e.preventDefault();
    alert('Login attempted!');
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
            {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
          </button>
          <button
            className="login-btn"
            onClick={navigateHome}
          >
            🏠 Home
          </button>
        </div>
      </header>
      <div className="search-bar" style={{ maxWidth: 400, margin: '2rem auto' }}>
        <form className="search-form" style={{ flexDirection: 'column', gap: '1.5rem' }} onSubmit={handleLogin}>
          <input
            type="email"
            className="search-input"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            className="search-input"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="search-btn" style={{ width: '100%' }}>
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;