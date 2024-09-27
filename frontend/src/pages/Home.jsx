import React from 'react';
import MessageComponent from '../components/message/message.jsx';
import Header from '../components/header/header.jsx';

function Home() {
  return (
    <>
    <div className='background'>
        <div className='app'>
            <div className='content'>
            <Header />
            <MessageComponent />
            </div>
        </div>
    </div>
    </>
  )
}

export default Home;