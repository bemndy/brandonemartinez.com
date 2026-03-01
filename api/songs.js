import { createClient } from '@vercel/kv';

const kv = createClient({
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
            const songs = await kv.get('site:songs');
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

        const current = (await kv.get('site:songs')) ?? FALLBACK_SONGS;
        const updated = [{ title, artist, date }, ...current];
        await kv.set('site:songs', updated);
        return res.status(200).json(updated);
    }

    res.status(405).end();
}
