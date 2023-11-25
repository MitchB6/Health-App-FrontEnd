import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Signup from './pages/signup.js';
import Login from './pages/login.js';
import AccountSettings from './pages/AccountSettings.js'; // Import Account Settings page

function App() {
  const [isLogin, setIsLogin] = useState(true);

  const handleSwitch = () => {
    setIsLogin(!isLogin);
  };

  return (
    <Router>
      <div className="App">
        <Routes> {/* Ensure Routes is properly used */}
          <Route path="/signup" element={<Signup onSwitch={handleSwitch} />} />
          <Route path="/login" element={<Login onSwitch={handleSwitch} />} />
          <Route path="/account-settings" element={<AccountSettings />} />
          <Route path="*" element={<Navigate to="/account-settings" replace />} />
        </Routes> {/* Close the Routes tag here */}
      </div>
    </Router>
  );
}

export default App;