import React from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Homepage from './homepage';
import Login from './login';
import Register from './register';
import UserProfile from './userprofile';
import PublicProfile from './PublicProfile';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<LoginWithNav />} />
        <Route path="/register" element={<RegisterWithNav />} />
        <Route path="/profile" element={<UserProfileWithNav />} />
        <Route path="/profile/:username" element={<PublicProfile />} />
      </Routes>
    </Router>
  );
}

// Wrappers to provide navigation to Login, Register, and UserProfile
function LoginWithNav() {
  const navigate = useNavigate();
  return <Login navigateHome={() => navigate('/')} />;
}

function RegisterWithNav() {
  const navigate = useNavigate();
  return <Register navigateHome={() => navigate('/')} />;
}

function UserProfileWithNav() {
  const navigate = useNavigate();
  return <UserProfile navigateHome={() => navigate('/')} />;
}

export default App;