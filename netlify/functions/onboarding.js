exports.handler = async function(event, context) {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json'
  };

  if (event.httpMethod === 'OPTIONS') return { statusCode: 200, headers, body: '' };
  if (event.httpMethod !== 'POST') return { statusCode: 405, headers, body: 'Method Not Allowed' };

  try {
    const { email, orgname, answers } = JSON.parse(event.body);
    const baseId = process.env.AIRTABLE_ORGS_BASE_ID;
    const token = process.env.AIRTABLE_TOKEN;

    console.log('Onboarding for:', email);
    console.log('Answers:', JSON.stringify(answers));

    // Exact field names from Airtable CSV export:
    // Org Name, Contact First Name, Contact Last Name, State, City,
    // Program Type, Sport or Category, Entity Type, Annual Budget Range,
    // Biggest Challenge, Onboarding Complete, Onboarding Stage (Single line text), Participant Count

    const fields = {
      'Org Name': orgname || '',
      'Contact First Name': answers.firstName || '',
      'Contact Last Name': answers.lastName || '',
      'State': answers.state || '',
      'City': answers.city || answers.zip || '',
      'Program Type': answers.category || '',
      'Sport or Category': Array.isArray(answers.subcategory) ? answers.subcategory.join(', ') : (answers.subcategory || ''),
      'Entity Type': answers.entityType || '',
      'Annual Budget Range': answers.budgetRange || '',
      'Biggest Challenge': answers.biggestChallenge || '',
      'Onboarding Complete': true,
      'Onboarding Stage (Single line text)': answers.journey || '',
      'Participant Count': answers.participantCount || '',
    };

    console.log('Fields to write:', JSON.stringify(fields));

    const res = await fetch(`https://api.airtable.com/v0/${baseId}/Orgs`, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ fields })
    });

    const data = await res.json();
    console.log('Airtable response:', JSON.stringify(data));

    if (!res.ok) throw new Error(data.error?.message || 'Airtable error');

    return { statusCode: 200, headers, body: JSON.stringify({ success: true }) };

  } catch (error) {
    console.error('Error:', error.message);
    return { statusCode: 500, headers, body: JSON.stringify({ error: error.message }) };
  }
};
