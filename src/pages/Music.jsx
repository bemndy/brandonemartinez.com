import { useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import NowPlaying from '../components/NowPlaying/NowPlaying';
import WeekInSound from '../components/WeekInSound/WeekInSound';
import './Music.css'

gsap.registerPlugin(ScrollTrigger)

/*
 * Piano recordings.
 *
 * Deliberately a data array rather than markup: the only thing standing
 * between this section and the real thing is the audio, so adding a recording
 * should be one line here and nothing else. An entry with an `href` renders as
 * a link with its duration; an entry without one renders the pending marker
 * instead, which is honest about the fact that nothing is there yet rather
 * than quietly shipping a dead link.
 *
 * Titles only — no invented links, no invented durations.
 */
const pianoRecordings = [
    { title: 'Untitled improvisation' },
    { title: 'Late night voicings' },
    { title: 'Something slower' },
];

function PianoEntry({ title, href, duration, rank }) {
    return (
        <div className="project-row">
            <span className="project-row-index">{String(rank).padStart(2, '0')}</span>
            {href
                ? <a className="project-row-name" href={href} target="_blank" rel="noopener noreferrer">{title}</a>
                : <span className="project-row-name">{title}</span>}
            {href
                ? <span className="project-row-cat">{duration}</span>
                : <span className="project-row-cat piano-pending">[ recording pending ]</span>}
        </div>
    );
}

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
                        <div className="section-title">This Week</div>
                        <WeekInSound />
                    </div>
                    <div className="section-block">
                        <div className="section-title">Piano</div>
                        <div className="section-list">
                            {pianoRecordings.map((entry, i) => (
                                <PianoEntry key={entry.title} {...entry} rank={i + 1} />
                            ))}
                        </div>
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
