import React, { useEffect}  from 'react';
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

function Hero () {
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
                <div className='intro-container'>
                    <h2 className="intro-greeting">
                        👋 hi. i'm Brandon.
                    </h2>
                    <p className="intro-elements">
                        i am a handsome computer science student at Notre Dame. they call me baby jalen brunson, but taller and with bounce.
                        modern burst fade. 
                        my program will create a perfect march madness bracket. 
                        the best software engineer - mi abuela. 
                        go birds.
                    </p>
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