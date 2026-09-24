/**
 * Shared Spotify helpers for the API routes.
 *
 * Files prefixed with _ are not routed by Vercel, so this is a plain module
 * the handlers import rather than an endpoint of its own.
 *
 * Two things live here:
 *
 * 1. getAccessToken() — a refresh-token exchange with an in-memory cache.
 *    Spotify access tokens last an hour, but every request was exchanging the
 *    refresh token again before doing any real work, which doubled the round
 *    trips and burned rate limit on the token endpoint. The cache is scoped to
 *    a warm serverless instance: a cold start just refreshes once more, which
 *    is the same cost as before.
 *
 * 2. setCacheHeaders() — CDN caching for responses that are the same for every
 *    visitor. These endpoints serve one person's listening data, so a response
 *    cached at the edge is correct for everyone who asks for it in that
 *    window.
 */

/**
 * Cached token, shared by every handler in a warm instance.
 * `expiresAt` is a timestamp in ms, not the raw expires_in seconds.
 */
let cachedToken = null;

/**
 * Refresh a little early so a token can't expire in flight between this check
 * and Spotify receiving the request it authorizes.
 */
const EXPIRY_MARGIN_MS = 60 * 1000;

export const getAccessToken = async () => {
    if (cachedToken && Date.now() < cachedToken.expiresAt - EXPIRY_MARGIN_MS) {
        return cachedToken.accessToken;
    }

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

    const data = await res.json();

    // expires_in is seconds and is normally 3600; fall back to that if Spotify
    // ever omits it rather than caching a token with an unknown lifetime.
    const expiresInMs = (data.expires_in ?? 3600) * 1000;
    cachedToken = {
        accessToken: data.access_token,
        expiresAt: Date.now() + expiresInMs,
    };

    return cachedToken.accessToken;
};

/** Drop the cached token so the next call re-exchanges the refresh token. */
export const clearCachedAccessToken = () => {
    cachedToken = null;
};

/**
 * Let the CDN serve this response to other visitors for `maxAge` seconds, and
 * keep serving the stale copy for `staleWhileRevalidate` seconds while it
 * refreshes in the background — so a visitor never waits on Spotify for a
 * response that has simply aged out.
 *
 * Only s-maxage is set, so browsers still revalidate on their own and a
 * reload shows current data.
 */
export const setCacheHeaders = (res, { maxAge, staleWhileRevalidate }) => {
    res.setHeader(
        'Cache-Control',
        `public, s-maxage=${maxAge}, stale-while-revalidate=${staleWhileRevalidate}`
    );
};

/** Errors and empty results shouldn't be cached over a working response. */
export const setNoCacheHeaders = (res) => {
    res.setHeader('Cache-Control', 'public, s-maxage=0, must-revalidate');
};
