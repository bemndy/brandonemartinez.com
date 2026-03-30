import { useEffect } from 'react';
import NowPlaying from '../components/nowplaying/NowPlaying';
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './Hero.css'

gsap.registerPlugin(ScrollTrigger)

const workExperience = [
  {
    year: "2025",
    title: "Autonomous Navigation Research",
    company: "Domer Rover",
    url: "https://www.linkedin.com/company/domer-rover"
  },
  {
    year: "2026",
    title: "Software Engineering Intern",
    company: "Bank of America",
    url: null
  },
]

const projects = [
  { title: "Sentiment Analysis",       category: "Machine Learning", date: "DEC 2024" },
  { title: "Gerbil Autonomous Robot",  category: "Machine Learning", date: "NOV 2025" },
  { title: "TSMC Chip Tapeout",        category: "Hardware",         date: "DEC 2025" },
  { title: "Cozy Cubes",               category: "Fullstack",        date: "JAN 2026" },
  { title: "Samplicity",               category: "Fullstack",        date: "MAR 2026" },
]

function Hero () {
    useEffect(() => {
        gsap.fromTo(".intro-container",
            { opacity: 1, y: 0 },
            {
                opacity: 0,
                y: -40,
                ease: "none",
                scrollTrigger: {
                    trigger: ".intro-container",
                    start: "top top",
                    end: "bottom 50%",
                    scrub: 1.5,
                }
            }
        );
    }, []);

    useEffect(() => {
        gsap.fromTo(".section-block",
            { opacity: 0, y: 40 },
            {
                opacity: 1,
                y: 0,
                duration: 0.7,
                stagger: 0.15,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: ".sections-wrapper",
                    start: "top 85%",
                    toggleActions: "play none none reverse",
                }
            }
        );

        gsap.utils.toArray(".section-block").forEach(block => {
            const rows = block.querySelectorAll(".work-entry, .project-row");
            if (!rows.length) return;
            gsap.fromTo(rows,
                { opacity: 0, x: -50 },
                {
                    opacity: 1,
                    x: 0,
                    duration: 0.5,
                    stagger: 0.08,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: block,
                        start: "top 85%",
                        toggleActions: "play none none reverse",
                    }
                }
            );
        });
    }, []);
    return (
      <div className='hero-wrapper'>
          <div className="intro-container">
            <h1 className="greeting-header">brandon e martinez</h1>
            {/* <h1 className="greeting-header">swe, ai solutions</h1> */}
            <h1 className="greeting-header" style={{ fontStyle: 'italic' }}>cs @notredame</h1>
            <h1 className="greeting-header">based in philadelphia</h1>
            <h1 className="greeting-header">bem&copy;2026</h1>
            <h1 className="greeting-header">◼</h1>
          </div>
          <div className="sections-wrapper">

            <div className="section-block">
              <div className="section-title">● Work Experience</div>
              <div className="section-list">
                {workExperience.map((item, i) => (
                  <div className="work-entry" key={i}>
                    <span className="work-year">{item.year}</span>
                    <span className="work-role">{item.title}</span>
                    {item.url
                      ? <a className="work-company" href={item.url} target="_blank" rel="noopener noreferrer">{item.company}</a>
                      : <span className="work-company">{item.company}</span>
                    }
                  </div>
                ))}
              </div>
            </div>

            <div className="section-block">
              <div className="section-title">● Projects</div>
              <div className="section-list">
                {projects.map((project, i) => (
                  <div className="project-row" key={i}>
                    <div className="project-row-left">
                      <span className="project-row-name">{project.title}</span>
                      <span className="project-row-sep"> \ </span>
                      <span className="project-row-cat">{project.category}</span>
                    </div>
                    <span className="project-row-date">{project.date}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="section-block">
              <div className="section-title" style={{ margin: '0 0 2rem 0' }}>● Listening</div>
              <NowPlaying />
            </div>

          </div>
      </div>
    )
};
export default Hero