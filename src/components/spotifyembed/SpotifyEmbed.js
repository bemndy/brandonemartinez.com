import './SpotifyEmbed.css';

// url: paste any Spotify share link for a track, album, or playlist
// e.g. https://open.spotify.com/track/4iV5W9uYEdYUVa79Axb7Rh
// compact: true = 80px bar player, false = full 352px player
function SpotifyEmbed({ url, compact = false }) {
    const embedUrl = url
        .replace('open.spotify.com/', 'open.spotify.com/embed/')
        .split('?')[0] + '?utm_source=generator';

    return (
        <iframe
            className="spotify-embed"
            src={embedUrl}
            width="100%"
            height={compact ? 80 : 352}
            frameBorder="0"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
            title="Spotify player"
        />
    );
}

export default SpotifyEmbed;