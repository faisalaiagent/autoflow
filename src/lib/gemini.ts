import { GoogleGenerativeAI } from '@google/generative-ai';

/**
 * Creates a Gemini client using either:
 * 1. The server-side GEMINI_API_KEY env var (set in Vercel dashboard), OR
 * 2. A user-supplied key passed from the browser
 */
export function createGeminiModel(userApiKey?: string) {
  const key = userApiKey || process.env.GEMINI_API_KEY || '';
  if (!key) {
    throw new Error('NO_API_KEY');
  }
  const genAI = new GoogleGenerativeAI(key);
  return genAI.getGenerativeModel({
    model: 'gemini-1.5-flash',        // Most stable, widely available model
    generationConfig: {
      temperature: 0.7,
      topK: 40,
      topP: 0.95,
      maxOutputTokens: 2048,
    },
  });
}

export async function generateJSON<T>(
  prompt: string,
  fallback: T,
  userApiKey?: string
): Promise<T> {
  const model = createGeminiModel(userApiKey);
  try {
    const result = await model.generateContent(prompt);
    let text = result.response.text().trim();
    // Strip any markdown fences the model might add
    text = text
      .replace(/^```json\s*/i, '')
      .replace(/^```\s*/i, '')
      .replace(/\s*```$/i, '')
      .trim();
    // Find the first { or [ to handle any leading text
    const jsonStart = text.search(/[\[{]/);
    if (jsonStart > 0) text = text.slice(jsonStart);
    return JSON.parse(text) as T;
  } catch (error: any) {
    if (error?.message?.includes('API_KEY_INVALID') || error?.message?.includes('API key not valid')) {
      throw new Error('INVALID_API_KEY');
    }
    if (error instanceof SyntaxError) {
      throw new Error('PARSE_ERROR');
    }
    throw error;
  }
}
