import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import './navbar.css'
import { Button } from './button';

function Navbar() { 
    const [click, setClick] = useState(false);
    const [button, setButton] = useState(true);

    const handleClick = ()  => setClick(!click);
    const closeMobileMenu = () => setClick(false);

    const showButton = () => {
        if (window.innerWidth <= 1280) { 
            setButton(false)
        } else {
            setButton(true)
        }
    };

    useEffect(() => {
        showButton();
    }, []);
    window.addEventListener('resize', showButton);

    return (
        <>
            <nav className="navbar">
                <div className ="nav-container">    
                    <NavLink to ="/projects" className="nav-logo"> 
                        <div className="logo-container"> 
                            <img src="/images/logo.png" alt="bem.logo" className="logo"/> 
                        </div>
                    </NavLink>
                    <ul className="nav">
                        <li className ="nav-element">
                            <NavLink 
                            to='/projects' 
                            className={({ isActive }) => "nav-links" + (isActive ? " active" : "")}>
                                Projects
                            </NavLink>
                        </li>
                        <li className ="nav-element">
                            <NavLink to='/about' className="nav-links">About
                            </NavLink>
                        </li>
                        <li className ="nav-element">
                            <NavLink to='/misc' className="nav-links">Misc
                            </NavLink>
                        </li>
                        <li className ="nav-element">
                            <NavLink to='/cirriculum-vitae' className="nav-links">CV
                            </NavLink>
                        </li>
                    </ul> 
                    {button && <Button buttonStyle='btn--primary'> HELLO
                        <img src="/images/nav.png" alt="nav-img" className="nav-img"/> 
                        </Button>}
                </div>
            </nav>
        </>
    )
}

export default Navbar