import { kv } from '@vercel/kv';

function uid() {
  return Math.random().toString(36).slice(2, 9) + Date.now().toString(36);
}

function defaultData() {
  return {
    targetDate: '',
    modules: [
      {
        id: uid(),
        name: 'Mathematics',
        color: 0,
        collapsed: false,
        deadline: '',
        lectures: [
          { id: uid(), name: 'Introduction to Calculus', duration: 55, watched: false },
          { id: uid(), name: 'Differentiation Rules', duration: 65, watched: false },
          { id: uid(), name: 'Integration Techniques', duration: 70, watched: false },
        ],
      },
      {
        id: uid(),
        name: 'Computer Science',
        color: 2,
        collapsed: false,
        deadline: '',
        lectures: [
          { id: uid(), name: 'Data Structures Overview', duration: 60, watched: false },
          { id: uid(), name: 'Sorting Algorithms', duration: 75, watched: false },
          { id: uid(), name: 'Graph Theory', duration: 80, watched: false },
        ],
      },
    ],
  };
}

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const data = await kv.get('tracker_data');
    if (!data) {
      return res.status(200).json(defaultData());
    }
    return res.status(200).json(data);
  } catch (err) {
    console.error('Failed to read tracker data:', err);
    return res.status(500).json({ error: 'Failed to read data' });
  }
}
