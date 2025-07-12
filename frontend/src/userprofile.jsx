import React, { useState, useEffect } from 'react';
import './homepage.css';

const initialProfile = {
  name: 'Marc Demo',
  location: 'London, UK',
  skillsOffered: ['Graphic Design', 'Video Editing', 'Photoshop'],
  skillsWanted: ['Python', 'JavaScript', 'Manager'],
  availability: 'weekends',
  profileType: 'Public',
  photo: null,
};

const UserProfile = ({ navigateHome }) => {
  const [darkMode, setDarkMode] = useState(true);
  const [profile, setProfile] = useState(initialProfile);
  const [newSkillOffered, setNewSkillOffered] = useState('');
  const [newSkillWanted, setNewSkillWanted] = useState('');

  useEffect(() => {
    document.body.className = darkMode ? 'dark' : 'light';
  }, [darkMode]);

  const handleInput = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSkillRemove = (type, skill) => {
    setProfile({
      ...profile,
      [type]: profile[type].filter(s => s !== skill),
    });
  };

  const handlePhotoChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setProfile({ ...profile, photo: URL.createObjectURL(e.target.files[0]) });
    }
  };

  const handlePhotoRemove = () => {
    setProfile({ ...profile, photo: null });
  };

  const handleSave = () => {
    alert('Profile saved!');
  };

  const handleDiscard = () => {
    setProfile(initialProfile);
  };

  const handleSwapRequest = () => {
    alert('Swap request sent!');
  };

  const handleAddSkill = (type, value, setValue) => {
    const trimmed = value.trim();
    if (trimmed && !profile[type].includes(trimmed)) {
      setProfile({
        ...profile,
        [type]: [...profile[type], trimmed],
      });
      setValue('');
    }
  };

  return (
    <div className="homepage-container">
      <header className="header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          <button
            className="theme-toggle"
            onClick={() => setDarkMode(!darkMode)}
          >
            {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
          </button>
          <button
            className="login-btn"
            style={{ background: 'none', color: 'green', boxShadow: 'none' }}
            onClick={handleSave}
          >
            Save
          </button>
          <button
            className="login-btn"
            style={{ background: 'none', color: 'red', boxShadow: 'none' }}
            onClick={handleDiscard}
          >
            Discard
          </button>
          <button
            className="login-btn"
            style={{ textDecoration: 'underline' }}
            onClick={handleSwapRequest}
          >
            Swap request
          </button>
          <button
            className="login-btn"
            style={{ textDecoration: 'underline' }}
            onClick={navigateHome || (() => window.location.href = '/')}
          >
            Home
          </button>
        </div>
        <div>
          <div style={{
            width: 60, height: 60, borderRadius: '50%',
            overflow: 'hidden', border: '2px solid var(--border-light)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: 'var(--pill-light)'
          }}>
            {profile.photo ? (
              <img src={profile.photo} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            ) : (
              <span style={{ fontSize: 32, color: 'var(--text-muted-light)' }}>
                {profile.name.split(' ').map(n => n[0]).join('')}
              </span>
            )}
          </div>
        </div>
      </header>
      <div className="user-card" style={{ margin: '0 auto', maxWidth: 900 }}>
        <div style={{ display: 'flex', gap: 32, alignItems: 'flex-start', flexWrap: 'wrap' }}>
          {/* Left Side */}
          <div style={{ flex: 2, minWidth: 260 }}>
            <div style={{ marginBottom: 24 }}>
              <label style={{ fontWeight: 600, fontSize: 18 }}>Name</label>
              <input
                className="search-input"
                style={{ marginLeft: 24, width: 220 }}
                name="name"
                value={profile.name}
                onChange={handleInput}
              />
            </div>
            <div style={{ marginBottom: 24 }}>
              <label style={{ fontWeight: 600, fontSize: 18 }}>Location</label>
              <input
                className="search-input"
                style={{ marginLeft: 24, width: 220 }}
                name="location"
                value={profile.location}
                onChange={handleInput}
              />
            </div>
            <div style={{ display: 'flex', gap: 24, marginBottom: 24 }}>
              {/* Skills Offered */}
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 600, marginBottom: 8 }}>Skills Offered</div>
                <div className="skills-pills" style={{ flexWrap: 'wrap' }}>
                  {profile.skillsOffered.map(skill => (
                    <span key={skill} className="pill" style={{ marginRight: 8, marginBottom: 8 }}>
                      {skill}
                      <span
                        style={{ marginLeft: 8, cursor: 'pointer', color: 'red', fontWeight: 700 }}
                        onClick={() => handleSkillRemove('skillsOffered', skill)}
                        title="Remove"
                      >×</span>
                    </span>
                  ))}
                </div>
                <form
                  onSubmit={e => {
                    e.preventDefault();
                    handleAddSkill('skillsOffered', newSkillOffered, setNewSkillOffered);
                  }}
                  style={{ marginTop: 8, display: 'flex', gap: 8 }}
                >
                  <input
                    className="search-input"
                    style={{ flex: 1, minWidth: 0 }}
                    type="text"
                    placeholder="Add skill..."
                    value={newSkillOffered}
                    onChange={e => setNewSkillOffered(e.target.value)}
                  />
                  <button className="search-btn" type="submit" style={{ padding: '0 1rem' }}>
                    Add
                  </button>
                </form>
              </div>
              {/* Skills Wanted */}
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 600, marginBottom: 8 }}>Skills wanted</div>
                <div className="skills-pills" style={{ flexWrap: 'wrap' }}>
                  {profile.skillsWanted.map(skill => (
                    <span key={skill} className="pill" style={{ marginRight: 8, marginBottom: 8 }}>
                      {skill}
                      <span
                        style={{ marginLeft: 8, cursor: 'pointer', color: 'red', fontWeight: 700 }}
                        onClick={() => handleSkillRemove('skillsWanted', skill)}
                        title="Remove"
                      >×</span>
                    </span>
                  ))}
                </div>
                <form
                  onSubmit={e => {
                    e.preventDefault();
                    handleAddSkill('skillsWanted', newSkillWanted, setNewSkillWanted);
                  }}
                  style={{ marginTop: 8, display: 'flex', gap: 8 }}
                >
                  <input
                    className="search-input"
                    style={{ flex: 1, minWidth: 0 }}
                    type="text"
                    placeholder="Add skill..."
                    value={newSkillWanted}
                    onChange={e => setNewSkillWanted(e.target.value)}
                  />
                  <button className="search-btn" type="submit" style={{ padding: '0 1rem' }}>
                    Add
                  </button>
                </form>
              </div>
            </div>
            <div style={{ marginBottom: 24 }}>
              <label style={{ fontWeight: 600, fontSize: 18 }}>Availability</label>
              <input
                className="search-input"
                style={{ marginLeft: 24, width: 220 }}
                name="availability"
                value={profile.availability}
                onChange={handleInput}
              />
            </div>
            <div style={{ marginBottom: 24 }}>
              <label style={{ fontWeight: 600, fontSize: 18 }}>Profile</label>
              <select
                className="search-input"
                style={{ marginLeft: 24, width: 220 }}
                name="profileType"
                value={profile.profileType}
                onChange={handleInput}
              >
                <option value="Public">Public</option>
                <option value="Private">Private</option>
              </select>
            </div>
          </div>
          {/* Right Side: Profile Photo */}
          <div style={{ flex: 1, minWidth: 220, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{
              border: '2px solid var(--border-light)',
              borderRadius: '50%',
              width: 160,
              height: 160,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 16,
              background: 'var(--pill-light)',
              position: 'relative'
            }}>
              {profile.photo ? (
                <img src={profile.photo} alt="Profile" style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }} />
              ) : (
                <span style={{ fontSize: 48, color: 'var(--text-muted-light)' }}>
                  Profile Photo
                </span>
              )}
            </div>
            <label className="login-btn" style={{ marginBottom: 8, cursor: 'pointer', width: '100%', textAlign: 'center' }}>
              Add/Edit
              <input
                type="file"
                accept="image/*"
                style={{ display: 'none' }}
                onChange={handlePhotoChange}
              />
            </label>
            {profile.photo && (
              <button
                className="login-btn"
                style={{ background: 'none', color: 'red', boxShadow: 'none', marginBottom: 8 }}
                onClick={handlePhotoRemove}
              >
                Remove
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;