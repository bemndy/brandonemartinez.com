import { useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import NowPlaying from '../components/NowPlaying/NowPlaying';
import './Music.css'

gsap.registerPlugin(ScrollTrigger)

function SongEntry({ title, artist, rank }) {
    return (
        <div className="project-row">
            <span className="project-row-index">{String(rank).padStart(2, '0')}</span>
            <span className="project-row-name">{title}</span>
            <span className="project-row-cat">{artist}</span>
        </div>
    );
}

function Music() {
    const [songs, setSongs] = useState([]);

    useEffect(() => {
        fetch('/api/top-track')
            .then(r => r.json())
            .then(data => setSongs(data.tracks ?? []))
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
                        <div className="section-title" style={{ margin: '0 0 1rem 0' }}>Listening</div>
                        <NowPlaying />
                    </div>
                    <div className="section-block">
                        <div className="section-title">Top Tracks</div>
                        <div className="section-list">
                            {songs.map((s, i) => (
                                <SongEntry key={s.id ?? i} title={s.title} artist={s.artist} rank={i + 1} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Music
