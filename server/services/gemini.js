import { GoogleGenerativeAI } from '@google/generative-ai';
import { getSystemPrompt } from '../prompts.js';

// In-memory conversation history (for development)
// TODO: Replace with proper session storage/database for production
const conversationHistory = new Map();

/**
 * Get or initialize Gemini client
 * Initialized lazily to ensure environment variables are loaded
 */
function getGeminiClient() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error('GEMINI_API_KEY is not set in environment variables');
  }
  return new GoogleGenerativeAI(apiKey);
}

/**
 * Chat with Gemini AI
 * 
 * @param {Object} params
 * @param {string} params.message - User's message
 * @param {string} params.sessionId - Session identifier
 * @param {string|null} params.userId - User identifier (optional)
 * @returns {Promise<string>} AI response
 */
export async function chatWithGemini({ message, sessionId, userId }) {
  // VERSION CHECK: If you see this log, new code is loaded
  console.log('🔵 chatWithGemini called - using updated model fallback logic');
  
  // Initialize client here to ensure env vars are loaded
  const genAI = getGeminiClient();

  // Get or initialize conversation history for this session
  if (!conversationHistory.has(sessionId)) {
    conversationHistory.set(sessionId, []);
  }

  const history = conversationHistory.get(sessionId);

  // Get system prompt
  const systemPrompt = getSystemPrompt();

  // Try models in order of preference (using available models from API)
  const modelNames = [
    'gemini-2.5-flash',           // Fast, widely available
    'gemini-2.0-flash',          // Alternative flash model
    'gemini-pro-latest',          // Latest pro version
    'gemini-flash-latest',        // Latest flash version
    'gemini-2.5-pro-preview-03-25' // Pro preview (most capable)
  ];
  let lastError = null;

  for (const modelName of modelNames) {
    try {
      console.log(`Attempting to use model: ${modelName}`);
      
      // Initialize model
      const model = genAI.getGenerativeModel({ 
        model: modelName,
        systemInstruction: systemPrompt,
      });

      // Build conversation context
      const chat = model.startChat({
        history: history.map(msg => ({
          role: msg.role === 'user' ? 'user' : 'model',
          parts: [{ text: msg.content }],
        })),
      });

      // Send user message
      const result = await chat.sendMessage(message);
      const response = await result.response;
      const reply = response.text();

      console.log(`✅ Successfully used model: ${modelName}`);

      // Update conversation history on success
      history.push(
        { role: 'user', content: message },
        { role: 'assistant', content: reply }
      );

      // Limit history size to prevent token overflow (keep last 20 messages)
      if (history.length > 20) {
        history.splice(0, history.length - 20);
      }

      // Success - return the reply
      return reply;
    } catch (error) {
      lastError = error;
      
      // Check if it's a 404 error (model not found)
      // The error might have status as a property or in the message
      const is404 = error.status === 404 || 
                    error.statusCode === 404 ||
                    (error.message && error.message.includes('404')) ||
                    (error.message && error.message.includes('Not Found'));
      
      if (is404) {
        console.log(`❌ Model ${modelName} not available (404), trying next model...`);
        continue;
      }
      
      // For other errors, log and throw immediately
      console.error(`Error with model ${modelName}:`, error.message || error);
      throw error;
    }
  }

  // If all models failed, throw the last error
  throw new Error(`No available Gemini models found. Tried: ${modelNames.join(', ')}. Last error: ${lastError?.message || 'Unknown error'}`);
}

