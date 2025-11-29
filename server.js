// server.js — VERCEL-COMPATIBLE EXPRESS VERSION

const express = require('express');
const cors = require('cors');

// Create express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// ==========================================================
// DYNAMIC FETCH FOR ALL NODE ENVIRONMENTS
// ==========================================================
let fetch;
(async () => {
  if (typeof globalThis.fetch === "undefined") {
    fetch = (await import("node-fetch")).default;
  } else {
    fetch = globalThis.fetch;
  }
})();

// ==========================================================
// YOUR GEMINI API KEY
// ==========================================================
const GEMINI_API_KEY = process.env.GEMINI_API_KEY || "AIzaSyDJW3mKXNG-Xlazs3lU6OU15IEo_UzCmC8";

// ==========================================================
// KNOWLEDGE BASE (UNCHANGED — FULL VERSION)
// ==========================================================
const KNOWLEDGE_BASE = { /* ---- YOUR ENTIRE KNOWLEDGE BASE HERE ---- */ };

// ==========================================================
// MATCH FUNCTION (UNCHANGED)
// ==========================================================
function findBestMatch(userMessage) {
  const msg = userMessage.toLowerCase().trim();
  let bestMatch = null;
  let highestScore = 0;

  for (const [topic, data] of Object.entries(KNOWLEDGE_BASE)) {
    let score = 0;
    for (const keyword of data.keywords) {
      const k = keyword.toLowerCase();
      if (msg === k) score += 100;
      else if (new RegExp(`\\b${k}\\b`, "i").test(msg)) score += 50;
      else if (msg.includes(k)) score += 10;
    }
    if (score > highestScore) {
      bestMatch = { answer: data.answer, score };
      highestScore = score;
    }
  }
  return bestMatch && bestMatch.score >= 10 ? bestMatch.answer : null;
}

// ==========================================================
// GEMINI API WRAPPER (UNCHANGED)
// ==========================================================
async function callGeminiAPI(prompt) {
  if (!fetch) fetch = (await import("node-fetch")).default;

  const models = [
    "gemini-2.0-flash-exp",
    "gemini-1.5-flash",
    "gemini-1.5-pro",
  ];

  for (const model of models) {
    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${GEMINI_API_KEY}`;

      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 1024,
          },
        }),
      });

      if (response.ok) {
        const data = await response.json();
        const txt = data?.candidates?.[0]?.content?.parts?.[0]?.text;
        if (txt) return txt;
      }
    } catch (err) {
      console.log(`❌ Model failed: ${model} :`, err.message);
    }
  }

  throw new Error("All Gemini models failed");
}

// ==========================================================
// GEMINI PROMPT BUILDER (UNCHANGED)
// ==========================================================
function buildGeminiPrompt(msg) {
  return `
You are a helpful assistant for Vantage Hall Girls' Residential School, Dehradun.

1. ONLY answer if the question is about Vantage Hall.
2. If not, say: 
"I'm specifically here to help with questions about Vantage Hall! 😊"
3. Be concise (3–5 lines), friendly, use light emojis.

User: "${msg}"

Your reply:
`;
}

// ==========================================================
// GREETINGS (UNCHANGED)
// ==========================================================
const GREETINGS = [
  "Hello! 👋 How can I help you today?",
  "Hi! 😊 Ask me anything about Vantage Hall.",
  "Hey! 👋 What would you like to know?",
];

// ==========================================================
// ROUTES (WORKS ON VERCEL)
// ==========================================================

app.get("/", (req, res) => {
  res.json({
    status: "ok",
    message: "Vantage Hall Chatbot API (Vercel Serverless)",
  });
});

app.get("/api/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

app.post("/api/chat", async (req, res) => {
  try {
    const { message } = req.body;
    if (!message)
      return res.status(400).json({ success: false, error: "Message required" });

    console.log("User:", message);

    // Greetings
    if (/^(hi|hello|hey|namaste|good morning|good afternoon|good evening)$/i.test(message.trim())) {
      return res.json({
        success: true,
        reply: GREETINGS[Math.floor(Math.random() * GREETINGS.length)],
        mode: "greeting",
      });
    }

    // Knowledge base
    const kb = findBestMatch(message);
    if (kb) {
      return res.json({
        success: true,
        reply: kb,
        mode: "knowledge-base",
      });
    }

    // Gemini fallback
    const prompt = buildGeminiPrompt(message);
    const ai = await callGeminiAPI(prompt);

    return res.json({
      success: true,
      reply: ai.trim(),
      mode: "ai-powered",
    });

  } catch (err) {
    console.error("Chat error:", err);
    return res.json({
      success: true,
      reply: "Sorry! Something went wrong. Please try again 😊",
      mode: "fallback",
    });
  }
});

// ==========================================================
// EXPORT EXPRESS APP AS VERCEL SERVERLESS HANDLER
// (THIS PART MAKES EXPRESS RUN ON VERCEL!)
// ==========================================================

module.exports = app;

