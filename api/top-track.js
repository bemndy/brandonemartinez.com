import { clearCachedAccessToken, getAccessToken, setCacheHeaders, setNoCacheHeaders } from './_spotify.js';

/**
 * Long-term top tracks move over months, not minutes, so this can sit at the
 * edge for an hour and still be current — and stay servable for a day while a
 * refresh happens behind it.
 */
const CACHE_MAX_AGE_S = 60 * 60;
const CACHE_SWR_S = 24 * 60 * 60;

export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');

    try {
        const accessToken = await getAccessToken();

        const response = await fetch(
            'https://api.spotify.com/v1/me/top/tracks?time_range=long_term&limit=50',
            { headers: { Authorization: `Bearer ${accessToken}` } }
        );

        // See now-playing.js: a rejected token would otherwise stay cached for
        // the life of this instance.
        if (response.status === 401 || response.status === 403) {
            clearCachedAccessToken();
            setNoCacheHeaders(res);
            return res.status(200).json({ found: false, error: `spotify top-tracks failed: ${response.status}` });
        }

        if (!response.ok) {
            setNoCacheHeaders(res);
            return res.status(200).json({ found: false, error: `spotify top-tracks failed: ${response.status}` });
        }

        const data = await response.json();

        if (!data.items || data.items.length === 0) {
            setNoCacheHeaders(res);
            return res.status(200).json({ found: false, tracks: [] });
        }

        setCacheHeaders(res, { maxAge: CACHE_MAX_AGE_S, staleWhileRevalidate: CACHE_SWR_S });
        return res.status(200).json({
            found: true,
            tracks: data.items.map(track => ({
                id: track.id,
                title: track.name,
                artist: track.artists.map(a => a.name).join(', '),
                album: track.album.name,
                albumArt: track.album.images[0]?.url ?? null,
                songUrl: track.external_urls.spotify,
            })),
        });
    } catch (err) {
        console.error('top-track error:', err.message);
        setNoCacheHeaders(res);
        return res.status(200).json({ found: false, error: err.message });
    }
}
