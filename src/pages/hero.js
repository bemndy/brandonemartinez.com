import React, { useEffect, useState }  from 'react';
import Header from '../components/header/header';
import Project from '../components/project/project'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './hero.css'

// initializating smooth scroll
gsap.registerPlugin(ScrollTrigger)

// TODO: make this exported via json, ordered not mattering (uses forEach callback rightnow)
const projects = [
  {  
    title: "Cozy Cubes",
    source: "c2fy.png",
    color: "blue",
    category: "Fullstack",
    date: "JAN 2026"
  },
  {
    title: "Futbol Object-Detection",
    source: "sent.png",
    color: "white",
    category: "Computer Vision",
    date: "APR 2025"
  },
  { 
    title: "OCV Pose Estimation",
    source: "pest.png",
    color: "red",
    category: "Computer Vision",
    date: "DEC 2024"
  },
  {
    title: "Flappy Bird Terminal",
    source: "sent.png",
    color: "white",
    category: "CLI",
    date: "DEC 2024"
  },
  {
    title: "Game of Life Terminal",
    source: "sent.png",
    color: "white",
    category: "CLI",
    date: "NOV 2024"
  },
  {
    title: "Sentiment Analysis",
    source: "sent.png",
    color: "white",
    category: "Machine Learning",
    date: "SEP 2024"
  },
  {
    title: "Autonomous Robot",
    source: "sent.png",
    color: "black",
    category: "Machine Learning",
    date: "APR 2024"
  }
]

function Hero () {
    const [, setModal] = useState({active: false, index: 0})
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
        // Animate the projects container moving up
        gsap.fromTo(".projects-container", 
          { opacity: 0, y: 150 }, // Increased y for more dramatic "coming up"
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: ".projects-container",
              start: "top 85%", // Start when top of container is near bottom of viewport
              toggleActions: "play none none reverse",
              // scrub: true // Removed scrub to let the animation play out naturally on trigger
            }
          }
        );

        // STAGGERED REVEAL FOR PROJECTS (Left to Right Wipe + Fade)
        gsap.fromTo(".project", 
          { 
            opacity: 0, 
            clipPath: "inset(0 100% 0 0)" // Hidden (clipped from right)
          },
          {
            opacity: 1,
            clipPath: "inset(0 0% 0 0)", // Fully visible
            duration: 0.8,
            stagger: 0.15, // Delay between each project
            ease: "power3.out",
            scrollTrigger: {
              trigger: ".projects-container",
              start: "top 80%",
            }
          }
        );
      }, []);
      useEffect(() => {
        gsap.fromTo(".intro-container",
          { opacity: 1, y: 0 },
          {
            opacity: 0,
            y: -50, // Slight upward movement as it fades
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: ".intro-container", // Changed trigger to self
              start: "top top", // Start fading when top of intro hits top of viewport
              end: "bottom 60%", // Fade out quicker (by the time bottom is 60% up)
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
                  <feGaussianBlur in="SourceGraphic" stdDeviation="25" result="blur" />
                  <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8" result="goo" />
                  <feBlend in="SourceGraphic" in2="goo" />
                  </filter>
              </defs>
          </svg>
          <div className='gradient-container'>
              {/* <div className='g1'></div>
              <div className="g2"></div>
              <div className="g3"></div>
              <div className='g4'></div>
              <div className="g5"></div> */}
              <div className="interactive"></div>
          </div>
        </div>
          <div className="intro-container">
              <h1 className="greeting-header">Brandon E Martinez</h1>
              <h1 className="greeting-header" id="greeting-pixel">cs @ notredame</h1>
              <h1 className="greeting-header">Based in Philadelphia</h1>
              <h1 className="greeting-header">BEM&copy;2026</h1>
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
      </div>
    )
};
export default Hero