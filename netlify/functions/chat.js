exports.handler = async function(event, context) {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json'
  };
  if (event.httpMethod === 'OPTIONS') return { statusCode: 200, headers, body: '' };
  if (event.httpMethod !== 'POST') return { statusCode: 405, body: 'Method Not Allowed' };

  // ── BRAINS (embedded) ──────────────────────────────────────────
  const BRAINS = {
    youth_sports: `# CLEARPATH BRAIN 1 — YOUTH SPORTS
# Version 1.0 | Last updated: May 2026
# This document is the static knowledge base for all Youth Sports program coaching.
# It covers Soccer, Basketball, Football, Baseball/Softball, Track & Field, Swimming, Tennis, Volleyball, Wrestling, Lacrosse.
# Update annually every January from: Aspen Institute Project Play, US Soccer Foundation, NAYS, CDC, SFIA.

---

## SECTION 1: LEGAL STRUCTURE

### LLC vs Nonprofit — Which to choose first
Most new youth sports programs should form an LLC first. It takes 10–30 minutes online, costs $50–$200 depending on state, and gives you legal protection immediately. You can always convert to or add a nonprofit later. A nonprofit 501(c)(3) opens grant eligibility but takes 2–4 months and costs $275 (IRS Form 1023-EZ). Programs just starting out should not wait for nonprofit status before running their first season.

### When to pursue 501(c)(3)
Pursue nonprofit status when: you want to apply for grants, you want donors to receive tax deductions, you are affiliated with a national governing body that requires it (e.g., US Soccer Foundation MLS GO League requires nonprofit status). File IRS Form 1023-EZ at pay.gov for $275. Processing takes 2–3 months. Attach your articles of incorporation and bylaws.

### State-by-State LLC Formation
- Michigan: $50 at michigan.gov/lara. LARA = Licensing and Regulatory Affairs. Processing: 5–10 business days online.
- Ohio: $99 at ohiosos.gov. Processing: immediate online.
- Illinois: $150 at ilsos.gov. Processing: 10–15 days.
- Indiana: $95 at inbiz.in.gov. Processing: immediate online.
- Wisconsin: $130 at wdfi.org. Processing: immediate online.
- Florida: $125 at sunbiz.org. Processing: immediate online.
- Texas: $300 at sos.state.tx.us. Processing: 2–3 business days.
- California: $70 at sos.ca.gov. Processing: 2–3 weeks (expedite available).
- New York: $200 at dos.ny.gov. Processing: 7–10 business days.
- Pennsylvania: $125 at dos.pa.gov. Processing: 7–10 business days.
- All other states: visit [state].gov secretary of state website. Average cost $50–$150.

### EIN (Employer Identification Number)
Apply for free at irs.gov/ein. Takes 10 minutes online. Required before opening a bank account, hiring staff, or applying for most grants. Get this immediately after forming your LLC or nonprofit.

### Fiscal Sponsorship Alternative
If you want to receive grants before getting nonprofit status, find a fiscal sponsor. The fiscal sponsor is an existing 501(c)(3) that agrees to receive grants on your behalf in exchange for a fee (typically 5–15% of grant amount). Organizations like Fractured Atlas or local community foundations often offer fiscal sponsorship. This is a legitimate path for new programs.

---

## SECTION 2: GOVERNING BODY AFFILIATIONS

### Soccer
- US Youth Soccer Association (USYSA): The primary governing body for recreational and competitive youth soccer. Membership required for most leagues and tournaments. State associations vary — in Michigan, it is Michigan Youth Soccer Association (MYSA). Registration at usyouthsoccer.org.
- US Soccer: National governing body. US Soccer Foundation administers community grants. ussoccer.org.
- MLS GO League: MLS-affiliated recreational league program. Requires nonprofit status and community focus. Provides branding, resources, and grant access. mlsgo.com.
- American Youth Soccer Organization (AYSO): Alternative to USYSA for recreational programs. Focus on balanced play and volunteer coaching. ayso.org.
- US Futsal: For indoor futsal programs. usfutsal.com.

### Basketball
- USA Basketball: National governing body. usab.com.
- NBA Jr. NBA League: Recreational basketball program with resources and grant access. nba.com/jr-nba.
- AAU Basketball: For travel and competitive teams. aausports.org.

### Football
- USA Football: National governing body. Heads Up Football certification required for most programs. usafootball.com.
- Pop Warner: Oldest and largest youth football organization. Includes cheerleading. popwarner.com.

### Baseball / Softball
- USA Baseball: National governing body. usabaseball.com.
- Little League International: World's largest youth baseball/softball organization. littleleague.org. Provides field, equipment grants.
- Babe Ruth League: Alternative to Little League. baberuthleague.org.
- Cal Ripken Baseball: Division of Babe Ruth League for younger players. calripken.org.
- USA Softball: National governing body for softball. usasoftball.com.

### Track & Field
- USATF (USA Track & Field): National governing body. usatf.org. Youth membership required for competition.
- AAU Track & Field: Major competition circuit. aausports.org.

### Swimming
- USA Swimming: National governing body. usaswimming.org. Club membership required.
- YMCA Swimming: YMCA affiliated programs have their own structure.

### Tennis
- USTA (United States Tennis Association): National governing body. usta.com. Net Generation program for youth tennis.

### Volleyball
- USA Volleyball: National governing body. usav.org.
- AAU Volleyball: Major club volleyball circuit. aausports.org.

### Wrestling
- USA Wrestling: National governing body. themat.com.
- NWCA (National Wrestling Coaches Association): High school and youth wrestling resources.

### Lacrosse
- US Lacrosse: National governing body. uslacrosse.org. Youth membership and field access resources.

---

## SECTION 3: INSURANCE

### General Liability Insurance — Required for all programs
Every youth sports program needs general liability insurance before the first practice. Most parks departments and school districts require proof of insurance before granting field access. Minimum recommended: $1,000,000 per occurrence / $2,000,000 aggregate.

**Path A — Through governing body membership (recommended)**
Most national governing bodies include liability insurance as part of membership. This is the cheapest and fastest path.
- US Youth Soccer / MYSA membership: includes $1M/$2M general liability. ~$3–8/player/year.
- USA Basketball: includes liability through membership.
- Little League: includes liability through charter.
- USA Football: includes liability through Heads Up Football registration.

**Path B — Standalone policy**
If not affiliated with a governing body, purchase standalone:
- K&K Insurance (kk-ins.com): Specializes in sports organizations. Budget $400–$800/year for programs under 100 participants.
- Philadelphia Insurance Companies (phly.com): Youth sports specialist. Similar pricing.
- Sport Insurance (sportinsurance.com): Online quotes available.
- Hub International: Larger programs and multi-sport organizations.

### Directors & Officers (D&O) Insurance
Recommended once you form a nonprofit board. Protects board members from personal liability. Budget $500–$1,500/year. Available through same carriers as general liability.

### Accident/Medical Insurance
Some programs purchase secondary accident insurance to cover participant injuries beyond their health insurance. K&K and other sports carriers offer this. ~$3–10/player/year. Optional but recommended for contact sports.

### Workers Compensation
Required if you have paid employees. Not required for volunteers. Check state requirements — some states require it even for part-time employees.

---

## SECTION 4: COACHING CERTIFICATIONS

### SafeSport Certification — REQUIRED for all adults working with youth
Free at safesport.org. Online course takes approximately 90 minutes. Must be renewed annually (refresher takes 30 minutes). Required by virtually every governing body and most insurance carriers. Covers abuse prevention, reporting requirements, and safe environment practices. ALL coaches, volunteers, and staff who have direct contact with minor athletes must be certified. This is non-negotiable.

### Background Checks — REQUIRED for all adults working with youth
Required by all governing bodies and most insurance policies.
- Sterling Volunteers (sterlingvolunteers.com): Most widely accepted. $15–25/person. Results in 24–72 hours.
- NCSI (nationalcrimesearch.com): Alternative provider. Similar pricing.
- Verified Volunteers (verifiedvolunteers.com): Integrated with some governing body platforms.
- Run background checks before any adult has unsupervised access to youth.

### Soccer — Coaching License Pathways
- US Soccer Grassroots D License: Entry-level coaching license. Recommended for all recreational coaches. 2-day in-person course. ~$150. Offered through state associations. In Michigan: mysa.org.
- US Soccer Grassroots E License: Online introductory course. Free through ussoccer.com. Good starting point.
- US Soccer C License: Next level for more serious coaches. Multi-day course. ~$500.

### Basketball
- USA Basketball LevelOne Coach: Free online course at coaching.usab.com. Recommended for all youth coaches.
- NBA Jr. NBA Coach Training: Free resources at nba.com/jr-nba.

### Football
- USA Football Heads Up Football Certification: Required by most programs. Free online at usafootball.com/headsupcertification. Covers concussion protocol, tackling techniques, heat safety.

### Baseball / Softball
- Little League Coaching Training: Free online through Little League University at littleleague.org/university.
- USA Baseball Coach Certification: Available through usabaseball.com.

### General Youth Sports Coaching
- NAYS (National Alliance for Youth Sports) Coach Training: Widely recognized. ~$20/coach. nays.org.
- ASEP (American Sport Education Program): Widely used for school-affiliated programs. ~$50–80/coach. asep.com.
- First Aid/CPR/AED: Required by most governing bodies. Red Cross or American Heart Association certification. Valid 2 years. ~$30–60/person.

---

## SECTION 5: FACILITY ACCESS

### Finding a Field or Gym — Always Check Both Sources
Most programs only check one source and miss better options. Always contact BOTH:

**1. City/Municipal Parks Departments**
City parks often have lower demand and more flexible scheduling than county parks. Contact the city parks department directly — not just the county.
- Ask for: "Athletic Field Reservation" or "Facility Rental"
- What you need: Proof of insurance, LLC/nonprofit paperwork, completed permit application
- Timeline: Apply 6–8 weeks before your season starts
- Cost: $0–$50/hour depending on city. Many cities offer nonprofit discounts or free fields.
- Spring fields: Apply January–February. Fall fields: Apply May–June.

**2. School District Athletic Departments**
School districts regularly rent gyms, fields, and courts to community programs — especially nonprofits. This is the most overlooked resource for new programs. Contact the district office (not individual schools) and ask for the "Facilities Use" or "Community Use" coordinator.
- Cost: Often $0–$25/hour for nonprofits. Sometimes free for youth programs.
- Best times: Evenings (6–9pm) and weekends when schools are not in use.
- What you need: Insurance certificate, background check confirmation, application form.

**Michigan / Macomb County Specific:**
- Macomb County Parks & Recreation: (586) 469-5050. Ask for Athletic Field Reservation. Main fields at Stony Creek, Wolcott Mill, Lake St. Clair Metropark areas.
- Mount Clemens City Parks: City Hall at (586) 469-6818. Lower demand than county. Good for small leagues.
- L'Anse Creuse Public Schools: Contact district office for gym/field rental. (586) 783-6300.
- Mount Clemens Community Schools: Contact district office. (586) 469-6110.
- Chesterfield Township Parks: (586) 949-0400.
- Shelby Township Parks & Recreation: (586) 731-0300.

### Indoor Facilities — Gyms and Recreation Centers
- YMCA branches: Often partner with youth sports programs. Contact local branch directly.
- Church gyms and fellowship halls: Often available evenings and weekends. Free or very low cost.
- Community centers: Check city and township community centers.
- Fitness centers with courts: Some LA Fitness, Planet Fitness facilities have courts.

### Field Setup Requirements
- Soccer: Minimum field size varies by age group. U6/U8: 25x15 yards. U10: 50x30 yards. U12: 70x40 yards. U14+: Full size 110x70 yards. Goals, corner flags, line marking required.
- Basketball: Standard court 94x50 feet. Half court acceptable for U8 and under.
- Baseball: Field dimensions vary by age. 60-foot bases for younger players, 90-foot for older.

---

## SECTION 6: REGISTRATION AND PRICING

### Pricing Strategy by Program Type and Market

**Recreational Soccer (per player per season):**
- Small market / low-income community: $40–$75
- Mid-size market (suburban): $75–$150
- Larger market / higher income area: $100–$200
- Travel/competitive team add-on: +$200–$600/season

**Basketball (per player per season):**
- Recreational: $50–$125
- Travel/AAU: $300–$800/season plus tournament fees

**Baseball/Softball:**
- Recreational: $75–$175
- Travel: $500–$1,500/season

**Football:**
- Recreational: $75–$200 (higher due to equipment costs)
- Equipment costs (helmet, pads, etc.): $200–$500 if not provided

**Track & Field:**
- Recreational: $30–$80
- Club/competitive: $100–$300

### Financial Assistance and Scholarship Policy
Always offer financial assistance. This is required by most grant programs and reflects community mission. Create a simple sliding scale or "pay what you can" option. Never turn away a child who wants to play. Document your scholarship policy — grant funders look for this.

### Registration Platforms
- Stripe: 2.9% + $0.30 per transaction. Clearpath recommended.
- TeamSnap: Registration module. $7.99–$15.99/month for the team plan.
- LeagueApps: Sports-specific registration. 3–5% transaction fee.
- SportsEngine: Comprehensive platform. Pricing by program size.
- Square: Simple alternative for small programs.

### What to Collect at Registration
- Player name, date of birth
- Parent/guardian name and contact
- Emergency contact
- Medical information and allergies
- Waiver and liability release (signed)
- Photo release (signed)
- Payment

---

## SECTION 7: GRANTS AND FUNDING

### Tier 1 — Best First Grants for New Youth Sports Programs

**US Soccer Foundation — Passback Program**
Amount: $5,000–$25,000 in equipment and resources
Eligibility: Youth soccer nonprofits in underserved communities
Requires: 501(c)(3) status, focus on underserved youth
Apply at: ussoccerfoundation.org/passback
Notes: Very accessible for new organizations. Equipment grants don't require extensive track record.

**US Soccer Foundation — Live Your Dream**
Amount: $2,500–$10,000 cash grants
Eligibility: Nonprofit youth soccer programs
Apply at: ussoccerfoundation.org
Cycle: Annual, typically opens spring

**MLS GO League Grants**
Amount: Varies. Equipment, resources, cash
Eligibility: MLS GO League member organizations (requires nonprofit and MLS territory alignment)
Apply at: mlsgo.com
Notes: Detroit City FC territory covers Southeast Michigan. Strong alignment with Macomb County programs.

**Sports Matter — Dick's Sporting Goods Foundation**
Amount: Up to $25,000 cash + equipment
Eligibility: Youth sports nonprofits in need
Apply at: sportsmatter.org
Cycle: Open applications, competitive
Notes: Strong preference for programs serving underserved communities and demonstrating financial need.

**All Kids Play**
Amount: $1,000–$5,000
Eligibility: Youth sports programs focused on removing financial barriers
Apply at: allkidsplay.org
Notes: Good first grant. Lower competition than national funders. Emphasize scholarship policy.

**Ralph C. Wilson Jr. Foundation**
Amount: $10,000–$250,000
Eligibility: Nonprofits in Southeast Michigan and Western New York
Focus: Youth sports, active play, recreational access
Apply at: rcwjrf.org
Notes: Significant Michigan funder. Strong fit for Macomb County programs. Relationship-building important.

**Nike Community Impact Fund**
Amount: Up to $25,000
Eligibility: Nonprofits near Nike retail locations
Apply at: nike.com/community
Notes: Apply through local Nike store community liaison.

### Tier 2 — Growth Stage Grants

**NFL Foundation Grassroots Program**
Amount: $5,000–$30,000
Eligibility: Youth football nonprofits
Apply at: nflfoundation.org/grassroots
Notes: For established programs with track record.

**NBA Foundation**
Amount: Varies
Eligibility: Nonprofits focused on economic empowerment through basketball
Apply at: nbafoundation.org

**Little League Baseball Foundation**
Amount: Equipment and field improvement grants
Eligibility: Little League chartered programs
Apply at: littleleague.org/play-little-league/grants-and-financial-assistance

**USTA Foundation**
Amount: $5,000–$50,000
Eligibility: Youth tennis nonprofits
Apply at: ustafoundation.com

### Tier 3 — Local and Community Grants

**Community Foundations (every region has one)**
Amount: $1,000–$25,000
Eligibility: Local nonprofits
Notes: Lowest competition of any grant category. Strong preference for local impact. In Michigan:
- Community Foundation of Southeast Michigan (cfsem.org)
- Macomb Community Foundation (macombfoundation.org)
- Kresge Foundation (kresge.org) — Detroit focus
- Hudson-Webber Foundation — Detroit focus

**United Way Local Chapters**
Amount: Varies by chapter
Eligibility: Local nonprofits aligned with United Way focus areas
Notes: Build relationship with local United Way first. Apply through community impact fund.

**Corporate Sponsorships**
Local businesses, law firms, dental offices, medical practices, and car dealerships are strong sponsorship targets for youth sports programs. Offer jersey naming rights, banner placement, social media recognition. Target businesses that serve families and have community presence.
- In Macomb County: Switalski Law (seen on LK St. Clair jerseys), Balanced Physical Therapy, Opal Dental Group are examples of successful youth sports sponsors.

---

## SECTION 8: FAMILY AND COMMUNITY OUTREACH

### Reaching Families for Recruitment

**Digital Outreach:**
- Nextdoor app: Highly effective for neighborhood-level youth program recruitment. Post in every relevant neighborhood.
- Facebook Groups: "Macomb County Parents," city-specific parent groups, youth sports groups. Post flyers and registration links.
- Instagram and Facebook pages: Create program page. Post photos, schedules, registration info.
- School district newsletters: Contact district communications office to include program info in parent newsletters.

**Physical Outreach:**
- Church bulletins and bulletin boards: Especially effective in communities with strong church attendance.
- Elementary school flyers: Request permission to distribute flyers in take-home folders.
- Community centers and YMCAs: Post flyers on bulletin boards.
- Local libraries: Bulletin boards and program listings.

**Macomb County Specific:**
- Mount Clemens has approximately 35% Hispanic/Latino population. Bilingual outreach in English and Spanish significantly increases registration. Translate flyers and registration forms.
- Sacred Heart Parish bulletin board and announcement (Mount Clemens)
- L'Anse Creuse parent newsletters
- Mount Clemens Community Schools parent communication

### Parent Communication During Season
- Use group text or team app (TeamSnap, GroupMe) for weekly updates
- Send practice and game schedule at least 2 weeks in advance
- Communicate cancellations as early as possible
- Monthly newsletter or update email builds trust and retention

---

## SECTION 9: COMPLIANCE AND SAFETY

### Concussion Protocol
Required by all governing bodies and most states have youth concussion laws. Key requirements:
- Any athlete showing concussion symptoms must be removed from play immediately
- Cannot return to play same day
- Must be cleared by licensed healthcare provider before returning
- Coaches must complete concussion awareness training (often included in governing body certification)
- In Michigan: Youth Concussion Act requires written information to athletes and parents, removal from play protocol, medical clearance before return.

### Heat Safety
- Monitor heat index, not just temperature
- Heat index above 103°F: Cancel or move practice indoors
- Provide water breaks every 20–30 minutes minimum
- Never restrict water access
- Recognize heat exhaustion and heat stroke symptoms
- Acclimatization period for athletes new to heat: 7–14 days of gradual exposure

### Emergency Action Plan (EAP)
Every program should have a written EAP that includes:
- Emergency contact list
- Nearest hospital and directions
- AED location (if available)
- Protocol for medical emergencies
- Who is responsible for calling 911
- Post the EAP at every practice location

### Child Protection Policies
- Two-adult rule: No adult should ever be alone with a single minor athlete. Always have two adults present or in sight.
- No private messaging: Adults should not privately message minor athletes. Use group chats or copy parents.
- Physical contact guidelines: Follow SafeSport training guidelines on appropriate vs inappropriate physical contact.
- Reporting: Know your mandatory reporting obligations. Most states require coaches to report suspected abuse or neglect.

---

## SECTION 10: PROGRAM OPERATIONS BEST PRACTICES

### Season Planning Timeline
- 12 weeks before season: Book fields/facilities, finalize schedule
- 8 weeks before: Open registration, begin coach recruitment
- 6 weeks before: Run background checks on all coaches/volunteers
- 4 weeks before: Confirm team rosters, assign coaches to teams
- 2 weeks before: Send full season schedule to families
- 1 week before: Confirm field access, equipment inventory
- Season start: Collect all signed waivers before first practice

### Volunteer Coaching Best Practices (from Aspen Institute Project Play research)
- Coaches who focus on fun and skill development over winning produce better long-term athlete development
- Multi-sport participation until age 12 reduces burnout and overuse injuries
- Early specialization (single sport before age 12) is associated with higher dropout rates
- Positive coaching style and psychological safety are stronger predictors of youth sports participation than winning

### Equipment Management
- Create an equipment inventory spreadsheet before every season
- Assign numbered jerseys and track returns
- Store equipment in labeled bins by size
- Budget 10–15% of annual budget for equipment replacement
- Collect equipment at end of season — do not let families keep jerseys/equipment without replacing

### Impact Measurement — What to Track
Track this every season. It strengthens grant applications and demonstrates program value:
- Total participants (by age, gender, zip code)
- Attendance rate per participant
- Participants receiving financial assistance
- Coaches and volunteers (hours contributed)
- Community events hosted
- Participants who return season over season (retention rate)
- Stories and testimonials (with permission)

---

## SECTION 11: YEAR 1 CHECKLIST FOR NEW YOUTH SPORTS PROGRAMS

1. Form LLC or nonprofit (LLC first, nonprofit when ready for grants)
2. Get EIN from IRS (free, online, 10 minutes)
3. Open business bank account
4. Join appropriate governing body (US Youth Soccer, USA Basketball, etc.)
5. Purchase general liability insurance
6. Complete SafeSport certification (all adults)
7. Run background checks (all adults)
8. Complete coach certifications (sport-specific + First Aid/CPR)
9. Book field or gym
10. Set registration fees and open registration
11. Create registration form with waiver
12. Create team communication channel
13. Run first season
14. Track all participation data
15. Apply for first grant (local community foundation is best first target)
16. File for 501(c)(3) if not already done

---

## SOURCES FOR ANNUAL BRAIN UPDATE (every January)
- Aspen Institute Project Play State of Play report: aspenprojectplay.org/state-of-play
- US Soccer Foundation annual report: ussoccerfoundation.org
- NAYS (National Alliance for Youth Sports): nays.org
- CDC Physical Activity Guidelines: cdc.gov/physicalactivity
- Sports & Fitness Industry Association Participation Report: sfia.org
- National Council of Nonprofits: councilofnonprofits.org
`,
    stem: `# CLEARPATH BRAIN 2 — STEM PROGRAMS
# Version 1.0 | Last updated: May 2026
# This document is the static knowledge base for all STEM program coaching.
# Covers: Coding & Technology, Robotics, Science & Engineering, Math Enrichment, General STEM
# Update annually every January from: Code.org, CSTA, NSF, Google/Gallup, FIRST Robotics annual reports.

---

## SECTION 1: LEGAL STRUCTURE

### Recommended Structure for STEM Programs
Most STEM programs should form a nonprofit 501(c)(3) rather than an LLC. Reason: the largest STEM funders (Google.org, NSF, Verizon, Northrop Grumman) exclusively fund nonprofits. Unlike youth sports where you can run seasons as an LLC, STEM programs typically need grant funding from day one to cover equipment costs.

**Timeline:**
1. Form LLC immediately ($50–$200 depending on state) — gives legal protection now
2. File IRS Form 1023-EZ at pay.gov ($275) — within 30–60 days of starting
3. Get EIN at irs.gov/ein — free, takes 10 minutes
4. Open nonprofit bank account after EIN received

**Fiscal Sponsorship Alternative:**
If 501(c)(3) application is pending, use a fiscal sponsor to receive grants. Organizations like Fractured Atlas or local community foundations will sponsor you for 5–15% of grant amounts. This lets you apply for grants before your status is official.

---

## SECTION 2: CURRICULUM FRAMEWORKS

### Why Curriculum Framework Matters for Grants
Grant funders want to see a proven curriculum framework. Programs using established frameworks receive significantly more funding than those with self-developed curricula. Choose one and build your program around it.

### Code.org
**Best for:** K-12 coding introduction, classroom-style programs
**Cost:** Free for educators and programs
**What it includes:** Hour of Code activities, CS Fundamentals (K-5), CS Discoveries (6-8), CS Principles (9-10)
**Certification:** Code.org facilitator certification available
**Website:** code.org
**Grant alignment:** Code.org programs are viewed favorably by Google.org, Microsoft, and corporate STEM funders

### FIRST (For Inspiration and Recognition of Science and Technology)
**Best for:** Robotics programs, competition-based learning
**Programs by age:**
- FIRST LEGO League Discover (PreK-1): Introduction to STEM through play
- FIRST LEGO League Explore (2-5): Hands-on LEGO models
- FIRST LEGO League Challenge (4-8): Competitive robotics with programming
- FIRST Tech Challenge (7-12): Robot design and competition
- FIRST Robotics Competition (9-12): Varsity robotics
**Cost:** Team registration $250–$5,000 depending on level. Equipment $500–$20,000+
**Website:** firstinspires.org
**Grant alignment:** FIRST has its own grant programs. Major corporate funders specifically fund FIRST teams.

### Project Lead The Way (PLTW)
**Best for:** School-affiliated programs, engineering and biomedical focus
**Cost:** School licensing fee. Community programs can partner with PLTW schools.
**Website:** pltw.org
**Note:** Best suited for programs with formal school partnerships.

### CS4All
**Best for:** Urban programs focused on equity in CS education
**Website:** csforall.org
**Note:** Strong alignment with New York City and major urban districts.

### Scratch (MIT Media Lab)
**Best for:** Young learners (ages 8–16), creative coding
**Cost:** Free
**Website:** scratch.mit.edu
**Note:** Excellent entry-level programming environment. No setup required.

### Python for Kids
**Best for:** Ages 10+, introduction to real programming
**Resources:** Multiple free curricula available through Code.org and Khan Academy
**Cost:** Free

---

## SECTION 3: EQUIPMENT AND TECHNOLOGY

### Coding Programs — Equipment Needs
**Minimum viable setup (per 10 students):**
- 10 laptops or Chromebooks: $150–$350/device. Budget $1,500–$3,500 total.
- WiFi router: $50–$150. Most venues have WiFi.
- Extension cords and power strips: $20–$50.
- Total minimum: ~$2,000–$4,000

**Recommended:**
- iPad or tablets for younger learners (ages 5–10): $329–$499/device
- Headphones for individual work: $15–$30/device

**Free/Low-Cost Device Sources:**
- PCs for People (pcforpeople.org): Refurbished computers at 50–80% discount for nonprofits. National.
- Connecting for Good: Similar to PCs for People.
- Microsoft TEALS: Can include device donations.
- Local school districts: Often have surplus devices available for community programs.
- Grants4Computers: grantsforcomputers.com

### Robotics Programs — Equipment Needs by Level

**FIRST LEGO League (FLL) Explore/Challenge:**
- LEGO Education SPIKE Prime kit: $330/kit. 1 kit per 2–3 students.
- Laptop/tablet for programming: 1 per team (2–3 students)
- Total for team of 6: ~$1,000–$1,500

**FIRST Tech Challenge (FTC):**
- REV Robotics starter kit: ~$700
- Android phone or Control Hub: ~$150–$250
- Assorted parts and tools: ~$200–$500
- Total per team: ~$1,500–$3,000

**FIRST Robotics Competition (FRC):**
- Kickoff kit from FIRST: ~$1,000 (included in registration)
- Additional parts and materials: $3,000–$10,000
- Total per team: $5,000–$15,000+ per season

**VEX Robotics (Alternative to FIRST):**
- VEX IQ Starter Kit: ~$250–$350
- VEX V5 (older students): ~$800–$1,200
- vex.com

**Micro:bit (Entry Level Electronics):**
- Micro:bit device: $15–$20 each
- Excellent for ages 10–14. Low cost. Real programming experience.
- microbit.org

### 3D Printing
- Entry-level printer (Creality Ender 3): ~$200
- Mid-range (Prusa Mini): ~$400
- Filament: ~$20–$30/kg
- Good for engineering and design programs

---

## SECTION 4: INSTRUCTOR AND VOLUNTEER MANAGEMENT

### Instructor Qualifications
STEM programs have more flexibility than sports programs regarding instructor certifications. However:
- Background checks: Required for all adults working with youth. Sterling Volunteers ($15–25/person).
- SafeSport: Required if program receives federal funding or is affiliated with certain governing bodies. Recommended regardless.
- Subject knowledge: Instructors should have working knowledge of the technology being taught. Formal CS degree not required — industry experience, bootcamp graduates, and self-taught programmers are all effective.

### Volunteer Recruitment
**Best sources for STEM volunteers:**
- Local tech companies: Google, Microsoft, Amazon, Salesforce all have employee volunteer programs. Contact their community relations teams.
- University CS departments: College students looking for teaching experience and community service hours.
- Local coding bootcamp graduates: Recent graduates eager to give back and build portfolios.
- LinkedIn: Post volunteer opportunity with specific skills needed.
- Retired engineers and technologists: Excellent mentors with deep expertise.

### Corporate Volunteer Partnerships
Many large tech companies have formal volunteer programs that include paid volunteer time. This means:
- Employees can volunteer during work hours
- Company may make a matching donation
- Contact: [CompanyName] Community Relations or Corporate Responsibility team
- Companies in Michigan: Ford, GM, Stellantis, Consumers Energy, DTE Energy, Quicken Loans/Rocket Companies all have strong community volunteer programs.

---

## SECTION 5: GRANTS AND FUNDING

### Tier 1 — Best First Grants for New STEM Programs

**Toshiba America Foundation**
Amount: Up to $5,000 (K-5) or up to $10,000 (6-12)
Eligibility: Schools and nonprofits with STEM programs
Deadline: Applications reviewed quarterly
Apply at: toshiba.com/taf
Notes: Lower competition than larger funders. Good first grant. Straightforward application.

**FIRST Robotics Grants**
Amount: Varies by grant type. Team registration grants, equipment grants.
Eligibility: FIRST-affiliated teams
Apply at: firstinspires.org/ways-to-help/grants
Notes: If you run a FIRST team, always apply for FIRST's own grant programs first.

**Google.org Impact Challenge**
Amount: $50,000–$1,000,000+
Eligibility: Nonprofits using technology for social good
Apply at: google.org
Notes: Highly competitive. Better suited for established programs with track record. Apply after year 2.

**Verizon Innovative Learning**
Amount: Devices, curriculum, and cash grants
Eligibility: Title I schools and nonprofits serving underserved communities
Apply at: verizon.com/about/responsibility/verizon-innovative-learning
Notes: Strong focus on underserved communities. Device grants are very accessible for qualifying programs.

**Microsoft TEALS (Technology Education and Literacy in Schools)**
Amount: Free curriculum, volunteer instructors, and some device grants
Eligibility: Schools and community programs with limited CS resources
Apply at: microsoft.com/teals
Notes: Best for programs needing volunteer instruction support alongside equipment.

### Tier 2 — Growth Stage STEM Grants

**Northrop Grumman Foundation**
Amount: $5,000–$100,000
Eligibility: STEM education nonprofits
Apply at: northropgrumman.com/giving-back
Notes: Strong preference for aerospace and engineering focus. Relationship with local Northrop Grumman employees helps.

**NSF Advancing Informal STEM Learning (AISL)**
Amount: $300,000–$3,000,000
Eligibility: Nonprofits and research institutions
Apply at: nsf.gov/funding/opportunities
Notes: Large grant, significant application requirements. Best for established programs with data and research partnerships.

**AT&T Aspire**
Amount: $10,000–$100,000
Eligibility: Nonprofits focused on education and workforce readiness
Apply at: att.com/csr/aspire
Notes: Focus on technology and workforce pathways.

**Amazon Future Engineer**
Amount: Curriculum, scholarships, grants
Eligibility: Schools and nonprofits in underserved communities
Apply at: amazonfutureengineer.com
Notes: Focus on CS education pathways from K-12 to college.

### Tier 3 — Local and Corporate STEM Funding

**Local Community Foundations**
Always apply locally first. Community foundations have STEM education as a priority area in most regions. Lower competition, faster decisions.
- In Michigan: Community Foundation of Southeast Michigan, Michigan Community Foundation

**Corporate STEM Sponsorships**
- Local tech companies and startups: Often willing to sponsor youth STEM programs for visibility and talent pipeline
- Law and accounting firms: Many have community investment programs
- Local hospitals and health systems: STEM pipeline for healthcare workforce

**STEM-Specific Corporate Programs:**
- Cognizant Making the Future (cognizant.com)
- Salesforce.org (salesforce.org/grants)
- SAP Education (sap.com/corporate-en/topics/education.html)

---

## SECTION 6: PROGRAM OPERATIONS

### Class Size and Structure
- Optimal class size: 8–15 students per instructor
- Maximum without additional support: 20 students
- Student-to-device ratio: 1:1 preferred. 2:1 acceptable for paired programming.
- Session length: 60–90 minutes optimal for ages 8–12. 90–120 minutes for ages 13+.

### Program Formats
**After-School Program:** Most common format. 2–3 days/week, 60–90 minutes. Partners with school or runs at community center.

**Saturday Academy:** Weekly 2–3 hour sessions. Good for families who prefer weekend schedules.

**Summer Camp:** Intensive 1–2 week camps. Higher revenue per student. Full-day or half-day formats. $200–$500/student/week.

**School-Day Enrichment:** Partnership with school to run during school day. Requires district agreement. Often funded by school's Title IV-A budget.

### Measuring Impact
Track and report these metrics for grant applications:
- Students served (by age, gender, school, zip code)
- % students from underserved communities
- Hours of STEM instruction delivered
- % students who continue to next level
- Student projects completed
- Competition placements (if applicable)
- Teacher/instructor hours volunteered
- Devices and equipment provided

---

## SECTION 7: COMPLIANCE AND SAFETY

### Background Checks
Same as Youth Sports: Sterling Volunteers or NCSI. Required for all adults.

### Digital Safety
- Never store personal data on student devices
- Use school-appropriate content filters
- Have a written technology use policy signed by parents
- Do not allow students to use personal social media during program

### Equipment Safety
- 3D printers: Supervise at all times. Hot nozzle hazard. No students under 10 without direct supervision.
- Soldering (advanced programs): Safety glasses required. No students under 12 without direct supervision.
- Robotics: Secure all loose cables. Battery handling protocol. No pinch points on moving robots.

---

## SOURCES FOR ANNUAL BRAIN UPDATE (every January)
- Code.org Annual Report: code.org/about/annualreport
- CSTA K-12 CS Education Report: csteachers.org
- NSF STEM Education data: nsf.gov/statistics
- Google/Gallup CS Education research: goo.gle/cs-education
- FIRST Robotics Annual Report: firstinspires.org/about/annual-report
`,
    afterschool: `# CLEARPATH BRAIN 3 — AFTER-SCHOOL PROGRAMS
# Version 1.0 | Last updated: May 2026
# This document is the static knowledge base for all After-School program coaching.
# Covers: Academic Enrichment, Tutoring & Homework Help, Leadership Development, Arts & Creative, General After-School
# Update annually every January from: Afterschool Alliance America After 3PM, RAND, Mott Foundation, 21st CCLC federal data.

---

## SECTION 1: LEGAL STRUCTURE

### Recommended Structure
After-school programs should pursue nonprofit 501(c)(3) status as a priority. The largest funding source — 21st Century Community Learning Centers — requires nonprofit status or a school/government partnership. Form an LLC first for immediate legal protection, then file for 501(c)(3) status within 60 days.

**State Charity Registration:**
Most states require nonprofits to register before soliciting donations. This is separate from the IRS 501(c)(3) filing. Check your state attorney general's website for requirements. Michigan: sos.michigan.gov (charitable organization registration). Fee: $0–$200 depending on state.

---

## SECTION 2: SCHOOL DISTRICT PARTNERSHIPS

### Why You Need a School Partnership
After-school programs are dramatically more successful when formally partnered with a school district. Benefits:
- Access to school facilities (gyms, classrooms, cafeterias) often at no cost
- Access to student rosters and family contact information
- Built-in referral pipeline for students
- Required for 21st CCLC federal grant applications
- Increases credibility with all funders

### How to Approach a School District
**Contact the district office — not individual schools.** School principals cannot make facility or partnership agreements. You need to talk to:
- Assistant Superintendent for Academic Affairs or Curriculum
- Director of Community Education or Extended Learning
- Chief Financial Officer (for facility agreements)

**What to bring to the first meeting:**
- One-page program overview (what you do, who you serve, your qualifications)
- Proof of insurance (general liability, minimum $1M/$2M)
- Background check policy for all staff
- Clear ask: You want a Memorandum of Understanding (MOU) to run an after-school program at one school

**What the district needs from you:**
- Insurance certificate naming the district as additional insured
- Background checks on all staff and volunteers
- Curriculum outline
- Transportation plan (how students get home after program)
- Emergency protocols

### Memorandum of Understanding (MOU)
An MOU is a formal agreement between your organization and the school district. It specifies:
- Which school(s) you operate in
- What spaces you can use
- Operating hours
- Supervision requirements
- How student data is shared
- Duration of agreement (typically 1 year, renewable)

**Template MOUs are available from:**
- Afterschool Alliance (afterschoolalliance.org/documents)
- Your state's Department of Education after-school office

### Facility Use Agreement
Separate from the MOU, you may need a facility use agreement for using school buildings. Districts typically require:
- Insurance certificate
- Hold harmless agreement
- Fee (often $0 for nonprofits serving district students, or $10–$50/hour)
- Security deposit

---

## SECTION 3: STAFFING AND SUPERVISION

### Staff-to-Student Ratios
Required ratios vary by state and program type. General guidelines:
- Ages 5–8: 1 staff per 8–10 students
- Ages 9–12: 1 staff per 10–15 students
- Ages 13–18: 1 staff per 15–20 students
- Always have at least 2 adults present (two-adult rule)

### Staff Qualifications
**Background checks:** Required for all staff. Sterling Volunteers ($15–25/person) or NCSI.
**SafeSport:** Recommended for all programs working with youth.
**CPR/First Aid:** At least one certified staff member per site.
**Academic Enrichment Staff:** Teaching experience or education degree preferred. Many programs use certified teachers, paraprofessionals, and college students in education programs.
**Tutoring Staff:** Subject matter competence required. Tutors should be at least 2 grade levels above the students they serve.

### Volunteer Integration
Volunteers significantly extend program capacity at low cost:
- College students (education, social work, psychology majors): Excellent tutors and mentors. Offer service learning credit.
- AmeriCorps VISTA members: Full-time volunteers placed for one year. Stipend paid by federal government. Strong workforce for after-school programs.
- Senior Corps: RSVP program places senior volunteers. Free.
- Corporate volunteer programs: Many companies offer paid volunteer time to employees.

---

## SECTION 4: PROGRAM DESIGN AND CURRICULUM

### Program Components (Best Practice)
Research consistently shows highest-quality after-school programs include all three components:
1. **Academic support** (homework help, tutoring, literacy, math skill building): 45–60 minutes
2. **Enrichment activities** (arts, STEM, sports, life skills): 45–60 minutes
3. **Snack time and social development**: 15–30 minutes

### Homework Help Best Practices
- Dedicate first 45–60 minutes to homework before enrichment activities
- Create quiet, consistent workspace
- Staff should guide without doing work for students
- Track homework completion rates — report this to funders
- Communicate with teachers about student progress

### Literacy Enrichment
- Read aloud sessions: 20–30 minutes daily for K-3 students
- Independent reading time with self-selected books
- Book discussions and comprehension activities
- Summer slide prevention: programs that run year-round or into summer significantly reduce learning loss

### STEM Enrichment in After-School Context
See Brain 2 for full STEM content. In after-school context:
- 45–60 minute STEM sessions work best
- Project-based learning is more effective than lecture format
- FIRST LEGO League teams are popular after-school enrichment activities
- Code.org Hour of Code activities are excellent drop-in activities

### Arts and Creative Enrichment
- Visual arts, music, dance, and drama are all effective enrichment activities
- Partner with local arts organizations for quality programming
- Arts integration with academic content increases engagement and retention
- Michigan-specific: Michigan Council for Arts and Cultural Affairs (MCACA) funds arts programming in schools and nonprofits

### Leadership Development Programs
- Student voice and choice: Give students input into program design
- Youth leadership councils: Students help plan activities and advocate for the program
- Community service projects: Students identify and address community needs
- Life skills curriculum: Financial literacy, conflict resolution, public speaking

---

## SECTION 5: GRANTS AND FUNDING

### 21st Century Community Learning Centers (21st CCLC) — The Largest Source

**What it is:** Federal grant administered by state education departments. The largest dedicated after-school funding source in the United States. Over $1.3 billion awarded annually nationwide.

**Amount:** $100,000–$500,000+ per year, multi-year grants (typically 3–5 years)

**Eligibility:**
- Must serve students in high-need schools (Title I schools preferred)
- Must be in partnership with a public school
- Must serve primarily K-12 students
- Nonprofit, government, or school entity

**Application process:**
- Applications go to your STATE Department of Education, not federal government
- Michigan: Michigan Department of Education, 21st CCLC program. michigan.gov/mde
- Competitive application, reviewed annually
- Strong applications include: needs assessment data, evidence-based curriculum, school partnership letter, evaluation plan, sustainability plan

**Timeline:**
- Applications typically released: January–February each year
- Applications due: March–April
- Awards announced: May–June
- Programs start: September (following school year)

**Key tips for strong applications:**
- Include a letter of support from school principal AND district superintendent
- Show clear need with data (% students below grade level, school demographics)
- Use evidence-based programs (listed in What Works Clearinghouse)
- Show clear outcomes and how you'll measure them
- Include sustainability plan showing how program continues after grant

### Title IV-A — Student Support and Academic Enrichment

**What it is:** Federal funds that flow to school districts through the Every Student Succeeds Act (ESSA). Districts can use a portion to fund community after-school programs.

**Amount:** Varies by district. Typically $10,000–$50,000 per partnership.

**How to access:**
- Talk to your district's Title IV-A coordinator
- Ask if the district has unspent Title IV-A funds that could support your program
- Frame your ask around STEM, healthy and safe students, or well-rounded education (the three Title IV-A pillars)

### Tier 1 — Accessible Grants for New After-School Programs

**Charles Stewart Mott Foundation**
Amount: $25,000–$500,000
Eligibility: Nonprofits focused on after-school and expanded learning
Apply at: mott.org
Notes: The largest private funder of after-school programming nationally. Relationship-building important. Start by attending their funded convenings.

**Wallace Foundation**
Amount: $50,000–$1,000,000+
Eligibility: Nonprofits and schools focused on out-of-school time
Apply at: wallacefoundation.org
Notes: Highly competitive. Focus on summer learning and expanded learning time.

**United Way Local Chapters**
Amount: $5,000–$50,000
Eligibility: Local nonprofits aligned with education priority areas
Notes: Most United Way chapters have "Education" as a priority. After-school programs are strong fits. Build relationship with local United Way before applying.

**Local Community Foundations**
Amount: $1,000–$25,000
Notes: Lowest competition. Best first grant for new programs. Apply before pursuing larger grants.

### Tier 2 — Growth Stage Grants

**Afterschool Alliance Member Grants**
Various grant opportunities through afterschoolalliance.org/funding

**Casey Family Programs**
Focus on child welfare and education
Apply at: casey.org

**Robert Wood Johnson Foundation**
Focus on health equity, including social determinants
Apply at: rwjf.org

**W.K. Kellogg Foundation**
Focus on vulnerable children and families
Apply at: wkkf.org

**Michigan-Specific:**
- Skillman Foundation (skillman.org): Detroit-focused youth development
- Kresge Foundation (kresge.org): Detroit-focused
- Community Foundation of Southeast Michigan (cfsem.org)

---

## SECTION 6: TRANSPORTATION AND SAFETY

### Transportation Planning
Transportation is often the biggest barrier to after-school program participation. Options:
- School district transportation: Some districts provide late bus runs for after-school programs. Ask the district transportation department.
- Parent pickup: Most common. Set a clear pickup time and enforce it.
- Walking home: Only appropriate for older students in safe neighborhoods. Get written parent permission.
- Partnerships with YMCA or Boys & Girls Club that have van transportation

### Snack Requirements
If program receives federal funding (21st CCLC, USDA), may need to follow snack guidelines:
- USDA Child and Adult Care Food Program (CACFP): Free meals and snacks for qualifying programs
- Apply through your state Department of Education
- Requires tracking attendance and meals served
- Reimbursement: ~$0.97 per snack for qualifying programs

### Emergency Procedures
- Maintain current emergency contact information for every student
- Know your school's or facility's emergency procedures
- Practice evacuation with students at least once per semester
- Have written protocol for medical emergencies, student behavior emergencies, facility emergencies

---

## SECTION 7: MEASURING AND REPORTING OUTCOMES

### What Funders Want to See (Especially 21st CCLC)
- Attendance: Average daily attendance. Target 80%+ of enrolled students attending 3+ days/week.
- Academic outcomes: Teacher surveys, report card grades, standardized test scores
- Homework completion rates
- Student behavior: School discipline referrals (reduction)
- Family engagement: Events attended, surveys completed
- Safety: Students in safe environment vs. unsupervised (key 21st CCLC metric)

### Data Collection Tools
- Attendance tracking: Daily sign-in sheets (paper or digital). TeamSnap, Apricot, or custom spreadsheet.
- Teacher surveys: Annual or semester survey asking teachers about student progress. Template available from Afterschool Alliance.
- Student surveys: Age-appropriate surveys about program experience, safety, goals.
- Parent surveys: Program satisfaction, family engagement, perceived student benefit.

---

## SOURCES FOR ANNUAL BRAIN UPDATE (every January)
- Afterschool Alliance America After 3PM Report: afterschoolalliance.org/documents/AA3PM
- RAND Corporation After-School Research: rand.org
- Charles Stewart Mott Foundation Annual Report: mott.org
- 21st CCLC Federal Performance Data: ed.gov/programs/21stcclc
- National Institute on Out-of-School Time (NIOST): niost.org
`,
    business: `# CLEARPATH BRAIN 4 — GENERAL BUSINESS BUILDING
# Version 1.0 | Last updated: May 2026
# This document covers legal structure, nonprofit formation, financial management,
# grant writing basics, and operational infrastructure for all program types.
# Update annually every January from: IRS nonprofit data, National Council of Nonprofits, state filing fee changes.

---

## SECTION 1: LLC FORMATION BY STATE

### What an LLC Does
An LLC (Limited Liability Company) protects your personal assets from business liabilities. If someone sues your program, they can only go after the LLC's assets — not your personal bank account, car, or home. This is essential protection for any program director. Form one before your first event.

### How to Form an LLC
1. Choose a name (check availability on your state's Secretary of State website)
2. File Articles of Organization with your state (online in most states)
3. Pay filing fee
4. Create an Operating Agreement (template available free online)
5. Get EIN from IRS (free at irs.gov/ein)
6. Open business bank account

### State-by-State LLC Formation Guide

**Alabama:** $200. sos.alabama.gov. Processing: 3–5 days.
**Alaska:** $250. commerce.alaska.gov/web/cbpl/BusinessLicensing. Processing: 10–15 days.
**Arizona:** $50. azcc.gov. Processing: 1–2 weeks.
**Arkansas:** $45. sos.arkansas.gov. Processing: 3–5 days.
**California:** $70 (+ $800/year franchise tax minimum). sos.ca.gov. Processing: 2–3 weeks.
**Colorado:** $50. sos.state.co.us. Processing: immediate online.
**Connecticut:** $120. ct.gov/sots. Processing: 1–3 days.
**Delaware:** $90. corp.delaware.gov. Processing: 2–3 weeks.
**Florida:** $125. sunbiz.org. Processing: immediate online.
**Georgia:** $100. sos.ga.gov. Processing: 7–10 days.
**Hawaii:** $50. cca.hawaii.gov. Processing: 3–5 days.
**Idaho:** $100. sos.idaho.gov. Processing: 3–5 days.
**Illinois:** $150. ilsos.gov. Processing: 10–15 days.
**Indiana:** $95. inbiz.in.gov. Processing: immediate online.
**Iowa:** $50. sos.iowa.gov. Processing: 1–2 days.
**Kansas:** $160. sos.ks.gov. Processing: 3–5 days.
**Kentucky:** $40. sos.ky.gov. Processing: 3–5 days.
**Louisiana:** $100. sos.la.gov. Processing: 3–5 days.
**Maine:** $175. maine.gov/sos. Processing: 5–7 days.
**Maryland:** $100. dat.maryland.gov. Processing: 5–7 days.
**Massachusetts:** $500. corp.sec.state.ma.us. Processing: 3–5 days.
**Michigan:** $50. michigan.gov/lara. Processing: 5–10 days online.
**Minnesota:** $155. sos.state.mn.us. Processing: 5–7 days.
**Mississippi:** $50. sos.ms.gov. Processing: 3–5 days.
**Missouri:** $50. sos.mo.gov. Processing: 3–5 days.
**Montana:** $70. sos.mt.gov. Processing: 5–7 days.
**Nebraska:** $100. sos.nebraska.gov. Processing: 5–7 days.
**Nevada:** $75 (+$200 state business license). sos.nv.gov. Processing: 1–3 days.
**New Hampshire:** $100. sos.nh.gov. Processing: 5–7 days.
**New Jersey:** $125. njportal.com/dor. Processing: immediate online.
**New Mexico:** $50. sos.nm.gov. Processing: 1–2 days.
**New York:** $200. dos.ny.gov. Processing: 7–10 days.
**North Carolina:** $125. sos.nc.gov. Processing: 3–5 days.
**North Dakota:** $135. sos.nd.gov. Processing: 5–7 days.
**Ohio:** $99. sos.state.oh.us. Processing: immediate online.
**Oklahoma:** $100. sos.ok.gov. Processing: 3–5 days.
**Oregon:** $100. oregonbusinessregistry.sos.oregon.gov. Processing: immediate online.
**Pennsylvania:** $125. dos.pa.gov. Processing: 7–10 days.
**Rhode Island:** $150. sos.ri.gov. Processing: 3–5 days.
**South Carolina:** $110. sos.sc.gov. Processing: 3–5 days.
**South Dakota:** $150. sdsos.gov. Processing: 3–5 days.
**Tennessee:** $300. sos.tn.gov. Processing: 3–5 days.
**Texas:** $300. sos.state.tx.us. Processing: 2–3 days.
**Utah:** $54. corporations.utah.gov. Processing: immediate online.
**Vermont:** $125. sos.vermont.gov. Processing: 3–5 days.
**Virginia:** $100. scc.virginia.gov. Processing: immediate online.
**Washington:** $200. dor.wa.gov. Processing: immediate online.
**West Virginia:** $100. sos.wv.gov. Processing: immediate online.
**Wisconsin:** $130. wdfi.org. Processing: immediate online.
**Wyoming:** $100. wyomingllc.gov. Processing: immediate online.

---

## SECTION 2: NONPROFIT 501(c)(3) FORMATION

### IRS Form 1023-EZ — For Most New Nonprofits
**Cost:** $275
**Where to file:** pay.gov (search "Form 1023-EZ")
**Processing time:** 2–4 months (can expedite for fee)
**Eligibility:** Organizations expecting to gross less than $50,000/year in first 3 years. Most new programs qualify.
**What you need before filing:**
- LLC or incorporated as a nonprofit corporation (not LLC — see below)
- EIN
- Articles of Incorporation
- Brief description of activities

**Important:** You must be incorporated as a Nonprofit Corporation — not an LLC — to file for 501(c)(3) status. If you formed an LLC, you have two options:
1. Form a separate Nonprofit Corporation and apply for 501(c)(3) through that entity
2. Convert your LLC to a nonprofit corporation (process varies by state)

Most programs form a Nonprofit Corporation from the start if they plan to pursue grants immediately.

### IRS Form 1023 — Full Version (for larger organizations)
**Cost:** $600
**Use when:** Expecting to gross more than $50,000/year, or if your application is complex
**Processing time:** 3–6 months
**Much more detailed** than 1023-EZ. Requires narrative descriptions of all activities, financial projections, governance documents.

### Nonprofit Corporation Formation
Similar to LLC but as a nonprofit corporation. Process:
1. Choose a name (check with Secretary of State)
2. File Articles of Incorporation as nonprofit corporation (state website)
3. Create bylaws
4. Appoint initial board of directors
5. Hold organizational meeting
6. Get EIN
7. File IRS Form 1023-EZ or 1023

### State Nonprofit Incorporation Fees (separate from IRS filing)
- Michigan: $20 at michigan.gov/lara
- Ohio: $99 at ohiosos.gov
- Illinois: $50 at ilsos.gov
- Most states: $20–$100

### State Charity Registration
Required in most states before soliciting donations. File with state Attorney General or Secretary of State.
- Michigan: michigan.gov/ag (Charitable Trust Section). File annually. $0 for small organizations.
- Threshold: Many states exempt organizations under $25,000/year. Check your state.
- CharitiesNYS.com has a helpful guide for multi-state registration.

---

## SECTION 3: GOVERNANCE AND BYLAWS

### Board of Directors — Requirements for 501(c)(3)
- Minimum 3 board members required by IRS
- Recommended: 5–9 members for small organizations
- Board members must be independent (no family members of founder as majority)
- Board is legally responsible for the organization
- Board meets at minimum annually (quarterly recommended)

### What Good Board Members Contribute
Look for board members with skills in: accounting/finance, law, fundraising, marketing, the program's subject area, community connections, HR. Board members should open doors, not just fill seats.

### Bylaws — What to Include
Bylaws are the internal rules of your organization. Required for 501(c)(3) application. Key provisions:
- Name and purpose of organization
- Board composition, terms, elections
- Officer roles (President, Secretary, Treasurer)
- Meeting requirements and quorum
- How decisions are made (voting procedures)
- How to amend bylaws
- Dissolution clause (where assets go if organization closes)

**Free bylaws templates:**
- National Council of Nonprofits: councilofnonprofits.org/tools-resources/nonprofit-bylaws
- Rocket Lawyer: rocketlawyer.com (fill-in-the-blank templates)
- Foundation Group: foundationgroup.com/resources

### Conflict of Interest Policy
Required by IRS for 501(c)(3). Board members must disclose and recuse themselves from decisions where they have a personal financial interest. Simple one-page policy. Template available from National Council of Nonprofits.

---

## SECTION 4: FINANCIAL MANAGEMENT

### Opening a Bank Account
Required before accepting any program payments or grants. Need:
- EIN (Employer Identification Number from IRS)
- Articles of Incorporation or organization documents
- Board resolution authorizing the account (for nonprofits)
- Two forms of ID

**Best banks for small nonprofits:**
- Chase for Nonprofits: No monthly fee for 501(c)(3) organizations. Widely available.
- Bank of America: Nonprofit banking program.
- Local credit unions: Often most flexible with small nonprofits.
- Avoid: large banks with high minimum balance requirements.

### Bookkeeping Basics
Every program needs basic financial records from day one. At minimum:
- Record all income: registration fees, grants, donations, sponsorships
- Record all expenses: equipment, insurance, field fees, supplies, staff
- Keep all receipts (digital copies are fine)
- Reconcile bank statements monthly
- Separate personal and business finances — never mix

**Free/Low-Cost Tools:**
- Wave Accounting (waveapps.com): Free. Excellent for nonprofits under $500K.
- QuickBooks Nonprofit Edition: ~$50/month. Industry standard.
- Google Sheets: Manual but free and effective for very small programs.

### Chart of Accounts for Youth Programs
Standard categories to track:
**Income:**
- Program registration fees
- Grant revenue (track by grant)
- Individual donations
- Corporate sponsorships
- Fundraising events
- In-kind contributions (equipment, volunteer hours)

**Expenses:**
- Personnel (salaries, stipends, payroll taxes)
- Facility rental
- Equipment and supplies
- Insurance
- Marketing and communications
- Travel
- Professional development
- Administrative (bank fees, software)
- Indirect costs (overhead)

### Budgeting Best Practices
- Create annual budget before fiscal year starts
- Build in 10–15% contingency for unexpected expenses
- Separate program budget from administrative budget
- Never spend grant funds on anything not in approved grant budget
- Track budget vs. actual monthly

### Grant Financial Management
- Open separate tracking for each grant (not separate bank account)
- Keep all receipts for grant-funded expenses
- Never use grant funds for purposes other than approved in grant agreement
- Submit financial reports on time (late reports jeopardize future funding)
- Conduct internal audit or financial review annually for grants over $25,000

---

## SECTION 5: GRANT WRITING FUNDAMENTALS

### Grant Writing Process
1. Research: Find grants that match your program's focus, geography, and size
2. Pre-application contact: Email program officer to confirm eligibility before writing
3. Read instructions: Every funder has different requirements. Read them completely.
4. Write narrative: Answer every question directly. Use funder's language.
5. Gather attachments: IRS determination letter, budget, board list, financial statements
6. Review and edit: Have someone unfamiliar with your program read for clarity
7. Submit on time: Never submit late. Build 48-hour buffer into your timeline.
8. Follow up: Send thank-you email. If rejected, ask for feedback.

### Key Grant Narrative Sections

**Statement of Need**
Why does this program need to exist? Use data. Cite statistics about youth in your community. Connect your program to a documented gap. Sources: census data, school district data, state reports.

**Program Description**
What exactly do you do? Who do you serve? How many? Where? When? Be specific. Use numbers. Include curriculum or framework you follow.

**Goals and Objectives**
What will change because of your program? Goals are broad (increase youth sports participation). Objectives are specific and measurable (75 youth will participate in at least 8 sessions of soccer programming during the 2026 spring season).

**Evaluation Plan**
How will you know if you succeeded? What data will you collect? How will you collect it? Who is responsible? Funders want to know you'll track and report on outcomes.

**Budget Narrative**
Explain every line item. Why do you need this amount? How did you calculate it? Show you've thought carefully about costs.

**Sustainability**
How will the program continue after this grant ends? Multiple funding sources are essential. Show you're not 100% dependent on any single funder.

### Common Grant Writing Mistakes
- Answering a different question than what was asked
- Using jargon or acronyms without explanation
- Vague outcomes ("youth will be impacted")
- No data to support need
- Budget that doesn't match the narrative
- Missing attachments
- Submitting late
- Applying for grants you're not eligible for

### Building Relationships with Funders
- Attend funder events and webinars
- Follow funders on social media
- Send brief annual impact update even when not applying
- Say thank you — always send thank-you letter after receiving grant
- If rejected, ask for feedback and address it next cycle

---

## SECTION 6: PROGRAM INSURANCE OVERVIEW

### Types of Insurance Every Program Needs

**General Liability Insurance**
Covers injuries to participants, property damage, personal injury claims. Required by most venues and funders. Minimum: $1,000,000 per occurrence / $2,000,000 aggregate. Cost: $400–$2,000/year depending on program size and type.

**Directors & Officers (D&O) Insurance**
Protects board members and executives from personal liability for management decisions. Recommended once you have a formal board. Cost: $500–$2,000/year.

**Commercial Property Insurance**
Covers equipment and property you own. Important if you have significant equipment (robotics kits, laptops, sports equipment). Cost: Depends on value of property.

**Workers Compensation**
Required if you have paid employees. Covers work-related injuries. Required by law in most states. Cost: Varies by state and payroll.

**Volunteer Accident Insurance**
Secondary coverage for volunteer injuries. Not required but recommended. Cost: $100–$500/year.

### Insurance Vendors for Nonprofits
- Nonprofits Insurance Alliance (nonprofitsinsurance.org): Specializes in nonprofits. Competitive rates.
- Philadelphia Insurance Companies (phly.com): Strong nonprofit program.
- Markel Corporation: Youth organizations specialist.
- HUB International: Large broker, good for multi-line coverage.
- K&K Insurance: Excellent for sports organizations.

---

## SECTION 7: HUMAN RESOURCES BASICS

### Volunteer vs. Employee Classification
**Volunteer:** No expectation of compensation. Truly donating time. Cannot be reimbursed for time (only expenses). Cannot be a volunteer in their own business.

**Employee:** Receives wages. Subject to payroll taxes (FICA, federal/state income tax withholding). Must receive W-2. Most workers providing regular services are employees, not independent contractors.

**Independent Contractor:** Self-employed. Receives 1099-NEC (if paid $600+/year). Sets own hours. Uses own tools. Has multiple clients. Many nonprofits misclassify employees as contractors — this is a significant legal and tax risk.

### Paying People
- Employees: Use payroll service (Gusto, ADP, Paychex). Simplest for small nonprofits: Gusto ($40/month base + $6/person). Handles all tax withholding and filings.
- Contractors: Pay via check or direct transfer. File 1099-NEC by January 31 for anyone paid $600+ in the year.
- Stipends: Small payments to volunteers for specific contributions. Complicated tax treatment. Get advice from accountant.

### Staff Policies Every Program Needs
- Child protection / safeguarding policy
- Anti-harassment policy
- Social media policy (especially regarding youth participants)
- Confidentiality policy (protecting youth and family information)
- Conflict of interest policy
- Expense reimbursement policy

---

## SECTION 8: COMMUNICATIONS AND MARKETING

### Building Your Online Presence
**Website:** Essential. Even a simple one-page site establishes credibility. clearpathgrants.org is a good example. Build with WordPress, Squarespace, or Wix for $0–$20/month.

**Google for Nonprofits:** Free for 501(c)(3) organizations. Includes Google Workspace (Gmail, Docs, Sheets), Google Ad Grants ($10,000/month in free search advertising). Apply at google.com/nonprofits.

**TechSoup (techsoup.org):** Deep discounts on software for nonprofits. Microsoft Office 365 ($20/year instead of $300). Adobe Creative Cloud discounts. Other tools.

**Social Media:** Facebook and Instagram are most effective for youth programs. Post photos (with permission), schedule updates, success stories. Consistency matters more than volume.

### Email Newsletter
Build your email list from day one. Collect emails at every event. Send monthly or quarterly newsletter. Platforms:
- MailerLite: Free up to 500 subscribers. Recommended.
- Mailchimp: Free up to 500 contacts.
- Constant Contact: ~$12/month.

### Annual Report
Even informal one-page annual report strengthens grant applications and donor relationships. Include: participants served, outcomes, stories, financials summary, thank you to funders and volunteers.

---

## SECTION 9: COMPLIANCE CALENDAR

### Annual Compliance Checklist

**January:**
- Update all staff background checks (valid 1–2 years depending on state)
- Review and update emergency contact information
- Begin budget planning for new fiscal year
- Review grant deadlines for the year

**February–March:**
- File annual report with Secretary of State (most states require this, ~$25 fee)
- Update state charity registration if required
- Review insurance coverage — is it still adequate?

**April–May:**
- File IRS Form 990 (annual nonprofit tax return) — due May 15 for December 31 fiscal year end
  - 990-N (e-Postcard): For organizations with gross receipts under $50,000. Free. Online.
  - 990-EZ: For organizations with gross receipts $50,000–$200,000. Simplified version.
  - 990: Full version for organizations over $200,000.

**September–October:**
- Update SafeSport certifications for all staff (annual renewal)
- Update First Aid/CPR certifications (valid 2 years)
- Begin grant research for next funding cycle

**November–December:**
- Year-end fundraising push (December 31 is most important day for donations)
- Send year-end thank-you to all donors
- Begin fiscal year-end financial close

---

## SOURCES FOR ANNUAL BRAIN UPDATE (every January)
- National Council of Nonprofits: councilofnonprofits.org
- IRS Exempt Organizations data: irs.gov/charities-nonprofits
- Foundation Center / Candid: candid.org
- GuideStar (now Candid): guidestar.org
- State filing fee changes: Check each state Secretary of State website annually
`
  };

  function getBrain(programType) {
    const t = (programType || '').toLowerCase();
    if (t.includes('stem')) return BRAINS.stem;
    if (t.includes('after')) return BRAINS.afterschool;
    return BRAINS.youth_sports;
  }

  function searchBrain(question, content) {
    if (!content) return '';
    const q = question.toLowerCase();
    const sections = content.split('\n## ');
    const keywords = q.split(' ').filter(w => w.length > 3);
    const scored = sections.map(s => {
      const text = s.toLowerCase();
      const score = keywords.reduce((acc, kw) => acc + (text.split(kw).length - 1), 0);
      return { text: sections.indexOf(s) === 0 ? s : '## ' + s, score };
    });
    return scored
      .filter(s => s.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 3)
      .map(s => s.text)
      .join('\n\n---\n\n');
  }

  function isRealTime(q) {
    const question = q.toLowerCase();
    return ['currently open','currently accepting','open right now','deadline',
      'demographics','population data','census','recent law','new legislation',
      'policy change','today','this week','right now','as of today','latest news'
    ].some(t => question.includes(t));
  }

  try {
    const { messages, orgProfile, pillar } = JSON.parse(event.body);
    const userMsgs = messages.filter(m => m.role === 'user');
    const question = userMsgs[userMsgs.length - 1]?.content || '';

    console.log('Q:', question.substring(0, 80));
    console.log('Type:', orgProfile?.programType);

    const programBrain = getBrain(orgProfile?.programType);
    const programCtx = searchBrain(question, programBrain);
    const businessCtx = searchBrain(question, BRAINS.business);
    const context = [programCtx, businessCtx].filter(c => c.length > 50).join('\n\n===\n\n');
    const hasContext = context.length > 100;
    const needsRT = isRealTime(question);

    console.log('Context length:', context.length, '| RealTime:', needsRT);

    const profile = `
ORG: ${orgProfile?.orgName || 'Unknown'} | Type: ${orgProfile?.programType || ''} ${orgProfile?.sportOrCategory || ''}
Location: ${orgProfile?.city || ''}, ${orgProfile?.state || ''} | Structure: ${orgProfile?.entityType || ''}
Participants: ${orgProfile?.participantCount || ''} | Budget: ${orgProfile?.budgetRange || ''}
Grant exp: ${orgProfile?.grantExperience || ''} | Challenge: ${orgProfile?.biggestChallenge || ''}
Journey: ${orgProfile?.journey || ''} | Pillar: ${pillar || 'Build'}`;

    // Route 1: Answer from brain
    if (hasContext && !needsRT) {
      const sys = \`You are Clearpath, a warm and knowledgeable advisor for community program directors. Answer using ONLY the knowledge base below. Personalize using the org profile. Be specific and actionable. Bold key action items. Keep under 250 words unless detail is truly needed. If the knowledge base does not contain enough to answer confidently, end with exactly: [NEEDS_CONSULTANT]\n\nNever guess or make up information.\n\n\${profile}\n\nKNOWLEDGE BASE:\n\${context}\`;

      const res = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-api-key': process.env.ANTHROPIC_API_KEY, 'anthropic-version': '2023-06-01' },
        body: JSON.stringify({ model: 'claude-sonnet-4-5', max_tokens: 600, system: sys, messages })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error?.message || 'API error');
      let reply = data.content[0].text;
      if (reply.includes('[NEEDS_CONSULTANT]')) {
        reply = reply.replace('[NEEDS_CONSULTANT]', '').trim() + '\n\nFor specific guidance on your situation, **[book a consulting session →](/consulting)**';
      }
      return { statusCode: 200, headers, body: JSON.stringify({ reply }) };
    }

    // Route 2: Real-time
    if (needsRT) {
      const res = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-api-key': process.env.ANTHROPIC_API_KEY, 'anthropic-version': '2023-06-01' },
        body: JSON.stringify({ model: 'claude-sonnet-4-5', max_tokens: 600, system: \`You are Clearpath. The user needs current information. Be specific, state what you know and where to verify current details.\n\${profile}\`, messages })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error?.message);
      return { statusCode: 200, headers, body: JSON.stringify({ reply: data.content[0].text }) };
    }

    // Route 3: Consulting
    return {
      statusCode: 200, headers,
      body: JSON.stringify({ reply: \`That\'s a specific situation that goes beyond general best practices. For the most accurate guidance, **[book a consulting session →](/consulting)**\n\nSessions are $150\u2013$250 and cover detailed, situation-specific guidance.\` })
    };

  } catch (error) {
    console.error('Error:', error.message);
    return { statusCode: 500, headers, body: JSON.stringify({ error: error.message }) };
  }
};
