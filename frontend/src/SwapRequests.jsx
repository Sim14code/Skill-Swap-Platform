import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './homepage.css';

// Dummy swap requests data
const initialRequests = [
  {
    id: 1,
    name: 'Marc Demo',
    skillsOffered: ['JavaScript'],
    skillsWanted: ['Modelling'],
    rating: 3.8,
    status: 'Pending',
  },
  {
    id: 2,
    name: 'Jane Doe',
    skillsOffered: ['UI Design'],
    skillsWanted: ['React'],
    rating: 3.9,
    status: 'Rejected',
  },
];

const SwapRequests = () => {
  const [darkMode, setDarkMode] = useState(true);
  const [requests, setRequests] = useState(initialRequests);
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    document.body.className = darkMode ? 'dark' : 'light';
  }, [darkMode]);

  const handleStatus = (id, newStatus) => {
    setRequests(reqs =>
      reqs.map(r => (r.id === id ? { ...r, status: newStatus } : r))
    );
  };

  const filtered = requests.filter(r =>
    (filter === 'All' || r.status === filter) &&
    (r.name.toLowerCase().includes(search.toLowerCase()) ||
      r.skillsOffered.some(s => s.toLowerCase().includes(search.toLowerCase())) ||
      r.skillsWanted.some(s => s.toLowerCase().includes(search.toLowerCase())))
  );

  // Pagination (2 per page)
  const [page, setPage] = useState(1);
  const perPage = 2;
  const totalPages = Math.ceil(filtered.length / perPage);
  const paginated = filtered.slice((page - 1) * perPage, page * perPage);

  return (
    <div className="homepage-container">
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
            onClick={() => navigate('/')}
          >
            Home
          </button>
          <button
            className="login-btn"
            onClick={() => navigate('/inbox')}
          >
            Inbox
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
            U
          </div>
        </div>
      </header>
      <div style={{ display: 'flex', gap: 8, alignItems: 'center', margin: '2rem 0 1rem 0' }}>
        <select
          className="availability-select"
          value={filter}
          onChange={e => { setFilter(e.target.value); setPage(1); }}
        >
          <option value="All">All</option>
          <option value="Pending">Pending</option>
          <option value="Rejected">Rejected</option>
        </select>
        <input
          className="search-input"
          placeholder="Search"
          value={search}
          onChange={e => { setSearch(e.target.value); setPage(1); }}
          style={{ maxWidth: 200 }}
        />
        <button className="search-btn" onClick={() => setPage(1)}>Search</button>
      </div>
      {paginated.length === 0 ? (
        <div style={{ color: 'var(--text-muted-light)', textAlign: 'center', margin: '2rem' }}>
          No requests found.
        </div>
      ) : (
        paginated.map(req => (
          <div
            key={req.id}
            className="user-card"
            style={{
              marginBottom: 24,
              border: '2px solid var(--border-light)',
              borderRadius: 20,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '1.5rem'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
              <div
                style={{
                  width: 80,
                  height: 80,
                  borderRadius: '50%',
                  border: '2px solid var(--border-light)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 18,
                  color: 'var(--text-muted-light)'
                }}
              >
                Profile Photo
              </div>
              <div>
                <div style={{ fontWeight: 600, fontSize: 20 }}>{req.name}</div>
                <div style={{ margin: '6px 0' }}>
                  <span style={{ color: 'var(--text-success)', fontSize: 14 }}>Skills Offered =&gt; </span>
                  {req.skillsOffered.map(skill => (
                    <span key={skill} className="pill" style={{ marginRight: 6 }}>{skill}</span>
                  ))}
                </div>
                <div>
                  <span style={{ color: '#3af', fontSize: 14 }}>Skill wanted =&gt; </span>
                  {req.skillsWanted.map(skill => (
                    <span key={skill} className="pill" style={{ marginRight: 6 }}>{skill}</span>
                  ))}
                </div>
                <div style={{ fontSize: 13, marginTop: 4 }}>
                  rating <b>{req.rating}/5</b>
                </div>
              </div>
            </div>
            <div style={{ textAlign: 'right', minWidth: 120 }}>
              <div style={{ fontWeight: 600, fontSize: 18 }}>
                Status{' '}
                <span style={{
                  color:
                    req.status === 'Pending'
                      ? 'orange'
                      : req.status === 'Rejected'
                        ? 'red'
                        : 'green'
                }}>
                  {req.status}
                </span>
              </div>
              {req.status === 'Pending' && (
                <div style={{ marginTop: 8 }}>
                  <button
                    className="login-btn"
                    style={{ color: 'green', background: 'none', boxShadow: 'none', marginRight: 8 }}
                    onClick={() => handleStatus(req.id, 'Accepted')}
                  >
                    Accept
                  </button>
                  <button
                    className="login-btn"
                    style={{ color: 'red', background: 'none', boxShadow: 'none' }}
                    onClick={() => handleStatus(req.id, 'Rejected')}
                  >
                    Reject
                  </button>
                </div>
              )}
              {req.status === 'Accepted' && (
                <div style={{ color: 'green', marginTop: 8 }}>Accepted</div>
              )}
              {req.status === 'Rejected' && (
                <div style={{ color: 'red', marginTop: 8 }}>Rejected</div>
              )}
            </div>
          </div>
        ))
      )}
      {totalPages > 1 && (
        <div className="pagination" style={{ marginTop: 24 }}>
          <button
            className="pagination-btn"
            onClick={() => setPage(Math.max(1, page - 1))}
            disabled={page === 1}
          >
            &lt;
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(num => (
            <button
              key={num}
              className={`pagination-btn ${page === num ? 'active' : ''}`}
              onClick={() => setPage(num)}
            >
              {num}
            </button>
          ))}
          <button
            className="pagination-btn"
            onClick={() => setPage(Math.min(totalPages, page + 1))}
            disabled={page === totalPages}
          >
            &gt;
          </button>
        </div>
      )}
    </div>
  );
};

export default SwapRequests;