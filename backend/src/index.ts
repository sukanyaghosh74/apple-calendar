import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { fetchICloudEvents } from './icloud';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.post('/api/icloud/events', async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required.' });
  }
  try {
    const events = await fetchICloudEvents({ username, password });
    res.json({ events });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to fetch events.';
    res.status(500).json({ error: message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 