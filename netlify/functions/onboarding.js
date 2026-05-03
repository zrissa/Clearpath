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

    console.log('Onboarding for email:', email);
    console.log('Answers received:', JSON.stringify(answers));

    // Search for existing record by email
    const searchRes = await fetch(
      `https://api.airtable.com/v0/${baseId}/Orgs?filterByFormula=${encodeURIComponent(`{Email}="${email}"`)}`,
      { headers: { 'Authorization': `Bearer ${token}` } }
    );

    const searchData = await searchRes.json();
    console.log('Search result count:', searchData.records?.length);

    const fields = {
      'Sport or Category': answers.sportOrCategory || '',
      'Entity Type': answers.entityType || '',
      'Annual Budget Range': answers.budgetRange || '',
      'Grant Experience': answers.grantExperience || '',
      'Biggest Challenge': answers.biggestChallenge || '',
      'Onboarding Complete': true,
    };

    // Only add Participant Count if it exists as a field
    if (answers.participantCount) {
      fields['Participant Count'] = answers.participantCount;
    }

    console.log('Fields to write:', JSON.stringify(fields));

    const record = searchData.records?.[0];

    if (record) {
      console.log('Updating record:', record.id);
      const updateRes = await fetch(
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
      const updateData = await updateRes.json();
      console.log('Update response:', JSON.stringify(updateData));

      if (!updateRes.ok) {
        throw new Error(updateData.error?.message || 'Update failed');
      }
    } else {
      console.log('No record found — creating new');
      const createRes = await fetch(
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
      const createData = await createRes.json();
      console.log('Create response:', JSON.stringify(createData));
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
