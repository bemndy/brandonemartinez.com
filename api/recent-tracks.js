import { clearCachedAccessToken, getAccessToken, setCacheHeaders, setNoCacheHeaders } from './_spotify.js';

/**
 * The past week of listening, aggregated from recently-played.
 *
 * Spotify's top-tracks endpoint has no one-week range (short_term is roughly
 * four weeks), so the week is built from play history instead: every play in
 * the last seven days, grouped by track and ranked by play count. Spotify only
 * returns the most recent 50 plays, so on a heavy week this is "the last 50
 * plays" rather than the full seven days — `plays` in the response says how
 * many were counted.
 *
 * The same plays feed the listening analysis (hour-of-day histogram, repeat
 * and variety rates), so the page makes one request for both sections.
 *
 * Needs the user-read-recently-played scope. A refresh token minted before
 * that scope was added gets a 401/403 here; rather than an empty section, the
 * route falls back to short_term top tracks and says so with `range`.
 */
const CACHE_MAX_AGE_S = 10 * 60;
const CACHE_SWR_S = 60 * 60;

const WEEK_MS = 7 * 24 * 60 * 60 * 1000;
const MAX_TRACKS = 10;

// Hours are bucketed in the owner's local time, not the server's (UTC) or the
// visitor's — "listens late at night" should mean late in Philadelphia.
const OWNER_TZ = 'America/New_York';
const hourFormat = new Intl.DateTimeFormat('en-US', { timeZone: OWNER_TZ, hour: 'numeric', hourCycle: 'h23' });

const toTrack = (track) => ({
    id: track.id,
    title: track.name,
    artist: track.artists.map(a => a.name).join(', '),
    artistIds: track.artists.map(a => a.id),
    songUrl: track.external_urls.spotify,
});

function summarize(items, now) {
    const plays = items.filter(item => now - Date.parse(item.played_at) <= WEEK_MS);

    const byTrack = new Map();
    const artistPlays = new Map();
    const hours = new Array(24).fill(0);

    for (const { track, played_at } of plays) {
        const entry = byTrack.get(track.id) ?? { ...toTrack(track), plays: 0, lastPlayed: 0 };
        entry.plays += 1;
        entry.lastPlayed = Math.max(entry.lastPlayed, Date.parse(played_at));
        byTrack.set(track.id, entry);

        const lead = track.artists[0];
        if (lead) {
            const a = artistPlays.get(lead.id) ?? { name: lead.name, plays: 0 };
            a.plays += 1;
            artistPlays.set(lead.id, a);
        }

        hours[Number(hourFormat.format(new Date(played_at))) % 24] += 1;
    }

    const tracks = [...byTrack.values()]
        .sort((a, b) => b.plays - a.plays || b.lastPlayed - a.lastPlayed)
        .slice(0, MAX_TRACKS)
        .map(({ id, title, artist, songUrl, plays: count }) => ({ id, title, artist, songUrl, plays: count }));

    const topArtist = [...artistPlays.values()].sort((a, b) => b.plays - a.plays)[0] ?? null;
    const night = [22, 23, 0, 1, 2, 3, 4].reduce((sum, h) => sum + hours[h], 0);

    return {
        tracks,
        stats: plays.length === 0 ? null : {
            plays: plays.length,
            distinctTracks: byTrack.size,
            distinctArtists: artistPlays.size,
            topArtist,
            // Share of plays that were a track already played this week.
            repeatRate: (plays.length - byTrack.size) / plays.length,
            nightRate: night / plays.length,
            hours,
        },
    };
}

async function topTracksFallback(accessToken) {
    const response = await fetch(
        `https://api.spotify.com/v1/me/top/tracks?time_range=short_term&limit=${MAX_TRACKS}`,
        { headers: { Authorization: `Bearer ${accessToken}` } }
    );
    if (!response.ok) return null;
    const data = await response.json();
    return (data.items ?? []).map(track => {
        const { id, title, artist, songUrl } = toTrack(track);
        return { id, title, artist, songUrl, plays: null };
    });
}

export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');

    try {
        const accessToken = await getAccessToken();

        const response = await fetch(
            'https://api.spotify.com/v1/me/player/recently-played?limit=50',
            { headers: { Authorization: `Bearer ${accessToken}` } }
        );

        if (response.status === 401 || response.status === 403) {
            // 403 is almost always the missing scope rather than a bad token,
            // so try the scope we do have before giving up on the token.
            const fallback = await topTracksFallback(accessToken);
            if (fallback) {
                setCacheHeaders(res, { maxAge: CACHE_MAX_AGE_S, staleWhileRevalidate: CACHE_SWR_S });
                return res.status(200).json({ found: fallback.length > 0, range: 'short_term', tracks: fallback, stats: null });
            }
            clearCachedAccessToken();
            setNoCacheHeaders(res);
            return res.status(200).json({ found: false, error: `spotify recently-played failed: ${response.status}` });
        }

        if (!response.ok) {
            setNoCacheHeaders(res);
            return res.status(200).json({ found: false, error: `spotify recently-played failed: ${response.status}` });
        }

        const data = await response.json();
        const { tracks, stats } = summarize(data.items ?? [], Date.now());

        if (tracks.length === 0) {
            setNoCacheHeaders(res);
            return res.status(200).json({ found: false, range: 'week', tracks: [], stats: null });
        }

        setCacheHeaders(res, { maxAge: CACHE_MAX_AGE_S, staleWhileRevalidate: CACHE_SWR_S });
        return res.status(200).json({ found: true, range: 'week', tracks, stats });
    } catch (err) {
        console.error('recent-tracks error:', err.message);
        setNoCacheHeaders(res);
        return res.status(200).json({ found: false, error: err.message });
    }
}
