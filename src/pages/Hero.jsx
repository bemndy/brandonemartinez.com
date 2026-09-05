import { useEffect } from 'react';
import NowPlaying from '../components/NowPlaying/NowPlaying';
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './Hero.css'

gsap.registerPlugin(ScrollTrigger)

// Current roles first, then newest to oldest.
const workExperience = [
  {
    year: "Present",
    title: "Autonomous Navigation Research",
    company: "Domer Rover",
    url: "https://www.linkedin.com/company/domer-rover"
  },
  {
    year: "Present",
    title: "Undergraduate Teaching Assistant",
    company: "ND CSE Dept.",
    url: null
  },
  {
    year: "2026",
    title: "Software Engineering",
    company: "Bank of America",
    url: null
  },
  {
    year: "2025",
    title: "IT and Technology",
    company: "Coaction",
    url: null
  },
]

// The project name links to the first of these that exists.
const PRIMARY_ORDER = ['demo', 'repo', 'slides']
const primaryHref = (links) => PRIMARY_ORDER.map(k => links[k]).find(Boolean) ?? null

// Newest first.
const projects = [
  {
    title: "Samplicity",
    date: "Mar 2026",
    links: { repo: "https://github.com/bemndy/samplicity" },
  },
  {
    title: "Cozy Cubes",
    date: "Jan 2026",
    links: {
      repo: "https://github.com/bemndy/cozycubes",
      demo: "https://cozy1.1.brandonemartinez.com/",
    },
  },
  {
    title: "TSMC Chip Tapeout",
    date: "Dec 2025",
    links: {
      slides: "https://docs.google.com/presentation/d/1S66h4YWMyOw442n0hhI9IMdLJCmVEA_f/preview",
    },
  },
  {
    title: "Gerbil Autonomous Robot",
    date: "Nov 2025",
    links: { repo: "https://github.com/Domer-Rover/gerbil-software" },
  },
  {
    title: "Sentiment Analysis",
    date: "Dec 2024",
    links: { repo: "https://github.com/bemndy/pg-sentiment-analysis" },
  },
]

function Hero () {
    useEffect(() => {
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

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
                    scrub: 0.6,
                }
            }
        );
    }, []);

    useEffect(() => {
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

        gsap.fromTo(".section-block",
            { opacity: 0, y: 30 },
            {
                opacity: 1,
                y: 0,
                duration: 0.5,
                stagger: 0.08,
                ease: "power1.out",
                scrollTrigger: {
                    trigger: ".sections-wrapper",
                    start: "top 65%",
                    toggleActions: "play none none reverse",
                }
            }
        );

        gsap.utils.toArray(".section-block").forEach(block => {
            const rows = block.querySelectorAll(".work-entry, .project-row");
            if (!rows.length) return;
            gsap.fromTo(rows,
                { opacity: 0, x: -25 },
                {
                    opacity: 1,
                    x: 0,
                    duration: 0.35,
                    stagger: 0.05,
                    ease: "power1.out",
                    scrollTrigger: {
                        trigger: block,
                        start: "top 65%",
                        toggleActions: "play none none reverse",
                    }
                }
            );
        });
    }, []);
    return (
      <div className='hero-wrapper'>
          <div className="intro-container">
            <div className="intro-headline">
              <h1 className="greeting-header">brandon e martinez</h1>
              {/* <h1 className="greeting-header">swe, ai solutions</h1> */}
              <h1 className="greeting-header" style={{ fontStyle: 'italic' }}>cs @notredame</h1>
              <h1 className="greeting-header">based in philadelphia</h1>
              <h1 className="greeting-header">bem&copy;2026</h1>
              <h1 className="greeting-header">◼</h1>
            </div>
            <div className="about-bio">
              <p>
                I'm a software engineer based in Philadelphia, PA, finishing my Bachelor of
                Science in Computer Science at the University of Notre Dame. I'm currently an
                autonomous navigation researcher at{' '}
                <a href="https://www.linkedin.com/company/domer-rover" target="_blank" rel="noopener noreferrer">Domer Rover</a>.
              </p>
              <p>
                In my free time I speedcube on{' '}
                <a href="https://cozy1.1.brandonemartinez.com" target="_blank" rel="noopener noreferrer">CozyCubes</a>,
                and I'm working on shipping Samplicity, a lightweight music studio suite powered by
                fine-tuned models.
              </p>
            </div>
          </div>
          <div className="sections-wrapper">

            <div className="section-block">
              <div className="section-title">Work Experience</div>
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
              <div className="section-title">Selected Works</div>
              <div className="section-list">
                {projects.map((project, i) => {
                  const href = primaryHref(project.links)
                  return (
                  <div className="project-row" key={i}>
                    <span className="project-row-index">{String(i + 1).padStart(2, '0')}</span>
                    {href
                      ? <a className="project-row-name" href={href} target="_blank" rel="noopener noreferrer">{project.title}</a>
                      : <span className="project-row-name">{project.title}</span>}
                    <span className="project-row-date">{project.date}</span>
                  </div>
                  )
                })}
              </div>
            </div>

            <div className="section-block">
              <div className="section-title" style={{ margin: '0rem 0 1rem 0' }}>Listening</div>
              <NowPlaying />
            </div>

          </div>
      </div>
    )
};
export default Hero