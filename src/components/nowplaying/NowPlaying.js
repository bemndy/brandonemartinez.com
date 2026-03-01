import { useState, useEffect } from 'react';
import './NowPlaying.css';

function NowPlaying() {
    const [track, setTrack] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchNowPlaying = () => {
        fetch('/api/now-playing')
            .then(r => r.json())
            .then(data => {
                setTrack(data.isPlaying ? data : null);
                setLoading(false);
            })
            .catch(() => {
                setTrack(null);
                setLoading(false);
            });
    };

    useEffect(() => {
        fetchNowPlaying();
        const interval = setInterval(fetchNowPlaying, 30000);
        return () => clearInterval(interval);
    }, []);

    if (loading || !track) return null;

    return (
        <a
            className="now-playing"
            href={track.songUrl}
            target="_blank"
            rel="noopener noreferrer"
        >
            <span className="now-playing-dot" />
            {track.albumArt && (
                <img
                    className="now-playing-art"
                    src={track.albumArt}
                    alt={track.album}
                />
            )}
            <div className="now-playing-info">
                <span className="now-playing-title">{track.title}</span>
                <span className="now-playing-artist">{track.artist}</span>
            </div>
        </a>
    );
}

export default NowPlaying;
