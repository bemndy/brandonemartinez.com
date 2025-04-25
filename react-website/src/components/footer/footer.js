import React from 'react'
import './footer.css'
import { FlipLink } from '../linkwrap/linkwrap'

export function  StickyFooter() {
    return (
        <div className='footer-wrapper'>
            <div className='footer-container'>
                <div className="footer-heading">
                    <div className="footer-box">
                        <div className="socials">Socials</div>
                            <ul className="footer-list">
                                <li className="footer-links">
                                    <FlipLink>
                                    <a 
                                    href="https://www.linkedin.com/in/brandon-emart/"
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    >
                                        Linkedin
                                    </a>
                                    </FlipLink>
                                </li>
                                <li className="footer-links">
                                    <FlipLink>
                                    <a 
                                    href="https://github.com/bemndy/"
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    >
                                        Github
                                    </a>
                                    </FlipLink>
                                </li>
                                <li className="footer-links">
                                    <FlipLink>
                                    <a 
                                    href="https://www.instagram.com/brandn.martinez/"
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    >
                                        Instagram
                                    </a>
                                    </FlipLink>
                                </li>
                                <li className="footer-links">
                                    <FlipLink>
                                    <a 
                                    href="https://twitter.com"
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    >
                                        Twitter
                                    </a>
                                    </FlipLink>
                                </li>
                                <li className="footer-links">
                                    <FlipLink>
                                    <a 
                                    href="/resume.pdf"
                                    target="_blank"
                                    >
                                        Curriculum Vitae
                                    </a>
                                    </FlipLink>
                                </li>
                            </ul>
                        </div>
                    <div className="footer-box">
                        <div className="socials">Contact Me</div>
                            <ul className="footer-list">
                                <li className="footer-links">
                                    <a
                                    href="mailto:brandonprvbox@gmail.com">
                                    <FlipLink>brandonprvbox@gmail.com</FlipLink>
                                    </a>
                                    </li>
                                <li className="footer-links"><FlipLink>+1 856 562 3514</FlipLink></li>
                            </ul>
                        </div>
                    <div className='space'></div>
                    <div className="Follow-me">Let's Connect</div>
                </div>
            </div>
        </div>
    )
}

export default StickyFooter

