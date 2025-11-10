import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { chatRouter } from './routes/chat.js';

dotenv.config();

// Verify API key is loaded
if (!process.env.GEMINI_API_KEY) {
  console.error('❌ ERROR: GEMINI_API_KEY is not set in environment variables');
  console.error('Please create a .env file with your Gemini API key.');
  console.error('See .env.example for reference.');
  process.exit(1);
}

console.log('✅ Gemini API key loaded');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// API routes
app.use('/api/ai', chatRouter);

app.listen(PORT, () => {
  console.log(`🚀 AI Chat API server running on http://localhost:${PORT}`);
});

