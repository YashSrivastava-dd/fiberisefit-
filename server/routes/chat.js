import express from 'express';
import { chatWithGemini } from '../services/gemini.js';

const router = express.Router();

/**
 * POST /api/ai/chat
 * 
 * Body:
 * - message: string (required) - User's message
 * - sessionId?: string (optional) - Session identifier for conversation continuity
 * - userId?: string (optional) - User identifier for personalization
 */
router.post('/chat', async (req, res) => {
  try {
    const { message, sessionId, userId } = req.body;

    // Validate input
    if (!message || typeof message !== 'string' || message.trim().length === 0) {
      return res.status(400).json({
        error: 'Message is required and must be a non-empty string',
      });
    }

    // Call Gemini API
    const response = await chatWithGemini({
      message: message.trim(),
      sessionId: sessionId || 'default',
      userId: userId || null,
    });

    res.json({
      reply: response,
      sessionId: sessionId || 'default',
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Chat API error:', error);
    
    // Handle specific error types
    if (error.message?.includes('API key')) {
      return res.status(500).json({
        error: 'AI service configuration error. Please check your API key.',
      });
    }

    res.status(500).json({
      error: 'An error occurred while processing your message. Please try again.',
    });
  }
});

export { router as chatRouter };

