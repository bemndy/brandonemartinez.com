import React from 'react';
import './header.css'
import { FlipLink } from '../linkwrap/linkwrap';

function Header() { 
    return (
        <>
            <div className='header-wrapper'>
                <div className='header-box'>
                    <div className='header-text'>Contact Me</div>
                    <FlipLink>
                       <a className='header-text'
                        href="mailto:brandonprvbox@gmail.com">
                        brandonprvbox@gmail.com
                        </a>
                    </FlipLink>
                </div>
            </div>
        </>
    )
}

export default Header