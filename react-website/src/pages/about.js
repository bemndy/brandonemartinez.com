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
                        support, and confidence I wish I had when starting out. I am involved with the Hammonton Health Coalition, 
                        ColorStack and HSF Foundation. 
                        </p>
                        <p className="biography-text">
                        Blog bubbles coming soon...           New animations coming soon...            Music recs coming soon... New robots coming soon...
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

