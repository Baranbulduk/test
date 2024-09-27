import React, { useState, useEffect } from 'react';
import './message.css';

function MessageComponent() {
    const [data, setData] = useState([]);

    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch('https://3wdwn7v146.execute-api.eu-north-1.amazonaws.com/admin/message');
          const result = await response.json();
          setData(result);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
    
      fetchData();
    }, []);

    const handleUpdateClick = (id, username, message) => {
      window.location.href = `http://localhost:5173/addMessages?id=${id}&username=${username}&message=${message}`;
    };

  return (
    <>
     <div>
        {data.map((item, index) => (
        <div key={index} className="post">
          <p className='username'>{item.username}</p>
          <div className='message_background'>
          <p className='message'>{item.message}</p></div>
          <p className='username'>{new Date(item.createdAt).toLocaleDateString()} {new Date(item.createdAt).toLocaleTimeString()}</p>
          
          <button className='updatebutton' onClick={() => handleUpdateClick(item.id, item.username, item.message)}>Update</button>
        </div>
        ))}
      </div>
    </>
  );
}

export default MessageComponent;