import React from 'react';
import Header from '../components/header/header';
import './about.css'


function About () {
    return (
        <>
        <div className="about-wrapper">
            <div className="about-container">
                <div className="header-container">
                    <Header/>
                </div>
                <div className="biography-container">
                    <img src="/images/portrait.JPG" alt="portrait of me" className="portrait"/> 
                    <div className="biography-text-container">
                        <p className="biography-text">
                        Hey 👋🏽 I’m Brandon — a Computer Science student at the University of Notre Dame from South Jersey. I’ve built everything from front-end web designs to autonomous navigation systems,
                        and I’m especially drawn to spaces where code becomes an expression — like robotics, audio signal processing, and graphic design.
                        </p>
                        <p className="biography-text">
                        I also love people. As a first-generation Hispanic 
                        student, I care deeply about the communities that helped raise me — and I want to pass along the knowledge, 
                        support, and confidence I wish I had when starting out. Big shoutout to the Hammonton Health Coalition, 
                        ColorStack, and SOLES (formerly SHPE) — the kind of communities that remind me why I’m doing this in the first 
                        place. 
                        </p>
                        <p className="biography-text">
                        Outside the screen, you can usually find me in the gym, on the basketball court, or overthinking a Spotify playlist. 
                        I’m always looking to connect, collaborate, or just talk shop about tech and design.
                    </p>
                    </div>
                   </div> 
            </div>
            <img src="/images/techstack.png" alt="techstack of my most frequently used languages and tools: 
                    python, javascript, c/c++, git/github, bash/terminal, react.js, and node.js" className="techstack"/>    
        </div>
        </>
    )
};
export default About

