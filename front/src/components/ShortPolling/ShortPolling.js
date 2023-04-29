import React, { useState, useEffect } from 'react';

const containerStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  marginTop: '20px',
};

const inputStyle = {
  padding: '10px',
  marginBottom: '20px',
  fontSize: '18px',
  borderRadius: '5px',
  border: 'none',
  boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.1)',
};

const messageStyle = {
  backgroundColor: '#f8f8f8',
  borderRadius: '5px',
  padding: '10px',
  marginBottom: '10px',
  maxWidth: '500px',
};

const ShortPolling = () => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const fetchData = async () => {
    const response = await fetch('http://localhost:5000/short/notification');
    const { data } = await response.json();
    if (data.length > 0) {
      setMessages(data);
    }
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      fetchData();
    }, 3000);

    return () => clearInterval(intervalId);
  }, []);

  const handleMessageSend = async () => {
    if (inputValue.trim() === '') {
      return;
    }

    await fetch('http://localhost:5000/short/notification', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        content: inputValue,
      }),
    });

    setInputValue('');
  };

  return (
    <div style={containerStyle}>
      <input
        style={inputStyle}
        placeholder="Type a message..."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button onClick={handleMessageSend}>Send</button>
      {messages.map((message) => (
        <div key={message._id} style={messageStyle}>{message.content}</div>
      ))}
    </div>
  );
};

export default ShortPolling;
