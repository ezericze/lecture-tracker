import { Redis } from '@upstash/redis';

const redis = Redis.fromEnv();

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;

    if (!body || typeof body !== 'object') {
      return res.status(400).json({ error: 'Invalid request body' });
    }

    await redis.set('tracker_data', body);
    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('Failed to save tracker data:', err);
    return res.status(500).json({ error: 'Failed to save data' });
  }
}
