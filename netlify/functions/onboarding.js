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

    const fields = {
      'Org Name': orgname || '',
      'Email': email || '',
      'Contact First Name': answers.firstName || '',
      'Contact Last Name': answers.lastName || '',
      'City': answers.city || '',
      'State': answers.state || '',
      'Program Type': answers.category || '',
      'Sport or Category': Array.isArray(answers.subcategory) ? answers.subcategory.join(', ') : (answers.subcategory || ''),
      'Entity Type': answers.entityType || '',
      'Participant Count': answers.participantCount || '',
      'Annual Budget Range': answers.budgetRange || '',
      'Grant Experience': answers.grantExperience || '',
      'Biggest Challenge': answers.biggestChallenge || '',
      'Onboarding Stage': answers.journey || '',
      'Date Joined': new Date().toISOString().split('T')[0],
    };

    console.log('Fields:', JSON.stringify(fields));

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
