import React from 'react'
import './footer.css'
import { FlipLink } from '../linkwrap/linkwrap'

export function StickyFooter() {
    return (
        <div className="footer-wrapper">
            <div className="footer-container">
                <div className="social-container">
                    <ul className="footer-list">
                        <li className="footer-links">
                            <FlipLink>
                            <span>&#x2192;</span>
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
                            <span>&#x2192;</span>
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
                            <span>&#x2192;</span>
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
                            <span>&#x2192;</span>
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
                            <span>&#x2192;</span>
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
                <div className="credit-container">
                    <div className="copyright">updated: 1/29/26</div>
                    <div className="copyright">bem&copy;2026</div>
                </div>
            </div>
        </div>
    )
}

export default StickyFooter