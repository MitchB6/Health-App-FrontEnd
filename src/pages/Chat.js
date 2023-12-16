import React, { useState, useEffect } from 'react';
import { io } from "socket.io-client";

const socket = io("http://localhost:5000");

const Chat = () => {
  const [username, setUsername] = useState('');
  const [recipient, setRecipient] = useState('');
  const [message, setMessage] = useState('');
  const [messageHistory, setMessageHistory] = useState({});
  const [messages, setMessages] = useState([]);

  const users = ['Alice', 'Bob', 'Charlie']; // Example users

  useEffect(() => {
    socket.on("new_message", (newMessage) => {
      updateMessageHistory(newMessage);
    });

    return () => {
      socket.off("new_message");
    };
  }, [messageHistory]);

  const selectUser = (user) => {
    setUsername(user);
    if (recipient) {
      requestChatHistory(user, recipient);
    }
  };

  const selectRecipient = (recip) => {
    setRecipient(recip);
    if (username) {
      requestChatHistory(username, recip);
    }
  };

  const requestChatHistory = (user, recip) => {
    socket.emit('request_history', { user1: user, user2: recip });
    socket.on('chat_history', (history) => {
      setMessageHistory(prev => ({ ...prev, [`${user}-${recip}`]: history }));
      setMessages(history);
    });
  };

  const updateMessageHistory = (newMessage) => {
    const chatKey = `${username}-${recipient}`;
    setMessageHistory(prev => ({ ...prev, [chatKey]: [...(prev[chatKey] || []), newMessage] }));
    setMessages(prev => [...prev, newMessage]);
  };

  const handleSendMessage = () => {
    if (message.trim() !== '') {
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
      <div>
        {users.filter(user => user !== username).map(user => (
          <button key={user} onClick={() => selectRecipient(user)}>{user}</button>
        ))}
      </div>
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
            <p><strong>{msg.sender}:</strong> {msg.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Chat;

