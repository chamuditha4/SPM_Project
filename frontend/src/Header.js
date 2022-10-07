import React from 'react'
import  './styles/App.css';
import logo from './images/Blue logo-cropped.png';

function Header() {

  return (
    <div>
      <nav>
            <ul>
            <li><a href="/">Home</a></li>
           
            </ul>
        </nav>
        <img src={logo} id="logo" alt="Logo"></img>
    </div>
  )
}

export default Header