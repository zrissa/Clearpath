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

    console.log('Onboarding save for:', email);
    console.log('Answers:', JSON.stringify(answers));

    // Search for existing record
    const searchRes = await fetch(
      `https://api.airtable.com/v0/${baseId}/Orgs?filterByFormula=${encodeURIComponent(`{Email}="${email}"`)}`,
      { headers: { 'Authorization': `Bearer ${token}` } }
    );
    const searchData = await searchRes.json();
    const record = searchData.records?.[0];
    console.log('Record found:', record ? record.id : 'none');

    const fields = {
      'Contact First Name': answers.firstName || '',
      'Contact Last Name': answers.lastName || '',
      'State': answers.state || '',
      'Sport or Category': answers.subcategory || answers.category || '',
      'Program Type': answers.category || '',
      'Entity Type': answers.entityType || '',
      'Participant Count': answers.participantCount || '',
      'Annual Budget Range': answers.budgetRange || '',
      'Grant Experience': answers.grantExperience || '',
      'Biggest Challenge': answers.biggestChallenge || '',
      'Onboarding Complete': true,
    };

    // Add zip if field exists
    if (answers.zip) fields['Zip Code'] = answers.zip;
    if (answers.journey) fields['Onboarding Stage'] = answers.journey;

    console.log('Fields to save:', JSON.stringify(fields));

    let res;
    if (record) {
      res = await fetch(`https://api.airtable.com/v0/${baseId}/Orgs/${record.id}`, {
        method: 'PATCH',
        headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ fields })
      });
    } else {
      res = await fetch(`https://api.airtable.com/v0/${baseId}/Orgs`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ fields: { ...fields, 'Org Name': orgname || '', 'Email': email || '' } })
      });
    }

    const data = await res.json();
    console.log('Airtable response:', JSON.stringify(data));

    if (!res.ok) throw new Error(data.error?.message || 'Airtable error');

    return { statusCode: 200, headers, body: JSON.stringify({ success: true }) };

  } catch (error) {
    console.error('Error:', error.message);
    return { statusCode: 500, headers, body: JSON.stringify({ error: error.message }) };
  }
};
