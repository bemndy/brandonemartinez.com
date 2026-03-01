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

    return res.json();
};

export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');

    try {
        const { access_token } = await getAccessToken();

        const response = await fetch(
            'https://api.spotify.com/v1/me/player/currently-playing',
            { headers: { Authorization: `Bearer ${access_token}` } }
        );

        // 204 = nothing playing, 401/403 = bad token
        if (response.status === 204 || response.status >= 400) {
            return res.status(200).json({ isPlaying: false });
        }

        const data = await response.json();

        if (!data || !data.item) {
            return res.status(200).json({ isPlaying: false });
        }

        return res.status(200).json({
            isPlaying: data.is_playing,
            title: data.item.name,
            artist: data.item.artists.map(a => a.name).join(', '),
            album: data.item.album.name,
            albumArt: data.item.album.images[0]?.url ?? null,
            songUrl: data.item.external_urls.spotify,
        });
    } catch {
        return res.status(200).json({ isPlaying: false });
    }
}