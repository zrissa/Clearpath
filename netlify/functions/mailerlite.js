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
    const { fname, email, orgname, orgtype, stage } = JSON.parse(event.body);

    const token = process.env.MAILERLITE_TOKEN;
    const groupId = process.env.MAILERLITE_GROUP_ID;

    console.log('Adding to MailerLite:', email);

    const response = await fetch('https://connect.mailerlite.com/api/subscribers', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        email: email,
        fields: {
          name: fname,
          last_name: '',
          company: orgname,
        },
        groups: [groupId],
        status: 'active'
      })
    });

    const data = await response.json();
    console.log('MailerLite response:', JSON.stringify(data));

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ success: true })
    };

  } catch (error) {
    console.error('MailerLite error:', error.message);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: error.message })
    };
  }
};
