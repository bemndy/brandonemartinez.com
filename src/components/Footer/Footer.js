import './Footer.css'

export function StickyFooter() {
    return (
        <div className="footer-wrapper">
            <div className="footer-container">
                <div className="social-container">
                    <ul className="footer-list">
                        <li className="footer-links">
                            <a
                            href="https://www.linkedin.com/in/brandon-emart/"
                            target="_blank"
                            rel="noopener noreferrer"
                            >
                                Linkedin
                            </a>
                        </li>
                        <li className="footer-links">
                            <a
                            href="https://github.com/bemndy/"
                            target="_blank"
                            rel="noopener noreferrer"
                            >
                                Github
                            </a>
                        </li>
                        <li className="footer-links">
                            <a
                            href="https://www.instagram.com/brandn.martinez/"
                            target="_blank"
                            rel="noopener noreferrer"
                            >
                                Instagram
                            </a>
                        </li>
                        <li className="footer-links">
                            <a
                            href="mailto:brandonprvbox@gmail.com"
                            >
                                Email
                            </a>
                        </li>
                        <li className="footer-links">
                            <a
                            href="/resume.pdf"
                            target="_blank"
                            >
                                Curriculum Vitae
                            </a>
                        </li>
                    </ul>
                </div>
                <div className="credit-container">
                    <div className="copyright">updated: 03/29/26</div>
                    <div className="copyright">bem&copy;2026</div>
                </div>
            </div>
        </div>
    )
}

export default StickyFooter