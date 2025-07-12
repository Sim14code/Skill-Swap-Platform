import React, { useState, useEffect } from 'react';
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

const Homepage = () => {
  const [darkMode, setDarkMode] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [availabilityFilter, setAvailabilityFilter] = useState('Availability');
  const [currentPage, setCurrentPage] = useState(1);

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

  // Filter users based on search term
  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.skillsOffered.some(skill => 
      skill.toLowerCase().includes(searchTerm.toLowerCase())
    ) ||
    user.skillsWanted.some(skill => 
      skill.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const handleSearch = (e) => {
    e.preventDefault();
    // Search functionality already implemented via filtering
    console.log('Searching for:', searchTerm);
  };

  const handleRequest = (userName) => {
    alert(`Request sent to ${userName}!`);
  };

  return (
    <div className="homepage-container">
      {/* Header */}
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
            onClick={() => alert('Login functionality would go here!')}
          >
            Login
          </button>
        </div>
      </header>

      {/* Search Bar */}
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

      {/* Results Summary */}
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

      {/* User List */}
      <div className="user-list">
        {filteredUsers.length > 0 ? (
          filteredUsers.map((user, index) => (
            <div key={index} className="user-card">
              <div className="user-card-content">
                {/* Profile Picture */}
                <div className="profile-pic">
                  {user.name.split(' ').map(n => n[0]).join('')}
                </div>
                
                {/* User Info */}
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
                
                {/* Request Button */}
                <button 
                  className="request-btn"
                  onClick={() => handleRequest(user.name)}
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

      {/* Pagination */}
      {filteredUsers.length > 0 && (
        <div className="pagination">
          <button 
            className="pagination-btn"
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
          >
            ‹
          </button>
          {[1, 2, 3, 4, 5].map(num => (
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
            onClick={() => setCurrentPage(Math.min(5, currentPage + 1))}
            disabled={currentPage === 5}
          >
            ›
          </button>
        </div>
      )}
    </div>
  );
};

export default Homepage;