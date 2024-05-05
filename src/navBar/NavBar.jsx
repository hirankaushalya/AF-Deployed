import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';
import { auth } from '../components/firebase';

const NavBar = () => {
    async function handleLogout() {
        try {
          await auth.signOut();
          window.location.href = "/login";
          console.log("User logged out successfully!");
        } catch (error) {
          console.error("Error logging out:", error.message);
        }
      }

  return (
    <nav className='nav'>
      <Link to='/home' className='site-title'>
        Nasa APIs
      </Link>
      <ul>
        
        
        <li>
          <Link to='/apod'>Apod</Link>
        </li>
        <li>
          <Link to='/rover'>Rover</Link>
        </li>
        <li className='logout'>
          <button onClick={handleLogout}>Logout</button>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
