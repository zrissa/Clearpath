exports.handler = async function(event, context) {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json'
  };

  if (event.httpMethod === 'OPTIONS') return { statusCode: 200, headers, body: '' };
  if (event.httpMethod !== 'POST') return { statusCode: 405, headers, body: 'Method Not Allowed' };

  try {
    const { email, passwordHash } = JSON.parse(event.body);
    const baseId = process.env.AIRTABLE_ORGS_BASE_ID;
    const token = process.env.AIRTABLE_TOKEN;

    // Look up profile by email
    const res = await fetch(
      `https://api.airtable.com/v0/${baseId}/Orgs?filterByFormula=${encodeURIComponent(`{Email}="${email}"`)}`,
      { headers: { 'Authorization': `Bearer ${token}` } }
    );

    const data = await res.json();
    const record = data.records?.[0];

    if (!record) {
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ success: false, error: "No account found with that email. Please sign up first." })
      };
    }

    const f = record.fields;

    // Validate password hash
    const storedHash = f['Password'] || '';
    if (storedHash && passwordHash && storedHash !== passwordHash) {
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ success: false, error: "Incorrect password. Please try again." })
      };
    }

    // Build full profile
    const profile = {
      orgName: f['Org Name'] || '',
      email: f['Email'] || email,
      firstName: f['Contact First Name'] || '',
      lastName: f['Contact Last Name'] || '',
      city: f['City'] || '',
      state: f['State'] || '',
      programType: f['Program Type'] || '',
      sportOrCategory: f['Sport or Category'] || '',
      entityType: f['Entity Type'] || '',
      participantCount: f['Participant Count'] || '',
      budgetRange: f['Annual Budget Range'] || '',
      grantExperience: f['Grant Experience'] || '',
      biggestChallenge: f['Biggest Challenge'] || '',
      journey: f['Onboarding Stage'] || '',
      location: (f['City'] || '') + (f['State'] ? ', ' + f['State'] : ''),
    };

    const isPro = f['Pro'] === true;

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ success: true, profile, isPro })
    };

  } catch (error) {
    console.error('Signin error:', error.message);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Something went wrong. Please try again.' })
    };
  }
};
