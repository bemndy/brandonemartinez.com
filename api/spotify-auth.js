/**
 * Temporary one-time route to kick off the Spotify authorize flow.
 * Delete along with api/spotify-callback.js once you have a fresh refresh token.
 */

const SCOPES = ['user-read-currently-playing', 'user-top-read'].join(' ');

export default function handler(req, res) {
    const REDIRECT_URI = `https://${req.headers.host}/api/spotify-callback`;

    const params = new URLSearchParams({
        client_id: process.env.SPOTIFY_CLIENT_ID,
        response_type: 'code',
        redirect_uri: REDIRECT_URI,
        scope: SCOPES,
    });

    res.redirect(`https://accounts.spotify.com/authorize?${params.toString()}`);
}
