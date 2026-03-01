import { useEffect } from 'react';
import Header from '../components/header/header';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './about.css'

gsap.registerPlugin(ScrollTrigger)

function About () {
    useEffect(() => {
        gsap.fromTo(".about-logo",
            { opacity: 1, y: 0 },
            {
                opacity: 0,
                y: -30,
                ease: "none",
                scrollTrigger: {
                    trigger: ".about-logo",
                    start: "top 30%",
                    end: "top 0%",
                    scrub: true
                }
            }
        );
    }, []);
    return (
        <>
        <div className="about-wrapper">
            <div className="about-container">
                <div className="header-container">
                    <Header/>
                </div>
                <img src="/images/lucky2.png" alt="2$ bill" className="about-logo"/>
                <div className="biography-container">
                    <div className="biography-text-container">
                        <div className="biography-header-container">
                          <div className="biography-emoji">💙</div>
                          <span>
                            <div className="biography-title">Brandon E Martinez</div>
                            <div className="biography-subtitle">CS @ <a href="https://cse.nd.edu/" target="_blank" rel="noopener noreferrer">Notre Dame</a></div>
                          </span>
                        </div>
                        <p className="biography-text">
                        I'm currently the Undergraduate Software Lead for <a href="https://www.linkedin.com/company/domer-rover" target="_blank" rel="noopener noreferrer">Domer Rover</a>, where we're building
                        a fully autonomous rover.
                        </p> 
                        <p className="biography-text">
                        I'm drawn to the intersection of technical rigor and 
                        creative expression—building systems where clean code enables unique user experiences.
                        </p> 
                        <p className="biography-text">
                        I’m a builder at heart and a novice by choice—always 
                        learning, always iterating, and always looking for the next challenge. This site is a work in progress 
                        (as am I).
                        </p>
                    </div>
                    <img src="/images/portrait.JPG" alt="portrait of me" className="portrait"/> 
                </div> 
            </div>
        </div>
        </>
    )
};
export default About

