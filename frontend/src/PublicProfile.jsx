import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './homepage.css';

// Dummy users data (should match homepage users)
const users = [
  {
    name: 'Marc Demo',
    skillsOffered: ['JavaScript', 'Python', 'React', 'Node.js'],
    skillsWanted: ['UI/UX Design', 'Graphic Design', 'Photography'],
    rating: 4.8,
    feedback: [
      { user: 'Sarah', comment: 'Great to work with!' },
      { user: 'Alex', comment: 'Very skilled and helpful.' }
    ],
    photo: null,
  },
  {
    name: 'Sarah Mitchell',
    skillsOffered: ['Graphic Design', 'Adobe Creative Suite', 'Branding'],
    skillsWanted: ['Web Development', 'JavaScript', 'Digital Marketing'],
    rating: 4.6,
    feedback: [
      { user: 'Marc', comment: 'Amazing designer!' }
    ],
    photo: null,
  },
  // ...add other users as needed
];

const PublicProfile = () => {
  const navigate = useNavigate();
  const { username } = useParams();
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    document.body.className = darkMode ? 'dark' : 'light';
  }, [darkMode]);

  // Find user by name (or username param)
  const user = users.find(
    u => u.name.replace(/\s+/g, '').toLowerCase() === username?.toLowerCase()
  ) || users[0]; // fallback

  // Star rating
  const generateStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    return (
      <>
        {'★'.repeat(fullStars)}
        {hasHalfStar && '☆'}
        {'☆'.repeat(emptyStars)}
      </>
    );
  };

  return (
    <div className="homepage-container">
      {/* Header */}
      <header className="header">
        <h1 className="logo">Skill Swap Platform</h1>
        <div className="header-actions">
          <button
            className="theme-toggle"
            onClick={() => setDarkMode(!darkMode)}
          >
            {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
          </button>
          <button
            className="login-btn"
            style={{ textDecoration: 'underline' }}
            onClick={() => alert('Swap request sent!')}
          >
            Swap request
          </button>
          <button
            className="login-btn"
            style={{ textDecoration: 'underline' }}
            onClick={() => navigate('/')}
          >
            Home
          </button>
          <div
            className="profile-pic"
            style={{
              marginLeft: 16,
              width: 48,
              height: 48,
              fontSize: 24,
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            {user.name.split(' ').map(n => n[0]).join('')}
          </div>
        </div>
      </header>

      {/* Main Card */}
      <div className="user-card" style={{ margin: '2rem auto', maxWidth: 900, minHeight: 500, position: 'relative' }}>
        {/* Request Button */}
        <button
          className="request-btn"
          style={{
            position: 'absolute',
            top: 32,
            left: 32,
            padding: '0.75rem 2rem',
            fontSize: '1.1rem'
          }}
          onClick={() => alert(`Request sent to ${user.name}!`)}
        >
          Request
        </button>

        {/* Profile Info */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', marginTop: 48 }}>
          {/* Left */}
          <div style={{ flex: 2, minWidth: 260 }}>
            <h2 className="user-name" style={{ fontSize: 32, marginBottom: 16 }}>{user.name}</h2>
            <div style={{ marginBottom: 24 }}>
              <div style={{ fontWeight: 600, fontSize: 18, marginBottom: 8 }}>Skills Offered</div>
              <div className="skills-pills" style={{ flexWrap: 'wrap' }}>
                {user.skillsOffered.map(skill => (
                  <span key={skill} className="pill" style={{ marginRight: 8, marginBottom: 8 }}>
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            <div style={{ marginBottom: 24 }}>
              <div style={{ fontWeight: 600, fontSize: 18, marginBottom: 8 }}>Skills wanted</div>
              <div className="skills-pills" style={{ flexWrap: 'wrap' }}>
                {user.skillsWanted.map(skill => (
                  <span key={skill} className="pill" style={{ marginRight: 8, marginBottom: 8 }}>
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            <div style={{ marginTop: 32 }}>
              <div style={{ fontWeight: 600, fontSize: 18, marginBottom: 8 }}>Rating and Feedback</div>
              <div className="rating" style={{ marginBottom: 8 }}>
                <span>Rating:</span>
                <span className="rating-value" style={{ marginLeft: 8 }}>{user.rating}/5</span>
                <span className="rating-stars" style={{ marginLeft: 8 }}>
                  {generateStars(user.rating)}
                </span>
              </div>
              <div>
                {user.feedback && user.feedback.length > 0 ? (
                  user.feedback.map((fb, idx) => (
                    <div key={idx} style={{ color: 'var(--text-muted-light)', marginBottom: 4 }}>
                      <b>{fb.user}:</b> {fb.comment}
                    </div>
                  ))
                ) : (
                  <span style={{ color: 'var(--text-muted-light)' }}>No feedback yet.</span>
                )}
              </div>
            </div>
          </div>
          {/* Right: Profile Photo */}
          <div style={{
            flex: 1,
            minWidth: 220,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            marginTop: 16
          }}>
            <div style={{
              border: '2px solid var(--border-light)',
              borderRadius: '50%',
              width: 180,
              height: 180,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'var(--pill-light)',
              fontSize: 32,
              color: 'var(--text-muted-light)'
            }}>
              Profile Photo
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PublicProfile;