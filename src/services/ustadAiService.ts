/**
 * Dreams Virtual Academy - Ustad AI Service
 * Powered by Gemini API to provide 24/7 AI tutoring for Sindhi and Pakistani students
 */

const GEMINI_API_KEY = 'AIzaSyBQHO7TqJnP7y93_WPw9QOp-X-pXtQVrfg';
const GEMINI_MODELS = ['gemini-2.5-flash', 'gemini-1.5-flash', 'gemini-1.5-pro'];

const SYSTEM_INSTRUCTION = `
You are "Ustad AI" (استاد اي آءِ), the official AI science tutor and mentor at Dreams Virtual Academy (DVA), Sindh, Pakistan.
Your mission is to help Sindhi and Pakistani students excel in:
1. Sindh Textbook Board (STBB) Science, Physics, Chemistry, Biology, and Math (Classes 6th to 12th).
2. STS / IBA Sukkur BPS-05 to 15, JST (Junior School Teacher), PST, and SPSC Educator and competitive job exam preparations.

Guidelines:
- Language: Respond in the language requested by the student or match their input language. You are fluent in Sindhi (سنڌي), Urdu (اردو), and English. When explaining in Sindhi, use authentic, clear Sindhi educational terminology.
- Tone: Warm, respectful, encouraging, and academic (like a dedicated teacher).
- Formatting: Use concise bullet points, bold key definitions, and clear examples from daily life in Sindh (e.g., farming, solar energy, river Indus, local vehicles).
- For MCQs: If asked to explain an MCQ, clearly explain WHY the correct answer is right and WHY the incorrect options are wrong, with a golden rule to remember for the STS exam.
- Safety: Strictly answer educational, scientific, academic, career guidance, and test-prep related questions. Keep responses polite and under 300 words.
`;

export interface AIMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  time: string;
}

export async function askUstadAI(prompt: string, context?: string): Promise<string> {
  const safePrompt = prompt.slice(0, 1500).trim();
  const safeContext = context ? String(context).slice(0, 1500).trim() : '';

  let userContent = safePrompt;
  if (safeContext) {
    userContent = `[CONTEXT: Study Material Review]\n${safeContext}\n\nStudent question / request: ${safePrompt}`;
  }

  const payload = {
    systemInstruction: {
      parts: [{ text: SYSTEM_INSTRUCTION }],
    },
    contents: [
      {
        role: 'user',
        parts: [{ text: userContent }],
      },
    ],
    generationConfig: {
      temperature: 0.4,
      maxOutputTokens: 800,
    },
  };

  let lastError = '';

  for (const model of GEMINI_MODELS) {
    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${GEMINI_API_KEY}`;
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const data = await response.json();
        const replyText = data.candidates?.[0]?.content?.parts?.[0]?.text;
        if (replyText) {
          return replyText;
        }
      } else {
        const errData = await response.json().catch(() => ({}));
        lastError = errData.error?.message || `Model ${model} returned ${response.status}`;
      }
    } catch (err: any) {
      lastError = err.message || 'Network error';
    }
  }

  throw new Error(lastError || 'Ustad AI is currently busy. Please try again in a moment.');
}

