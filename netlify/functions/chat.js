const fs = require('fs');
const path = require('path');

function loadBrains(programType) {
  // Try multiple path locations since Netlify can be unpredictable
  const possibleRoots = [
    path.join(__dirname, '../../brains'),
    path.join(__dirname, '../../../brains'),
    path.join(process.cwd(), 'brains'),
    '/var/task/brains',
  ];

  const brainMap = {
    'Youth Sports': 'brain-youth-sports.txt',
    'STEM': 'brain-stem.txt',
    'After-School Program': 'brain-afterschool.txt',
    'After-School': 'brain-afterschool.txt',
  };

  const programFile = brainMap[programType] || 'brain-youth-sports.txt';
  let programBrain = '';
  let businessBrain = '';

  for (const root of possibleRoots) {
    try {
      if (!programBrain) {
        programBrain = fs.readFileSync(path.join(root, programFile), 'utf8');
        console.log('Loaded program brain from:', root);
      }
    } catch(e) {}
    try {
      if (!businessBrain) {
        businessBrain = fs.readFileSync(path.join(root, 'brain-business.txt'), 'utf8');
        console.log('Loaded business brain from:', root);
      }
    } catch(e) {}
    if (programBrain && businessBrain) break;
  }

  console.log('Program brain loaded:', programBrain.length > 0);
  console.log('Business brain loaded:', businessBrain.length > 0);

  return { programBrain, businessBrain };
}

function searchBrain(question, content) {
  if (!content || content.length === 0) return '';

  const q = question.toLowerCase();
  const sections = content.split('\n## ').map((s, i) => i === 0 ? s : '## ' + s);

  const keywords = q.split(' ').filter(w => w.length > 3);

  const scored = sections.map(section => {
    const text = section.toLowerCase();
    const score = keywords.reduce((acc, kw) => acc + (text.split(kw).length - 1), 0);
    return { section, score };
  });

  return scored
    .filter(s => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map(s => s.section)
    .join('\n\n---\n\n');
}

function isRealTimeQuestion(question) {
  const q = question.toLowerCase();
  const triggers = [
    'current demographics', 'population data', 'census data',
    'grant deadline', 'currently open', 'currently accepting', 'open right now',
    'recent law change', 'new legislation', 'policy change this year',
    'latest news', 'current contact', 'current phone number',
    'today', 'this week', 'right now', 'as of today'
  ];
  return triggers.some(t => q.includes(t));
}

exports.handler = async function(event, context) {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json'
  };

  if (event.httpMethod === 'OPTIONS') return { statusCode: 200, headers, body: '' };
  if (event.httpMethod !== 'POST') return { statusCode: 405, body: 'Method Not Allowed' };

  try {
    const { messages, orgProfile, pillar } = JSON.parse(event.body);

    const userMessages = messages.filter(m => m.role === 'user');
    const latestQuestion = userMessages[userMessages.length - 1]?.content || '';
    console.log('Question:', latestQuestion);
    console.log('Program type:', orgProfile?.programType);

    // Load brains
    const { programBrain, businessBrain } = loadBrains(orgProfile?.programType);

    // Search for relevant content
    const programContext = searchBrain(latestQuestion, programBrain);
    const businessContext = searchBrain(latestQuestion, businessBrain);
    const relevantContext = [programContext, businessContext].filter(c => c.length > 50).join('\n\n===\n\n');

    const hasContext = relevantContext.length > 100;
    const realTime = isRealTimeQuestion(latestQuestion);

    console.log('Context found:', hasContext, '| Length:', relevantContext.length);
    console.log('Real-time needed:', realTime);

    // Build profile string
    const profileStr = orgProfile ? `
ORG PROFILE:
- Program: ${orgProfile.orgName || 'Unknown'}
- Type: ${orgProfile.programType || 'Unknown'} — ${orgProfile.sportOrCategory || ''}
- Location: ${orgProfile.city || ''}, ${orgProfile.state || ''}
- Legal structure: ${orgProfile.entityType || 'Unknown'}
- Participants: ${orgProfile.participantCount || 'Unknown'}
- Budget: ${orgProfile.budgetRange || 'Unknown'}
- Grant experience: ${orgProfile.grantExperience || 'Unknown'}
- Biggest challenge: ${orgProfile.biggestChallenge || 'Unknown'}
- Journey: ${orgProfile.journey || 'Unknown'}
- Pillar: ${pillar || 'Build'}
` : '';

    // Route 1: Has brain context — answer from knowledge base
    if (hasContext && !realTime) {
      const systemPrompt = `You are Clearpath, a knowledgeable advisor for community program directors. Answer the question using ONLY the knowledge base provided. Be specific, warm, and practical. Use the org profile to personalize your answer. Bold key action items. Keep under 250 words.

If the knowledge base truly does not contain enough to answer, end your response with the exact text: [NEEDS_CONSULTANT]

Never make up information. Never guess.

${profileStr}

KNOWLEDGE BASE:
${relevantContext}`;

      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': process.env.ANTHROPIC_API_KEY,
          'anthropic-version': '2023-06-01'
        },
        body: JSON.stringify({
          model: 'claude-sonnet-4-5',
          max_tokens: 600,
          system: systemPrompt,
          messages
        })
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error?.message || 'API error');

      let reply = data.content[0].text;

      if (reply.includes('[NEEDS_CONSULTANT]')) {
        reply = reply.replace('[NEEDS_CONSULTANT]', '').trim() +
          '\n\nFor more specific guidance on your situation, **[book a consulting session →](/consulting)**';
      }

      return { statusCode: 200, headers, body: JSON.stringify({ reply }) };
    }

    // Route 2: Real-time data needed — call API
    if (realTime) {
      const systemPrompt = `You are Clearpath, an advisor for community program directors. The user needs current/real-time information. Provide what you know and clearly indicate what they should verify directly. Be specific about where to find current data.

${profileStr}`;

      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': process.env.ANTHROPIC_API_KEY,
          'anthropic-version': '2023-06-01'
        },
        body: JSON.stringify({
          model: 'claude-sonnet-4-5',
          max_tokens: 600,
          system: systemPrompt,
          messages
        })
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error?.message || 'API error');
      return { statusCode: 200, headers, body: JSON.stringify({ reply: data.content[0].text }) };
    }

    // Route 3: No context, not real-time — route to consulting
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        reply: `That's a specific situation that goes beyond general best practices. For the most accurate guidance on your program, **[book a consulting session →](/consulting)**\n\nSessions are $150–$250 and cover detailed, situation-specific guidance for your exact program and location.`
      })
    };

  } catch (error) {
    console.error('Chat error:', error.message);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: error.message })
    };
  }
};
