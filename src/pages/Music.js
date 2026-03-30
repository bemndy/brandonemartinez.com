import { useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import NowPlaying from '../components/NowPlaying/NowPlaying';
import './Music.css'

gsap.registerPlugin(ScrollTrigger)

function SongEntry({ title, artist, date }) {
    return (
        <div className="project-row">
            <div className="project-row-left">
                <span className="project-row-name">{title}</span>
                <span className="project-row-sep"> \ </span>
                <span className="project-row-cat">{artist}</span>
            </div>
            <span className="project-row-date">{date}</span>
        </div>
    );
}

function Music() {
    const [songs, setSongs] = useState([]);

    useEffect(() => {
        fetch('/api/songs')
            .then(r => r.json())
            .then(data => setSongs(data))
            .catch(() => {});
    }, []);

    useEffect(() => {
        gsap.fromTo(".music-logo",
            { opacity: 1, y: 0 },
            {
                opacity: 0,
                y: -40,
                ease: "none",
                scrollTrigger: {
                    trigger: ".music-logo",
                    start: "top top",
                    end: "bottom 50%",
                    scrub: 0.6,
                }
            }
        );

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
            const rows = block.querySelectorAll(".project-row");
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
        <div className="music-wrapper">
            <div className="music-container">
                <img src="/images/vinyl2.png" alt="a vinyl record" className="music-logo"/>
                <div className="sections-wrapper">
                    <div className="section-block">
                        <div className="section-title" style={{ margin: '0 0 1rem 0' }}>● Listening</div>
                        <NowPlaying />
                    </div>
                    <div className="section-block">
                        <div className="section-title">● Song of the Days</div>
                        <div>
                            {songs.map((s, i) => (
                                <SongEntry key={i} title={s.title} artist={s.artist} date={s.date} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Music
