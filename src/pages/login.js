import React, { useState } from 'react';
import AuthSwitcher from '../components/authSwitch.js';
import api from '../api.js';
import './styling/auth.css';

const Login = ({ onSwitch }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  async function handleLogin(event){
    event.preventDefault();

    const data = {
      username: username,
      password: password
    };
    //error handling with try catch
    try {
      const response = await api.post('/auth/login', data)
      
      if (response.ok) {
        const responseData = await response.json();
        //handle the response
        console.log('Login success', responseData)
      } else  {
        console.error('Login unsuccessful:', response.status);
      }
    } catch (error){
      console.error('Error during login', error);
    }
  }

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
