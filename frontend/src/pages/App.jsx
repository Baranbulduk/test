import React from 'react';
import "./App.css"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home.jsx';
import AddMessages from './AddMessages.jsx';
import ErrorMessage from './ErrorMessage.jsx';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/addmessages" element={<AddMessages/>} />
          <Route path="/error" element={<ErrorMessage/>} />
        </Routes>
      </Router>
    </>
  )
}

export default App;

