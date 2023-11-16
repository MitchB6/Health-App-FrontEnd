import React, { useState } from 'react';
import AuthSwitcher from '../components/authSwitch.js';
import './styling/auth.css';

const Login = ({ onSwitch }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Simulating a backend call with a timeout
    setTimeout(() => {
      console.log('Login:', username, password);
      // Add actual backend call here for authentication
    }, 1000);
  };

  return (
    <div className='login-container'>
      <h2>Login</h2>
      <label>
        Username:
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
      </label>
      <br />
      <label>
        Password:
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </label>
      <br />
      <button onClick={handleLogin} className='submit-button'>Login</button>
      <AuthSwitcher isLogin={true} onSwitch={onSwitch} />
    </div>
  );
};

export default Login;
