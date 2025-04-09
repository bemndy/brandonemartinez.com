import React, { useEffect, useState}  from 'react';
import Header from '../components/header';
import StickyFooter  from '../components/footer';


import Lenis from '@studio-freight/lenis';
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import './hero.css'


gsap.registerPlugin(ScrollTrigger)

const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
})

function raf(time) {
    lenis.raf(time)
    requestAnimationFrame(raf)
}

requestAnimationFrame(raf)


const texts = [
    'i am an asipiring full-stack software engineer, studying computer science at Notre Dame.',
    'correction, a handsome computer science student at Notre Dame!',
    'i work on projects that involve machine-learning, data engineering, and robotics.',
    'i play the piano and guitar by ear... someone teach me theory though.',
    'the best way to reach me is by email!',
    'sorry mobile users...',
    'the best software engineer - mi abuela.',
    "Time's person of the year in 2006.",
    'they call me baby jalen brunson, but taller and with bounce.',
    'one day i will migrate this to next.js... one day.',
    'relax, right now its just react, next is so gooood though.',
    'i will not be replaced by ai... (cope).',
    'if you move your cursor, colors.',
    'modern burst fade...thats it.',
    'go birds.',
    'thanks for visiting my website!',

]
const randomText = texts[Math.floor(Math.random() * texts.length)];

function Hero () {
    const [index, setIndex] = useState(0);
    const [displayedText, setDisplayedText] = useState("");
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        const fullText = texts[index];
        let typingSpeed = isDeleting ? 40 : 60;
      
        const handleTyping = () => {
          if (!isDeleting) {
            const nextText = fullText.slice(0, displayedText.length + 1);
            setDisplayedText(nextText);
      
            if (nextText === fullText) {
              setTimeout(() => setIsDeleting(true), 4000);
            }
          } else {
            const nextText = fullText.slice(0, displayedText.length - 1);
            setDisplayedText(nextText);
      
            if (nextText === "") {
              setIsDeleting(false);
              setIndex((prev) => (prev + 1) % texts.length);
            }
          }
        };
      
        const timeout = setTimeout(handleTyping, typingSpeed);
      
        return () => clearTimeout(timeout);
      }, [displayedText, isDeleting, index]);
      

    useEffect(() => {
        const interBubble = document.querySelector('.interactive');
        let curX = 0;
        let curY = 0;
        let tgX = 0;
        let tgY = 0;
    
        function move() {
          curX += (tgX - curX) / 20;
          curY += (tgY - curY) / 20;
          if (interBubble) {
            interBubble.style.transform = `translate(${Math.round(curX)}px, ${Math.round(curY)}px)`;
          }
          requestAnimationFrame(move);
        }
    
        function handleMouseMove(event) {
          tgX = event.clientX;
          tgY = event.clientY;
        }
    
        window.addEventListener('mousemove', handleMouseMove);
        move();
    
        return () => {
          window.removeEventListener('mousemove', handleMouseMove);
        };
      }, []);


    return (
        <>
            <div className='hero-wrapper'>
                <div className='gradient-bg'>
                    <svg xmlns="http://www.w3.org/2000/svg">
                        <defs>
                            <filter id="goo">
                            <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
                            <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8" result="goo" />
                            <feBlend in="SourceGraphic" in2="goo" />
                            </filter>
                        </defs>
                    </svg>
                    <div className='gradient-container'>
                        <div className='g1'></div>
                        <div className="g2"></div>
                        <div className="g3"></div>
                        <div className='g4'></div>
                        <div className="g5"></div>
                        <div className="interactive"></div>
                    </div>
                </div>
                <div className="intro-container">
                    <h2 className="intro-greeting">👋 hi, i'm Brandon.</h2>
                    <div className="typewriter-container"><span className="typewriter-text">{displayedText}</span>
                    </div>
                </div>
                <Header/>
                <div className='project-container'>
                    <div className="project-item">
                        <div className="project-name">Aruco Detection</div>
                        <div className="project-box"></div>
                    </div>
                    <div className="project-item">
                        <div className="project-name">Coming Soon</div>
                        <div className="project-box"></div>
                    </div>
                    <div className="project-item">
                        <div className="project-name">Coming Soon</div>
                        <div className="project-box"></div>
                    </div>
                    <div className="project-item">
                        <div className="project-name">Coming Soon</div>
                        <div className="project-box"></div>
                    </div>
                    <div className="project-item">
                        <div className="project-name">Coming Soon</div>
                        <div className="project-box"></div>
                    </div>
                    <div className="project-item">
                        <div className="project-name">Coming Soon</div>
                        <div className="project-box"></div>
                    </div>
                    <div className="project-item">
                        <div className="project-name">Coming Soon</div>
                        <div className="project-box"></div>
                    </div>
                    <div className="project-item">
                        <div className="project-name">Coming Soon</div>
                        <div className="project-box"></div>
                    </div>
                    <div className="project-item">
                        <div className="project-name">Sentiment Analysis</div>
                        <div className="project-box"></div>
                    </div>
                    <div className="project-item">
                        <div className="project-name">Coming Soon</div>
                        <div className="project-box"></div>
                    </div>
                    <div className="project-item">
                        <div className="project-name">Coming Soon</div>
                        <div className="project-box"></div>
                    </div>
                    <div className="project-item">
                        <div className="project-name">Coming Soon</div>
                        <div className="project-box"></div>
                    </div>
                    <div className="project-item">
                        <div className="project-name">Spotify Local</div>
                        <div className="project-box"></div>
                    </div>
                    <div className="project-item">
                        <div className="project-name">Coming Soon</div>
                        <div className="project-box"></div>
                    </div>
                    <div className="project-item">
                        <div className="project-name">Game of Life Console</div>
                        <div className="project-box"></div>
                    </div>
                    <div className="project-item">
                        <div className="project-name">Coming Soon</div>
                        <div className="project-box"></div>
                    </div>
                </div>
                <StickyFooter>
                </StickyFooter>
            </div>
        </>
    )
};
export default Hero