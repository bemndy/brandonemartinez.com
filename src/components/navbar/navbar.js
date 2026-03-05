import React from 'react';
import { NavLink } from 'react-router-dom';
import { FlipLink } from '../linkwrap/linkwrap';
import { useDarkMode } from '../../DarkModeContext';
import './navbar.css';

function Navbar() {
  const { isDark, toggleDark, isGradientOn, toggleGradient } = useDarkMode();
  return (
    <nav className="navbar">
      <div className="nav-container">
        {/* <NavLink to="/" className="nav-logo">
          bem.
        </NavLink> */}

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
          {/* <li className="nav-item">
            <NavLink 
              to="/about" 
              className="nav-link" 
            >
              <FlipLink>Bio</FlipLink>
            </NavLink>
          </li> */}
          {/* <li className="nav-item">
            <NavLink 
              to="/misc" 
              className="nav-link" 
            >
              <FlipLink>Misc</FlipLink>
            </NavLink>
          </li> */} 
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
          <li className="nav-item">
            <NavLink
              to="/music"
              className="nav-link nav-icon-link"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-label="Music">
                <path d="M9 18V5l12-2v13"/>
                <circle cx="6" cy="18" r="3"/>
                <circle cx="18" cy="16" r="3"/>
              </svg>
            </NavLink>
          </li>
          <li className="nav-item">
            <button
              className="nav-link dark-toggle nav-icon-link"
              onClick={toggleGradient}
              aria-label="Toggle gradient"
            >
              {isGradientOn ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-label="Gradient on">
                  <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z"/>
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-label="Gradient off">
                  <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z"/>
                </svg>
              )}
            </button>
          </li>
          <li className="nav-item">
            <button
              className="nav-link dark-toggle nav-icon-link"
              onClick={toggleDark}
              aria-label="Toggle dark mode"
            >
              {isDark ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-label="Light mode">
                  <circle cx="12" cy="12" r="5"/>
                  <line x1="12" y1="1" x2="12" y2="3"/>
                  <line x1="12" y1="21" x2="12" y2="23"/>
                  <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
                  <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
                  <line x1="1" y1="12" x2="3" y2="12"/>
                  <line x1="21" y1="12" x2="23" y2="12"/>
                  <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
                  <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-label="Dark mode">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
                </svg>
              )}
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
