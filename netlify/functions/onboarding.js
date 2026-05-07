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

    // Profile fields (sent on both update and create)
    // Note: "Date Joined" intentionally omitted here — only set on new record creation below
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
    };

    // Look up existing record by email
    const lookup = await fetch(
      `https://api.airtable.com/v0/${baseId}/Orgs?filterByFormula=${encodeURIComponent(`{Email}="${email}"`)}`,
      { headers: { 'Authorization': `Bearer ${token}` } }
    );
    const lookupData = await lookup.json();
    const existingRecord = lookupData.records?.[0];
    const existingId = existingRecord?.id;
    const wasSignedUpOnly = existingRecord?.fields?.['Onboarding Stage'] === 'Signed up';

    let res, data, isNewRecord = false;

    if (existingId) {
      // Update existing record (preserves Date Joined, Password, Pro flag, and any other fields not in our payload)
      console.log('Updating existing record:', existingId);
      res = await fetch(`https://api.airtable.com/v0/${baseId}/Orgs/${existingId}`, {
        method: 'PATCH',
        headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ fields })
      });
      data = await res.json();
      console.log('Airtable PATCH response:', JSON.stringify(data));
    } else {
      // No existing record — create new (legacy fallback; should be rare since signup creates the initial record)
      console.log('No existing record found, creating new one');
      isNewRecord = true;
      res = await fetch(`https://api.airtable.com/v0/${baseId}/Orgs`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fields: { ...fields, 'Date Joined': new Date().toISOString().split('T')[0] }
        })
      });
      data = await res.json();
      console.log('Airtable POST response:', JSON.stringify(data));
    }

    if (!res.ok) throw new Error(data.error?.message || 'Airtable error');

    // Trigger welcome email — only on first-time onboarding (new record OR existing record that was still at "Signed up")
    // Profile updates after the fact do NOT re-trigger the welcome email
    const shouldSendWelcome = isNewRecord || wasSignedUpOnly;
    if (shouldSendWelcome) {
      try {
        const welcomeData = {
          email: email || '',
          firstName: answers.firstName || '',
          orgName: orgname || '',
          programType: answers.category || '',
          city: answers.city || '',
          state: answers.state || '',
          biggestChallenge: answers.biggestChallenge || '',
        };

        // Fire and forget — don't await so it doesn't slow down onboarding
        fetch(`${process.env.URL}/.netlify/functions/welcome`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(welcomeData)
        }).catch(e => console.log('Welcome email failed:', e.message));
      } catch(e) {
        console.log('Welcome email error:', e.message);
      }
    } else {
      console.log('Skipping welcome email — this is a profile update, not first-time onboarding');
    }

    return { statusCode: 200, headers, body: JSON.stringify({ success: true }) };

  } catch (error) {
    console.error('Error:', error.message);
    return { statusCode: 500, headers, body: JSON.stringify({ error: error.message }) };
  }
};
