exports.handler = async function(event, context) {
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
      body: ''
    };
  }

  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json'
  };

  try {
    const { fname, lname, email, orgname, progtype, location, stage } = JSON.parse(event.body);

    if (!fname || !email || !orgname) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Missing required fields' })
      };
    }

    const response = await fetch(`https://api.airtable.com/v0/${process.env.AIRTABLE_ORGS_BASE_ID}/Orgs`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.AIRTABLE_TOKEN}`,
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
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error?.message || 'Airtable error');
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ success: true, id: data.id })
    };

  } catch (error) {
    console.error('Signup error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: error.message })
    };
  }
};
