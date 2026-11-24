import { useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import NowPlaying from '../components/NowPlaying/NowPlaying';
import WeekInSound from '../components/WeekInSound/WeekInSound';
import SectionMark from '../components/SectionMark/SectionMark';
import MiniPiano from '../components/MiniPiano/MiniPiano';
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
/* Section art. Kept as constants so the box-drawing alignment survives
   formatting: every line in a piece is the same width. */
const CASSETTE_ART = [
    '╭────────────────╮',
    '│ ◉ ┄┄┄┄┄┄┄┄┄┄ ◉ │',
    '╰──╱──────────╲──╯',
].join('\n');

const READ_ART = [
    '  ·  ✦    · ',
    ' ✧   ·  ✦   ',
    '   ·    ✧  ·',
].join('\n');

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

function SongEntry({ title, artist, songUrl, plays, rank }) {
    return (
        <div className="project-row">
            <span className="project-row-index">{String(rank).padStart(2, '0')}</span>
            {songUrl
                ? <a className="project-row-name" href={songUrl} target="_blank" rel="noopener noreferrer">{title}</a>
                : <span className="project-row-name">{title}</span>}
            <span className="project-row-cat">
                {artist}
                {plays > 1 && <span className="song-plays" title={`${plays} plays this week`}> ×{plays}</span>}
            </span>
        </div>
    );
}

function Music() {
    const [week, setWeek] = useState({ tracks: [], stats: null, range: 'week' });

    // One request feeds both the track list and the analysis, so they always
    // describe the same plays.
    useEffect(() => {
        fetch('/api/recent-tracks')
            .then(r => r.json())
            .then(data => setWeek({ tracks: data.tracks ?? [], stats: data.stats ?? null, range: data.range ?? 'week' }))
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
                    // Drop the inline opacity/transform once the rows are in:
                    // left behind, inline opacity: 1 beats the stylesheet and
                    // kills the hover dim (.section-list:hover ... opacity).
                    clearProps: "opacity,transform",
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
                <div className="page-fold">
                    <img src="/images/vinyl2.png" alt="a vinyl record" className="music-logo"/>
                </div>
                <div className="sections-wrapper">
                    <div className="section-block">
                        <SectionMark
                            title="Tracks this week"
                            art={CASSETTE_ART}
                            caption="on repeat"
                            sub={week.range === 'week' ? 'the past 7 days' : 'the past 4 weeks'}
                        />
                        <NowPlaying />
                        <div className="section-list songs-list">
                            {week.tracks.map((s, i) => (
                                <SongEntry key={s.id ?? i} {...s} rank={i + 1} />
                            ))}
                        </div>
                    </div>
                    <div className="section-block">
                        <SectionMark
                            title="What this week says"
                            art={READ_ART}
                            caption="the read"
                            sub="patterns in the week"
                        />
                        <WeekInSound stats={week.stats} />
                    </div>
                    <div className="section-block">
                        <SectionMark title="Piano" caption="at the keys" sub="press a key, or tab in and type">
                            <MiniPiano />
                        </SectionMark>
                        <div className="section-list">
                            {pianoRecordings.map((entry, i) => (
                                <PianoEntry key={entry.title} {...entry} rank={i + 1} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Music
