const fs = require('fs');
const path = require('path');

// Load brain content from files
function loadBrain(programType) {
  const brainMap = {
    'Youth Sports': 'brain-youth-sports.txt',
    'STEM': 'brain-stem.txt',
    'After-School Program': 'brain-afterschool.txt',
    'After-School': 'brain-afterschool.txt',
  };

  const brainFile = brainMap[programType] || 'brain-youth-sports.txt';
  const businessBrain = 'brain-business.txt';

  let programBrain = '';
  let generalBrain = '';

  try {
    programBrain = fs.readFileSync(path.join(__dirname, '../../brains', brainFile), 'utf8');
  } catch(e) {
    console.log('Could not load program brain:', e.message);
  }

  try {
    generalBrain = fs.readFileSync(path.join(__dirname, '../../brains', businessBrain), 'utf8');
  } catch(e) {
    console.log('Could not load business brain:', e.message);
  }

  return { programBrain, generalBrain };
}

// Simple keyword search to find relevant brain section
function searchBrain(question, brainContent) {
  if (!brainContent) return '';

  const q = question.toLowerCase();
  const lines = brainContent.split('\n');
  const sections = [];
  let currentSection = [];
  let currentHeader = '';

  // Split brain into sections by headers
  for (const line of lines) {
    if (line.startsWith('## ')) {
      if (currentSection.length > 0) {
        sections.push({ header: currentHeader, content: currentSection.join('\n') });
      }
      currentHeader = line;
      currentSection = [line];
    } else {
      currentSection.push(line);
    }
  }
  if (currentSection.length > 0) {
    sections.push({ header: currentHeader, content: currentSection.join('\n') });
  }

  // Score each section by keyword matches
  const keywords = q.split(' ').filter(w => w.length > 3);
  const scored = sections.map(s => {
    const text = (s.header + ' ' + s.content).toLowerCase();
    const score = keywords.reduce((acc, kw) => acc + (text.includes(kw) ? 1 : 0), 0);
    return { ...s, score };
  });

  // Return top 3 most relevant sections
  const relevant = scored
    .filter(s => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map(s => s.content)
    .join('\n\n---\n\n');

  return relevant;
}

// Detect if question needs real-time data
function needsRealTimeData(question) {
  const q = question.toLowerCase();
  const realTimeKeywords = [
    'current demographics', 'population data', 'census',
    'grant deadline', 'currently accepting', 'open now', 'closing date',
    'recent law', 'new legislation', 'policy change', 'latest news',
    'current contact', 'phone number for', 'current director',
    'weather', 'today', 'this week', 'right now'
  ];
  return realTimeKeywords.some(kw => q.includes(kw));
}

exports.handler = async function(event, context) {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json'
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const { messages, orgProfile, pillar } = JSON.parse(event.body);

    // Get the latest user question
    const userMessages = messages.filter(m => m.role === 'user');
    const latestQuestion = userMessages[userMessages.length - 1]?.content || '';

    console.log('Question:', latestQuestion);
    console.log('Program type:', orgProfile?.programType);

    // Load relevant brain content
    const { programBrain, generalBrain } = loadBrain(orgProfile?.programType || 'Youth Sports');

    // Search brains for relevant content
    const programContext = searchBrain(latestQuestion, programBrain);
    const businessContext = searchBrain(latestQuestion, generalBrain);

    const relevantContext = [programContext, businessContext].filter(Boolean).join('\n\n===\n\n');
    const hasContext = relevantContext.trim().length > 100;
    const isRealTime = needsRealTimeData(latestQuestion);

    console.log('Has brain context:', hasContext);
    console.log('Needs real-time:', isRealTime);

    // Build org profile string
    const profileStr = orgProfile ? `
PROGRAM PROFILE:
- Program: ${orgProfile.orgName || 'Unknown'}
- Type: ${orgProfile.programType || 'Unknown'} — ${orgProfile.sportOrCategory || ''}
- Location: ${orgProfile.city || ''}, ${orgProfile.state || ''}
- Legal structure: ${orgProfile.entityType || 'Unknown'}
- Participants: ${orgProfile.participantCount || 'Unknown'}
- Budget: ${orgProfile.budgetRange || 'Unknown'}
- Grant experience: ${orgProfile.grantExperience || 'Unknown'}
- Biggest challenge: ${orgProfile.biggestChallenge || 'Unknown'}
- Journey stage: ${orgProfile.journey || 'Unknown'}
- Current pillar: ${pillar || 'Build'}
` : '';

    let systemPrompt = '';
    let useAPI = false;

    if (hasContext && !isRealTime) {
      // Answer from brain — no expensive reasoning needed
      systemPrompt = `You are Clearpath, an AI advisor for community program directors. Answer the user's question using ONLY the knowledge base content provided below. Be specific, practical, and warm. Use bullet points for lists. Bold key action items. Keep response under 200 words unless the question requires more detail.

If the knowledge base does not contain enough information to answer confidently, respond with exactly:
"NEEDS_CONSULTANT"

Do not make up information. Do not guess. Only answer from the provided knowledge base.

${profileStr}

KNOWLEDGE BASE:
${relevantContext}`;
      useAPI = true;
    } else if (isRealTime) {
      // Real-time data needed — use API with web context
      systemPrompt = `You are Clearpath, an AI advisor for community program directors. The user needs real-time information. Answer specifically and practically. If you cannot provide current/real-time data, say so clearly and suggest where they can find it.

${profileStr}`;
      useAPI = true;
    } else {
      // No brain context and not real-time — route to consultant
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          reply: `That's a specific situation I want to make sure you get the right answer on. I'd recommend booking a direct consulting session — a program consultant can work through this with you one-on-one.\n\n**[Book a consulting session →](/consulting)**\n\nSessions are $150–$250 and cover exactly the kind of detailed guidance this question needs.`
        })
      };
    }

    // Call Claude API
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-5',
        max_tokens: 1000,
        system: systemPrompt,
        messages: messages
      })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error?.message || 'API error');
    }

    let reply = data.content[0].text;

    // If AI signals it needs a consultant
    if (reply.trim() === 'NEEDS_CONSULTANT' || reply.includes('NEEDS_CONSULTANT')) {
      reply = `That's a specific situation that goes beyond general best practices. I'd recommend booking a direct consulting session to get the right answer for your specific program.\n\n**[Book a consulting session →](/consulting)**\n\nSessions are $150–$250 and cover detailed, situation-specific guidance.`;
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ reply })
    };

  } catch (error) {
    console.error('Chat error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: error.message })
    };
  }
};
