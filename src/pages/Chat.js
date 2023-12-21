import React, { useState, useEffect, useContext} from 'react';
import { io } from "socket.io-client";
import {jwtDecode} from "jwt-decode";
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';


const Chatter = ({ username }) => (
  <div>
    <h1>Chat</h1>
    <p>Logged in as {username}</p>
  </div>
);
const storedUsername = localStorage.getItem('username');



const accessToken = localStorage.getItem('accessToken');
const refreshToken = localStorage.getItem('refreshToken');
if (!accessToken || !refreshToken) {
  console.log('No access token or refresh token');
}
if (accessToken) {
    // Decode the token
    const decoded = jwtDecode(accessToken);

    // Extract and return the member ID
    // The exact field name depends on how your token payload is structured
    console.log("user info", jwtDecode(accessToken).sub, decoded.member_id, decoded.email); 
}

const socket = io("http://localhost:5000");

const Chat = () => {
  const location = useLocation();
  const recp = location.state?.recp; // Access the coach data
  const [username_id, setUsername_id] = useState(1);
  const [recipient_id, setRecipient_id] = useState(7);
  let defaultUser  = jwtDecode(accessToken).sub;
  let defaultCoach = recp ? recp.member_id : null;
  console.log("defaultUser is ", jwtDecode(accessToken).sub.first_name);
  console.log("defaultCoach is ",  recp);
  const [username, setUsername] = useState('');
  const [recipient, setRecipient] = useState('');
  const [message, setMessage] = useState('');
  const [messageHistory, setMessageHistory] = useState({});
  const [messages, setMessages] = useState([]);
  const testuser = recp ? [recp, defaultUser] : [defaultCoach, defaultUser];

  const users = [
    storedUsername ? storedUsername : (accessToken ? jwtDecode(accessToken).sub : 'DefaultUser'),
    recp ? (recp.username ? recp.username : (recp.firstname ? recp.firstname : recp.member_id)) : 'DefaultRecipient'
];
  useEffect(() => {
    if (recp) {
      console.log("recp is ", recp);
      // You can use coach data here, for example:
      //setRecipient_id(recp.member_id); // Assuming coach object has coach_id
    }
    //setRecipient(defaultCoach);
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');
    if (!accessToken || !refreshToken) {
      console.log('No access token or refresh token');
      return;
    }
    if (accessToken) {
        // Decode the token
        const decoded = jwtDecode(accessToken);
  
        // Extract and return the member ID
        // The exact field name depends on how your token payload is structured
        console.log("user info", decoded.first_name, decoded.member_id, decoded.email); 
    }


    socket.on("new_message", (newMessage) => {
      updateMessageHistory(newMessage);
    });

    return () => {
      socket.off("new_message");
    };
  }, [messageHistory]);

  const selectUser = (user) => {
    setUsername(defaultUser);
    if (recipient) {
      requestChatHistory(defaultUser, recipient);
    }
  };

  const selectRecipient = (recip) => {
    setRecipient(defaultCoach);
    if (username) {  
      requestChatHistory(username, defaultCoach);
    }
  };

  const requestChatHistory = (user, recip) => {
    socket.emit('request_history', { user1: user, user2: recip });
    socket.on('chat_history', (history) => {
      setMessageHistory(prev => ({ ...prev, [`${user}`]: history }));
      setMessages(history);
    });
  };

  const updateMessageHistory = (newMessage) => {
    const chatKey = `${defaultUser}-${defaultCoach}`;
    setMessageHistory(prev => ({ ...prev, [chatKey]: [...(prev[chatKey] || []), newMessage] }));
    setMessages(prev => [...prev, newMessage]);
  };

  const handleSendMessage = () => {
    if (message.trim() !== '') {
      setUsername(defaultUser);
      
      
      if (username) {
        requestChatHistory(defaultUser, defaultCoach);
        
      }
      const newMessage = { sender: username, recipient: recipient, text: message };
      socket.emit('send_message', newMessage);
      setMessage('');
    }
  };

  return (
    <div>
      <div>
        {users.map(user => (
          <button key={user} onClick={() => selectUser(user)}>{user}</button>
        ))}
      </div>
      {/* <div>
        {users.filter(user => user !== username).map(user => (
          <button key={user} onClick={() => selectRecipient(user)}>{user}</button>
        ))}
      </div> */}
      <input
        type="text"
        placeholder="Message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={handleSendMessage}>Send</button>
      <div className="chat-window">
        {messages.map((msg, index) => (
          <div key={index} className={msg.sender === username ? 'outgoing' : 'incoming'}>
            <p><strong>{defaultUser}:</strong> {msg.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};


export default Chat;
