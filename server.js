// server.js - ENHANCED VERSION with Complete Knowledge Base

const fetch = require('node-fetch');
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// ==============================================
// YOUR API KEY
// ==============================================
const GEMINI_API_KEY = "AIzaSyABLD6_HA5kPyHu9o9Ld1vpR7G5ViRryB4";

// ==============================================
// COMPREHENSIVE KNOWLEDGE BASE
// ==============================================
const KNOWLEDGE_BASE = {
  // Medical & Healthcare
  medical_team: {
    keywords: ['doctor', 'nurse', 'medical staff', 'physician', 'gynaecologist', 'school doctor'],
    answer: "👩‍⚕️ Medical Staff:\n\nOur school has a qualified in-house doctor (MBBS, DGO – Physician & Gynaecologist) supported by three trained nurses, ensuring round-the-clock healthcare for all students."
  },
  
  hospital_tieups: {
    keywords: ['hospital', 'emergency hospital', 'tie-up', 'synergy', 'max', 'graphic era'],
    answer: "🏥 Hospital Tie-ups:\n\nFor emergencies requiring specialized care, we have tie-ups with:\n• Graphic Era Hospital (nearby)\n• Synergy Hospital\n• Max Hospital\n\nThis ensures immediate and expert medical attention when needed."
  },

  first_aid: {
    keywords: ['first aid', 'injury', 'wound', 'fever', 'allergy', 'minor injury'],
    answer: "🚑 First Aid Services:\n\nOur medical team provides prompt first aid, including:\n• Minor injury care\n• Wound dressing\n• Fever management\n• Allergic reaction support\n\nStudents receive immediate attention and comfort within the campus."
  },

  monthly_checkup: {
    keywords: ['health checkup', 'monthly checkup', 'medical exam', 'routine health', 'vision test'],
    answer: "🩺 Monthly Health Check-ups:\n\nRegular health assessments include:\n• Height & Weight tracking\n• Vision tests\n• Dental hygiene\n• General physical examination\n\nThis helps monitor every student's well-being throughout the year."
  },

  medical_availability: {
    keywords: ['24x7', 'available', 'round the clock', 'night doctor', 'day doctor'],
    answer: "⏱️ 24x7 Medical Availability:\n\nMedical assistance, including first and primary aid, is available at all hours — ensuring your child's safety day and night."
  },

  // Founder & History
  founder: {
    keywords: ['founder', 'established', 'history', 'who started', 'foundation', 'when founded'],
    answer: "🏫 Vantage Hall Girls' Residential School was established in 2013 with a vision to provide world-class boarding education for girls in a nurturing and empowering environment."
  },

  // Affiliation
  affiliation: {
    keywords: ['affiliation', 'cbse code', 'board affiliation', 'school code'],
    answer: "📘 The school is affiliated to the Central Board of Secondary Education (CBSE), New Delhi."
  },

  // Location
  location: {
    keywords: ['location', 'map', 'how to reach', 'directions', 'bus stop', 'address'],
    answer: "📍 Vantage Hall is located in Doonga, Dehradun — about 10 km from the city centre. Easily accessible via Sahaspur Road & Rajpur Road.\n🗺 Google Maps: https://maps.app.goo.gl/F9okR4GADbhN9x5G8"
  },

  // Faculty
  faculty: {
    keywords: ['faculty', 'teachers', 'staff', 'teaching quality', 'teacher qualification'],
    answer: "👩‍🏫 All faculty members are highly qualified professionals with CBSE teaching certifications. Many hold postgraduate degrees and have years of teaching and mentoring experience."
  },

  // Smart Classes
  smart_class: {
    keywords: ['smart class', 'technology', 'digital classroom', 'computer lab', 'online learning'],
    answer: "💻 Digital & Smart Learning:\n• Smart classrooms with interactive panels\n• Computer & Robotics Labs\n• Wi-Fi-enabled learning environment\n• Integrated Edunext ERP for attendance, grades & communication"
  },

  // Safety & Security
  safety: {
    keywords: ['safety', 'security', 'cctv', 'warden', 'camera', 'rules'],
    answer: "🛡 Safety & Security:\n• 24x7 wardens in each hostel block\n• CCTV surveillance in corridors & common areas\n• Controlled visitor access with ID verification\n• Strict discipline & conduct policy"
  },

  // Campus
  campus: {
    keywords: ['campus', 'infrastructure', 'library', 'labs', 'facilities available', 'auditorium'],
    answer: "🏫 Campus Facilities:\n• 12-acre lush green campus\n• Modern academic blocks & labs\n• Fully stocked library\n• Amphitheatre & multi-purpose auditorium\n• Indoor & outdoor sports arenas"
  },

  // Vision & Mission
  vision: {
    keywords: ['vision', 'goal', 'objective', 'purpose', 'mission'],
    answer: "🎯 Our Vision & Mission:\n\nTo nurture happy, independent, and unique individuals in a safe and supportive environment."
  },

  // Curriculum
  curriculum: {
    keywords: ['curriculum', 'board', 'cbse', 'syllabus', 'academics system', 'what subject', 'subjects taught'],
    answer: "📚 We follow the CBSE curriculum\n\n🎓 Streams Offered (Classes 11-12):\n• Science\n• Commerce\n• Humanities\n\nOur curriculum emphasizes holistic development beyond textbooks."
  },

  // Timings
  timings: {
    keywords: ['timing', 'time', 'hour', 'schedule', 'start'],
    answer: "🕐 School Timings:\n\n• Grades 3-9: 7:45 AM - 12:55 PM\n• Grades 10-12: 7:45 AM - 1:35 PM\n• Activity Classes: 2:45 PM - 4:05 PM"
  },

  // Student-Teacher Ratio
  ratio: {
    keywords: ['ratio', 'student', 'teacher', 'class size', 'students per'],
    answer: "👩‍🏫 Student-Teacher Ratio: 1:5\n\nWe maintain small class sizes to ensure personalized attention and effective learning for every student."
  },

  // Eligibility
  eligibility: {
    keywords: ['eligibility', 'eligible', 'criteria', 'qualify', 'who can', 'age'],
    answer: "📝 Eligibility Criteria:\n\n✅ Classes: 3-12\n✅ Age: As per CBSE guidelines\n✅ Eligibility: Successful completion of previous grade\n✅ Required: Transfer Certificate and Report Card\n\n⚠️ Note: Admission to Class 10 is considered only in exceptional cases"
  },

  // Admission Process
  admission: {
    keywords: ['admission', 'admit', 'process of admission', 'enroll', 'join', 'apply'],
    answer: "📝 Admission Process:\n\n✅ Step 1: Written Test (English, Mathematics, Science)\n✅ Step 2: Interaction with Principal\n✅ Step 3: Interaction with Director\n\n📅 Registrations: September-October\n📅 Session Starts: April\n\n📞 Contact:\n+91-8191912999, +91-7078311863\n📧 admissions@vantagehall.org"
  },

  // Documents Required
  documents: {
    keywords: ['document', 'paper', 'certificate', 'required', 'need', 'bring'],
    answer: "📄 Required Documents:\n\n• Birth Certificate & Aadhaar Card\n• Parents' Aadhaar & PAN Cards\n• Last examination mark sheet\n• Original Transfer Certificate\n• Medical Fitness Certificate\n• Student's PEN Number / APAAR ID"
  },

  // Fee Structure
  fee: {
    keywords: ['fee', 'fees', 'cost', 'tuition', 'charge', 'payment', 'price'],
    answer: "💰 Fee Structure:\n\n📌 Classes 3-7: ₹7,35,000 (Annual: ₹5,50,000 + One-time: ₹1,85,000)\n\n📌 Classes 8-10: ₹8,35,000 (Annual: ₹6,50,000 + One-time: ₹1,85,000)\n\n📌 Classes 11-12: ₹8,85,000 (Annual: ₹7,00,000 + One-time: ₹1,85,000)\n\n*One-time fees include registration, joining kit, imprest deposit & admission fee"
  },

  // Hostel Facilities
  hostel: {
    keywords: ['hostel', 'hostel facilities', 'boarding', 'residential', 'accommodation', 'room'],
    answer: "🏡 Hostel Facilities:\n\n✨ Well-furnished dormitories with beds, storage, study tables & wardrobes\n✨ Separate hostels for juniors & seniors\n✨ Regular laundry service\n✨ Daily housekeeping\n✨ 24/7 supervision by wardens\n✨ Safe & supportive environment"
  },

  // Food & Dining
  food: {
    keywords: ['food', 'dining', 'menu', 'meal', 'lunch', 'dinner', 'breakfast', 'diet'],
    answer: "🍽️ Dining & Nutrition:\n\n✅ Nutritionist-planned meals\n✅ Special diets for athletes & medical needs\n✅ Veg & non-veg options\n✅ Menu rotates every 15 days\n\n🥗 Daily Meals:\n• Breakfast: Fruits, cereals, milk, eggs, bread/parathas\n• Lunch: Dal, rice/roti, vegetables, salad\n• Dinner: Similar to lunch with variety\n• Night Milk: Mandatory"
  },

  // Sports
  sports: {
    keywords: ['sports', 'sport available', 'games', 'what sports', 'sports facilities', 'athletics', 'physical education', 'football', 'cricket', 'basketball', 'swimming', 'which sports'],
    answer: "⚽ Sports & Athletics:\n\nTraining under qualified coaches in:\n\n🏃‍♀️ Football, Cricket, Basketball, Volleyball\n🎾 Squash, Badminton, Lawn Tennis, Table Tennis\n⛸️ Skating, Gymnasium, Swimming\n♟️ Indoor Games: Carrom, Chess"
  },

  // Clubs & Activities
  clubs: {
    keywords: ['club', 'activity', 'extracurricular', 'societies', 'hobby'],
    answer: "🎨 Clubs & Societies:\n\n• Art Club\n• Culinary Club\n• Dance & Music Club\n• Theatre Club\n• Finance & Maths Club\n• IT Club\n• Science Club\n• Photography Club\n• Sustainability Club\n• Editorial Board"
  },

  // Career Guidance
  career: {
    keywords: ['career', 'guidance', 'college', 'university', 'neet', 'jee', 'clat'],
    answer: "🎯 Career Guidance:\n\nWe offer counseling for Grades 8-12, including:\n\n✅ Medical (NEET)\n✅ Engineering (JEE)\n✅ Law (CLAT, AILET)\n✅ Management (IPM, NMIMS)\n✅ Design (NIFT, UCEED)\n✅ SAT & AP (foreign universities)\n\n1-on-1 guidance sessions available!"
  },

  // Contact Information
  contact: {
    keywords: ['contact', 'phone', 'email', 'address', 'reach', 'call', 'number'],
    answer: "📍 Vantage Hall Girls' Residential School\nThe Yellow Brick Road, Doonga\nDehradun - 248007, Uttarakhand\n\n📞 General: 0135-2776225, 226, 227, 228\n📧 info@vantagehall.org\n\n👤 Admissions:\n📞 +91-8191912999, +91-7078311863\n📧 admissions@vantagehall.org"
  }
};

// ==============================================
// SMART KEYWORD MATCHING FUNCTION WITH SCORING
// ==============================================
function findBestMatch(userMessage) {
  const msg = userMessage.toLowerCase().trim();
  
  let bestMatch = null;
  let highestScore = 0;
  
  // Check each topic in knowledge base
  for (const [topic, data] of Object.entries(KNOWLEDGE_BASE)) {
    let score = 0;
    let matchedKeywords = [];
    
    for (const keyword of data.keywords) {
      const keywordLower = keyword.toLowerCase();
      
      // Exact phrase match (highest priority)
      if (msg === keywordLower) {
        score += 100;
        matchedKeywords.push(keyword);
      }
      // Word boundary match (high priority)
      else if (new RegExp(`\\b${keywordLower}\\b`, 'i').test(msg)) {
        score += 50;
        matchedKeywords.push(keyword);
      }
      // Contains match (lower priority)
      else if (msg.includes(keywordLower)) {
        score += 10;
        matchedKeywords.push(keyword);
      }
    }
    
    // Update best match if this score is higher
    if (score > highestScore && score > 0) {
      highestScore = score;
      bestMatch = {
        answer: data.answer,
        topic: topic,
        score: score,
        matchedKeywords: matchedKeywords
      };
    }
  }
  
  // Return the best match if score is high enough
  if (bestMatch && bestMatch.score >= 10) {
    console.log(`✅ Best Match: ${bestMatch.topic} (Score: ${bestMatch.score})`);
    return bestMatch.answer;
  }
  
  // Default fallback
  return null;
}

// ==============================================
// GENERAL FALLBACK RESPONSES
// ==============================================
const GENERAL_FALLBACK = [
  "Thank you for your question! 😊\n\nFor detailed information:\n📞 Call: 0135-2776225\n📧 Email: info@vantagehall.org\n📱 Admissions: +91-8191912999\n\nYou can also ask me about admissions, fees, facilities, medical care, sports, or our curriculum!",
  "I'd be happy to help! For specific details:\n📞 0135-2776225\n📧 info@vantagehall.org\n\nFeel free to ask about our hostel, academics, career guidance, or any other aspect of school life!"
];

// Greeting responses
const GREETINGS = [
  "Hello! 👋 Welcome to Vantage Hall Girls' Residential School. How can I help you today?",
  "Hi there! I'm here to answer your questions about Vantage Hall. What would you like to know?"
];

// ==============================================
// GEMINI API CALL
// ==============================================
async function callGeminiAPI(prompt) {
  const modelNames = [
    'gemini-2.5-flash',
    'gemini-2.0-flash',
    'gemini-2.0-flash-001'
  ];

  for (const modelName of modelNames) {
    try {
      const url = `https://generativelanguage.googleapis.com/v1/models/${modelName}:generateContent?key=${GEMINI_API_KEY}`;
      
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
        console.log(`✅ Success with model: ${modelName}`);
        return text;
      }
    } catch (error) {
      continue;
    }
  }

  throw new Error('All Gemini models failed');
}

// ==============================================
// ROOT ENDPOINT
// ==============================================
app.get('/', (req, res) => {
  res.json({
    status: '✅ Server Running',
    message: 'Vantage Hall Chatbot API - Enhanced Version',
    model: 'Gemini AI + Comprehensive Knowledge Base',
    endpoints: {
      health: '/api/health',
      chat: '/api/chat (POST)',
      test: '/api/test'
    }
  });
});

// ==============================================
// HEALTH CHECK
// ==============================================
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// ==============================================
// TEST ENDPOINT
// ==============================================
app.get('/api/test', async (req, res) => {
  try {
    const reply = await callGeminiAPI('Say "Hello! The Gemini API is working!" in one sentence.');
    res.json({ 
      success: true, 
      message: '✅ Gemini API is WORKING!',
      testReply: reply,
      knowledgeBaseTopics: Object.keys(KNOWLEDGE_BASE).length
    });
  } catch (error) {
    res.json({ 
      success: false, 
      error: error.message,
      fallbackMode: 'Enabled - Using comprehensive knowledge base',
      knowledgeBaseTopics: Object.keys(KNOWLEDGE_BASE).length
    });
  }
});

// ==============================================
// CHAT ENDPOINT - ENHANCED WITH KNOWLEDGE BASE
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

    // Special test commands
    if (message.toLowerCase().includes('are you ai') || 
        message.toLowerCase().includes('ai powered') ||
        message.toLowerCase().includes('using ai')) {
      
      // Test if Gemini is working
      try {
        await callGeminiAPI('Say "Yes, I am AI-powered!" in one sentence.');
        return res.json({
          success: true,
          reply: "✅ Yes! I'm powered by Google's Gemini AI along with a comprehensive knowledge base about Vantage Hall.\n\n🤖 I can answer questions using:\n• 30+ pre-programmed topics (instant)\n• Gemini AI for complex queries\n• Smart fallbacks for reliability\n\nTry asking me about admissions, facilities, sports, medical care, or anything about Vantage Hall!",
          mode: 'ai-test'
        });
      } catch (error) {
        return res.json({
          success: true,
          reply: "I have AI capabilities, but currently running on a comprehensive knowledge base with 30+ topics about Vantage Hall. This ensures fast and accurate responses!\n\nAsk me anything about admissions, facilities, sports, medical care, curriculum, or student life! 😊",
          mode: 'knowledge-base-test'
        });
      }
    }

    // Check for greeting
    if (/^(hi|hello|hey|good morning|good afternoon|good evening)/i.test(message.trim())) {
      const greeting = GREETINGS[Math.floor(Math.random() * GREETINGS.length)];
      return res.json({ 
        success: true, 
        reply: greeting,
        mode: 'greeting'
      });
    }

    // Try to find answer in knowledge base first
    const knowledgeAnswer = findBestMatch(message);
    
    if (knowledgeAnswer) {
      console.log(`✅ Knowledge Base Match Found`);
      return res.json({ 
        success: true, 
        reply: knowledgeAnswer + "\n\n📚 *From Knowledge Base*",
        mode: 'knowledge-base'
      });
    }

    // Try Gemini AI
    try {
      const systemPrompt = `You are a friendly assistant for Vantage Hall Girls' Residential School, Dehradun.

IMPORTANT: Answer ONLY questions about Vantage Hall school. For unrelated questions, politely redirect to school-related topics.

School Information:
Location: Doonga, Dehradun - 248007
Phone: 0135-2776225
Email: info@vantagehall.org
Admissions: +91-8191912999, +91-7078311863

The school is a CBSE-affiliated all-girls boarding school (Classes 3-12) established in 2013 on a 12-acre campus.

Key Features:
- 24x7 medical care with in-house doctor (MBBS, DGO) and 3 nurses
- Hospital tie-ups: Graphic Era, Synergy, Max Hospital
- Sports: Football, Cricket, Basketball, Swimming, Badminton, Tennis, etc.
- Smart classrooms with interactive panels & digital learning
- Student-teacher ratio: 1:5
- Nutritionist-planned meals with veg & non-veg options
- 24x7 hostel supervision with wardens
- Clubs: Art, Music, Dance, Theatre, Science, IT, Photography, etc.
- Fee Structure: Classes 3-7 (₹7.35L), 8-10 (₹8.35L), 11-12 (₹8.85L)
- Streams: Science, Commerce, Humanities
- Career guidance for NEET, JEE, CLAT, SAT, etc.

Guidelines:
1. Be warm, helpful, and conversational
2. If the question is about Vantage Hall, provide detailed answer
3. If question is unrelated (weather, general knowledge, etc.), say: "I'm specifically designed to help with questions about Vantage Hall! I can tell you about our admissions, facilities, curriculum, hostel life, sports, medical care, and more. What would you like to know?"
4. Always end with a helpful follow-up suggestion
5. Use emojis appropriately 😊

User question: ${message}

Your response:`;

      const reply = await callGeminiAPI(systemPrompt);
      
      console.log(`✅ AI Response Generated`);
      
      return res.json({ 
        success: true, 
        reply: reply.trim() + "\n\n🤖 *Powered by AI*",
        mode: 'ai-powered'
      });
      
    } catch (geminiError) {
      // Final fallback
      console.log('⚠️ Using general fallback');
      const fallback = GENERAL_FALLBACK[Math.floor(Math.random() * GENERAL_FALLBACK.length)];
      
      return res.json({ 
        success: true, 
        reply: fallback,
        mode: 'general-fallback'
      });
    }

  } catch (error) {
    console.error('❌ Error:', error.message);
    
    res.json({
      success: true,
      reply: `Thank you for your message! 😊\n\nFor immediate assistance:\n📞 Call: 0135-2776225\n📧 Email: info@vantagehall.org\n📱 Admissions: +91-8191912999\n\nWe're here to help!`,
      mode: 'emergency-fallback'
    });
  }
});

// ==============================================
// START SERVER
// ==============================================
app.listen(PORT, () => {
  console.log('\n╔═══════════════════════════════════════════╗');
  console.log('║   🎓 Vantage Hall Chatbot Server            ║');
  console.log('╚═══════════════════════════════════════════╝');
  console.log(`🌐 Server: http://localhost:${PORT}`);
  console.log(`🧪 Test API: http://localhost:${PORT}/api/test`);
  console.log(`🤖 AI Model: Gemini 2.5 Flash`);
  console.log(`📚 Knowledge Base: ${Object.keys(KNOWLEDGE_BASE).length} topics`);
  console.log('╚═══════════════════════════════════════════\n');
  console.log('🚀 Ready to chat! Open index.html in your browser.\n');
});