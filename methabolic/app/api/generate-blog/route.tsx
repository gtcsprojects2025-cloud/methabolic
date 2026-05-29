import { google } from 'googleapis';
import OpenAI from 'openai';
import { NextResponse } from 'next/server';

// Initialize the OpenAI client pointing to OpenRouter's free gateway
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || '',
  baseURL: 'https://openrouter.ai/api/v1',
  defaultHeaders: {
    'HTTP-Referer': 'http://localhost:3000', // Optional, required by OpenRouter
    'X-Title': 'NextJS Blog Generator',     // Optional
  }
});

// Helper function to extract Document ID from a full Google Docs URL
function extractDocId(url: string): string {
  // Safe cast to string primitive to handle objects, arrays, numbers, or empty fallbacks gracefully
  const urlString = typeof url === 'string' ? url : String(url || '');
  const match = urlString.match(/\/document\/d\/([a-zA-Z0-9-_]+)/);
  return match && match[1] ? match[1] : urlString;
}

// Helper function to extract plain text from the complex Google Docs JSON payload
function cleanDocText(document: any): string {
  let text = '';
  if (!document.body || !document.body.content) return text;
  for (const element of document.body.content) {
    if (element.paragraph && element.paragraph.elements) {
      for (const el of element.paragraph.elements) {
        if (el.textRun && el.textRun.content) {
          text += el.textRun.content;
        }
      }
    }
  }
  return text;
}

/**
 * Robustly sanitizes only the string values within a JSON block using the official JSON string literal regex.
 * It identifies literal control characters (ASCII 0-31) inside strings and properly escapes them.
 */
function sanitizeJsonString(rawJson: string): string {
  const jsonStringRegex = /"([^"\\]|\\.)*"/g;

  return rawJson.replace(jsonStringRegex, (match) => {
    return match
      .replace(/\n/g, '\\n')
      .replace(/\r/g, '\\r')
      .replace(/\t/g, '\\t')
      .replace(/[\x00-\x1F\x7F-\x9F]/g, ' ');
  });
}

/**
 * Implementation of exponential backoff for API robustness.
 * Retries up to 5 times with delays of 1s, 2s, 4s, 8s, 16s.
 */
async function fetchWithExponentialBackoff<T>(fn: () => Promise<T>): Promise<T> {
  const delays = [1000, 2000, 4000, 8000, 16000];
  let lastError: any;

  for (let attempt = 0; attempt <= delays.length; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;
      if (attempt < delays.length) {
        await new Promise((resolve) => setTimeout(resolve, delays[attempt]));
      }
    }
  }
  throw lastError;
}

export async function POST(request: Request) {
  try {
    const { docUrl } = await request.json();
    
    // Diagnostic log to monitor exactly what your client component is posting
    console.log("DEBUG - Received docUrl:", docUrl, "Type:", typeof docUrl);
    
    if (!docUrl) return NextResponse.json({ error: 'URL required' }, { status: 400 });

    // Safely cast to string for extraction
    const docId = extractDocId(docUrl);
    console.log("DEBUG - Resolved Doc ID:", docId);
    
    const privateKey = process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY;
    const clientEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
    const openaiKey = process.env.OPENAI_API_KEY; // This will hold your OpenRouter key

    if (!privateKey || !clientEmail || !openaiKey) {
      return NextResponse.json(
        { error: 'Server configuration error: Missing required environmental credentials.' },
        { status: 500 }
      );
    }

    // Authenticate with Google using Service Account JWT configuration
    const auth = new google.auth.JWT({
      email: clientEmail,
      keyFile: undefined,
      key: privateKey.replace(/\\n/g, '\n'),
      scopes: ['https://www.googleapis.com/auth/documents.readonly'],
    });

    const docsService = google.docs({
      version: 'v1',
      auth: auth,
    });

    // Fetches the specific document with the extracted docId
    const docResponse: any = await docsService.documents.get({ documentId: docId });
    const rawContent = cleanDocText(docResponse.data);

    if (!rawContent.trim()) {
      return NextResponse.json({ error: 'The Google Document is empty' }, { status: 400 });
    }

    const systemInstruction = `
      You are an expert content editor and frontend engineer. 
      Analyze the raw text from this document and organize it into a highly aesthetic, structured JSON format for a blog post.
      Break down the content into a readable structure, transforming headers, text blocks, and lists into semantic blocks.
      
      You must respond strictly with a valid JSON object matching this schema structure:
      {
        "title": "The main headline",
        "subtitle": "An appealing subhead",
        "date": "Estimated publish date",
        "readingTime": "Reading time estimation (e.g. '5 min read')",
        "sections": [
          {
            "heading": "Section Heading",
            "paragraphs": ["Paragraph text content here...", "Next paragraph..."]
          }
        ]
      }
    `;

    const userPrompt = `Convert this text into a structured layout:\n\n${rawContent}`;

    // Execute the API generation call inside the exponential backoff wrapper
    const chatCompletion: any = await fetchWithExponentialBackoff(() => 
      openai.chat.completions.create({
        model: 'openrouter/free', // Dynamic route to free models
        messages: [
          { role: 'system', content: systemInstruction },
          { role: 'user', content: userPrompt }
        ],
        temperature: 0.2,
        // 🧠 Add this line to force valid JSON structure
      response_format: { type: "json_object" }
      })
    );

    // 1. Unpack raw text output from the chat completion response
    let rawText = chatCompletion.choices[0]?.message?.content || '';

    // 2. Clear out markdown code blocks if OpenAI wrapped the JSON in them
    if (rawText.includes('```')) {
      rawText = rawText.replace(/```json|```/g, '').trim();
    }

    // 3. Sanitize control characters exclusively within double-quoted strings
    const sanitizedText = sanitizeJsonString(rawText);

    try {
      // 4. Safely parse the valid, fully sanitized JSON structure
      const resultJson = JSON.parse(sanitizedText);
      return NextResponse.json({ success: true, data: resultJson });
    } catch (parseError: any) {
      console.error("Failed to parse JSON string. Offending Payload:", sanitizedText);
      throw new Error(`JSON parsing failed: ${parseError.message}`);
    }

  } catch (error: any) {
    console.error('API Error during pipeline execution:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}