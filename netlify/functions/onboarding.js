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
    return { statusCode: 405, headers, body: 'Method Not Allowed' };
  }

  try {
    const { email, orgname, answers } = JSON.parse(event.body);

    const baseId = process.env.AIRTABLE_ORGS_BASE_ID;
    const token = process.env.AIRTABLE_TOKEN;

    // Find the existing record by email
    const searchRes = await fetch(
      `https://api.airtable.com/v0/${baseId}/Orgs?filterByFormula=${encodeURIComponent(`{Email}="${email}"`)}`,
      {
        headers: { 'Authorization': `Bearer ${token}` }
      }
    );

    const searchData = await searchRes.json();
    const record = searchData.records?.[0];

    const fields = {
      'Sport or Category': answers.sportOrCategory || '',
      'Participant Count': answers.participantCount || '',
      'Entity Type': answers.entityType || '',
      'Annual Budget Range': answers.budgetRange || '',
      'Grant Experience': answers.grantExperience || '',
      'Biggest Challenge': answers.biggestChallenge || '',
      'Onboarding Complete': true,
    };

    if (record) {
      // Update existing record
      await fetch(
        `https://api.airtable.com/v0/${baseId}/Orgs/${record.id}`,
        {
          method: 'PATCH',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ fields })
        }
      );
    } else {
      // Create new record if not found
      await fetch(
        `https://api.airtable.com/v0/${baseId}/Orgs`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            fields: {
              ...fields,
              'Org Name': orgname || '',
              'Email': email || '',
            }
          })
        }
      );
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ success: true })
    };

  } catch (error) {
    console.error('Onboarding error:', error.message);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: error.message })
    };
  }
};
