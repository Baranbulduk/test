import React from 'react';
import './header.css';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <>
    <header>
    <Link to="/"><button className='button'>Home</button></Link>
    <Link to="/addMessages"><button className='button'>+</button></Link>
    </header>
    </>
  )
}

export default Header;