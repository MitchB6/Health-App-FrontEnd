import React, { useState } from 'react';
import AuthSwitcher from '../components/authSwitch.js';
import './pages-styling/auth.css';
import axios from 'axios';

const Signup = ({ onSwitch }) => {
  const [role, setRole] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleSignup = async () => {
    // Simulating a backend call with a timeout
    setTimeout(async () => {
      console.log('Signup:', role, username, email, password, phoneNumber);
      // Add actual backend call here for authentication 
      try {
        const apiUrl = process.env.REACT_APP_API_URL;
        const response = await axios.post(`${apiUrl}/auth/signup`, {
          role,
          username,
          email,
          password,
          phoneNumber
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
    <div className='box-container'>
    <div className='auth-container'>
    <div className='signup-container'>
      <h2>Sign Up</h2>
      <label>
        Role:
        <div className='input-wrapper'>
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="member">Member</option>
          <option value="coach">Coach</option>
        </select>
        </div>
      </label>
      <br />
      <label>
        Username:
        <div className='input-wrapper'>
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </div>
      </label>
      <br />
      <label>
        Email:
        <div className='input-wrapper'>
        <input type ="text" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
      </label>
      <br />
      <label>
        Password:
        <div className='input-wrapper'>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
      </label>
      <br />
      <label>
        Phone Number:
        <div className='input-wrapper'>
        <input type ="text" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
        </div>
      </label>
      <br />
      <button onClick={handleSignup} className='submit-button'>Sign Up</button>
      <AuthSwitcher isLogin={false} onSwitch={onSwitch} />
    </div>
    </div>
    </div>
  );
};

export default Signup;
