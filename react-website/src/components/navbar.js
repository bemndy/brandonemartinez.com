import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
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
                    <Link to ="/projects" className="nav-logo"> 
                        <div className="logo-container"> 
                            <img src="/images/logo.png" alt="bem.logo" className="logo"/> 
                        </div>
                    </Link>
                    <ul className="nav">
                        <li className ="nav-element">
                        <Link to='/projects' className="nav-links">Projects
                            </Link>
                        </li>
                        <li className ="nav-element">
                        <Link to='/about' className="nav-links">About
                            </Link>
                        </li>
                        <li className ="nav-element">
                            <Link to='/misc' className="nav-links">Misc
                            </Link>
                        </li>
                        <li className ="nav-element">
                            <Link to='/cirriculum-vitae' className="nav-links">CV
                            </Link>
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