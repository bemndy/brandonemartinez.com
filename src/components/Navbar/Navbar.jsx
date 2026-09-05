import { NavLink } from 'react-router-dom';
import { useDarkMode } from '../../DarkModeContext';
import './Navbar.css';

function Navbar() {
  const { theme, cycleTheme, gradient, cycleGradient } = useDarkMode();
  return (
    <nav className="navbar-wrapper">
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
              Projects
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
              href="/resume-2026-08-28.pdf"
              className="nav-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              CV
            </a>
          </li>
          <li className="nav-item">
            <NavLink
              to="/music"
              className="nav-link nav-icon-link"
            >
              {/* <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-label="Music">
                <path d="M9 18V5l12-2v13"/>
                <circle cx="6" cy="18" r="3"/>
                <circle cx="18" cy="16" r="3"/>
              </svg> */}
              music
            </NavLink>
          </li>
          <li className="nav-item">
            <button
              className="nav-link dark-toggle nav-icon-link"
              onClick={cycleGradient}
              aria-label={`Gradient: ${gradient}`}
            >
              {gradient === 'off' ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-label="Gradient off">
                  <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z"/>
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-label={`Gradient: ${gradient}`}>
                  <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z"/>
                </svg>
              )}
            </button>
          </li>
          <li className="nav-item">
            <button
              className="nav-link dark-toggle nav-icon-link"
              onClick={cycleTheme}
              aria-label="Cycle theme"
            >
              {theme === 'pink' && (
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-label="Pink theme">
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
              )}
              {theme === 'light' && (
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-label="Light theme">
                  <circle cx="12" cy="12" r="9"/>
                  <path d="M12 3a9 9 0 0 1 0 18z" fill="currentColor" stroke="none"/>
                </svg>
              )}
              {theme === 'dark' && (
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-label="Dark theme">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
                </svg>
              )}
              {theme === 'intense' && (
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-label="Intense pink theme">
                  <path d="M12 21s-7-4.6-9.5-9A5.5 5.5 0 0112 5.5 5.5 5.5 0 0121.5 12c-2.5 4.4-9.5 9-9.5 9z"/>
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
