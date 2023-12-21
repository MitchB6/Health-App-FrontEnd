import { useState } from 'react';
import AuthSwitcher from '../components/authSwitch.js';
// import api from '../api.js';
import './pages-styling/auth.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Chatter from './Chat.js';


const Login = ({ onSwitch }) => {
  const [role, setRole] = useState(0);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  localStorage.setItem('username', email);

  const navigate = useNavigate();

  const handleLogin = async () => {
    setTimeout(async () => {
      // console.log('Login:', role, email, password);
      try {
        const apiUrl = process.env.REACT_APP_API_URL;
        const response = await axios.post(`${apiUrl}/auth/login`, {
          role_id: role,
          email: email,
          password: password
        });
        // console.log(response);
        if (response.status === 200) {
          localStorage.setItem('accessToken', response.data['access token']);
          localStorage.setItem('refreshToken', response.data['refresh token']);
          console.log("Login successful");
          // console.log(response.data);
          if(role === '2'){
            navigate('/admin');
          }else{
            navigate('/workout-notebook');
          }
        } else {
          console.log('Login failed');
          setErrorMessage('The email or password you entered is incorrect');
        }
      } catch (err) {
        console.log(err);
      }
    }, 1000);
  };
  return (
    <div className='box-container'>
    <div className='auth-container'>
    <div className='login-container'>
      <h2>Login</h2>
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
      <label>
        E-mail:
        <div className='input-wrapper'>
        <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
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
      <div className='error-message'>
        {errorMessage && <p>{errorMessage}</p>}
      </div>
      <button onClick={handleLogin} className='submit-button'>Login</button>
      <AuthSwitcher isLogin={true} onSwitch={onSwitch} />
      <Chatter username={email} />
    </div>
    </div>
    </div>
  );
};

export default Login;