// server.js - COMPLETE WORKING VERSION FOR VERCEL

const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// ==============================================
// YOUR API KEY
// ==============================================
const GEMINI_API_KEY = "AIzaSyACf8nQc9voTiJ6hbKczUoLCZKaqFdmTvk";

// ==============================================
// COMPREHENSIVE KNOWLEDGE BASE - COMPLETE SCHOOL INFO
// ==============================================
const KNOWLEDGE_BASE = {
  // General School Information
  school_info: {
    keywords: ['school name', 'full name', 'about school', 'what is vantage', 'tell me about', 'vantage hall'],
    answer: "🏫 **Vantage Hall Girls' Residential School**\n\n📍 Address: The Yellow Brick Road, Doonga, Dehradun - 248007, Uttarakhand\n\n🎯 Vision: To nurture happy, independent, and unique individuals in a safe and supportive environment.\n\n✨ Established: 2013\n📘 Board: CBSE\n👩‍🏫 Principal: Mrs. Seema Sharda (Founder Teacher)\n🌳 Campus: 12-acre lush green campus"
  },

  vision: {
    keywords: ['vision', 'mission', 'goal', 'objective', 'purpose', 'unique', 'different', 'special', 'why choose'],
    answer: "🎯 **Our Vision & Mission:**\n\n\"To nurture happy, independent, and unique individuals in a safe and supportive environment.\"\n\n✨ What Makes Us Special:\n• All-girls boarding school with no bias\n• Creating future female leaders\n• Celebrating female strength\n• A community that feels like family\n• Holistic development beyond academics"
  },

  curriculum: {
    keywords: ['curriculum', 'board', 'cbse', 'syllabus', 'academics', 'subjects', 'what subject'],
    answer: "📚 **Curriculum:**\n\nWe follow the CBSE curriculum\n\n🎓 Streams Offered (Classes 11-12):\n• Science\n• Commerce\n• Humanities\n\n👩‍🏫 Student-Teacher Ratio: 1:5\n• Small class sizes for personalized attention\n• Focus on holistic development"
  },

  timings: {
    keywords: ['timing', 'time', 'schedule', 'start', 'when does school', 'school hours'],
    answer: "🕐 **School Timings:**\n\n• Grades 3-9: 7:45 AM - 12:55 PM\n• Grades 10-12: 7:45 AM - 1:35 PM\n• Activity Classes: 2:45 PM - 4:05 PM\n\nEvening activities and study hours are scheduled after 4 PM."
  },

  admission: {
    keywords: ['admission', 'admit', 'process', 'enroll', 'join', 'apply', 'how to get admission', 'eligibility'],
    answer: "📝 **Admission Process:**\n\n✅ Step 1: Written Test (English, Mathematics, Science)\n✅ Step 2: Interaction with Principal\n✅ Step 3: Interaction with Director\n\n📅 Registration: September-October\n📅 Session Starts: April\n\n📌 Eligibility:\n• Classes: 3-12 (All-girls)\n• Age: As per CBSE guidelines\n• Required: Transfer Certificate & Report Card\n\n📞 Contact:\n+91-8191912999\n+91-7078311863\n📧 admissions@vantagehall.org"
  },

  documents: {
    keywords: ['document', 'paper', 'certificate', 'required', 'what documents', 'need to bring'],
    answer: "📄 **Required Documents:**\n\n• Student's Birth Certificate & Aadhaar Card\n• Parents' Aadhaar & PAN Cards\n• Last examination mark sheet\n• Original Transfer Certificate\n• Medical Fitness Certificate\n• Student's PEN Number / APAAR ID\n\nEnsure all documents are original or attested copies."
  },

  fee: {
    keywords: ['fee', 'fees', 'cost', 'tuition', 'charge', 'payment', 'price', 'how much', 'expense'],
    answer: "💰 **Fee Structure (Per Year):**\n\n📌 Classes 3-7:\n• Total: ₹7,35,000\n• Annual: ₹5,50,000\n• One-time: ₹1,85,000\n\n📌 Classes 8-10:\n• Total: ₹8,35,000\n• Annual: ₹6,50,000\n• One-time: ₹1,85,000\n\n📌 Classes 11-12:\n• Total: ₹8,85,000\n• Annual: ₹7,00,000\n• One-time: ₹1,85,000\n\n*One-time fees: registration, joining kit, deposit & admission fee\n\n📞 For details: +91-8191912999"
  },

  hostel: {
    keywords: ['hostel', 'facilities', 'boarding', 'residential', 'accommodation', 'room', 'dormitory', 'stay'],
    answer: "🏡 **Hostel Facilities:**\n\n✨ Well-furnished dormitories with:\n• Beds, storage, study tables & wardrobes\n• Separate hostels for juniors & seniors\n• Regular laundry service\n• Daily housekeeping\n• 24/7 supervision by wardens\n• Safe & supportive environment\n• Common rooms for recreation\n\nA home away from home! 🏠"
  },

  food: {
    keywords: ['food', 'dining', 'menu', 'meal', 'lunch', 'dinner', 'breakfast', 'diet', 'mess', 'nutrition'],
    answer: "🍽️ **Dining & Nutrition:**\n\n✅ Nutritionist-planned meals\n✅ Special diets for athletes & medical needs\n✅ Veg & non-veg options\n✅ Menu rotates every 15 days\n\n🥗 Daily Meals:\n• Breakfast: Fruits, cereals, milk, eggs, bread/parathas\n• Mid-Morning Snack: Fruits & light snacks\n• Lunch: Dal, rice/roti, vegetables, salad & dessert\n• Evening Snack: Sandwich, fruit, or soup\n• Dinner: Similar to lunch with variety\n• Night Milk: Mandatory for all students\n\n📋 Sample Menu: https://vantagehall.org/food-nutrition/"
  },

  medical: {
    keywords: ['doctor', 'nurse', 'medical', 'health', 'hospital', 'emergency', 'first aid', 'checkup'],
    answer: "🏥 **Medical Care:**\n\n👩‍⚕️ **On-Campus:**\n• Qualified doctor (MBBS, DGO - Physician & Gynaecologist)\n• 3 trained nurses available 24/7\n• Daily doctor visits for check-ups\n• First aid & immediate medical attention\n\n🏨 **Hospital Tie-ups:**\n• Max Hospital\n• Synergy Hospital\n• Graphic Era Hospital (nearby)\n\n🩺 **Regular Services:**\n• Monthly health check-ups\n• Height & weight tracking\n• Vision tests\n• Dental hygiene checks"
  },

  sports: {
    keywords: ['sports', 'games', 'athletics', 'physical', 'football', 'cricket', 'basketball', 'swimming', 'which sports', 'outdoor'],
    answer: "⚽ **Sports & Athletics:**\n\nTraining under qualified coaches in:\n\n🏃‍♀️ **Outdoor Sports:**\n• Football\n• Cricket\n• Basketball\n• Volleyball\n\n🎾 **Racquet Sports:**\n• Squash\n• Badminton\n• Lawn Tennis\n• Table Tennis\n\n⛸️ **Other Activities:**\n• Skating\n• Gymnasium\n• Swimming\n\n♟️ **Indoor Games:**\n• Carrom\n• Chess\n\nRegular inter-house competitions and tournaments!"
  },

  clubs: {
    keywords: ['club', 'activity', 'extracurricular', 'societies', 'hobby', 'after school', 'activities'],
    answer: "🎨 **Clubs & Societies:**\n\n• Art Club\n• Culinary Club\n• Dance & Music Club\n• Theatre Club\n• Finance & Maths Club\n• IT Club\n• Science Club\n• Photography Club\n• Sustainability Club\n• Editorial Board\n• Arts & Design Club\n\nStudents can explore their passions and develop new skills!"
  },

  career: {
    keywords: ['career', 'guidance', 'college', 'university', 'neet', 'jee', 'clat', 'counseling', 'future'],
    answer: "🎯 **Career Guidance & Counseling:**\n\nComprehensive guidance for Grades 8-12:\n\n✅ Medical (NEET)\n✅ Engineering (JEE)\n✅ Law (CLAT, AILET)\n✅ Management (IPM, NMIMS, Symbiosis, Christ)\n✅ Humanities (Ashoka, OP Jindal, Symbiosis, Christ)\n✅ Design (NIFT, UCEED)\n✅ SAT & AP (foreign universities)\n\n📌 1-on-1 personalized guidance sessions with career counselors!"
  },

  contact: {
    keywords: ['contact', 'phone', 'email', 'address', 'reach', 'call', 'number', 'how to contact', 'location'],
    answer: "📍 **Contact Information:**\n\n🏫 Vantage Hall Girls' Residential School\nThe Yellow Brick Road, Doonga\nDehradun - 248007, Uttarakhand\n\n📞 **General Enquiries:**\n0135-2776225, 226, 227, 228\n📧 info@vantagehall.org\n\n📞 **Admissions:**\n+91-8191912999\n+91-7078311863\n📧 admissions@vantagehall.org\n\n🌐 Website: www.vantagehall.org\n🗺️ Google Maps: https://maps.app.goo.gl/F9okR4GADbhN9x5G8"
  },

  safety: {
    keywords: ['safety', 'security', 'cctv', 'warden', 'camera', 'safe', 'protection'],
    answer: "🛡️ **Safety & Security:**\n\n✅ 24/7 wardens in each hostel block\n✅ CCTV surveillance in corridors & common areas\n✅ Controlled visitor access with ID verification\n✅ Strict discipline & conduct policy\n✅ Entry/exit logs maintained\n✅ No cameras inside hostel rooms (privacy)\n\nYour daughter's safety is our top priority!"
  },

  campus_visit: {
    keywords: ['visit', 'campus tour', 'visit school', 'can i visit', 'see campus', 'tour', 'schedule visit'],
    answer: "📍 **Campus Visit & Tours:**\n\nYes! We welcome campus visits.\n\n✅ **How to Schedule:**\n📞 Call: 0135-2776225 / +91-8191912999\n📧 Email: admissions@vantagehall.org\n\n🏫 **During the tour you can:**\n• See our facilities\n• Meet the faculty\n• Interact with Principal\n• Visit hostel blocks\n• Experience our learning environment\n\n🗺️ Location: Doonga, Dehradun\nGoogle Maps: https://maps.app.goo.gl/F9okR4GADbhN9x5G8"
  },

  parent_communication: {
    keywords: ['parent', 'meeting', 'ptm', 'communication', 'updates', 'erp', 'call home', 'contact daughter'],
    answer: "👨‍👩‍👧 **Parent Communication:**\n\n✅ ERP system for real-time updates\n✅ Weekly student-parent calls (45 min every Sunday)\n✅ Special calls on birthdays/anniversaries\n✅ Email and WhatsApp updates\n✅ Parent-Teacher Meetings: 4 times/year (Online & Offline)\n✅ 24/7 emergency contact available\n\nWe maintain strong parent-school partnership!"
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
      
      // Exact phrase match
      if (msg === keywordLower) {
        score += 100;
      }
      // Word boundary match
      else if (new RegExp(`\\b${keywordLower}\\b`, 'i').test(msg)) {
        score += 50;
      }
      // Contains match
      else if (msg.includes(keywordLower)) {
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
// GEMINI API CALL
// ==============================================
async function callGeminiAPI(prompt) {
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
        console.log(`✅ Gemini response with model: ${modelName}`);
        return text;
      }
    } catch (error) {
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
4. Keep responses concise but informative
5. Use emojis appropriately 😊

SCHOOL INFORMATION:

📍 Location: Doonga, Dehradun - 248007, Uttarakhand
📞 Phone: 0135-2776225 | Admissions: +91-8191912999
📧 info@vantagehall.org | admissions@vantagehall.org

ABOUT THE SCHOOL:
- All-girls CBSE boarding school (Classes 3-12)
- Established: 2013 | Principal: Mrs. Seema Sharda
- 12-acre green campus
- Vision: Nurturing happy, independent, unique individuals

KEY FEATURES:
🏥 Medical: In-house doctor + 3 nurses (24/7)
💰 Fees: Classes 3-7: ₹7.35L | 8-10: ₹8.35L | 11-12: ₹8.85L
🏡 Hostel: Furnished rooms, 24/7 wardens, nutritionist-planned meals
⚽ Sports: Football, Cricket, Basketball, Swimming, Tennis, Badminton
📚 Curriculum: CBSE | Streams: Science, Commerce, Humanities
🎯 Student-Teacher Ratio: 1:5

User Question: "${userMessage}"

Your Response (be friendly and informative):`;
}

// ==============================================
// GREETING RESPONSES
// ==============================================
const GREETINGS = [
  "Hello! 👋 Welcome to Vantage Hall Girls' Residential School. How can I help you today?",
  "Hi there! 😊 I'm here to answer your questions about Vantage Hall. What would you like to know?",
  "Hey! 👋 Welcome! Ask me anything about Vantage Hall - admissions, facilities, fees, or anything else!"
];

// ==============================================
// ROOT ENDPOINT
// ==============================================
app.get('/', (req, res) => {
  res.json({
    status: '✅ Server Running',
    message: 'Vantage Hall Chatbot API',
    model: 'Gemini AI + Knowledge Base',
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
    message: 'Chatbot API is running!'
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
    if (/^(hi|hello|hey|good morning|good afternoon|good evening)$/i.test(message.trim())) {
      const greeting = GREETINGS[Math.floor(Math.random() * GREETINGS.length)];
      return res.json({ 
        success: true, 
        reply: greeting,
        mode: 'greeting'
      });
    }

    // Try knowledge base first
    const knowledgeAnswer = findBestMatch(message);
    
    if (knowledgeAnswer) {
      return res.json({ 
        success: true, 
        reply: knowledgeAnswer,
        mode: 'knowledge-base'
      });
    }

    // Try Gemini AI
    try {
      const prompt = buildGeminiPrompt(message);
      const reply = await callGeminiAPI(prompt);
      
      return res.json({ 
        success: true, 
        reply: reply.trim(),
        mode: 'ai-powered'
      });
      
    } catch (geminiError) {
      console.log('⚠️ Gemini failed, using fallback');
      
      return res.json({ 
        success: true, 
        reply: `Thank you for your question! 😊\n\nFor detailed information:\n📞 Call: 0135-2776225\n📧 Email: info@vantagehall.org\n📱 Admissions: +91-8191912999\n\nYou can also ask me about:\n• Admissions process\n• Fee structure\n• Hostel facilities\n• Medical care\n• Sports & activities\n• Curriculum`,
        mode: 'fallback'
      });
    }

  } catch (error) {
    console.error('❌ Error:', error);
    
    res.json({
      success: true,
      reply: `Thank you for your message! 😊\n\nFor immediate assistance:\n📞 Call: 0135-2776225\n📧 Email: info@vantagehall.org\n📱 Admissions: +91-8191912999`,
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
  console.log(`🤖 AI Model: Gemini 2.0`);
  console.log(`📚 Knowledge Base: ${Object.keys(KNOWLEDGE_BASE).length} topics`);
  console.log('╚═══════════════════════════════════════════\n');
});

// Export for Vercel
module.exports = app;
