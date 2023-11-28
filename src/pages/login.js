import React, { useState } from 'react';
import AuthSwitcher from '../components/authSwitch.js';
import api from '../api.js';
import './styling/auth.css';

const Login = ({ onSwitch }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');


  // async function handleLogin(event){
  //   event.preventDefault();

  //   const data = {
  //     email: email,
  //     password: password
  //   };
  //   //error handling with try catch
  //   try {
  //     const response = await api.post('/auth/login', data)
      
  //     if (response.ok) {
  //       const responseData = await response.json();
  //       //handle the response
  //       console.log('Login success', responseData)
  //     } else  {
  //       console.error('Login unsuccessful:', response.status);
  //     }
  //   } catch (error){
  //     console.error('Error during login', error);
  //   }
  // }
  const handleLogin = async () => {
    setTimeout(async () => {
      console.log('Login:', email, password);
      try {
        const apiUrl = process.env.REACT_APP_API_URL;
        const response = await axios.post(`${apiUrl}/auth/login`, {
          email,
          password
        });
        console.log(response);
        if (response.status === 200) {
          console.log("Login successful");
          console.log(response.data);
        } else {
          console.log('Login failed');
        }
      } catch (err) {
        console.log(err);
      }
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
