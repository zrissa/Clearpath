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
    const { fname, lname, email, orgname, progtype, location, stage } = JSON.parse(event.body);

    if (!fname || !email || !orgname) {
      return { statusCode: 400, headers, body: JSON.stringify({ error: 'Missing required fields' }) };
    }

    const baseId = process.env.AIRTABLE_ORGS_BASE_ID;
    const token = process.env.AIRTABLE_TOKEN;

    console.log('Base ID:', baseId);
    console.log('Token prefix:', token ? token.substring(0, 15) : 'MISSING');

    const response = await fetch(
      `https://api.airtable.com/v0/${baseId}/Orgs`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          fields: {
            'Org Name': orgname,
            'Contact First Name': fname,
            'Contact Last Name': lname || '',
            'Email': email,
            'Program Type': progtype || '',
            'Location': location || '',
            'Onboarding Complete': false,
            'Date Joined': new Date().toISOString().split('T')[0]
          }
        })
      }
    );

    const data = await response.json();
    console.log('Airtable response:', JSON.stringify(data));

    if (!response.ok) {
      throw new Error(data.error?.message || 'Airtable error');
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ success: true, id: data.id })
    };

  } catch (error) {
    console.error('Signup error:', error.message);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: error.message })
    };
  }
};
