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

    const fields = {
      'Org Name': orgname || '',
      'Email': email || '',
      'Contact First Name': answers.firstName || '',
      'Contact Last Name': answers.lastName || '',
      'State': answers.state || '',
      'City': answers.city || answers.zip || '',
      'Program Type': answers.category || '',
      'Sport or Category': Array.isArray(answers.subcategory) ? answers.subcategory.join(', ') : (answers.subcategory || ''),
      'Entity Type': answers.entityType || '',
      'Annual Budget Range': answers.budgetRange || '',
      'Biggest Challenge': answers.biggestChallenge || '',
      'Onboarding Stage (Single line text)': answers.journey || '',
      'Participant Count': answers.participantCount || '',
    };

    console.log('Fields:', JSON.stringify(fields));

    const res = await fetch(`https://api.airtable.com/v0/${baseId}/Orgs`, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ fields })
    });

    const data = await res.json();
    console.log('Response:', JSON.stringify(data));

    if (!res.ok) throw new Error(data.error?.message || 'Airtable error');

    return { statusCode: 200, headers, body: JSON.stringify({ success: true }) };

  } catch (error) {
    console.error('Error:', error.message);
    return { statusCode: 500, headers, body: JSON.stringify({ error: error.message }) };
  }
};
