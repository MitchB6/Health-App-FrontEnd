import React, { useState } from 'react';
import AuthSwitcher from '../components/authSwitch.js';
import './styling/auth.css';

const Signup = ({ onSwitch }) => {
  const [role, setRole] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleSignup = () => {
    // Simulating a backend call with a timeout
    setTimeout(() => {
      console.log('Signup:', role, username, email, password, phoneNumber);
      // Add actual backend call here for authentication
    }, 1000);
  };

  return (
    <div className='signup-container'>
      <h2>Sign Up</h2>
      <label>
        Role:
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="member">Member</option>
          <option value="coach">Coach</option>
        </select>
      </label>
      <br />
      <label>
        Username:
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
      </label>
      <br />
      <label>
        Email:
        <input type ="text" value={email} onChange={(e) => setEmail(e.target.value)} />
      </label>
      <br />
      <label>
        Password:
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </label>
      <br />
      <label>
        Phone Number:
        <input type ="text" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
      </label>
      <br />
      <button onClick={handleSignup} className='submit-button'>Sign Up</button>
      <AuthSwitcher isLogin={false} onSwitch={onSwitch} />
    </div>
  );
};

export default Signup;
