import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './navbar.css'
import { Button } from './button';


function Navbar() { 
    const [menuOpen, setMenuOpen] = useState(false);

    const handleToggle = () => {
        setMenuOpen((prev) => !prev);
    };

    const closeMenu = () => {
        setMenuOpen(false);
    };

    return (
        <>
            <nav className="navbar">
                <div className ="nav-container">    
                    <NavLink to ="/" className="nav-logo"> 
                        <div className="logo-container"> 
                            <img src="/images/logo.png" alt="bem. logo" className="logo"/> 
                        </div>
                    </NavLink>
                    <ul>
                        <li className ="nav-element">
                            <NavLink 
                            to='/' 
                            className={({ isActive }) => "nav-links" + (isActive ? " active" : "")}>
                                Projects
                            </NavLink>
                        </li>
                        <li className ="nav-element">
                            <NavLink 
                            to='/about' 
                            className="nav-links">About
                            </NavLink>
                        </li>
                        <li className ="nav-element">
                            <NavLink 
                            to='/misc' 
                            className="nav-links">Misc
                            </NavLink>
                        </li>
                        <li className ="nav-element">
                            <a
                            href="/resume.pdf"
                            className="nav-links"
                            target="_blank"
                            rel="noopener noreferrer">CV
                            </a>
                        </li>
                    </ul> 
                    <div className="nav-menu" onClick={handleToggle}>
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar