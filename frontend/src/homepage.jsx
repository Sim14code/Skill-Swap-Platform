import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './homepage.css';

const users = [
  {
    name: 'Marc Demo',
    skillsOffered: ['JavaScript', 'Python', 'React', 'Node.js'],
    skillsWanted: ['UI/UX Design', 'Graphic Design', 'Photography'],
    rating: 4.8,
  },
  {
    name: 'Sarah Mitchell',
    skillsOffered: ['Graphic Design', 'Adobe Creative Suite', 'Branding'],
    skillsWanted: ['Web Development', 'JavaScript', 'Digital Marketing'],
    rating: 4.6,
  },
  {
    name: 'Alex Johnson',
    skillsOffered: ['Digital Marketing', 'SEO', 'Content Writing'],
    skillsWanted: ['Python', 'Data Analysis', 'Machine Learning'],
    rating: 4.3,
  },
  {
    name: 'Emily Chen',
    skillsOffered: ['UI/UX Design', 'Figma', 'User Research'],
    skillsWanted: ['Frontend Development', 'React', 'TypeScript'],
    rating: 4.9,
  },
  {
    name: 'David Rodriguez',
    skillsOffered: ['Photography', 'Video Editing', 'Drone Operation'],
    skillsWanted: ['Social Media Marketing', 'Content Strategy'],
    rating: 4.2,
  },
];

const USERS_PER_PAGE = 2;

const Homepage = () => {
  const [darkMode, setDarkMode] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [availabilityFilter, setAvailabilityFilter] = useState('Availability');
  const [currentPage, setCurrentPage] = useState(1);

  const navigate = useNavigate();

  useEffect(() => {
    document.body.className = darkMode ? 'dark' : 'light';
  }, [darkMode]);

  // Generate star rating display
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

  // Filter users based on search term and availability (availability is not used in dummy data)
  const filteredUsers = users.filter(user => {
    const search = searchTerm.toLowerCase();
    return (
      user.name.toLowerCase().includes(search) ||
      user.skillsOffered.some(skill => skill.toLowerCase().includes(search)) ||
      user.skillsWanted.some(skill => skill.toLowerCase().includes(search))
    );
  });

  // Pagination
  const totalPages = Math.ceil(filteredUsers.length / USERS_PER_PAGE);
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * USERS_PER_PAGE,
    currentPage * USERS_PER_PAGE
  );

  const handleSearch = (e) => {
    e.preventDefault();
    setCurrentPage(1);
  };

  return (
    <div className="homepage-container">
      <header className="header">
        <h1 className="logo">
          🔄 Skill Swap Platform
        </h1>
        <div className="header-actions">
          <button
            className="theme-toggle"
            onClick={() => setDarkMode(!darkMode)}
          >
            {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
          </button>
          <button
            className="login-btn"
            onClick={() => navigate('/login')}
          >
            Login
          </button>
        </div>
      </header>

      <div className="search-bar">
        <form className="search-form" onSubmit={handleSearch}>
          <select
            className="availability-select"
            value={availabilityFilter}
            onChange={(e) => setAvailabilityFilter(e.target.value)}
          >
            <option value="Availability">All Availability</option>
            <option value="Available">Available Now</option>
            <option value="Busy">Busy</option>
            <option value="Unavailable">Unavailable</option>
          </select>
          <input
            type="text"
            placeholder="Search skills, users, or expertise..."
            className="search-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button type="submit" className="search-btn">
            🔍 Search
          </button>
        </form>
      </div>

      {searchTerm && (
        <div style={{
          marginBottom: '1rem',
          padding: '0.5rem',
          textAlign: 'center',
          color: 'var(--text-muted-light)'
        }}>
          {filteredUsers.length > 0
            ? `Found ${filteredUsers.length} result(s) for "${searchTerm}"`
            : `No results found for "${searchTerm}"`
          }
        </div>
      )}

      <div className="user-list">
        {paginatedUsers.length > 0 ? (
          paginatedUsers.map((user, index) => (
            <div
              key={index}
              className="user-card"
              style={{ cursor: 'pointer' }}
              onClick={() =>
                navigate(`/profile/${user.name.replace(/\s+/g, '').toLowerCase()}`)
              }
            >
              <div className="user-card-content">
                <div className="profile-pic">
                  {user.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div className="user-info">
                  <h2 className="user-name">{user.name}</h2>
                  <div className="skills-section">
                    <span className="skills-label">Skills Offered →</span>
                    <div className="skills-pills">
                      {user.skillsOffered.map(skill => (
                        <span key={skill} className="pill">{skill}</span>
                      ))}
                    </div>
                  </div>
                  <div className="skills-section">
                    <span className="skills-label">Skills Wanted →</span>
                    <div className="skills-pills">
                      {user.skillsWanted.map(skill => (
                        <span key={skill} className="pill">{skill}</span>
                      ))}
                    </div>
                  </div>
                  <div className="rating">
                    <span>Rating:</span>
                    <span className="rating-value">{user.rating}/5</span>
                    <span className="rating-stars">
                      {generateStars(user.rating)}
                    </span>
                  </div>
                </div>
                <button
                  className="request-btn"
                  onClick={e => {
                    e.stopPropagation();
                    alert(`Request sent to ${user.name}!`);
                  }}
                >
                  📧 Request
                </button>
              </div>
            </div>
          ))
        ) : (
          <div style={{
            textAlign: 'center',
            padding: '3rem',
            color: 'var(--text-muted-light)',
            fontSize: '1.125rem'
          }}>
            {searchTerm ? 'No users match your search criteria.' : 'No users found.'}
          </div>
        )}
      </div>

      {filteredUsers.length > 0 && totalPages > 1 && (
        <div className="pagination">
          <button
            className="pagination-btn"
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
          >
            ‹
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(num => (
            <button
              key={num}
              className={`pagination-btn ${currentPage === num ? 'active' : ''}`}
              onClick={() => setCurrentPage(num)}
            >
              {num}
            </button>
          ))}
          <button
            className="pagination-btn"
            onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
          >
            ›
          </button>
        </div>
      )}
    </div>
  );
};

export default Homepage;