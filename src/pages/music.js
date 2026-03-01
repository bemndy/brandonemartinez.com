import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import NowPlaying from '../components/nowplaying/NowPlaying';
import './music.css'
import Header from '../components/header/header';

gsap.registerPlugin(ScrollTrigger)

// Add new entries at the top — song title, artist, date
const songs = [
    { title: "Period Blood", artist: "Roc Marciano", date: "MAR 1" },
];

function SongEntry({ title, artist, date }) {
    return (
        <div className="song-entry">
            <div className="song-entry-left">
                <span className="song-entry-title">{title}</span>
                <span className="song-entry-artist">{artist}</span>
            </div>
            <span className="song-entry-date">{date}</span>
        </div>
    );
}

function Music() {
    useEffect(() => {
        gsap.fromTo(".music-logo",
            { opacity: 1, y: 0 },
            {
                opacity: 0,
                y: -30,
                ease: "none",
                scrollTrigger: {
                    trigger: ".music-logo",
                    start: "top 30%",
                    end: "top 0%",
                    scrub: true
                }
            }
        );
    }, []);

    return (
        <div className="music-wrapper">
            <div className="music-container">
                <div className="header-container">
                    <Header/>
                </div>
                <img src="/images/vinyl2.png" alt="a vinyl record" className="music-logo"/>
                <div className="song-section">
                    <div className="song-section-header">
                        <h2 className="song-title">Song of the day</h2>
                        <NowPlaying />
                    </div>
                    <div className="song-list-header">
                        <span>song</span>
                        <span>date</span>
                    </div>
                    <div className="song-list">
                        {songs.map((s, i) => (
                            <SongEntry key={i} title={s.title} artist={s.artist} date={s.date} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Music
