// server.js - COMPLETE WORKING VERSION FOR VERCEL (FIXED FETCH ISSUE)

const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// ==============================================
// DYNAMIC FETCH - WORKS IN ALL NODE VERSIONS
// ==============================================
let fetch;
(async () => {
  if (typeof globalThis.fetch === 'undefined') {
    fetch = (await import('node-fetch')).default;
  } else {
    fetch = globalThis.fetch;
  }
})();

// ==============================================
// YOUR API KEY
// ==============================================
const GEMINI_API_KEY = "AIzaSyDJW3mKXNG-Xlazs3lU6OU15IEo_UzCmC8";

// ==============================================
// COMPREHENSIVE KNOWLEDGE BASE
// ==============================================
const KNOWLEDGE_BASE = {
  school_info: {
    keywords: ['school name', 'full name', 'about school', 'what is vantage', 'tell me about', 'vantage hall'],
    answer: "🏫 **Vantage Hall Girls' Residential School**\n\n📍 Address: The Yellow Brick Road, Doonga, Dehradun - 248007, Uttarakhand\n\n🎯 Vision: To nurture happy, independent, and unique individuals in a safe and supportive environment.\n\n✨ Established: 2013\n📘 Board: CBSE\n👩‍🏫 Principal: Mrs. Seema Sharda\n🌳 Campus: 12-acre lush green campus"
  },

  vision: {
    keywords: ['vision', 'mission', 'goal', 'objective', 'purpose', 'unique', 'different', 'special', 'why choose'],
    answer: "🎯 **Our Vision & Mission:**\n\n\"To nurture happy, independent, and unique individuals in a safe and supportive environment.\"\n\n✨ What Makes Us Special:\n• All-girls boarding school\n• Creating future female leaders\n• A community that feels like family\n• Holistic development beyond academics\n• 1:5 student-teacher ratio"
  },

  curriculum: {
    keywords: ['curriculum', 'board', 'cbse', 'syllabus', 'academics', 'subjects', 'what subject', 'stream'],
    answer: "📚 **Curriculum:**\n\nWe follow the CBSE curriculum\n\n🎓 Streams Offered (Classes 11-12):\n• Science\n• Commerce\n• Humanities\n\n👩‍🏫 Student-Teacher Ratio: 1:5\n• Small class sizes for personalized attention\n• Focus on holistic development\n\n📝 Evaluation System:\n• Unit Tests: Twice a year\n• Mid-Term/Half-Yearly Exams\n• Final/Annual Exams"
  },

  timings: {
    keywords: ['timing', 'time', 'schedule', 'start', 'when does school', 'school hours'],
    answer: "🕐 **School Timings:**\n\n• Grades 3-9: 7:45 AM - 12:55 PM\n• Grades 10-12: 7:45 AM - 1:35 PM\n• Activity Classes: 2:45 PM - 4:05 PM\n\nEvening activities and study hours are scheduled after 4 PM."
  },

  admission: {
    keywords: ['admission', 'admit', 'process', 'enroll', 'join', 'apply', 'how to get admission', 'eligibility'],
    answer: "📝 **Admission Process:**\n\n✅ Step 1: Written Test (English, Mathematics, Science)\n✅ Step 2: Interaction with Principal\n✅ Step 3: Interaction with Director\n\n📅 Registration: September-October\n📅 Session Starts: April\n\n📌 Eligibility:\n• Classes: 3-12 (All-girls)\n• Age: As per CBSE guidelines\n• Required: Transfer Certificate & Report Card\n\n⚠️ Note: Admission to Class 10 is considered only in exceptional cases\n\n📞 Contact:\n+91-8191912999 | +91-7078311863\n📧 admissions@vantagehall.org"
  },

  documents: {
    keywords: ['document', 'paper', 'certificate', 'required', 'what documents', 'need to bring'],
    answer: "📄 **Required Documents:**\n\n• Student's Birth Certificate & Aadhaar Card\n• Parents' Aadhaar & PAN Cards\n• Last examination mark sheet\n• Original Transfer Certificate\n• Medical Fitness Certificate\n• Student's PEN Number / APAAR ID\n\nEnsure all documents are original or attested copies."
  },

  fee: {
    keywords: ['fee', 'fees', 'cost', 'tuition', 'charge', 'payment', 'price', 'how much', 'expense'],
    answer: "💰 **Fee Structure (Per Year):**\n\n📌 Classes 3-7:\n• Total: ₹7,35,000\n• Annual: ₹5,50,000\n• One-time: ₹1,85,000\n\n📌 Classes 8-10:\n• Total: ₹8,35,000\n• Annual: ₹6,50,000\n• One-time: ₹1,85,000\n\n📌 Classes 11-12:\n• Total: ₹8,85,000\n• Annual: ₹7,00,000\n• One-time: ₹1,85,000\n\n*One-time fees: Registration (₹10k), Joining Kit (₹60k), Deposit (₹40k), Admission (₹75k)\n\n📞 For details: +91-8191912999"
  },

  hostel: {
    keywords: ['hostel', 'facilities', 'boarding', 'residential', 'accommodation', 'room', 'dormitory', 'stay'],
    answer: "🏡 **Hostel Facilities:**\n\n✨ Well-furnished dormitories with:\n• Beds, storage, study tables & wardrobes\n• Separate hostels for juniors & seniors\n• Regular laundry service (washed, ironed, returned)\n• Daily housekeeping\n• 24/7 supervision by wardens\n• Controlled Wi-Fi access\n• Common rooms for recreation\n\n🛡️ Hostel Rules:\n• Fixed bedtime & lights-out schedules\n• Mandatory morning roll call & evening study\n• Respectful behavior expected\n\nA home away from home! 🏠"
  },

  food: {
    keywords: ['food', 'dining', 'menu', 'meal', 'lunch', 'dinner', 'breakfast', 'diet', 'mess', 'nutrition'],
    answer: "🍽️ **Dining & Nutrition:**\n\n✅ Nutritionist-planned meals\n✅ Special diets for athletes & medical needs\n✅ Veg & non-veg options\n✅ Menu rotates every 15 days\n\n🥗 Daily Meals:\n• Breakfast: Fruits, cereals, milk, eggs, bread/parathas\n• Mid-Morning Snack: Fruits & light snacks\n• Lunch: Dal, rice/roti, vegetables, salad & dessert\n• Evening Snack: Sandwich, fruit, or soup\n• Dinner: Similar to lunch with variety\n• Night Milk: Mandatory for all students\n\n📋 Sample Menu: https://vantagehall.org/food-nutrition/"
  },

  medical: {
    keywords: ['doctor', 'nurse', 'medical', 'health', 'hospital', 'emergency', 'first aid', 'checkup', 'healthcare'],
    answer: "🏥 **Medical Care:**\n\n👩‍⚕️ **On-Campus:**\n• Qualified doctor (MBBS, DGO)\n• 3 trained nurses available 24/7\n• Daily doctor visits for check-ups\n• 24/7 first aid & immediate care\n\n🏨 **Hospital Tie-ups:**\n• Max Hospital\n• Synergy Hospital\n• Graphic Era Hospital (nearby)\n\n🩺 **Regular Services:**\n• Monthly health check-ups\n• Height & weight tracking\n• Vision tests\n• Dental hygiene checks\n• Comprehensive health records"
  },

  sports: {
    keywords: ['sports', 'games', 'athletics', 'physical', 'football', 'cricket', 'basketball', 'swimming', 'which sports', 'outdoor', 'play'],
    answer: "⚽ **Sports & Athletics:**\n\nTraining under qualified coaches in:\n\n🏃‍♀️ **Outdoor Sports:**\n• Football, Cricket, Basketball, Volleyball\n\n🎾 **Racquet Sports:**\n• Squash, Badminton, Lawn Tennis, Table Tennis\n\n⛸️ **Other Activities:**\n• Skating, Gymnasium, Swimming\n\n♟️ **Indoor Games:**\n• Carrom, Chess\n\n🏆 Regular inter-house competitions and tournaments!"
  },

  clubs: {
    keywords: ['club', 'activity', 'extracurricular', 'societies', 'hobby', 'after school', 'activities', 'co-curricular'],
    answer: "🎨 **Clubs & Societies:**\n\n• Art Club\n• Culinary Club\n• Dance & Music Club\n• Theatre Club\n• Finance & Maths Club\n• IT Club\n• Science Club\n• Photography Club\n• Sustainability Club\n• Editorial Board\n• Arts & Design Club\n\n🎭 **Events:**\n• Annual Day\n• Sports Day\n• Independence & Republic Day\n• Educational trips\n• Festive celebrations\n• Inter-house competitions"
  },

  career: {
    keywords: ['career', 'guidance', 'college', 'university', 'neet', 'jee', 'clat', 'counseling', 'future', 'preparation'],
    answer: "🎯 **Career Guidance & Counseling:**\n\nComprehensive guidance for Grades 8-12:\n\n✅ Medical (NEET)\n✅ Engineering (JEE)\n✅ Law (CLAT, AILET)\n✅ Management (IPM, NMIMS, Symbiosis, Christ)\n✅ Humanities (Ashoka, OP Jindal, Symbiosis, Christ)\n✅ Design (NIFT, UCEED)\n✅ SAT & AP (foreign universities)\n\n📌 1-on-1 personalized guidance sessions\n📌 Workshops and career counseling programs"
  },

  contact: {
    keywords: ['contact', 'phone', 'email', 'address', 'reach', 'call', 'number', 'how to contact', 'location', 'where'],
    answer: "📍 **Contact Information:**\n\n🏫 Vantage Hall Girls' Residential School\nThe Yellow Brick Road, Doonga\nDehradun - 248007, Uttarakhand\n\n📞 **General Enquiries:**\n0135-2776225, 226, 227, 228\n📧 info@vantagehall.org\n\n📞 **Admissions:**\n+91-8191912999\n+91-7078311863\n📧 admissions@vantagehall.org\n\n🌐 Website: www.vantagehall.org\n🗺️ Google Maps: https://maps.app.goo.gl/F9okR4GADbhN9x5G8"
  },

  safety: {
    keywords: ['safety', 'security', 'cctv', 'warden', 'camera', 'safe', 'protection', 'rules'],
    answer: "🛡️ **Safety & Security:**\n\n✅ 24/7 wardens in each hostel block\n✅ CCTV surveillance in corridors & common areas\n✅ Controlled visitor access with ID verification\n✅ Strict discipline & conduct policy\n✅ Entry/exit logs maintained\n✅ No cameras inside hostel rooms (privacy)\n\n**Zero-tolerance policy** against bullying or harassment.\n\nYour daughter's safety is our top priority!"
  },

  campus_visit: {
    keywords: ['visit', 'campus tour', 'visit school', 'can i visit', 'see campus', 'tour', 'schedule visit'],
    answer: "📍 **Campus Visit & Tours:**\n\nYes! We welcome campus visits.\n\n✅ **How to Schedule:**\n📞 Call: 0135-2776225 / +91-8191912999\n📧 Email: admissions@vantagehall.org\n\n🏫 **During the tour you can:**\n• See our facilities\n• Meet the faculty\n• Interact with Principal\n• Visit hostel blocks\n• Experience our learning environment\n\n🗺️ Location: Doonga, Dehradun (10km from city center)\nGoogle Maps: https://maps.app.goo.gl/F9okR4GADbhN9x5G8"
  },

  parent_communication: {
    keywords: ['parent', 'meeting', 'ptm', 'communication', 'updates', 'erp', 'call home', 'contact daughter', 'visit daughter'],
    answer: "👨‍👩‍👧 **Parent Communication:**\n\n✅ **ERP System (Edunext):**\n• Real-time attendance & academic updates\n• Event calendar, photos & videos\n• Fee payment tracking\n\n✅ **Regular Communication:**\n• Weekly student-parent calls (45 min every Sunday)\n• Special calls on birthdays/anniversaries\n• Email and WhatsApp updates\n\n✅ **Parent-Teacher Meetings:**\n• 4 times per year (Online & Offline)\n\n✅ **Visiting Policy:**\n• Parents may visit hostels at admission time\n• During the year, visits require prior permission"
  },

  counseling: {
    keywords: ['counselor', 'psychologist', 'mental health', 'emotional support', 'bullying', 'stress', 'personal problem'],
    answer: "🧠 **Counseling & Student Support:**\n\n✅ Dedicated counselor providing psychological and emotional support\n✅ **Zero-tolerance policy** against bullying or harassment\n✅ Students can confidentially approach:\n   • Director\n   • Principal\n   • Pastoral Care team\n\n📌 One-on-one confidential sessions available\n📌 Safe space for discussing personal concerns"
  }
};

// ==============================================
// IMPROVED KEYWORD MATCHING
// ==============================================
function findBestMatch(userMessage) {
  const msg = userMessage.toLowerCase().trim();
  
  let bestMatch = null;
  let highestScore = 0;
  
  for (const [topic, data] of Object.entries(KNOWLEDGE_BASE)) {
    let score = 0;
    
    for (const keyword of data.keywords) {
      const keywordLower = keyword.toLowerCase();
      
      if (msg === keywordLower) {
        score += 100;
      } else if (new RegExp(`\\b${keywordLower}\\b`, 'i').test(msg)) {
        score += 50;
      } else if (msg.includes(keywordLower)) {
        score += 10;
      }
    }
    
    if (score > highestScore && score > 0) {
      highestScore = score;
      bestMatch = {
        answer: data.answer,
        topic: topic,
        score: score
      };
    }
  }
  
  if (bestMatch && bestMatch.score >= 10) {
    console.log(`✅ Matched: ${bestMatch.topic} (Score: ${bestMatch.score})`);
    return bestMatch.answer;
  }
  
  return null;
}

// ==============================================
// GEMINI API CALL WITH PROPER ERROR HANDLING
// ==============================================
async function callGeminiAPI(prompt) {
  // Ensure fetch is loaded
  if (!fetch) {
    const nodeFetch = await import('node-fetch');
    fetch = nodeFetch.default;
  }

  const modelNames = [
    'gemini-2.0-flash-exp',
    'gemini-1.5-flash',
    'gemini-1.5-pro'
  ];

  for (const modelName of modelNames) {
    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${GEMINI_API_KEY}`;
      
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{
            parts: [{ text: prompt }]
          }],
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 1024,
          }
        })
      });

      if (response.ok) {
        const data = await response.json();
        const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
        if (text) {
          console.log(`✅ Gemini success with: ${modelName}`);
          return text;
        }
      } else {
        const errorData = await response.text();
        console.log(`❌ ${modelName} failed: ${response.status} - ${errorData}`);
      }
    } catch (error) {
      console.log(`❌ ${modelName} error: ${error.message}`);
      continue;
    }
  }

  throw new Error('All Gemini models failed');
}

// ==============================================
// BUILD GEMINI PROMPT
// ==============================================
function buildGeminiPrompt(userMessage) {
  return `You are a helpful assistant for Vantage Hall Girls' Residential School, Dehradun.

CRITICAL INSTRUCTIONS:
1. Answer ONLY if the question is about Vantage Hall school
2. If NOT about the school, respond: "I'm specifically here to help with questions about Vantage Hall! I can tell you about admissions, facilities, curriculum, hostel life, sports, and more. What would you like to know?"
3. Be warm, conversational, and helpful
4. Keep responses concise (3-5 lines max)
5. Use emojis appropriately 😊

SCHOOL INFO:
- All-girls CBSE boarding (Classes 3-12)
- Established: 2013 | Principal: Mrs. Seema Sharda
- Location: Doonga, Dehradun | 12-acre campus
- Fees: ₹7.35L-₹8.85L/year
- Student-Teacher: 1:5
- Phone: 0135-2776225 | +91-8191912999
- Email: admissions@vantagehall.org

User Question: "${userMessage}"

Your Response (brief & friendly):`;
}

// ==============================================
// GREETING RESPONSES
// ==============================================
const GREETINGS = [
  "Hello! 👋 Welcome to Vantage Hall Girls' Residential School. How can I help you today?",
  "Hi there! 😊 I'm here to answer your questions about Vantage Hall. What would you like to know?",
  "Hey! 👋 Welcome! Ask me anything about Vantage Hall!"
];

// ==============================================
// ROOT ENDPOINT
// ==============================================
app.get('/', (req, res) => {
  res.json({
    status: '✅ Server Running',
    message: 'Vantage Hall Chatbot API',
    model: 'Gemini AI + Knowledge Base',
    knowledgeTopics: Object.keys(KNOWLEDGE_BASE).length,
    endpoints: {
      health: '/api/health',
      chat: '/api/chat (POST)'
    }
  });
});

// ==============================================
// HEALTH CHECK
// ==============================================
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    message: 'Chatbot API is running!',
    knowledgeBaseTopics: Object.keys(KNOWLEDGE_BASE).length
  });
});

// ==============================================
// CHAT ENDPOINT - MAIN API
// ==============================================
app.post('/api/chat', async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ 
        success: false, 
        error: 'Message is required' 
      });
    }

    console.log(`📩 User: ${message}`);

    // Check for greeting
    if (/^(hi|hello|hey|good morning|good afternoon|good evening|namaste)$/i.test(message.trim())) {
      const greeting = GREETINGS[Math.floor(Math.random() * GREETINGS.length)];
      return res.json({ 
        success: true, 
        reply: greeting,
        mode: 'greeting'
      });
    }

    // Try knowledge base first (PRIORITY)
    const knowledgeAnswer = findBestMatch(message);
    
    if (knowledgeAnswer) {
      console.log('✅ Knowledge base match found');
      return res.json({ 
        success: true, 
        reply: knowledgeAnswer,
        mode: 'knowledge-base'
      });
    }

    // Try Gemini AI for complex queries
    try {
      console.log('🤖 Trying Gemini AI...');
      const prompt = buildGeminiPrompt(message);
      const reply = await callGeminiAPI(prompt);
      
      console.log('✅ Gemini AI responded successfully');
      return res.json({ 
        success: true, 
        reply: reply.trim(),
        mode: 'ai-powered'
      });
      
    } catch (geminiError) {
      console.log('⚠️ Gemini failed:', geminiError.message);
      
      // Smart fallback
      return res.json({ 
        success: true, 
        reply: `I'd be happy to help! 😊\n\nFor detailed information, please:\n📞 Call: 0135-2776225 / +91-8191912999\n📧 Email: admissions@vantagehall.org\n\nOr ask me about:\n• Admissions • Fees • Hostel • Medical care\n• Sports • Curriculum • Campus visits`,
        mode: 'fallback'
      });
    }

  } catch (error) {
    console.error('❌ Error:', error);
    
    res.json({
      success: true,
      reply: `Thank you for reaching out! 😊\n\n📞 Call: 0135-2776225\n📧 Email: info@vantagehall.org\n📱 Admissions: +91-8191912999\n\nWe're here to help!`,
      mode: 'emergency-fallback'
    });
  }
});

// ==============================================
// START SERVER
// ==============================================
app.listen(PORT, () => {
  console.log('\n╔═══════════════════════════════════════════╗');
  console.log('║   🎓 Vantage Hall Chatbot Server          ║');
  console.log('╚═══════════════════════════════════════════╝');
  console.log(`🌐 Server: http://localhost:${PORT}`);
  console.log(`🤖 AI: Gemini 2.0 Flash`);
  console.log(`📚 Knowledge: ${Object.keys(KNOWLEDGE_BASE).length} topics`);
  console.log('╚═══════════════════════════════════════════\n');
});

// Export for Vercel
module.exports = app;

