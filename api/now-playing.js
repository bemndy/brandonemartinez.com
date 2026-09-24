import { clearCachedAccessToken, getAccessToken, setCacheHeaders, setNoCacheHeaders } from './_spotify.js';

/**
 * Short window: the track can change at any moment, and the front end polls
 * every 30s, so this only collapses the requests of visitors who happen to be
 * on the page at the same time.
 */
const CACHE_MAX_AGE_S = 15;
const CACHE_SWR_S = 30;

export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');

    try {
        const accessToken = await getAccessToken();

        const response = await fetch(
            'https://api.spotify.com/v1/me/player/currently-playing',
            { headers: { Authorization: `Bearer ${accessToken}` } }
        );

        // A cached token that Spotify has since rejected would keep failing for
        // the rest of this instance's life, so drop it and let the next
        // request exchange the refresh token again.
        if (response.status === 401 || response.status === 403) {
            clearCachedAccessToken();
            setNoCacheHeaders(res);
            return res.status(200).json({ isPlaying: false });
        }

        // 204 = nothing playing
        if (response.status === 204 || response.status >= 400) {
            setCacheHeaders(res, { maxAge: CACHE_MAX_AGE_S, staleWhileRevalidate: CACHE_SWR_S });
            return res.status(200).json({ isPlaying: false });
        }

        const data = await response.json();

        if (!data || !data.item) {
            setCacheHeaders(res, { maxAge: CACHE_MAX_AGE_S, staleWhileRevalidate: CACHE_SWR_S });
            return res.status(200).json({ isPlaying: false });
        }

        setCacheHeaders(res, { maxAge: CACHE_MAX_AGE_S, staleWhileRevalidate: CACHE_SWR_S });
        return res.status(200).json({
            isPlaying: data.is_playing,
            title: data.item.name,
            artist: data.item.artists.map(a => a.name).join(', '),
            album: data.item.album.name,
            albumArt: data.item.album.images[0]?.url ?? null,
            songUrl: data.item.external_urls.spotify,
        });
    } catch (err) {
        console.error('now-playing error:', err.message);
        setNoCacheHeaders(res);
        return res.status(200).json({ isPlaying: false, error: err.message });
    }
}
