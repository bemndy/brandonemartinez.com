const getAccessToken = async () => {
    const basic = Buffer.from(
        `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`
    ).toString('base64');

    const res = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
            Authorization: `Basic ${basic}`,
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
            grant_type: 'refresh_token',
            refresh_token: process.env.SPOTIFY_REFRESH_TOKEN,
        }),
    });

    if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(`spotify token refresh failed: ${res.status} ${body.error ?? ''}`);
    }

    return res.json();
};

export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');

    try {
        const { access_token } = await getAccessToken();

        const response = await fetch(
            'https://api.spotify.com/v1/me/top/tracks?time_range=long_term&limit=50',
            { headers: { Authorization: `Bearer ${access_token}` } }
        );

        if (!response.ok) {
            return res.status(200).json({ found: false, error: `spotify top-tracks failed: ${response.status}` });
        }

        const data = await response.json();

        if (!data.items || data.items.length === 0) {
            return res.status(200).json({ found: false, tracks: [] });
        }

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
        return res.status(200).json({ found: false, error: err.message });
    }
}
