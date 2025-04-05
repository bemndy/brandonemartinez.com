import React from 'react';
import { NavLink } from 'react-router-dom';
import './navbar.css'
import { Button } from './button';

function Navbar() { 
    return (
        <>
            <nav className="navbar">
                <div className ="nav-container">    
                    <NavLink to ="/projects" className="nav-logo"> 
                        <div className="logo-container"> 
                            <img src="/images/logo.png" alt="bem. logo" className="logo"/> 
                        </div>
                    </NavLink>
                    <div className="nav-menu">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                    <ul>
                        <li className ="nav-element">
                            <NavLink 
                            to='/projects' 
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
                            <NavLink 
                            to='/cirriculum-vitae' 
                            className="nav-links">CV
                            </NavLink>
                        </li>
                    </ul> 
                </div>
            </nav>
        </>
    )
}

export default Navbar