import React from 'react';
import { NavLink } from 'react-router-dom';
import { FlipLink } from '../linkwrap/linkwrap';
import './navbar.css';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="nav-container">
        <NavLink to="/" className="nav-logo">
          bem.
        </NavLink>

        {/* Navigation Links List */}
        <ul className="nav-list">
          <li className="nav-item">
            <NavLink
              to="/"
              className={({ isActive }) =>
                "nav-link" + (isActive ? " active" : "")
              }
            >
              <FlipLink>Projects</FlipLink>
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink 
              to="/about" 
              className="nav-link" 
            >
              <FlipLink>Bio</FlipLink>
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink 
              to="/misc" 
              className="nav-link" 
            >
              <FlipLink>Misc</FlipLink>
            </NavLink>
          </li>
          <li className="nav-item">
            <a
              href="/resume.pdf"
              className="nav-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FlipLink>CV</FlipLink>
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
