/**
 * Temporary one-time route to get your Spotify refresh token.
 * After you have the token, you can delete this file.
 *
 * Setup:
 * 1. Add SPOTIFY_CLIENT_ID and SPOTIFY_CLIENT_SECRET to Vercel env vars
 * 2. Add https://yourdomain.com/api/spotify-callback as a Redirect URI in your Spotify app
 * 3. Deploy, then open the /api/spotify-auth route in your browser to start the flow
 */

export default async function handler(req, res) {
    const code = req.query.code;
    const error = req.query.error;

    if (error) {
        return res.status(400).send(`<h2>Authorization denied: ${error}</h2>`);
    }

    if (!code) {
        return res.status(400).send('<h2>No code received from Spotify.</h2>');
    }

    const REDIRECT_URI = `https://${req.headers.host}/api/spotify-callback`;
    const basic = Buffer.from(
        `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`
    ).toString('base64');

    const tokenRes = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
            Authorization: `Basic ${basic}`,
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
            grant_type: 'authorization_code',
            code,
            redirect_uri: REDIRECT_URI,
        }),
    });

    const data = await tokenRes.json();

    if (!data.refresh_token) {
        return res.status(500).send(`<pre>${JSON.stringify(data, null, 2)}</pre>`);
    }

    res.send(`
        <html><body style="font-family:monospace;padding:2rem;max-width:600px">
        <h2>✅ Got your refresh token!</h2>
        <p>Copy this and add it to Vercel as <strong>SPOTIFY_REFRESH_TOKEN</strong>:</p>
        <textarea rows="4" style="width:100%;font-size:13px;padding:8px" readonly>${data.refresh_token}</textarea>
        <p style="opacity:0.5;font-size:12px;margin-top:1rem">You can delete api/spotify-callback.js after this.</p>
        </body></html>
    `);
}
