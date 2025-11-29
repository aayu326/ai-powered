// server.js - IMPROVED VERSION with Better Question Understanding

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
// COMPREHENSIVE KNOWLEDGE BASE - IMPROVED
// ==============================================
const KNOWLEDGE_BASE = {
  // Campus Visit & Tour
  campus_visit: {
    keywords: ['visit campus', 'campus tour', 'visit school', 'can i visit', 'see campus', 'tour school', 'visit before admission', 'schedule visit'],
    answer: "📍 Campus Visit & Tours:\n\nYes, absolutely! We welcome parents and students to visit our campus.\n\n✅ How to Schedule:\n📞 Call: 0135-2776225 / +91-8191912999\n📧 Email: admissions@vantagehall.org\n\nOur admissions team will arrange a comprehensive campus tour where you can:\n• See our facilities\n• Meet the faculty\n• Interact with the Principal\n• Visit hostel blocks\n• Experience our learning environment\n\n🗺 Location: Doonga, Dehradun\nGoogle Maps: https://maps.app.goo.gl/F9okR4GADbhN9x5G8"
  },

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
    answer: "🏫 Vantage Hall Girls' Residential School was established in 2013 with a vision to provide world-class boarding education for girls in a nurturing and empowering environment.\n\n👩‍🏫 Principal: Mrs. Seema Sharda (Founder Teacher)"
  },

  // Affiliation
  affiliation: {
    keywords: ['affiliation', 'cbse code', 'board affiliation', 'school code'],
    answer: "📘 The school is affiliated to the Central Board of Secondary Education (CBSE), New Delhi."
  },

  // Location & Directions
  location: {
    keywords: ['location', 'map', 'how to reach', 'directions', 'bus stop', 'address', 'where is'],
    answer: "📍 Vantage Hall is located in Doonga, Dehradun — about 10 km from the city centre. Easily accessible via Sahaspur Road & Rajpur Road.\n\n🗺 Full Address:\nThe Yellow Brick Road, Doonga\nDehradun - 248007, Uttarakhand\n\nGoogle Maps: https://maps.app.goo.gl/F9okR4GADbhN9x5G8"
  },

  // Faculty
  faculty: {
    keywords: ['faculty', 'teachers', 'staff', 'teaching quality', 'teacher qualification'],
    answer: "👩‍🏫 All faculty members are highly qualified professionals with CBSE teaching certifications. Many hold postgraduate degrees and have years of teaching and mentoring experience.\n\n✅ Student-Teacher Ratio: 1:5 for personalized attention"
  },

  // Smart Classes
  smart_class: {
    keywords: ['smart class', 'technology', 'digital classroom', 'computer lab', 'online learning'],
    answer: "💻 Digital & Smart Learning:\n• Smart classrooms with interactive panels\n• Computer & Robotics Labs\n• Wi-Fi-enabled learning environment\n• Integrated Edunext ERP for attendance, grades & communication"
  },

  // Safety & Security
  safety: {
    keywords: ['safety', 'security', 'cctv', 'warden', 'camera', 'rules', 'safe'],
    answer: "🛡 Safety & Security:\n• 24x7 wardens in each hostel block\n• CCTV surveillance in corridors & common areas\n• Controlled visitor access with ID verification\n• Strict discipline & conduct policy\n\nYour daughter's safety is our top priority!"
  },

  // Campus Facilities
  campus: {
    keywords: ['campus', 'infrastructure', 'library', 'labs', 'facilities available', 'auditorium'],
    answer: "🏫 Campus Facilities:\n• 12-acre lush green campus\n• Modern academic blocks & labs\n• Fully stocked library\n• Amphitheatre & multi-purpose auditorium\n• Indoor & outdoor sports arenas\n• State-of-the-art infrastructure\n\nNestled in the salubrious greens with fresh air!"
  },

  // Vision & Mission
  vision: {
    keywords: ['vision', 'goal', 'objective', 'purpose', 'mission', 'unique', 'different', 'special'],
    answer: "🎯 Our Vision & Mission:\n\n\"To nurture happy, independent, and unique individuals in a safe and supportive environment.\"\n\n✨ What Makes Us Special:\n• All-girls focus with no male bias\n• Creating future female leaders\n• Celebrating female strength\n• A community that feels like family\n• Holistic development beyond academics\n• Opportunities for growth beyond classroom"
  },

  // Curriculum
  curriculum: {
    keywords: ['curriculum', 'board', 'cbse', 'syllabus', 'academics system', 'what subject', 'subjects taught'],
    answer: "📚 We follow the CBSE curriculum\n\n🎓 Streams Offered (Classes 11-12):\n• Science\n• Commerce\n• Humanities\n\nOur curriculum emphasizes holistic development beyond textbooks with focus on character building and values."
  },

  // School Timings
  timings: {
    keywords: ['timing', 'time', 'hour', 'schedule', 'start', 'when does school'],
    answer: "🕐 School Timings:\n\n• Grades 3-9: 7:45 AM - 12:55 PM\n• Grades 10-12: 7:45 AM - 1:35 PM\n• Activity Classes: 2:45 PM - 4:05 PM\n\nEvening activities and study hours are scheduled after 4 PM."
  },

  // Student-Teacher Ratio
  ratio: {
    keywords: ['ratio', 'student', 'teacher', 'class size', 'students per'],
    answer: "👩‍🏫 Student-Teacher Ratio: 1:5\n\nWe maintain small class sizes to ensure personalized attention and effective learning for every student."
  },

  // Eligibility & Age
  eligibility: {
    keywords: ['eligibility', 'eligible', 'criteria', 'qualify', 'who can', 'age limit', 'age requirement'],
    answer: "📝 Eligibility Criteria:\n\n✅ Classes: 3-12 (All-girls boarding school)\n✅ Age: As per CBSE guidelines\n✅ Eligibility: Successful completion of previous grade\n✅ Required: Transfer Certificate and Report Card\n\n⚠️ Note: Admission to Class 10 is considered only in exceptional cases"
  },

  // Admission Process
  admission: {
    keywords: ['admission', 'admit', 'process of admission', 'enroll', 'join', 'apply', 'how to get admission'],
    answer: "📝 Admission Process:\n\n✅ Step 1: Written Test (English, Mathematics, Science)\n✅ Step 2: Interaction with Principal\n✅ Step 3: Interaction with Director\n\n📅 Registration Period: September-October\n📅 Session Starts: April\n\n📞 Contact for Admissions:\n+91-8191912999\n+91-7078311863\n📧 admissions@vantagehall.org"
  },

  // Documents Required
  documents: {
    keywords: ['document', 'paper', 'certificate', 'required', 'need', 'bring', 'what documents'],
    answer: "📄 Required Documents:\n\n• Birth Certificate & Aadhaar Card (Student)\n• Parents' Aadhaar & PAN Cards\n• Last examination mark sheet\n• Original Transfer Certificate\n• Medical Fitness Certificate\n• Student's PEN Number / APAAR ID\n\nPlease ensure all documents are original or attested copies."
  },

  // Fee Structure
  fee: {
    keywords: ['fee', 'fees', 'cost', 'tuition', 'charge', 'payment', 'price', 'how much'],
    answer: "💰 Fee Structure (Per Academic Year):\n\n📌 Classes 3-7:\nTotal: ₹7,35,000\n(Annual: ₹5,50,000 + One-time: ₹1,85,000)\n\n📌 Classes 8-10:\nTotal: ₹8,35,000\n(Annual: ₹6,50,000 + One-time: ₹1,85,000)\n\n📌 Classes 11-12:\nTotal: ₹8,85,000\n(Annual: ₹7,00,000 + One-time: ₹1,85,000)\n\n*One-time fees include: registration, joining kit, imprest deposit & admission fee\n\n📞 For detailed fee breakdown: +91-8191912999"
  },

  // Hostel Facilities
  hostel: {
    keywords: ['hostel', 'hostel facilities', 'boarding', 'residential', 'accommodation', 'room', 'dormitory'],
    answer: "🏡 Hostel Facilities:\n\n✨ Well-furnished dormitories with beds, storage, study tables & wardrobes\n✨ Separate hostels for juniors & seniors\n✨ Regular laundry service\n✨ Daily housekeeping\n✨ 24/7 supervision by wardens\n✨ Safe & supportive environment\n✨ Common rooms for recreation\n\nA home away from home! 🏠"
  },

  // Food & Dining
  food: {
    keywords: ['food', 'dining', 'menu', 'meal', 'lunch', 'dinner', 'breakfast', 'diet', 'mess'],
    answer: "🍽️ Dining & Nutrition:\n\n✅ Nutritionist-planned meals\n✅ Special diets for athletes & medical needs\n✅ Veg & non-veg options\n✅ Menu rotates every 15 days\n\n🥗 Daily Meals:\n• Breakfast: Fruits, cereals, milk, eggs, bread/parathas\n• Lunch: Dal, rice/roti, vegetables, salad\n• Dinner: Similar to lunch with variety\n• Night Milk: Mandatory for all students\n\nHealthy, hygienic, and delicious! 😋"
  },

  // Sports & Athletics
  sports: {
    keywords: ['sports', 'sport available', 'games', 'what sports', 'sports facilities', 'athletics', 'physical education', 'football', 'cricket', 'basketball', 'swimming', 'which sports', 'outdoor games'],
    answer: "⚽ Sports & Athletics:\n\nTraining under qualified coaches in:\n\n🏃‍♀️ Outdoor Sports:\nFootball, Cricket, Basketball, Volleyball\n\n🎾 Racquet Sports:\nSquash, Badminton, Lawn Tennis, Table Tennis\n\n⛸️ Other Activities:\nSkating, Gymnasium, Swimming\n\n♟️ Indoor Games:\nCarrom, Chess\n\nRegular inter-house competitions and tournaments!"
  },

  // Clubs & Activities
  clubs: {
    keywords: ['club', 'activity', 'extracurricular', 'societies', 'hobby', 'after school'],
    answer: "🎨 Clubs & Societies:\n\n• Art Club\n• Culinary Club\n• Dance & Music Club\n• Theatre Club\n• Finance & Maths Club\n• IT Club\n• Science Club\n• Photography Club\n• Sustainability Club\n• Editorial Board\n\nStudents can explore their passions and develop new skills!"
  },

  // Career Guidance
  career: {
    keywords: ['career', 'guidance', 'college', 'university', 'neet', 'jee', 'clat', 'counseling'],
    answer: "🎯 Career Guidance & Counseling:\n\nWe offer comprehensive guidance for Grades 8-12:\n\n✅ Medical (NEET)\n✅ Engineering (JEE)\n✅ Law (CLAT, AILET)\n✅ Management (IPM, NMIMS)\n✅ Design (NIFT, UCEED)\n✅ SAT & AP (foreign universities)\n\n1-on-1 personalized guidance sessions available with career counselors!"
  },

  // Contact Information
  contact: {
    keywords: ['contact', 'phone', 'email', 'address', 'reach', 'call', 'number', 'how to contact'],
    answer: "📍 Contact Information:\n\n🏫 Vantage Hall Girls' Residential School\nThe Yellow Brick Road, Doonga\nDehradun - 248007, Uttarakhand\n\n📞 General Enquiries:\n0135-2776225, 226, 227, 228\n📧 info@vantagehall.org\n\n👤 Admissions:\n📞 +91-8191912999\n📞 +91-7078311863\n📧 admissions@vantagehall.org\n\n🌐 Website: www.vantagehall.org"
  },

  // Parent Communication
  parent_communication: {
    keywords: ['parent visit', 'parent meeting', 'can parents visit', 'visiting hours', 'talk to daughter', 'call home', 'parent contact'],
    answer: "👨‍👩‍👧 Parent Communication & Visits:\n\n✅ Regular parent-teacher meetings\n✅ Progress reports sent periodically\n✅ Parents can visit on designated days\n✅ Students can call home at scheduled times\n✅ Edunext ERP for real-time updates\n✅ Emergency contact available 24x7\n\nWe maintain strong parent-school partnership!"
  }
};

// ==============================================
// IMPROVED KEYWORD MATCHING WITH CONTEXT
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
  
  return null;
}

// ==============================================
// IMPROVED GEMINI PROMPT
// ==============================================
function buildGeminiPrompt(userMessage) {
  return `You are a helpful and friendly assistant for Vantage Hall Girls' Residential School, Dehradun.

CRITICAL INSTRUCTIONS:
1. Answer ONLY if the question is about Vantage Hall school
2. If the question is NOT about the school (weather, general knowledge, etc.), respond: "I'm specifically here to help with questions about Vantage Hall! I can tell you about admissions, facilities, curriculum, hostel life, sports, medical care, and more. What would you like to know?"
3. Be warm, conversational, and helpful
4. Keep responses concise but informative
5. Use emojis appropriately 😊

SCHOOL INFORMATION:

📍 Location: Doonga, Dehradun - 248007, Uttarakhand
📞 Phone: 0135-2776225 | Admissions: +91-8191912999, +91-7078311863
📧 Email: info@vantagehall.org | admissions@vantagehall.org
🌐 Website: www.vantagehall.org

ABOUT THE SCHOOL:
- All-girls CBSE boarding school (Classes 3-12)
- Established in 2013
- 12-acre green campus
- Principal: Mrs. Seema Sharda (Founder Teacher)
- Vision: Nurturing happy, independent, unique individuals in safe environment

KEY FEATURES:

🏥 Medical Care:
- In-house doctor (MBBS, DGO) + 3 nurses (24x7)
- Hospital tie-ups: Graphic Era, Synergy, Max
- Monthly health checkups

💰 Fee Structure:
- Classes 3-7: ₹7,35,000
- Classes 8-10: ₹8,35,000  
- Classes 11-12: ₹8,85,000

🏡 Hostel:
- Furnished rooms, 24x7 wardens
- Nutritionist-planned meals
- Regular laundry & housekeeping

⚽ Sports:
- Football, Cricket, Basketball, Swimming
- Badminton, Tennis, Squash, Skating
- Qualified coaches

📚 Academics:
- CBSE curriculum
- Streams: Science, Commerce, Humanities
- Student-Teacher Ratio: 1:5
- Smart classrooms, computer labs

🎨 Activities:
- Clubs: Art, Music, Dance, Theatre, Science, IT, Photography
- Career guidance: NEET, JEE, CLAT, SAT

📝 Admission:
- Process: Written test + Principal & Director interaction
- Registration: Sep-Oct | Session starts: April
- Documents: Birth certificate, TC, mark sheets, Aadhaar, medical certificate

User Question: "${userMessage}"

Your Response (answer the exact question asked):`;
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
// GREETING RESPONSES
// ==============================================
const GREETINGS = [
  "Hello! 👋 Welcome to Vantage Hall Girls' Residential School. How can I help you today?",
  "Hi there! 😊 I'm here to answer your questions about Vantage Hall. What would you like to know?"
];

// ==============================================
// ROOT ENDPOINT
// ==============================================
app.get('/', (req, res) => {
  res.json({
    status: '✅ Server Running',
    message: 'Vantage Hall Chatbot API - Improved Version',
    model: 'Gemini AI + Enhanced Knowledge Base',
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
      fallbackMode: 'Enabled - Using enhanced knowledge base',
      knowledgeBaseTopics: Object.keys(KNOWLEDGE_BASE).length
    });
  }
});

// ==============================================
// CHAT ENDPOINT - IMPROVED
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

    // Try knowledge base first (faster & more accurate)
    const knowledgeAnswer = findBestMatch(message);
    
    if (knowledgeAnswer) {
      console.log(`✅ Knowledge Base Match Found`);
      return res.json({ 
        success: true, 
        reply: knowledgeAnswer + "\n\n📚 *From Knowledge Base*",
        mode: 'knowledge-base'
      });
    }

    // Try Gemini AI for complex queries
    try {
      const prompt = buildGeminiPrompt(message);
      const reply = await callGeminiAPI(prompt);
      
      console.log(`✅ AI Response Generated`);
      
      return res.json({ 
        success: true, 
        reply: reply.trim() + "\n\n🤖 *Powered by AI*",
        mode: 'ai-powered'
      });
      
    } catch (geminiError) {
      console.log('⚠️ Gemini failed, using fallback');
      
      return res.json({ 
        success: true, 
        reply: `Thank you for your question! 😊\n\nFor detailed information:\n📞 Call: 0135-2776225\n📧 Email: info@vantagehall.org\n📱 Admissions: +91-8191912999\n\nYou can also ask me about:\n• Admissions process\n• Fee structure\n• Hostel facilities\n• Medical care\n• Sports & activities\n• Curriculum\n• Campus visits`,
        mode: 'fallback'
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
  console.log('║   🎓 Vantage Hall Chatbot Server (v2)      ║');
  console.log('╚═══════════════════════════════════════════╝');
  console.log(`🌐 Server: http://localhost:${PORT}`);
  console.log(`🧪 Test API: http://localhost:${PORT}/api/test`);
  console.log(`🤖 AI Model: Gemini 2.0 Flash`);
  console.log(`📚 Knowledge Base: ${Object.keys(KNOWLEDGE_BASE).length} topics`);
  console.log('╚═══════════════════════════════════════════\n');
  console.log('🚀 IMPROVEMENTS:');
  console.log('   ✅ Added campus visit information');
  console.log('   ✅ Better question understanding');
  console.log('   ✅ More accurate responses');
  console.log('   ✅ Improved Gemini prompts');
  console.log('   ✅ Added parent communication info\n');
});
