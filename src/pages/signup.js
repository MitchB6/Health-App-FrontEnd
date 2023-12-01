import React, { useState } from 'react';
import AuthSwitcher from '../components/authSwitch.js';
import './styling/auth.css';
import axios from 'axios';

const Signup = ({ onSwitch }) => {
  const [role, setRole] = useState(0);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const handleSignup = async () => {
    // Simulating a backend call with a timeout
    setTimeout(async () => {
      console.log('Signup:', role, username, email, password, phone);
      // Add actual backend call here for authentication 
      try {
        const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000';
        const response = await axios.post(`${apiUrl}/auth/signup`, {
          role_id: role,
          username: username,
          email: email,
          password: password,
          phone: phone
        });
        console.log(response);
        if (response.status === 200) {
          console.log("Signup successful");
          console.log(response.data);
        } else {
          console.log('Signup failed');
        }
      } catch (err) {
        console.log(err);
      }
    }, 1000);
  };

  return (
    <div className='signup-container'>
      <h2>Sign Up</h2>
      <label>
        Role:
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="0">Member</option>
          <option value="1">Coach</option>
          <option value="2">Admin</option>
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
        <input type ="text" value={phone} onChange={(e) => setPhone(e.target.value)} />
      </label>
      <br />
      <button onClick={handleSignup} className='submit-button'>Sign Up</button>
      <AuthSwitcher isLogin={false} onSwitch={onSwitch} />
    </div>
  );
};

export default Signup;
