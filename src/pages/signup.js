import React, { useState } from 'react';
import AuthSwitcher from '../components/authSwitch.js';
import './pages-styling/auth.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Signup = ({ onSwitch }) => {
  const [role, setRole] = useState(0);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const navigate = useNavigate();

  const handleSignup = async () => {
    console.log('Signup:', role, username, email, password, phone);
    // Add actual backend call here for authentication 
    try {
      const apiUrl = process.env.REACT_APP_API_URL;
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
        const loginResponse = await axios.post(`${apiUrl}/auth/login`, {
          role_id: role,
          email: email,
          password: password
        });
        console.log(loginResponse);
        if (loginResponse.status === 200) {
          console.log("Login successful");
          console.log(loginResponse.data);
          localStorage.setItem('accessToken', loginResponse.data['access token']);
          localStorage.setItem('refreshToken', loginResponse.data['refresh token']);
          navigate('/initial-survey');
        }
      } else {
        console.log('Signup failed');
      }
    } catch (err) {
      console.log(err);
    }
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
          <option value="0">Member</option>
          <option value="1">Coach</option>
          <option value="2">Admin</option>
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
        <input type ="text" value={phone} onChange={(e) => setPhone(e.target.value)} />
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