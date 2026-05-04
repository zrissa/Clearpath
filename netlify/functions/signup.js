exports.handler = async function(event, context) {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json'
  };

  if (event.httpMethod === 'OPTIONS') return { statusCode: 200, headers, body: '' };
  if (event.httpMethod !== 'POST') return { statusCode: 405, headers, body: 'Method Not Allowed' };

  try {
    const { email, orgname, password } = JSON.parse(event.body);
    const baseId = process.env.AIRTABLE_ORGS_BASE_ID;
    const token = process.env.AIRTABLE_TOKEN;

    // Check if email already exists
    const checkRes = await fetch(
      `https://api.airtable.com/v0/${baseId}/Orgs?filterByFormula=${encodeURIComponent(`{Email}="${email}"`)}`,
      { headers: { 'Authorization': `Bearer ${token}` } }
    );
    const checkData = await checkRes.json();
    if (checkData.records?.length > 0) {
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ success: false, error: 'An account with this email already exists. Please sign in.' })
      };
    }

    // Save to Airtable with hashed password
    const response = await fetch(`https://api.airtable.com/v0/${baseId}/Orgs`, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        fields: {
          'Org Name': orgname || '',
          'Email': email || '',
          'Password': password || '',
          'Onboarding Stage': 'Signed up',
          'Date Joined': new Date().toISOString().split('T')[0]
        }
      })
    });

    const data = await response.json();
    console.log('Signup saved:', data.id);

    // Save to MailerLite
    const mlToken = process.env.MAILERLITE_TOKEN;
    const mlGroup = process.env.MAILERLITE_GROUP_ID;
    if (mlToken && mlGroup) {
      try {
        await fetch('https://connect.mailerlite.com/api/subscribers', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${mlToken}`,
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({
            email,
            fields: { company: orgname },
            groups: [mlGroup],
            status: 'active'
          })
        });
      } catch(e) { console.log('MailerLite failed:', e.message); }
    }

    return { statusCode: 200, headers, body: JSON.stringify({ success: true }) };

  } catch (error) {
    console.error('Signup error:', error.message);
    return { statusCode: 500, headers, body: JSON.stringify({ error: error.message }) };
  }
};
