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
            'https://api.spotify.com/v1/me/top/tracks?time_range=short_term&limit=1',
            { headers: { Authorization: `Bearer ${access_token}` } }
        );

        if (!response.ok) {
            return res.status(200).json({ found: false });
        }

        const data = await response.json();

        if (!data.items || data.items.length === 0) {
            return res.status(200).json({ found: false });
        }

        const track = data.items[0];

        return res.status(200).json({
            found: true,
            title: track.name,
            artist: track.artists.map(a => a.name).join(', '),
        });
    } catch {
        return res.status(200).json({ found: false });
    }
}
