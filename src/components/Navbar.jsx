import React from 'react';
import "./Navbar.css";

const Navbar = () => {
  return (
    <div>
      <nav>
        <h2 className='ToDoHubHeading'><a href="/">ToDoHub</a></h2>
        <a href="https://www.instagram.com/mddayyan007/" target='_blank' rel="noopener noreferrer">
          <button className='followBtn'><i className="fab fa-instagram"></i> Follow</button>
        </a>
      </nav>
    </div>
  );
}

export default Navbar;
