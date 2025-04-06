import React from 'react';
import { NavLink } from 'react-router-dom';
import './navbar.css'
import { Button } from './button';

function Navbar() { 
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
                            <NavLink 
                            to='/misc'
                            className="nav-links">CV
                            </NavLink>
                        </li>
                    </ul> 
                    <div className="nav-menu">
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