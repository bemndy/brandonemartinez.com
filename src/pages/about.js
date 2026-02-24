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
                    <div className="biography-text-container">
                        <p className="biography-text">
                        Hello 👋🏽 I'm Brandon,
                        a current junior studying CS @ Notre Dame.
                        I am an aspiring software engineer. I enjoy working on projects where code becomes an expression of creativity and problem solving.
                        I build, own, and operate production systems end-to-end (API, data, UI). I'm strong in Python, C/C++, and modern web frameworks (JavaScript, React)
                        My interests include: Fullstack-dev, ML, and Signal Processing
                        The rest of my site will improve, I promise. Do not hesitate to reach out, I love building.
                        </p>
                    </div>
                    <img src="/images/portrait.JPG" alt="portrait of me" className="portrait"/> 
                </div> 
            </div>
            <img src="/images/techstack.png" alt="techstack of my most frequently used languages and tools: 
                    python, javascript, c/c++, git/github, bash/terminal, react.js, and node.js" className="techstack"/>    
        </div>
        </>
    )
};
export default About

