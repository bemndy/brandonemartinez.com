import { useState } from 'react'
import './Footer.css'

const EMAIL = 'brandn.martinez5@gmail.com'

function CopyEmailLink() {
    const [copied, setCopied] = useState(false)

    const handleClick = async (e) => {
        // Let modifier-clicks / middle-clicks behave like a normal mailto link.
        if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return
        e.preventDefault()
        try {
            await navigator.clipboard.writeText(EMAIL)
            setCopied(true)
            setTimeout(() => setCopied(false), 1500)
        } catch {
            window.location.href = `mailto:${EMAIL}`
        }
    }

    return (
        <a href={`mailto:${EMAIL}`} onClick={handleClick}>
            {copied ? 'Copied!' : 'Email'}
        </a>
    )
}

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
                            <CopyEmailLink />
                        </li>
                        <li className="footer-links">
                            <a
                            href="/resume-2026-08-28.pdf"
                            target="_blank"
                            >
                                Curriculum Vitae
                            </a>
                        </li>
                    </ul>
                </div>
                <div className="credit-container">
                    <div className="copyright">updated: 08/29/26</div>
                    <div className="copyright">bem&copy;2026</div>
                </div>
            </div>
        </div>
    )
}

export default StickyFooter