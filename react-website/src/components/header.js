import React from 'react';
import './header.css'
import { FlipLink } from './linkwrap';

function Header() { 
    return (
        <>
            <div className='header-wrapper'>
                <div className='header-box'>
                    <div className='header-text'>Contact Me</div>
                    <FlipLink>
                        <div className='header-text'>brandonprvbox@gmail.com</div>  
                    </FlipLink>
                </div>
            </div>
        </>
    )
}

export default Header