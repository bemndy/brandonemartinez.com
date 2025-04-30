import React, { useEffect, useState }  from 'react';
import Header from '../components/header/header';
import StickyFooter  from '../components/footer/footer';
import Project from '../components/project/project'
import Lenis from '@studio-freight/lenis';
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './hero.css'


gsap.registerPlugin(ScrollTrigger)

const lenis = new Lenis({
    duration: 1.5,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
})

function raf(time) {
    lenis.raf(time)
    requestAnimationFrame(raf)
}

requestAnimationFrame(raf)

const projects = [
  {
    title: "VIM Completion",
    source: "sent.png",
    color: "white",
    category: "Backend",
    date: "APR 2025"
  },
  {  
    title: "Spotify Features",
    source: "c2fy.png",
    color: "blue",
    category: "Frontend",
    date: "MAR 2025"
  },
  {
    title: "Pose Estimation",
    source: "pest.png",
    color: "red",
    category: "Backend",
    date: "DEC 2024"
  },
  {
    title: "Conway Console",
    source: "sent.png",
    color: "white",
    category: "Backend",
    date: "NOV 2024"
  },
  {
    title: "Sentimental Analysis",
    source: "sent.png",
    color: "white",
    category: "Data",
    date: "OCT 2024"
  }
]

function Hero () {
    const [modal, setModal] = useState({active: false, index: 0})
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
    
      window.addEventListener('mousemove', (event) => {
        tgX = event.clientX;
        tgY = event.clientY;
      });
    
      move();
    });    
      useEffect(() => {
        gsap.fromTo(".projects-container", 
          { opacity: 0, y: 100 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: ".projects-container",
              start: "top 80%",
              toggleActions: "play none none reverse",
              scrub: true
            }
          }
        );
      }, []);
      useEffect(() => {
        gsap.fromTo(".intro-container",
          { opacity: 1, y: 0 },
          {
            opacity: 0,
            y: -100,
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: ".projects-container",
              start: "top 135%",
              toggleActions: "play none none reverse",
              scrub: true
            }
          }
        );
      }, []);       
    return (
            <div className='hero-wrapper'>
                <div className='gradient-bg'>
                <svg xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <filter id="goo">
                      <feGaussianBlur in="SourceGraphic" stdDeviation="20" result="blur" />
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
                    <h2 className="greeting"><span className="greeting-cursive">B</span>RANDON E 
                    <span className="greeting-cursive">M</span>ARTINEZ</h2>
                    <h2 className="greeting">FULL-STACK SOFTWARE</h2>
                    <h2 className="greeting-pixelated">☀DEVELOPER☀</h2>
                    <h2 className="greeting">CURRENTLY<span className="greeting-cursive">@</span> 
                    NOTRE DAME</h2>
                    <h2 className="greeting-pixelated">BEM©2025✨</h2>
                    <div className="typewriter-container"><span className="typewriter-text"></span>
                </div>
                </div>
                <Header className="header"/>
                <div className='projects-container'>
                  <div className='project-header'>
                    <div className='projects-header'>project</div>
                    <div className='projects-header'>category</div>
                    <div className='projects-header'>date</div>
                  </div>
                  {
                    projects.map( (project, index) => { 
                      return <Project key={index} index={index} title={project.title} category={project.category}
                      date = {project.date} setModal={setModal}/>
                    })
                  }   
                  <div className='space'></div>
                </div>
                <StickyFooter>
                </StickyFooter>
            </div>
    )
};
export default Hero