import React, { useState } from 'react';
import { NavLink } from 'react-router-dom'
import { FlipLink } from '../linkwrap/linkwrap'
import './navbar.css'
import { Button } from '../button/button';


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
                        <li>
                            <NavLink
                            to='/' 
                            className={({ isActive }) => "nav-links" + (isActive ? " active" : "")}>
                                <FlipLink>Projects</FlipLink>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                            to='/about' 
                            className="nav-links"><FlipLink>About</FlipLink>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink 
                            to='/misc' 
                            className="nav-links">
                                <FlipLink>Misc</FlipLink>
                            </NavLink>
                        </li>
                        <li>
                            <a
                            href="/resume.pdf"
                            className="nav-links"
                            target="_blank"
                            rel="noopener noreferrer"><FlipLink>CV</FlipLink>
                            </a>
                        </li>
                    </ul> 
                    <div className="nav-menu" onClick={handleToggle}> 
                        <span></span>
                        <span></span>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar