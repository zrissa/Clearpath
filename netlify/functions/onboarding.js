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

    // Only use fields we KNOW exist in Airtable
    const fields = {
      'Org Name': orgname || '',
      'Email': email || '',
      'Contact First Name': answers.firstName || '',
      'Contact Last Name': answers.lastName || '',
      'City': answers.city || answers.zip || '',
      'State': answers.state || '',
      'Program Type': answers.category || '',
      'Sport or Category': Array.isArray(answers.subcategory) ? answers.subcategory.join(', ') : (answers.subcategory || ''),
      'Entity Type': answers.entityType || '',
      'Annual Budget Range': answers.budgetRange || '',
      'Biggest Challenge': answers.biggestChallenge || '',
      'Onboarding Complete': true,
      'Date Joined': new Date().toISOString().split('T')[0]
    };

    console.log('Fields to write:', JSON.stringify(fields));

    // Try to find existing record first
    const searchRes = await fetch(
      `https://api.airtable.com/v0/${baseId}/Orgs?filterByFormula=${encodeURIComponent(`{Email}="${email}"`)}`,
      { headers: { 'Authorization': `Bearer ${token}` } }
    );
    const searchData = await searchRes.json();
    const record = searchData.records?.[0];
    console.log('Record found:', record ? record.id : 'none');

    let res;
    if (record) {
      // Update existing
      res = await fetch(`https://api.airtable.com/v0/${baseId}/Orgs/${record.id}`, {
        method: 'PATCH',
        headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ fields })
      });
    } else {
      // Create new
      res = await fetch(`https://api.airtable.com/v0/${baseId}/Orgs`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ fields })
      });
    }

    const data = await res.json();
    console.log('Airtable response:', JSON.stringify(data));

    if (!res.ok) {
      // If there's a field error, try again with just the safe fields
      console.log('Retrying with minimal fields...');
      const safeFields = {
        'Org Name': orgname || '',
        'Email': email || '',
        'Contact First Name': answers.firstName || '',
        'Contact Last Name': answers.lastName || '',
        'City': answers.city || answers.zip || '',
        'State': answers.state || '',
        'Program Type': answers.category || '',
        'Sport or Category': Array.isArray(answers.subcategory) ? answers.subcategory.join(', ') : (answers.subcategory || ''),
        'Onboarding Complete': true,
        'Date Joined': new Date().toISOString().split('T')[0]
      };

      const retry = await fetch(`https://api.airtable.com/v0/${baseId}/Orgs`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ fields: safeFields })
      });
      const retryData = await retry.json();
      console.log('Retry response:', JSON.stringify(retryData));
    }

    return { statusCode: 200, headers, body: JSON.stringify({ success: true }) };

  } catch (error) {
    console.error('Error:', error.message);
    return { statusCode: 500, headers, body: JSON.stringify({ error: error.message }) };
  }
};
