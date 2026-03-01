import { kv } from '@vercel/kv';

export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');

    if (req.method === 'OPTIONS') return res.status(200).end();

    if (req.method === 'GET') {
        const count = (await kv.get('site:likes')) ?? 0;
        return res.status(200).json({ count });
    }

    if (req.method === 'POST') {
        const count = await kv.incr('site:likes');
        return res.status(200).json({ count });
    }

    res.status(405).end();
}
