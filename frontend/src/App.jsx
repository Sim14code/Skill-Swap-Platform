import React from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Homepage from './homepage';
import Login from './login';
import UserProfile from './userprofile';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<LoginWithNav />} />
        <Route path="/profile" element={<UserProfileWithNav />} />
      </Routes>
    </Router>
  );
}

// Wrappers to provide navigation to Login and UserProfile
function LoginWithNav() {
  const navigate = useNavigate();
  return <Login navigateHome={() => navigate('/')} />;
}

function UserProfileWithNav() {
  const navigate = useNavigate();
  return <UserProfile navigateHome={() => navigate('/')} />;
}

export default App;