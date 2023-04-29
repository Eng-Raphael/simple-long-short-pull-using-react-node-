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

const channelInputStyle = {
  ...inputStyle,
  marginBottom: '10px',
};

const messageStyle = {
  backgroundColor: '#f8f8f8',
  borderRadius: '5px',
  padding: '10px',
  marginBottom: '10px',
  maxWidth: '500px',
};

const LongPollingPage = () => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [inputChannel, setInputChannel] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`http://localhost:5000/long/notification?channel=${inputChannel}`);
      const data = await response.json();
      setMessages(data.data.map(notification => notification.content));
    };

    fetchData();
  }, [inputChannel]);

  const handleMessageSend = async () => {
    const response = await fetch(`http://localhost:5000/long/notification?channel=${inputChannel}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message: inputValue }),
    });

    const data = await response.json();

    if (data.success) {
      setMessages([...messages, data.data]);
      setInputValue('');
    }
  };

  return (
    <div style={containerStyle}>
      <h1>Long Polling Example</h1>
      <input
        style={channelInputStyle}
        type="text"
        placeholder="Enter a channel"
        value={inputChannel}
        onChange={(event) => setInputChannel(event.target.value)}
      />
      <input
        style={inputStyle}
        type="text"
        placeholder="Enter a message"
        value={inputValue}
        onChange={(event) => setInputValue(event.target.value)}
      />
      <button onClick={handleMessageSend}>Send</button>
      {messages.map((message, index) => (
        <div key={index} style={messageStyle}>
          {message.message}
        </div>
      ))}
    </div>
  );
};

export default LongPollingPage;
