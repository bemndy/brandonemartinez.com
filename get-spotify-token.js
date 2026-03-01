/**
 * Run this once to get your Spotify refresh token.
 * Usage:
 *   SPOTIFY_CLIENT_ID=xxx SPOTIFY_CLIENT_SECRET=yyy node get-spotify-token.js
 *
 * Then paste SPOTIFY_REFRESH_TOKEN into your Vercel environment variables.
 */

const http = require('http');
const https = require('https');

const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
const REDIRECT_URI = 'http://localhost:5000/callback';
const SCOPE = 'user-read-currently-playing';

if (!CLIENT_ID || !CLIENT_SECRET) {
    console.error('❌  Set SPOTIFY_CLIENT_ID and SPOTIFY_CLIENT_SECRET before running.');
    process.exit(1);
}

const authUrl =
    `https://accounts.spotify.com/authorize` +
    `?client_id=${CLIENT_ID}` +
    `&response_type=code` +
    `&redirect_uri=${encodeURIComponent(REDIRECT_URI)}` +
    `&scope=${encodeURIComponent(SCOPE)}`;

console.log('\n1. Make sure  http://localhost:5000/callback  is saved as a Redirect URI in your Spotify app.');
console.log('\n2. Open this URL in your browser:\n');
console.log('   ' + authUrl);
console.log('\n3. Authorize — this script will capture the code automatically...\n');

const server = http.createServer((req, res) => {
    const url = new URL(req.url, 'http://localhost:5000');
    const code = url.searchParams.get('code');
    const error = url.searchParams.get('error');

    if (error) {
        res.end('Authorization denied. Close this tab.');
        server.close();
        console.error('❌  Authorization denied:', error);
        return;
    }

    if (!code) {
        res.end('No code found.');
        return;
    }

    res.end('<h2>All done! Check your terminal for the refresh token. You can close this tab.</h2>');
    server.close();

    // Exchange auth code for tokens
    const basic = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64');
    const body = new URLSearchParams({
        grant_type: 'authorization_code',
        code,
        redirect_uri: REDIRECT_URI,
    }).toString();

    const options = {
        hostname: 'accounts.spotify.com',
        path: '/api/token',
        method: 'POST',
        headers: {
            Authorization: `Basic ${basic}`,
            'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Length': Buffer.byteLength(body),
        },
    };

    const tokenReq = https.request(options, tokenRes => {
        let data = '';
        tokenRes.on('data', chunk => (data += chunk));
        tokenRes.on('end', () => {
            const json = JSON.parse(data);
            if (json.refresh_token) {
                console.log('✅  SPOTIFY_REFRESH_TOKEN:\n');
                console.log('   ' + json.refresh_token);
                console.log('\nAdd this to Vercel → Project Settings → Environment Variables, then redeploy.\n');
            } else {
                console.error('❌  No refresh token returned:', json);
            }
        });
    });

    tokenReq.on('error', err => console.error('Request error:', err));
    tokenReq.write(body);
    tokenReq.end();
});

server.listen(5000, () => {
    console.log('   Listening on http://localhost:5000 ...\n');
});
