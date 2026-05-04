exports.handler = async function(event, context) {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json'
  };

  if (event.httpMethod === 'OPTIONS') return { statusCode: 200, headers, body: '' };
  if (event.httpMethod !== 'POST') return { statusCode: 405, headers, body: 'Method Not Allowed' };

  try {
    const { email, firstName, orgName, programType, city, state, biggestChallenge } = JSON.parse(event.body);
    const token = process.env.MAILERLITE_TOKEN;

    // Update subscriber with full profile fields
    await fetch(`https://connect.mailerlite.com/api/subscribers`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        email,
        fields: {
          name: firstName || '',
          company: orgName || '',
          city: city || '',
          state: state || '',
          program_type: programType || '',
        },
        status: 'active'
      })
    });

    // Send welcome email via MailerLite transactional
    const emailRes = await fetch('https://connect.mailerlite.com/api/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        from: 'hello@clearpathgrants.org',
        from_name: 'Zuhair at Clearpath',
        to: [{ email, name: firstName || '' }],
        subject: `Your Clearpath advisor is ready, ${firstName || 'there'} 🌱`,
        html: `
<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width,initial-scale=1.0"/></head>
<body style="margin:0;padding:0;background:#F8FAF9;font-family:'Helvetica Neue',Arial,sans-serif;">
<div style="max-width:560px;margin:0 auto;padding:40px 20px;">

  <div style="background:#0B3D2E;border-radius:16px;padding:32px;margin-bottom:24px;text-align:center;">
    <div style="width:48px;height:48px;background:rgba(52,199,123,.2);border-radius:12px;display:inline-flex;align-items:center;justify-content:center;margin-bottom:16px;">
      <span style="font-size:22px;">🌱</span>
    </div>
    <h1 style="color:#fff;font-size:24px;font-weight:800;margin:0 0 8px;letter-spacing:-0.5px;">Welcome to Clearpath, ${firstName || 'there'}.</h1>
    <p style="color:rgba(255,255,255,.5);font-size:14px;margin:0;font-weight:300;">Your AI program advisor is ready.</p>
  </div>

  <div style="background:#fff;border:1px solid #E2EAE6;border-radius:14px;padding:28px;margin-bottom:16px;">
    <p style="color:#111C17;font-size:15px;line-height:1.7;margin:0 0 16px;">I know you're building <strong>${orgName || 'your program'}</strong> — a ${programType || 'community'} program${city ? ' in ' + city + (state ? ', ' + state : '') : ''}.</p>
    <p style="color:#6B8A78;font-size:14px;line-height:1.7;margin:0 0 20px;font-weight:300;">Your biggest challenge right now is <strong style="color:#111C17;">${biggestChallenge || 'getting started'}</strong>. That's exactly where we'll start.</p>
    <p style="color:#6B8A78;font-size:14px;line-height:1.7;margin:0 0 24px;font-weight:300;">Your dashboard has a personalized task list waiting for you — specific to your program type, your state, and where you are in the journey.</p>
    <a href="https://clearpathgrants.org/dashboard" style="display:block;text-align:center;padding:14px;background:#0B3D2E;color:#fff;border-radius:10px;font-size:15px;font-weight:700;text-decoration:none;">Go to my dashboard →</a>
  </div>

  <div style="background:#fff;border:1px solid #E2EAE6;border-radius:14px;padding:24px;margin-bottom:16px;">
    <p style="font-size:11px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:#34C77B;margin:0 0 12px;">How Clearpath works</p>
    <div style="display:flex;flex-direction:column;gap:10px;">
      <div style="display:flex;gap:12px;"><span style="font-size:18px;">🏗️</span><div><strong style="color:#111C17;font-size:13px;">Build</strong><p style="color:#6B8A78;font-size:12px;margin:2px 0 0;font-weight:300;">Legal structure, compliance, facility access — in the right order for your program.</p></div></div>
      <div style="display:flex;gap:12px;"><span style="font-size:18px;">💰</span><div><strong style="color:#111C17;font-size:13px;">Fund</strong><p style="color:#6B8A78;font-size:12px;margin:2px 0 0;font-weight:300;">Grants, pricing strategy, and sponsorships matched to your program type.</p></div></div>
      <div style="display:flex;gap:12px;"><span style="font-size:18px;">⚙️</span><div><strong style="color:#111C17;font-size:13px;">Run</strong><p style="color:#6B8A78;font-size:12px;margin:2px 0 0;font-weight:300;">Day-to-day operations powered by Root — registration, scheduling, payments.</p></div></div>
      <div style="display:flex;gap:12px;"><span style="font-size:18px;">📈</span><div><strong style="color:#111C17;font-size:13px;">Grow</strong><p style="color:#6B8A78;font-size:12px;margin:2px 0 0;font-weight:300;">Impact reports and expansion planning from your real program data.</p></div></div>
    </div>
  </div>

  <p style="color:#8BA89A;font-size:12px;text-align:center;line-height:1.6;">You're getting 10 free AI coaching questions to start. Upgrade to Pro anytime for unlimited access.<br/>Reply to this email if you have any questions — I read every one.<br/><br/>— Zuhair, Founder of Clearpath</p>

</div>
</body>
</html>`,
        text: `Welcome to Clearpath, ${firstName || 'there'}.\n\nYour AI program advisor is ready at https://clearpathgrants.org/dashboard\n\nYou're building ${orgName || 'your program'} — a ${programType || 'community'} program. Your biggest challenge is ${biggestChallenge || 'getting started'} and that's exactly where we'll start.\n\nClearpath walks you through Build, Fund, Run, and Grow — specific to your program, your location, and your stage.\n\nGo to your dashboard: https://clearpathgrants.org/dashboard\n\n— Zuhair, Founder of Clearpath`
      })
    });

    const emailData = await emailRes.json();
    console.log('Welcome email sent:', JSON.stringify(emailData));

    return { statusCode: 200, headers, body: JSON.stringify({ success: true }) };

  } catch (error) {
    console.error('Welcome email error:', error.message);
    return { statusCode: 500, headers, body: JSON.stringify({ error: error.message }) };
  }
};
