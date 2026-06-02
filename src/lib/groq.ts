/**
 * Groq AI client — replaces Gemini
 * Groq is FREE, very fast (LLaMA 3 models), no credit card needed
 * Get your free key at: https://console.groq.com
 */

function getGroqKey(userKey?: string): string {
  const key = userKey || process.env.GROQ_API_KEY || '';
  if (!key) throw new Error('NO_API_KEY');
  return key;
}

export async function generateJSON<T>(
  prompt: string,
  fallback: T,
  userApiKey?: string
): Promise<T> {
  const apiKey = getGroqKey(userApiKey);

  const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'llama-3.3-70b-versatile',  // Best free Groq model
      messages: [
        {
          role: 'system',
          content: 'You are a helpful AI assistant. Always respond with valid JSON only. No markdown, no code fences, no extra text — just the raw JSON object.',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      temperature: 0.7,
      max_tokens: 2048,
    }),
  });

  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    const msg = (err as any)?.error?.message || response.statusText;
    if (response.status === 401) throw new Error('INVALID_API_KEY');
    if (response.status === 429) throw new Error('RATE_LIMIT');
    throw new Error(`GROQ_ERROR: ${msg}`);
  }

  const data = await response.json();
  let text: string = data.choices?.[0]?.message?.content?.trim() ?? '';

  // Strip any accidental markdown fences
  text = text
    .replace(/^```json\s*/i, '')
    .replace(/^```\s*/i, '')
    .replace(/\s*```$/i, '')
    .trim();

  // Find start of JSON
  const start = text.search(/[{[]/);
  if (start > 0) text = text.slice(start);

  try {
    return JSON.parse(text) as T;
  } catch {
    throw new Error('PARSE_ERROR');
  }
}

export function apiErrorMessage(code: string): string {
  if (code === 'NO_API_KEY')
    return 'No Groq API key configured. Add your key in Settings → API Configuration.';
  if (code === 'INVALID_API_KEY')
    return 'Invalid Groq API key. Please check your key in Settings.';
  if (code === 'RATE_LIMIT')
    return 'Groq rate limit reached. Please wait a moment and try again.';
  if (code === 'PARSE_ERROR')
    return 'AI response could not be parsed. Please try again.';
  return 'AI request failed. Please try again.';
}
