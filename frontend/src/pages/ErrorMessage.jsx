import React from 'react';
import Header from '../components/header/header.jsx';

function ErrorMessage() {
  return (
    <>
    <div className='background'>
        <div className='app'>
          <Header />
          <h3 className='errorMessage'>Du har inga meddelanden att visa.</h3>
        </div>
    </div>
    
    <Header />
    </>
  )
}

export default ErrorMessage;