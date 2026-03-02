import { Redis } from '@upstash/redis';

const kv = new Redis({
    url: process.env.STORAGE_KV_REST_API_URL,
    token: process.env.STORAGE_KV_REST_API_TOKEN,
});

const FALLBACK_SONGS = [
    { title: "API is not working lol", artist: "Brandon E Martinez", date: "MAR 6" },
];

export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');

    if (req.method === 'OPTIONS') return res.status(200).end();

    if (req.method === 'GET') {
        try {
            let songs = await kv.get('site:songs');
            // Upstash data browser saves arrays as objects with numeric keys — convert back
            if (songs && !Array.isArray(songs)) {
                songs = Object.values(songs);
            }
            return res.status(200).json(songs ?? FALLBACK_SONGS);
        } catch {
            return res.status(200).json(FALLBACK_SONGS);
        }
    }

    if (req.method === 'POST') {
        const secret = req.headers['x-songs-secret'];
        if (secret !== process.env.SONGS_SECRET) {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        const { title, artist, date } = req.body;
        if (!title || !artist || !date) {
            return res.status(400).json({ error: 'title, artist, and date are required' });
        }

        let current = (await kv.get('site:songs')) ?? FALLBACK_SONGS;
        if (current && !Array.isArray(current)) {
            current = Object.values(current);
        }
        const updated = [{ title, artist, date }, ...current];
        await kv.set('site:songs', updated);
        return res.status(200).json(updated);
    }

    res.status(405).end();
}
