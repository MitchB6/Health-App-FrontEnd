import React, { useState } from 'react';
import AuthSwitcher from '../components/authSwitch.js';
// import api from '../api.js';
import './pages-styling/auth.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {io} from "socket.io-client";

const apiUrl = process.env.REACT_APP_API_URL;
const socket = io(`${apiUrl}/auth/chat`)


const Login = ({ socket }) => {
  const [username, setUsername] = useState("");
  const [recipient, setRecipient] = useState("");
  const[message,setMessage] = useState("")

  const navigate = useNavigate();
  function newuser(){
    // setUsername(username)
    // socket.auth = {user: username}
    socket.connect()
  }

  const handleLogin = async () => {
    setTimeout(async () => {
      console.log('chat:', username, recipient);
      try {
        const apiUrl = process.env.REACT_APP_API_URL;
        const response = await axios.post(`${apiUrl}/auth/chat`, {
          username: username,
          recipient: recipient,
        });
        // console.log(response);
        if (response.status === 200) {
          localStorage.setItem('accessToken', response.data['access token']);
          localStorage.setItem('refreshToken', response.data['refresh token']);
          console.log("chat successful");
          // console.log(response.data);
        //   if(role === '2'){
        //     navigate('/admin');
        //   }else{
        //     navigate('/workout-notebook');
        //   }
        } else {
          console.log('Login failed');
        }
      } catch (err) {
        console.log(err);
      }
    }, 1000);
  };
  return (
    <div className='box-container'>
    <div className='auth-container'><div>chats history</div>
    <div className='login-container'>
      <h2>Chat</h2>
        <div className='input-wrapper'>
        </div>
        <div className="card border-2 border-info w-100">
            <div children="row vh-95">
                <div className="d-flex flex-column col-12 col-lg-12 col-xl-12">
                    <div className="align-items-start py-2 px-4 w-100 border-bottom order-info d-lg-block sticky-top bg-white">
                        <div className="d-flex align-items-center py-1">
                            <div className="postion-relative">
                            </div>
                            <div className="flex-grow-1">
                                <strong>Logged in as </strong>
                            </div>
                        </div>
                    </div>
                    <div className="mt-auto align-itmes-end border-info py-3 px-4 border-top d-lg-clock">
                        <div className="input-group flex-fill">
                            <input
                                type="text"
                                className="form-control"
                                name="message"
                                value={message}
                                placeholder ="Type your message here...."
                                onChange={({currentTarget: input}) => setMessage(input.value) }
                                />
                                <button className = "btn btn-info">send</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      <button onClick={handleLogin} className='submit-button'>Send</button>
    </div>
    </div>
    </div>
  );
};

export default Login;